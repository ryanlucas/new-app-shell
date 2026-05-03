import { X } from '@phosphor-icons/react'
import { useState } from 'react'
import type { CatalogResponse } from '@/api/nav.ts'
import type { Persona } from '@/lib/types.ts'
import { useHud } from '@/state/HudContext.tsx'
import { cn } from '@/lib/cn.ts'

const PERSONAS: Array<{ id: Persona; label: string }> = [
  { id: 'full', label: 'Full Admin' },
  { id: 'partial', label: 'Partial Admin' },
  { id: 'manager', label: 'Manager' },
  { id: 'ee', label: 'Employee' },
]

const CONDITION_FLAGS = [
  'isPeoClient',
  'isStandaloneCompany',
  'isITTrial',
  'isContractWaiting',
  'timePlatformInstalled',
  'hasOnboardingImplementationPlan',
]

interface Props {
  catalog: CatalogResponse | null
}

export function DevHud({ catalog }: Props) {
  const hud = useHud()
  const [scopeFilter, setScopeFilter] = useState('')

  if (!hud.hudVisible) return null

  const partial = catalog?.personas.personas.find((p) => p.id === 'partial')
  const allScopes = partial?.scopes ?? []
  const filteredScopes = allScopes.filter((s) =>
    s.id.toLowerCase().includes(scopeFilter.toLowerCase()),
  )

  return (
    <div className="fixed bottom-4 right-4 z-40 flex w-96 flex-col gap-3 rounded-lg border border-neutral-300 bg-white p-4 text-sm shadow-2xl">
      <header className="flex items-center justify-between">
        <h2 className="font-semibold">Dev HUD</h2>
        <span className="text-xs text-neutral-400">
          <kbd className="rounded border border-neutral-300 bg-neutral-100 px-1.5">⌘.</kbd> to hide
        </span>
        <button
          type="button"
          onClick={() => hud.setHudVisible(false)}
          className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
        >
          <X size={14} />
        </button>
      </header>

      {/* View / backend */}
      <Section label="View">
        <select
          value={hud.view}
          onChange={(e) => hud.setView(e.target.value)}
          className="w-full rounded border border-neutral-300 bg-white px-2 py-1 text-sm"
        >
          {(catalog?.views ?? [{ id: 'current', label: 'Current Rippling' }]).map((v) => (
            <option key={v.id} value={v.id}>
              {v.label}
            </option>
          ))}
        </select>
      </Section>

      {/* Plan */}
      <Section label="Plan">
        <select
          value={hud.planId}
          onChange={(e) => hud.setPlanId(e.target.value)}
          className="w-full rounded border border-neutral-300 bg-white px-2 py-1 text-sm"
        >
          {(catalog?.plans.plans ?? []).map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
      </Section>

      {/* Personas */}
      <Section label="Personas (combinable)">
        <div className="flex flex-wrap gap-1">
          {PERSONAS.map((p) => {
            const active = hud.personas.includes(p.id)
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => hud.togglePersona(p.id)}
                className={cn(
                  'rounded px-2 py-1 text-xs',
                  active
                    ? 'bg-violet-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200',
                )}
              >
                {p.label}
              </button>
            )
          })}
        </div>
      </Section>

      {/* Partial admin scopes (only when 'partial' is active) */}
      {hud.personas.includes('partial') && allScopes.length > 0 && (
        <Section label={`Partial-admin scopes (${hud.partialScopes.length}/${allScopes.length})`}>
          <input
            type="text"
            placeholder="filter scopes…"
            value={scopeFilter}
            onChange={(e) => setScopeFilter(e.target.value)}
            className="mb-1 w-full rounded border border-neutral-300 px-2 py-1 text-xs"
          />
          <div className="max-h-32 overflow-y-auto rounded border border-neutral-200 bg-neutral-50 p-1">
            {filteredScopes.map((s) => {
              const active = hud.partialScopes.includes(s.id)
              return (
                <label key={s.id} className="flex items-center gap-1.5 px-1 py-0.5 text-xs">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() =>
                      hud.setPartialScopes(
                        active
                          ? hud.partialScopes.filter((x) => x !== s.id)
                          : [...hud.partialScopes, s.id],
                      )
                    }
                  />
                  <span className="font-mono">{s.id}</span>
                </label>
              )
            })}
          </div>
        </Section>
      )}

      {/* Condition flags */}
      <Section label="Company-state conditions">
        <div className="flex flex-wrap gap-1">
          {CONDITION_FLAGS.map((c) => {
            const active = hud.conditions.includes(c)
            return (
              <button
                key={c}
                type="button"
                onClick={() => hud.toggleCondition(c)}
                className={cn(
                  'rounded border px-2 py-0.5 font-mono text-[11px]',
                  active
                    ? 'border-violet-600 bg-violet-100 text-violet-700'
                    : 'border-neutral-200 bg-neutral-50 text-neutral-500',
                )}
              >
                {c}
              </button>
            )
          })}
        </div>
      </Section>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-neutral-500">
        {label}
      </div>
      {children}
    </div>
  )
}
