import { http, HttpResponse } from 'msw'
import { compose } from '@/lib/compose.ts'
import type {
  PersonasFile,
  PlansFile,
  Proposal,
  ShellFrame,
  ShellSuites,
  SpokesFile,
} from '@/lib/types.ts'

// ─── load catalog at build time via Vite glob ─────────────────────────────────
import frameJson from '../../data/current/frame.json'
import suitesJson from '../../data/current/suites.json'
import personasJson from '../../data/current/personas.json'
import plansJson from '../../data/current/plans.json'
import spokesJson from '../../data/current/spokes.json'

const frame = frameJson as unknown as ShellFrame
const suites = suitesJson as unknown as ShellSuites
const personas = personasJson as unknown as PersonasFile
const plans = plansJson as unknown as PlansFile
const spokes = spokesJson as unknown as SpokesFile

interface AppL3 {
  appId: string
  appLabel?: string
  appPath?: string | null
  appProductGate?: string | null
  nav?: unknown[]
  _meta?: { generatedBy?: string; uncertainties?: unknown[] }
}

const appFileModules = import.meta.glob<{ default: AppL3 }>(
  '../../data/current/apps/**/*.json',
  { eager: true },
)
const appsByAppId: Record<string, AppL3> = {}
for (const mod of Object.values(appFileModules)) {
  const d = mod.default
  if (d?.appId) appsByAppId[d.appId] = d
}

const proposalFileModules = import.meta.glob<{ default: Proposal }>(
  '../../data/proposals/*.json',
  { eager: true },
)
const proposalsById: Record<string, Proposal> = {}
for (const mod of Object.values(proposalFileModules)) {
  const p = mod.default
  if (p?.id) proposalsById[p.id] = p
}

// ─── handlers ─────────────────────────────────────────────────────────────────
export interface CatalogResponse {
  view: string
  frame: ShellFrame
  suites: ShellSuites
  personas: PersonasFile
  plans: PlansFile
  spokes: SpokesFile
  apps: Record<string, AppL3>
  /** Available views (current + each authored proposal). */
  views: Array<{ id: string; label: string; description?: string }>
}

export const handlers = [
  http.get('/api/catalog', ({ request }) => {
    const url = new URL(request.url)
    const view = url.searchParams.get('view') ?? 'current'

    let outFrame = frame
    let outSuites = suites
    let outPlans = plans

    if (view !== 'current') {
      const proposal = proposalsById[view]
      if (!proposal) return HttpResponse.json({ error: `unknown view "${view}"` }, { status: 404 })
      const composed = compose({ suites, plans, frame, proposal })
      outFrame = composed.frame
      outSuites = composed.suites
      outPlans = composed.plans
    }

    const views: CatalogResponse['views'] = [
      { id: 'current', label: 'Current Rippling', description: 'Today’s nav, ground truth' },
      ...Object.values(proposalsById).map((p) => ({
        id: p.id,
        label: p.label,
        description: p.description,
      })),
    ]

    const payload: CatalogResponse = {
      view,
      frame: outFrame,
      suites: outSuites,
      personas,
      plans: outPlans,
      spokes,
      apps: appsByAppId,
      views,
    }
    return HttpResponse.json(payload)
  }),
]
