import { CaretDown, CaretRight, X } from '@phosphor-icons/react'
import { useMemo, useState } from 'react'
import type { CatalogResponse } from '@/api/nav.ts'
import type { Persona } from '@/lib/types.ts'
import {
  LIFECYCLE_OPTIONS,
  SURFACE_OPTIONS,
  useHud,
  type Lifecycle,
  type Surface,
} from '@/state/HudContext.tsx'
import { cn } from '@/lib/cn.ts'

const PERSONAS: Array<{ id: Persona; label: string }> = [
  { id: 'full', label: 'Full Admin' },
  { id: 'partial', label: 'Partial Admin' },
  { id: 'manager', label: 'Manager' },
  { id: 'ee', label: 'Employee' },
]

interface Props {
  catalog: CatalogResponse | null
}

export function DevHud({ catalog }: Props) {
  const hud = useHud()
  const [scopeFilter, setScopeFilter] = useState('')
  const [flagsOpen, setFlagsOpen] = useState(false)

  // All flags currently active, with the source they came from. Read-only —
  // toggle them by changing plan / lifecycle / surface above.
  const flagSources = useMemo(() => {
    const out: Array<{ flag: string; source: string }> = []
    const plan = catalog?.plans.plans.find((p) => p.id === hud.planId)
    for (const c of plan?.conditions ?? []) {
      out.push({ flag: c, source: `plan: ${plan?.label ?? hud.planId}` })
    }
    const lc = LIFECYCLE_OPTIONS.find((o) => o.id === hud.lifecycle)
    for (const c of lc?.conditions ?? []) {
      out.push({ flag: c, source: `lifecycle: ${lc?.label}` })
    }
    const sf = SURFACE_OPTIONS.find((o) => o.id === hud.surface)
    for (const c of sf?.conditions ?? []) {
      out.push({ flag: c, source: `surface: ${sf?.label}` })
    }
    return out
  }, [catalog, hud.planId, hud.lifecycle, hud.surface])

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

      {/* EE archetypes (only when 'ee' is active) — function-shaped permission
          bundles that gate apps an IC could plausibly access (e.g. recruiter
          → Recruiting + Reports). Mirrors the partial-scopes panel below. */}
      {hud.personas.includes('ee') && (catalog?.personas.eeArchetypes?.length ?? 0) > 0 && (
        <Section
          label={`EE archetypes (${hud.eeArchetypes.length}/${catalog?.personas.eeArchetypes?.length ?? 0})`}
        >
          <div className="flex flex-wrap gap-1">
            {(catalog?.personas.eeArchetypes ?? []).map((a) => {
              const active = hud.eeArchetypes.includes(a.id)
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => hud.toggleEeArchetype(a.id)}
                  title={a.description}
                  className={cn(
                    'rounded px-2 py-1 text-xs',
                    active
                      ? 'bg-violet-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200',
                  )}
                >
                  {a.label}
                </button>
              )
            })}
          </div>
        </Section>
      )}

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

      {/* Lifecycle */}
      <Section label="Lifecycle">
        <RadioGroup
          value={hud.lifecycle}
          options={LIFECYCLE_OPTIONS}
          onChange={(v) => hud.setLifecycle(v as Lifecycle)}
        />
      </Section>

      {/* Surface */}
      <Section label="Surface">
        <RadioGroup
          value={hud.surface}
          options={SURFACE_OPTIONS}
          onChange={(v) => hud.setSurface(v as Surface)}
        />
      </Section>

      {/* Read-only active flags (derived from plan + lifecycle + surface) */}
      <div>
        <button
          type="button"
          onClick={() => setFlagsOpen((v) => !v)}
          className="flex w-full items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-neutral-500 hover:text-neutral-700"
        >
          {flagsOpen ? <CaretDown size={11} /> : <CaretRight size={11} />}
          Active flags ({flagSources.length})
        </button>
        {flagsOpen && (
          <div className="mt-1 rounded border border-neutral-200 bg-neutral-50 p-1.5">
            {flagSources.length === 0 ? (
              <div className="px-1 py-0.5 text-[11px] text-neutral-400">
                No flags active. Change plan / lifecycle / surface above to see implications.
              </div>
            ) : (
              <ul className="flex flex-col gap-0.5">
                {flagSources.map(({ flag, source }) => (
                  <li
                    key={flag + source}
                    className="flex items-center justify-between px-1 py-0.5 text-[10px]"
                  >
                    <span className="font-mono text-violet-700">{flag}</span>
                    <span className="text-neutral-400">{source}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function RadioGroup<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T
  options: Array<{ id: T; label: string }>
  onChange: (v: T) => void
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map((opt) => {
        const active = value === opt.id
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={cn(
              'rounded px-2 py-1 text-xs',
              active
                ? 'bg-violet-600 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200',
            )}
          >
            {opt.label}
          </button>
        )
      })}
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
