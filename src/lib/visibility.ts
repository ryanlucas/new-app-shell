import type { NavNode, Persona, PlansFile, Suite, Visibility } from './types.ts'

export type Resolution = 'visible' | 'locked' | 'hidden'

export interface ResolveContext {
  /** Active personas (combinable). */
  personas: Set<Persona>
  /** Partial-admin scopes the user has, if Partial is among personas. */
  partialScopes: Set<string>
  /** EE archetypes the user has, if 'ee' is among personas. Empty = pure
   *  rank-and-file EE (only sees universally-EE items). */
  eeArchetypes: Set<string>
  /** Suite IDs owned by the active plan. */
  ownedSuites: Set<string>
  /** Active company-state condition flags (e.g. "isPeoClient", "isStandaloneCompany"). */
  conditions: Set<string>
  /** Optional product-spoke ownership map. If absent, productGate is satisfied iff the suite is owned. */
  ownedSpokes?: Set<string>
  /** The suite this node sits inside (for productGate fallback). */
  suiteId?: string
}

/**
 * Walk a free-form condition expression and return whether it's satisfied.
 *
 * Conditions in the catalog are intentionally informal strings like:
 *   "!isContractWaiting"
 *   "isPeoClient"
 *   "ff:CHAT_ASSISTANT"
 *   "perm: payroll:overview"
 *
 * For the prototype we just check membership in the active condition set,
 * with `!` for negation. Compound expressions ("a && b", "a || b") are
 * left as best-effort by splitting on || and treating each || branch as
 * an AND of && parts.
 */
function evalCondition(expr: string, active: Set<string>): boolean {
  const orBranches = expr.split('||').map((s) => s.trim())
  return orBranches.some((branch) => {
    const andParts = branch.split('&&').map((s) => s.trim()).filter(Boolean)
    return andParts.every((part) => {
      if (part.startsWith('!')) return !active.has(part.slice(1).trim())
      return active.has(part)
    })
  })
}

function personaMatches(v: Visibility, ctx: ResolveContext): boolean {
  if (!v.personas?.length) return false
  for (const p of v.personas) {
    if (!ctx.personas.has(p)) continue
    if (p === 'partial') {
      // partial requires at least one matching scope (or empty scopeForPartial = any partial admin)
      if (!v.scopeForPartial?.length) return true
      if (v.scopeForPartial.some((s) => ctx.partialScopes.has(s))) return true
      continue
    }
    if (p === 'ee') {
      // ee with no archetype constraint = universally EE-visible (e.g. My Pay).
      // ee with archetype constraint = requires overlap with active archetypes.
      if (!v.archetypesForEe?.length) return true
      if (v.archetypesForEe.some((a) => ctx.eeArchetypes.has(a))) return true
      continue
    }
    return true
  }
  return false
}

function productGateMet(v: Visibility, ctx: ResolveContext): boolean {
  // No explicit gate: ownership is determined by suite membership (so an app
  // with no productGate inside an unowned suite is still "not owned").
  if (!v.productGate) {
    return ctx.suiteId ? ctx.ownedSuites.has(ctx.suiteId) : true
  }
  if (ctx.ownedSpokes?.has(v.productGate)) return true
  // Fallback when spoke-level data isn't available: use suite ownership.
  return ctx.suiteId ? ctx.ownedSuites.has(ctx.suiteId) : false
}

function conditionsMet(v: Visibility, ctx: ResolveContext): boolean {
  if (!v.conditions?.length) return true
  return v.conditions.every((c) => evalCondition(c, ctx.conditions))
}

export function resolve(node: NavNode, ctx: ResolveContext): Resolution {
  const v = node.visibility
  if (!v) return 'visible'

  const persona = personaMatches(v, ctx)
  const product = productGateMet(v, ctx)
  const cond = conditionsMet(v, ctx)

  if (persona && product && cond) return 'visible'

  // If a product gate is unmet but cross-sell rules say to show locked,
  // and the persona is one of the locked-recipients, return 'locked'.
  if (persona && cond && !product && v.whenUnowned) {
    const recipients = v.whenUnowned.showLockedTo ?? []
    if (recipients.some((p) => ctx.personas.has(p))) return 'locked'
  }

  return 'hidden'
}

/**
 * Resolve a suite by deriving from its apps. A suite is `visible` iff at
 * least one app inside (or cross-listed via `appearsIn`) resolves visible;
 * `locked` iff none are visible but at least one is locked, or the suite
 * itself carries a `whenUnowned` cross-sell tile rule that matches.
 *
 * The suite's own `visibility.personas` is intentionally NOT used as a gate
 * — app-level visibility is the source of truth. Otherwise the suite acts
 * as an upper bound and hides apps that should render (e.g. a manager-
 * visible Reports app inside a full-only Studio suite).
 */
export function resolveSuite(
  suite: Suite,
  ctx: ResolveContext,
  catalog?: { suites: Suite[] },
): Resolution {
  const childCtx: ResolveContext = { ...ctx, suiteId: suite.id }
  let anyVisible = false
  let anyLocked = false

  for (const app of suite.apps ?? []) {
    const r = resolve(app, childCtx)
    if (r === 'visible') anyVisible = true
    else if (r === 'locked') anyLocked = true
  }

  if (catalog) {
    for (const other of catalog.suites) {
      if (other.id === suite.id) continue
      for (const app of other.apps ?? []) {
        if (!app.appearsIn?.includes(suite.id)) continue
        const r = resolve(app, childCtx)
        if (r === 'visible') anyVisible = true
        else if (r === 'locked') anyLocked = true
      }
    }
  }

  if (anyVisible) return 'visible'
  if (anyLocked) return 'locked'

  // No apps resolved. Fall back to the suite's own whenUnowned rule so a
  // suite can still render as a cross-sell tile for unowned products.
  const v = suite.visibility
  if (v?.whenUnowned) {
    const recipients = v.whenUnowned.showLockedTo ?? []
    if (recipients.some((p) => ctx.personas.has(p))) return 'locked'
  }

  return 'hidden'
}

/** Build active condition set including conditions implied by the active plan. */
export function buildConditionSet(
  hudConditions: Iterable<string>,
  plansFile: PlansFile,
  activePlanId: string,
): Set<string> {
  const set = new Set(hudConditions)
  const plan = plansFile.plans.find((p) => p.id === activePlanId)
  for (const c of plan?.conditions ?? []) set.add(c)
  return set
}
