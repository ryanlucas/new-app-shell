import type { App, ShellSuites, Suite, SuiteGroupDef } from './types.ts'
import { resolve, type ResolveContext, type Resolution } from './visibility.ts'

/**
 * Derive the L1 spine of the mega menu from the resolved catalog. Walks the
 * suites/appGroups/apps tree once and applies these density rules:
 *
 *   RULE 1 (hide):           container with 0 visible children → drop
 *   RULE 2 (flatten-sparse): container with 1–2 visible children → children
 *                            replace the container at its parent's level
 *   RULE 3 (keep-dense):     container with 3+ visible children → keep
 *   RULE 4 (collapse-dominant): if exactly one suite remains at L1 AND it has
 *                            appGroups, promote those groups to L1, drop suite
 *
 * The catalog defines the maximum structure; the renderer derives the
 * minimum structure that fits the resolved content.
 */


/** L1 spine entry — the renderer handles five shapes. */
export type L1Entry =
  | { kind: 'suite'; suite: Suite; visibleApps: App[]; visibleGroups: VisibleAppGroup[] }
  | { kind: 'group'; suite: Suite; group: SuiteGroupDef; visibleApps: App[] }
  | { kind: 'app'; app: App; suite: Suite; resolution: Resolution }
  | { kind: 'my-cluster'; apps: Array<{ app: App; suite: Suite }> }
  | { kind: 'favorites'; apps: Array<{ app: App; suite: Suite }> }

/** When ≥ this many "my" apps are at L1, *consider* collapsing them into a
 *  single My Rippling container. Cluster only actually fires when there's
 *  also enough non-personal content at L1 to make the consolidation worth
 *  the extra hover step (see MY_CLUSTER_BACKDROP_THRESHOLD). */
export const MY_CLUSTER_THRESHOLD = 4
/** Cluster also requires at least this many non-personal L1 entries to
 *  contrast against. If the menu is already short, leave personal items
 *  inline rather than hiding them behind a hover. */
export const MY_CLUSTER_BACKDROP_THRESHOLD = 3
/** Favorites floor: the favorites cluster only fires when there's enough
 *  total visible content to justify an extra organizing surface. Below
 *  this, the entire favorites concept is dormant. */
export const FAVORITES_FLOOR = 12

function isMyApp(app: App): boolean {
  return app.id.startsWith('my-') || app.label.startsWith('My ')
}

export interface VisibleAppGroup {
  group: SuiteGroupDef
  apps: App[]
}

export interface DerivedSpine {
  entries: L1Entry[]
  /** Collapse-dominant fired? (single suite promoted to its appGroups). */
  collapsed?: { suite: Suite }
}

/**
 * Compute resolution for every app in every suite, including capabilities
 * cross-listed via `appearsIn`. Returns a map keyed by suiteId of the apps
 * that should be considered "in" that suite for rendering purposes.
 */
function buildResolvedTree(
  suites: Suite[],
  ctx: ResolveContext,
): Map<string, App[]> {
  const bySuite = new Map<string, App[]>()
  for (const s of suites) bySuite.set(s.id, [])

  for (const suite of suites) {
    const childCtx: ResolveContext = { ...ctx, suiteId: suite.id }
    for (const app of suite.apps ?? []) {
      const r = resolve(app, childCtx)
      if (r === 'visible') bySuite.get(suite.id)!.push(app)
    }
  }
  // Note: `appearsIn` cross-listing is intentionally NOT applied at render
  // time. It would surface the same capability (Documents, Approvals) in
  // multiple suites' panes, creating duplicate menu entries. Each app shows
  // in exactly one place — its primary suite — to keep the global menu
  // dedup-clean.
  return bySuite
}

/**
 * Group a suite's visible apps by their `group` field, returning the visible
 * appGroups (in declared order) and any ungrouped apps.
 */
/** Push `*-settings` apps to the end of a list — they're always last in
 *  their group (or in a flat ungrouped tail). Stable for everything else. */
function sortSettingsLast(apps: App[]): App[] {
  const isSettings = (a: App) => a.id.endsWith('-settings')
  return [...apps.filter((a) => !isSettings(a)), ...apps.filter(isSettings)]
}

function groupApps(
  suite: Suite,
  visibleApps: App[],
): { groups: VisibleAppGroup[]; ungrouped: App[] } {
  if (!suite.appGroups?.length) {
    return { groups: [], ungrouped: sortSettingsLast(visibleApps) }
  }
  const byGroup = new Map<string, App[]>()
  const ungrouped: App[] = []
  for (const a of visibleApps) {
    if (a.group && suite.appGroups.some((g) => g.id === a.group)) {
      const arr = byGroup.get(a.group) ?? []
      arr.push(a)
      byGroup.set(a.group, arr)
    } else {
      ungrouped.push(a)
    }
  }
  const groups: VisibleAppGroup[] = []
  for (const g of [...suite.appGroups].sort((a, b) => a.order - b.order)) {
    const apps = byGroup.get(g.id) ?? []
    if (apps.length > 0) groups.push({ group: g, apps: sortSettingsLast(apps) })
  }
  return { groups, ungrouped: sortSettingsLast(ungrouped) }
}

/**
 * Build the derived L1 spine. Applies hide / flatten-sparse / keep-dense /
 * collapse-dominant rules to the resolved tree.
 */
export function deriveSpine(
  shellSuites: ShellSuites,
  ctx: ResolveContext,
  options: { favorites?: Set<string> } = {},
): DerivedSpine {
  const allSuites = shellSuites.suites
  const tree = buildResolvedTree(allSuites, ctx)

  // Personal items always surface at L1, never buried in a suite container.
  // Includes: pinAtL1 (Inbox) + my-* apps (My Profile, My Pay, etc.). These
  // get pulled out of their parent suites' visible apps and emitted as
  // top-level entries (and possibly clustered into My Rippling below).
  const pinnedEntries: L1Entry[] = []
  const pinnedIds = new Set<string>()
  for (const suite of allSuites) {
    const visibleApps = tree.get(suite.id) ?? []
    for (const app of visibleApps) {
      const isPersonal = app.pinAtL1 || isMyApp(app)
      if (!isPersonal || pinnedIds.has(app.id)) continue
      pinnedEntries.push({ kind: 'app', app, suite, resolution: 'visible' })
      pinnedIds.add(app.id)
    }
  }
  // Strip personal apps from the tree so suite-level derivation ignores them.
  if (pinnedIds.size > 0) {
    for (const [sid, apps] of tree) {
      tree.set(
        sid,
        apps.filter((a) => !pinnedIds.has(a.id)),
      )
    }
  }

  // First pass: produce per-suite candidate entries with rule 1/2/3 applied.
  type SuiteCandidate = {
    suite: Suite
    entry: L1Entry | null // null = flattened (apps come up directly)
    flattenedApps: App[] // populated if entry is null and children are apps
    flattenedGroups: VisibleAppGroup[] // populated if collapse-dominant
  }
  const candidates: SuiteCandidate[] = []

  // Sparse-content shortcut: when the menu would have only a handful of
  // visible apps total, flatten every suite into its apps. Suite containers
  // earn their weight at density; below the threshold they just add a
  // hover-step for nothing. Admins on full plans always exceed this.
  const FLATTEN_TOTAL_THRESHOLD = 6
  let totalVisible = 0
  for (const apps of tree.values()) totalVisible += apps.length
  const flattenAll = totalVisible < FLATTEN_TOTAL_THRESHOLD

  for (const suite of allSuites) {
    const visibleApps = tree.get(suite.id) ?? []
    // No visible apps = no rights to anything inside → hide entirely. No
    // empty cross-sell tiles in the menu.
    if (visibleApps.length === 0) continue

    const { groups, ungrouped } = groupApps(suite, visibleApps)

    // Suite with exactly 1 visible app → promote it to L1 (drop the suite
    // header — no point in a one-item container). 2+ visible apps → keep
    // as a container, unless the standalone-non-admin shortcut is active.
    if (flattenAll || visibleApps.length === 1) {
      candidates.push({
        suite,
        entry: null,
        flattenedApps: visibleApps,
        flattenedGroups: [],
      })
    } else {
      candidates.push({
        suite,
        entry: { kind: 'suite', suite, visibleApps: ungrouped, visibleGroups: groups },
        flattenedApps: [],
        flattenedGroups: groups,
      })
    }
  }

  // Rule 4 (collapse-dominant): if exactly one suite-shaped entry remains
  // AND it has appGroups, promote those groups to L1.
  const suiteEntries = candidates.filter((c) => c.entry?.kind === 'suite')
  const flattenedEntries = candidates.filter((c) => c.entry === null)
  if (suiteEntries.length === 1 && flattenedEntries.length === 0) {
    const only = suiteEntries[0]
    const dense = only.flattenedGroups
    if (dense.length > 0) {
      // Promote groups to L1; emit any flat-residual apps as L1 apps too.
      const flatResidual =
        only.entry?.kind === 'suite' ? only.entry.visibleApps : []
      const entries: L1Entry[] = [
        ...dense.map<L1Entry>((vg) => ({
          kind: 'group',
          suite: only.suite,
          group: vg.group,
          visibleApps: vg.apps,
        })),
        ...flatResidual.map<L1Entry>((app) => ({
          kind: 'app',
          app,
          suite: only.suite,
          resolution: 'visible',
        })),
      ]
      return { entries, collapsed: { suite: only.suite } }
    }
  }

  // Otherwise: emit pinned-at-L1 apps + suite entries + flattened-app
  // entries. Dedup app entries by id — capabilities cross-listed via
  // `appearsIn` show up in multiple suites and would otherwise repeat at L1
  // once each suite flattens.
  const entries: L1Entry[] = [...pinnedEntries]
  const seenAppIds = new Set<string>(pinnedIds)
  for (const c of candidates) {
    if (c.entry) {
      entries.push(c.entry)
    } else {
      for (const app of c.flattenedApps) {
        if (seenAppIds.has(app.id)) continue
        seenAppIds.add(app.id)
        entries.push({ kind: 'app', app, suite: c.suite, resolution: 'visible' })
      }
    }
  }

  // Density-conditional My-Rippling cluster. "Personal" apps at L1 =
  // pinAtL1 (Inbox) + my-prefixed apps. Cluster fires only when (a) enough
  // personal items would otherwise crowd L1 and (b) there's enough non-
  // personal content for the consolidation to earn its hover step.
  const personalIndexes: number[] = []
  for (let i = 0; i < entries.length; i++) {
    const e = entries[i]
    if (e.kind === 'app' && (e.app.pinAtL1 || isMyApp(e.app))) {
      personalIndexes.push(i)
    }
  }
  const nonPersonalCount = entries.length - personalIndexes.length
  // Favorites cluster: emitted at the very top of L1 when the favorites
  // feature is "enabled" by content density (>= FAVORITES_FLOOR total
  // visible apps) AND the user has at least one favorite that resolves
  // visible. Below the floor, no favorites cluster, no toggle UI.
  const favoritesEnabled = totalVisible >= FAVORITES_FLOOR
  let favoritesEntry: L1Entry | null = null
  if (favoritesEnabled && options.favorites && options.favorites.size > 0) {
    const favApps: Array<{ app: App; suite: Suite }> = []
    const seenFav = new Set<string>()
    // Pull favorited apps out of: pinned/personal entries + per-suite tree.
    for (const e of pinnedEntries) {
      if (e.kind === 'app' && options.favorites.has(e.app.id) && !seenFav.has(e.app.id)) {
        favApps.push({ app: e.app, suite: e.suite })
        seenFav.add(e.app.id)
      }
    }
    for (const suite of allSuites) {
      const visibleApps = tree.get(suite.id) ?? []
      for (const app of visibleApps) {
        if (options.favorites.has(app.id) && !seenFav.has(app.id)) {
          favApps.push({ app, suite })
          seenFav.add(app.id)
        }
      }
    }
    if (favApps.length > 0) {
      favoritesEntry = { kind: 'favorites', apps: favApps }
    }
  }

  if (
    personalIndexes.length >= MY_CLUSTER_THRESHOLD &&
    nonPersonalCount >= MY_CLUSTER_BACKDROP_THRESHOLD
  ) {
    const personalApps: Array<{ app: App; suite: Suite }> = personalIndexes.map((i) => {
      const e = entries[i] as Extract<L1Entry, { kind: 'app' }>
      return { app: e.app, suite: e.suite }
    })
    const removed = new Set(personalIndexes)
    const collapsed: L1Entry[] = [{ kind: 'my-cluster', apps: personalApps }]
    if (favoritesEntry) collapsed.push(favoritesEntry)
    for (let i = 0; i < entries.length; i++) {
      if (removed.has(i)) continue
      collapsed.push(entries[i])
    }
    return { entries: collapsed }
  }

  // No my-cluster path: favorites still slots in after the inline personal
  // items but before the suites. Find the first non-personal entry index;
  // splice favorites there.
  if (favoritesEntry) {
    const lastPersonalIdx = (() => {
      let last = -1
      for (let i = 0; i < entries.length; i++) {
        const e = entries[i]
        if (e.kind === 'app' && (e.app.pinAtL1 || isMyApp(e.app))) last = i
      }
      return last
    })()
    const out = [...entries]
    out.splice(lastPersonalIdx + 1, 0, favoritesEntry)
    return { entries: out }
  }
  return { entries }
}
