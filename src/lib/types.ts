// Catalog data model. Used by the composer, the MSW mock backend, and the
// shell. Designed to be cleanly serializable as JSON in data/current/.
//
// Key idea: `NavNode` is the universal shape for every nav-able thing
// (suite, app, sidebar item, top-bar widget, user-menu entry). Suites add
// `apps[]` plus suite-level grouping/description. Visibility resolution
// (persona/plan/condition) is in `lib/visibility.ts`.

/** The four user roles modeled. Combinable; not mutually exclusive. */
export type Persona = 'full' | 'partial' | 'manager' | 'ee'

/** Cross-sell metadata: who should see a locked tile when this product
 *  isn't owned, and which campaign id to attribute it to. */
export interface CrossSell {
  showLockedTo: Persona[]
  campaign: string | null
}

/**
 * Visibility gate. All fields are optional — omit when unset (don't write
 * empty arrays / null placeholders to JSON). The resolver treats:
 *   - missing personas → not visible (must be set explicitly)
 *   - missing scopeForPartial → no extra gate when persona='partial'
 *   - missing productGate → fall back to suite ownership
 *   - missing permissionGate → no extra gate (informational only today)
 *   - missing conditions → always satisfied
 *   - missing whenUnowned → hide when product not owned
 */
export interface Visibility {
  personas?: Persona[]
  scopeForPartial?: string[]
  productGate?: string | null
  permissionGate?: string | null
  conditions?: string[]
  whenUnowned?: CrossSell | null
}

/** Per-persona overrides for label / path / icon (rare). */
export interface PersonaVariant {
  label?: string
  path?: string
  icon?: string
}

/** Provenance breadcrumb left by the composer when a proposal touches a node. */
export interface ProposalNote {
  proposalId: string
  op: string
  originSuite?: string
  mergedFrom?: string
}

export interface NavNode {
  id: string
  label: string
  icon: string
  /** Route. `null` means the node is a parent/grouping that doesn't navigate. */
  path?: string | null
  /** Suite id for apps; null/undefined for suite roots. */
  parent?: string | null
  visibility?: Visibility
  /** Per-persona label/path/icon overrides. Omit when empty. */
  personaVariants?: Partial<Record<Persona, PersonaVariant>>
  /** Where this came from in the source codebases — debug breadcrumb only. */
  source?: string
  /** Same logical feature appears under multiple ids; resolver picks one. */
  logicalId?: string
  /**
   * Discrete product (lives in one place) vs horizontal capability consumed
   * across the platform. Defaults to product.
   */
  kind?: 'product' | 'capability'
  /**
   * For capabilities: additional suite ids the node surfaces in. Renderers
   * cross-list with a "linked from {primary}" annotation pointing back to
   * the suite specified by `parent`.
   */
  appearsIn?: string[]
  /**
   * Mirrors `invisible: true` / `showInLeftNav: false` on backend app
   * definitions. Route is real and reachable, but the node should not
   * auto-render in default sidebar listings. Renderers may still surface
   * it via search / cross-sell / deep-link.
   */
  hiddenInSidenav?: boolean
  /**
   * Editorial grouping. On suites: which top-level group (people, finance,
   * tech, …) — see `ShellSuites.groups`. On apps: which sub-group within
   * the parent suite — see `Suite.appGroups`.
   */
  group?: string
  /** Composer-set on proposal output. Not present in canonical `current`. */
  _proposalNotes?: ProposalNote[]
}

export interface App extends NavNode {}

export interface Suite extends NavNode {
  apps: App[]
  /** Short tagline. */
  description?: string
  /**
   * Editorial sub-groups for L2 apps within this suite. Apps reference one
   * via `App.group`. Optional — many suites are flat. Used by IT to bucket
   * apps into Identity & Access / Device Management / Logistics / Security.
   */
  appGroups?: SuiteGroupDef[]
}

export interface SuiteGroupDef {
  id: string
  label: string
  order: number
  /** Phosphor icon name. Optional; renderers fall back to the parent's icon. */
  icon?: string
  /** Short tagline shown alongside the group, like a suite description. */
  description?: string
}

export interface ShellSuites {
  suites: Suite[]
  /** Ordered list of editorial groups suites can belong to. */
  groups?: SuiteGroupDef[]
  _meta?: Record<string, unknown>
}

export interface ShellFrame {
  sidebar: {
    firstSection: NavNode[]
    thirdSection: NavNode[]
  }
  topBar: NavNode[]
  userMenu: NavNode[]
  appLauncher: NavNode[]
  _meta?: Record<string, unknown>
}

export interface Plan {
  id: string
  label: string
  description: string
  ownedSuites: string[]
  /** Company-state flags implied by being on this plan (e.g. "isPeoClient", "isStandaloneCompany").
   *  The renderer ORs these into HUD-set conditions when this plan is active. */
  conditions?: string[]
}

export interface PlansFile {
  plans: Plan[]
  _meta?: Record<string, unknown>
}

export interface PersonaScope {
  id: string
  label: string
  source: string
}

export interface PersonaDef {
  id: Persona
  label: string
  description: string
  source: string
  scopes?: PersonaScope[]
}

export interface PersonasFile {
  personas: PersonaDef[]
  _meta?: Record<string, unknown>
}

export interface Spoke {
  handle: string
  label: string
  category: string | null
  sidenavCategory: string | null
  crossSellCategory: string | null
  source: string
}

export interface SpokesFile {
  spokes: Spoke[]
  _meta?: Record<string, unknown>
}

// ─── Proposal operations ──────────────────────────────────────────────────────

export type Op =
  | { op: 'renameSuite'; id: string; newId?: string; newLabel?: string; newIcon?: string }
  | { op: 'mergeSuite'; from: string; into: string }
  | {
      op: 'addSuite'
      id: string
      label: string
      icon: string
      path?: string | null
      visibility?: Visibility
      afterSuite?: string
      source?: string
    }
  | { op: 'removeSuite'; id: string }
  | {
      op: 'addApp'
      suiteId: string
      id: string
      label: string
      icon: string
      path?: string | null
      visibility: Visibility
      personaVariants?: Partial<Record<Persona, PersonaVariant>>
      logicalId?: string
      afterApp?: string
      source?: string
    }
  | { op: 'moveApp'; appId: string; toSuite: string; afterApp?: string }
  | { op: 'removeApp'; appId: string }
  | { op: 'overrideNode'; id: string; patch: Partial<NavNode> }
  | { op: 'resolveShapeShifter'; logicalId: string; winningId: string }
  | {
      op: 'addPlan'
      id: string
      label: string
      description: string
      ownedSuites: string[]
      conditions?: string[]
      afterPlan?: string
    }
  | { op: 'overridePlan'; id: string; patch: Partial<Plan> }

export interface Proposal {
  id: string
  label: string
  description?: string
  ops: Op[]
  _notes?: string[]
}

// ─── Composer state ───────────────────────────────────────────────────────────

export interface ComposerInput {
  suites: ShellSuites
  plans: PlansFile
  frame: ShellFrame
  proposal?: Proposal | null
}

export interface ComposerOutput {
  suites: ShellSuites
  plans: PlansFile
  frame: ShellFrame
}
