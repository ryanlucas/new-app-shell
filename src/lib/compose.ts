// Pure composer: applies an ordered list of ops to the catalog and plans.
// Returns a NEW (deep-cloned) state. Inputs are never mutated.

import type {
  App,
  ComposerInput,
  ComposerOutput,
  NavNode,
  Op,
  PlansFile,
  Proposal,
  ProposalNote,
  ShellSuites,
  Suite,
  Visibility,
} from './types.ts'

const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x))

interface State {
  suites: ShellSuites
  plans: PlansFile
  frame: ComposerInput['frame']
}

function findSuite(state: State, id: string): Suite | undefined {
  return state.suites.suites.find((s) => s.id === id)
}

function findAppAndSuite(
  state: State,
  appId: string,
): { suite: Suite; app: App; idx: number } | null {
  for (const s of state.suites.suites) {
    const idx = (s.apps || []).findIndex((a) => a.id === appId)
    if (idx >= 0) return { suite: s, app: s.apps[idx], idx }
  }
  return null
}

function findNodeAnywhere(state: State, id: string): NavNode | null {
  const s = findSuite(state, id)
  if (s) return s
  return findAppAndSuite(state, id)?.app ?? null
}

function rewritePlanRefs(state: State, fromId: string, toId: string): void {
  for (const plan of state.plans.plans) {
    if (!plan.ownedSuites) continue
    const seen = new Set<string>()
    plan.ownedSuites = plan.ownedSuites
      .map((s) => (s === fromId ? toId : s))
      .filter((s) => {
        if (seen.has(s)) return false
        seen.add(s)
        return true
      })
  }
}

const defaultVisibility = (): Visibility => ({
  personas: ['full', 'partial', 'manager', 'ee'],
  scopeForPartial: [],
  productGate: null,
  permissionGate: null,
  conditions: [],
  whenUnowned: null,
})

function applyOp(state: State, op: Op, ctx: { proposalId: string }): void {
  const note = (extra: Partial<ProposalNote> = {}): ProposalNote => ({
    proposalId: ctx.proposalId,
    op: op.op,
    ...extra,
  })

  switch (op.op) {
    case 'renameSuite': {
      const suite = findSuite(state, op.id)
      if (!suite) throw new Error(`renameSuite: suite "${op.id}" not found`)
      const oldId = suite.id
      if (op.newId) suite.id = op.newId
      if (op.newLabel) suite.label = op.newLabel
      if (op.newIcon) suite.icon = op.newIcon
      if (op.newId && op.newId !== oldId) {
        for (const app of suite.apps || []) {
          if (app.parent === oldId) app.parent = suite.id
        }
        rewritePlanRefs(state, oldId, suite.id)
      }
      suite._proposalNotes = [...(suite._proposalNotes || []), note()]
      return
    }

    case 'mergeSuite': {
      const from = findSuite(state, op.from)
      const into = findSuite(state, op.into)
      if (!from) throw new Error(`mergeSuite: source "${op.from}" not found`)
      if (!into) throw new Error(`mergeSuite: target "${op.into}" not found`)
      into.apps = into.apps || []
      for (const app of from.apps || []) {
        app.parent = into.id
        app._proposalNotes = [...(app._proposalNotes || []), note({ originSuite: from.id })]
        into.apps.push(app)
      }
      state.suites.suites = state.suites.suites.filter((s) => s.id !== from.id)
      rewritePlanRefs(state, from.id, into.id)
      into._proposalNotes = [...(into._proposalNotes || []), note({ mergedFrom: from.id })]
      return
    }

    case 'addSuite': {
      if (findSuite(state, op.id)) throw new Error(`addSuite: "${op.id}" already exists`)
      const suite: Suite = {
        id: op.id,
        label: op.label,
        icon: op.icon,
        path: op.path ?? null,
        parent: null,
        visibility: op.visibility ?? defaultVisibility(),
        personaVariants: {},
        apps: [],
        source: op.source ?? `proposal:${ctx.proposalId}`,
        _proposalNotes: [note()],
      }
      const list = state.suites.suites
      let insertAt = list.length
      if (op.afterSuite) {
        const i = list.findIndex((s) => s.id === op.afterSuite)
        if (i >= 0) insertAt = i + 1
      }
      list.splice(insertAt, 0, suite)
      return
    }

    case 'removeSuite': {
      state.suites.suites = state.suites.suites.filter((s) => s.id !== op.id)
      for (const plan of state.plans.plans) {
        plan.ownedSuites = (plan.ownedSuites || []).filter((s) => s !== op.id)
      }
      return
    }

    case 'addApp': {
      const suite = findSuite(state, op.suiteId)
      if (!suite) throw new Error(`addApp: suite "${op.suiteId}" not found`)
      if (findAppAndSuite(state, op.id)) throw new Error(`addApp: "${op.id}" already exists`)
      const app: App = {
        id: op.id,
        label: op.label,
        icon: op.icon,
        path: op.path ?? null,
        parent: suite.id,
        visibility: op.visibility,
        personaVariants: op.personaVariants ?? {},
        source: op.source ?? `proposal:${ctx.proposalId}`,
        _proposalNotes: [note()],
        ...(op.logicalId ? { logicalId: op.logicalId } : {}),
      }
      suite.apps = suite.apps || []
      let insertAt = suite.apps.length
      if (op.afterApp) {
        const i = suite.apps.findIndex((a) => a.id === op.afterApp)
        if (i >= 0) insertAt = i + 1
      }
      suite.apps.splice(insertAt, 0, app)
      return
    }

    case 'moveApp': {
      const found = findAppAndSuite(state, op.appId)
      if (!found) throw new Error(`moveApp: app "${op.appId}" not found`)
      const target = findSuite(state, op.toSuite)
      if (!target) throw new Error(`moveApp: target "${op.toSuite}" not found`)
      found.suite.apps.splice(found.idx, 1)
      found.app.parent = target.id
      found.app._proposalNotes = [
        ...(found.app._proposalNotes || []),
        note({ originSuite: found.suite.id }),
      ]
      target.apps = target.apps || []
      let insertAt = target.apps.length
      if (op.afterApp) {
        const i = target.apps.findIndex((a) => a.id === op.afterApp)
        if (i >= 0) insertAt = i + 1
      }
      target.apps.splice(insertAt, 0, found.app)
      return
    }

    case 'removeApp': {
      for (const s of state.suites.suites) {
        s.apps = (s.apps || []).filter((a) => a.id !== op.appId)
      }
      return
    }

    case 'overrideNode': {
      const node = findNodeAnywhere(state, op.id)
      if (!node) throw new Error(`overrideNode: node "${op.id}" not found`)
      Object.assign(node, op.patch || {})
      node._proposalNotes = [...(node._proposalNotes || []), note()]
      return
    }

    case 'addPlan': {
      if (state.plans.plans.find((p) => p.id === op.id))
        throw new Error(`addPlan: "${op.id}" already exists`)
      const plan = {
        id: op.id,
        label: op.label,
        description: op.description,
        ownedSuites: op.ownedSuites,
        ...(op.conditions ? { conditions: op.conditions } : {}),
      }
      let insertAt = state.plans.plans.length
      if (op.afterPlan) {
        const i = state.plans.plans.findIndex((p) => p.id === op.afterPlan)
        if (i >= 0) insertAt = i + 1
      }
      state.plans.plans.splice(insertAt, 0, plan)
      return
    }

    case 'overridePlan': {
      const plan = state.plans.plans.find((p) => p.id === op.id)
      if (!plan) throw new Error(`overridePlan: plan "${op.id}" not found`)
      Object.assign(plan, op.patch || {})
      return
    }

    case 'resolveShapeShifter': {
      let removed = 0
      for (const s of state.suites.suites) {
        const before = (s.apps || []).length
        s.apps = (s.apps || []).filter(
          (a) => a.logicalId !== op.logicalId || a.id === op.winningId,
        )
        removed += before - (s.apps?.length || 0)
      }
      if (!removed && !findAppAndSuite(state, op.winningId)) {
        throw new Error(
          `resolveShapeShifter: no nodes matched logicalId "${op.logicalId}"`,
        )
      }
      return
    }

    default: {
      const _exhaustive: never = op
      throw new Error(`Unknown op: ${JSON.stringify(_exhaustive)}`)
    }
  }
}

export function compose(input: ComposerInput): ComposerOutput {
  const state: State = {
    suites: clone(input.suites),
    plans: clone(input.plans),
    frame: clone(input.frame),
  }
  if (!input.proposal?.ops?.length) return state

  for (const op of input.proposal.ops) {
    applyOp(state, op, { proposalId: input.proposal.id || 'unnamed' })
  }
  return state
}

export type { Proposal }
