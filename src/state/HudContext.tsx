import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Persona } from '@/lib/types.ts'

const STORAGE_KEY = 'app-shell-prototype-hud'
const TOGGLE_KEY = '.' // Cmd+. (Ctrl+. on non-Mac)

export interface HudState {
  /** Which personas are active (non-exclusive). */
  personas: Persona[]
  /** Which company plan is active. Drives ownedSuites + plan.conditions. */
  planId: string
  /** Partial-admin scopes the user has; only meaningful when 'partial' ∈ personas. */
  partialScopes: string[]
  /** Free-form company-state flags toggled in the HUD (PEO, standalone, etc.). */
  conditions: string[]
  /** Which "backend" the shell is reading from. 'current' = ground truth; otherwise a proposal id. */
  view: 'current' | string
  /** Whether the dev HUD panel is visible. */
  hudVisible: boolean
}

const DEFAULT_STATE: HudState = {
  personas: ['full'],
  planId: 'full',
  partialScopes: [],
  conditions: [],
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
  setPersonas: (p: Persona[]) => void
  togglePersona: (p: Persona) => void
  setPlanId: (id: string) => void
  setPartialScopes: (s: string[]) => void
  toggleCondition: (c: string) => void
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

  const value = useMemo<HudContextValue>(
    () => ({
      ...state,
      setPersonas: (personas) => setState((s) => ({ ...s, personas })),
      togglePersona: (p) =>
        setState((s) => ({
          ...s,
          personas: s.personas.includes(p) ? s.personas.filter((x) => x !== p) : [...s.personas, p],
        })),
      setPlanId: (planId) => setState((s) => ({ ...s, planId })),
      setPartialScopes: (partialScopes) => setState((s) => ({ ...s, partialScopes })),
      toggleCondition: (c) =>
        setState((s) => ({
          ...s,
          conditions: s.conditions.includes(c)
            ? s.conditions.filter((x) => x !== c)
            : [...s.conditions, c],
        })),
      setView: (view) => setState((s) => ({ ...s, view })),
      toggleHud: () => setState((s) => ({ ...s, hudVisible: !s.hudVisible })),
      setHudVisible: (hudVisible) => setState((s) => ({ ...s, hudVisible })),
    }),
    [state],
  )

  return <HudContext.Provider value={value}>{children}</HudContext.Provider>
}

export function useHud(): HudContextValue {
  const ctx = useContext(HudContext)
  if (!ctx) throw new Error('useHud must be used inside <HudProvider>')
  return ctx
}
