// Shared types for the catalog, proposals, and composer.
// Used by scripts and (later) the prototype shell.

export type Persona = 'full' | 'partial' | 'manager' | 'ee'

export interface CrossSell {
  showLockedTo: Persona[]
  campaign: string | null
}

export interface Visibility {
  personas: Persona[]
  scopeForPartial: string[]
  productGate: string | null
  permissionGate: string | null
  conditions: string[]
  whenUnowned: CrossSell | null
}

export interface PersonaVariant {
  label?: string
  path?: string
  icon?: string
}

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
  path: string | null
  parent: string | null
  visibility: Visibility
  personaVariants: Partial<Record<Persona, PersonaVariant>>
  source: string
  logicalId?: string
  _proposalNotes?: ProposalNote[]
}

export interface App extends NavNode {}

export interface Suite extends NavNode {
  apps: App[]
}

export interface ShellSuites {
  suites: Suite[]
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
