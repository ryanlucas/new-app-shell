import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Persona } from '@/lib/types.ts'

const STORAGE_KEY = 'app-shell-prototype-hud-v4'
const TOGGLE_KEY = '.' // Cmd+. (Ctrl+. on non-Mac)

export type Lifecycle = 'active' | 'onboarding' | 'pre-contract'
export type Surface = 'direct' | 'logged-in-as' | 'partner' | 'mobile'

/** Lifecycle options → which company-state flags they imply. */
export const LIFECYCLE_OPTIONS: Array<{ id: Lifecycle; label: string; conditions: string[] }> = [
  { id: 'active', label: 'Active', conditions: [] },
  { id: 'onboarding', label: 'Onboarding', conditions: ['hasOnboardingImplementationPlan'] },
  {
    id: 'pre-contract',
    label: 'Pre-contract',
    conditions: ['isContractWaiting', 'isSelfServeCompanyWithoutContractSigned'],
  },
]

/** Surface options → which session/access flags they imply. */
export const SURFACE_OPTIONS: Array<{ id: Surface; label: string; conditions: string[] }> = [
  { id: 'direct', label: 'Direct', conditions: [] },
  { id: 'logged-in-as', label: 'Logged-in-as', conditions: ['isSpoofed', 'isLoggedInAs'] },
  {
    id: 'partner',
    label: 'Partner accessing',
    conditions: ['isPartnerAccessingClient', 'isPartnerDashBoard'],
  },
  { id: 'mobile', label: 'Mobile', conditions: ['isMobile', 'isSmallScreen'] },
]

export interface HudState {
  /** Which personas are active (non-exclusive). */
  personas: Persona[]
  /** Which company plan is active. Drives ownedSuites + plan.conditions. */
  planId: string
  /** Partial-admin scopes the user has; only meaningful when 'partial' ∈ personas. */
  partialScopes: string[]
  /** EE archetypes (function-shaped permission bundles); only meaningful when 'ee' ∈ personas. */
  eeArchetypes: string[]
  /** Where the company sits in its lifecycle. Implies a set of conditions. */
  lifecycle: Lifecycle
  /** How the user is accessing the shell (direct / spoofed / partner / mobile). */
  surface: Surface
  /** Which "backend" the shell is reading from. 'current' = ground truth; otherwise a proposal id. */
  view: 'current' | string
  /** Whether the dev HUD panel is visible. */
  hudVisible: boolean
}

const DEFAULT_STATE: HudState = {
  personas: ['full'],
  planId: 'full',
  partialScopes: [],
  eeArchetypes: [],
  lifecycle: 'active',
  surface: 'direct',
  view: 'current',
  hudVisible: false,
}

function load(): HudState {
  if (typeof window === 'undefined') return DEFAULT_STATE
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_STATE
    return { ...DEFAULT_STATE, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_STATE
  }
}

interface HudContextValue extends HudState {
  /** Conditions implied by current {lifecycle, surface}. The plan's conditions
   *  are folded in separately by buildConditionSet (so plan changes work). */
  derivedConditions: string[]
  setPersonas: (p: Persona[]) => void
  togglePersona: (p: Persona) => void
  setPlanId: (id: string) => void
  setPartialScopes: (s: string[]) => void
  setEeArchetypes: (a: string[]) => void
  toggleEeArchetype: (a: string) => void
  setLifecycle: (l: Lifecycle) => void
  setSurface: (s: Surface) => void
  setView: (v: string) => void
  toggleHud: () => void
  setHudVisible: (v: boolean) => void
}

const HudContext = createContext<HudContextValue | null>(null)

export function HudProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<HudState>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* localStorage may be unavailable; ignore */
    }
  }, [state])

  // Cmd+. (Mac) / Ctrl+. (others) toggles the HUD
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === TOGGLE_KEY && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setState((s) => ({ ...s, hudVisible: !s.hudVisible }))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const value = useMemo<HudContextValue>(() => {
    const lifecycleConditions =
      LIFECYCLE_OPTIONS.find((o) => o.id === state.lifecycle)?.conditions ?? []
    const surfaceConditions = SURFACE_OPTIONS.find((o) => o.id === state.surface)?.conditions ?? []
    const derivedConditions = [...lifecycleConditions, ...surfaceConditions]

    return {
      ...state,
      derivedConditions,
      setPersonas: (personas) => setState((s) => ({ ...s, personas })),
      togglePersona: (p) =>
        setState((s) => ({
          ...s,
          personas: s.personas.includes(p) ? s.personas.filter((x) => x !== p) : [...s.personas, p],
        })),
      setPlanId: (planId) => setState((s) => ({ ...s, planId })),
      setPartialScopes: (partialScopes) => setState((s) => ({ ...s, partialScopes })),
      setEeArchetypes: (eeArchetypes) => setState((s) => ({ ...s, eeArchetypes })),
      toggleEeArchetype: (a) =>
        setState((s) => ({
          ...s,
          eeArchetypes: s.eeArchetypes.includes(a)
            ? s.eeArchetypes.filter((x) => x !== a)
            : [...s.eeArchetypes, a],
        })),
      setLifecycle: (lifecycle) => setState((s) => ({ ...s, lifecycle })),
      setSurface: (surface) => setState((s) => ({ ...s, surface })),
      setView: (view) => setState((s) => ({ ...s, view })),
      toggleHud: () => setState((s) => ({ ...s, hudVisible: !s.hudVisible })),
      setHudVisible: (hudVisible) => setState((s) => ({ ...s, hudVisible })),
    }
  }, [state])

  return <HudContext.Provider value={value}>{children}</HudContext.Provider>
}

export function useHud(): HudContextValue {
  const ctx = useContext(HudContext)
  if (!ctx) throw new Error('useHud must be used inside <HudProvider>')
  return ctx
}
