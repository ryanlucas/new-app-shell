import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Lock } from '@phosphor-icons/react'
import type { CatalogResponse } from '@/api/nav.ts'
import type { App, Suite, SuiteGroupDef } from '@/lib/types.ts'
import { Icon } from '@/lib/icon.tsx'
import { resolve, buildConditionSet, type ResolveContext } from '@/lib/visibility.ts'
import { cn } from '@/lib/cn.ts'
import { useHud } from '@/state/HudContext.tsx'

const FALLBACK_GROUP: SuiteGroupDef = { id: 'other', label: 'Other', order: 99 }

type Selection = { kind: 'suite' | 'app'; id: string; label: string }

interface Props {
  catalog: CatalogResponse
  query: string
  onSelect: (node: Selection) => void
}

export function MegaMenu({ catalog, query, onSelect }: Props) {
  const hud = useHud()
  const activePlan = catalog.plans.plans.find((p) => p.id === hud.planId)
  const ownedSuites = useMemo(
    () => new Set(activePlan?.ownedSuites ?? []),
    [activePlan],
  )

  const ctx: ResolveContext = useMemo(
    () => ({
      personas: new Set(hud.personas),
      partialScopes: new Set(hud.partialScopes),
      ownedSuites,
      conditions: buildConditionSet(hud.derivedConditions, catalog.plans, hud.planId),
    }),
    [hud.personas, hud.partialScopes, ownedSuites, hud.derivedConditions, catalog.plans, hud.planId],
  )

  const q = query.trim().toLowerCase()

  if (q) {
    return <SearchResults catalog={catalog} ctx={ctx} ownedSuites={ownedSuites} q={q} onSelect={onSelect} />
  }

  return <BrowseTwoPane catalog={catalog} ctx={ctx} ownedSuites={ownedSuites} onSelect={onSelect} />
}

function BrowseTwoPane({
  catalog,
  ctx,
  ownedSuites,
  onSelect,
}: {
  catalog: CatalogResponse
  ctx: ResolveContext
  ownedSuites: Set<string>
  onSelect: (node: Selection) => void
}) {
  // Group suites editorially using the catalog's `groups` definitions.
  // Each suite carries `group` (id) and `description` from the backend.
  const groupedSuites = useMemo(() => {
    const definedGroups = catalog.suites.groups ?? []
    const orderedGroups: SuiteGroupDef[] = [...definedGroups].sort((a, b) => a.order - b.order)

    const byGroup = new Map<string, Suite[]>()
    for (const s of catalog.suites.suites) {
      const g = s.group ?? FALLBACK_GROUP.id
      const arr = byGroup.get(g) ?? []
      arr.push(s)
      byGroup.set(g, arr)
    }
    // Within each group: owned first, then explore.
    for (const [, arr] of byGroup) {
      arr.sort((a, b) => {
        const aOwned = ownedSuites.has(a.id) ? 0 : 1
        const bOwned = ownedSuites.has(b.id) ? 0 : 1
        return aOwned - bOwned
      })
    }

    // Walk known groups first, then surface any leftover groups (in case a
    // proposal introduces a suite with an unknown group id).
    const seen = new Set<string>()
    const out: { group: SuiteGroupDef; suites: Suite[] }[] = []
    for (const g of orderedGroups) {
      const arr = byGroup.get(g.id) ?? []
      if (arr.length === 0) continue
      out.push({ group: g, suites: arr })
      seen.add(g.id)
    }
    for (const [gid, arr] of byGroup) {
      if (seen.has(gid)) continue
      out.push({ group: { id: gid, label: gid, order: 99 }, suites: arr })
    }
    return out
  }, [catalog.suites.suites, catalog.suites.groups, ownedSuites])

  const allSuitesFlat = useMemo(
    () => groupedSuites.flatMap((g) => g.suites),
    [groupedSuites],
  )
  const owned = useMemo(
    () => allSuitesFlat.filter((s) => ownedSuites.has(s.id)),
    [allSuitesFlat, ownedSuites],
  )
  const explore = useMemo(
    () => allSuitesFlat.filter((s) => !ownedSuites.has(s.id)),
    [allSuitesFlat, ownedSuites],
  )

  const [activeId, setActiveId] = useState<string>(() => owned[0]?.id ?? explore[0]?.id ?? '')
  // When the active suite has appGroups, optionally focus a single group
  // (filter the right-pane apps). null = show all groups.
  const [activeAppGroup, setActiveAppGroup] = useState<string | null>(null)

  // Keep activeId valid when plan switches.
  useEffect(() => {
    const all = [...owned, ...explore]
    if (!all.some((s) => s.id === activeId)) {
      setActiveId(all[0]?.id ?? '')
    }
  }, [owned, explore, activeId])

  // Reset app-group focus when switching suites.
  useEffect(() => {
    setActiveAppGroup(null)
  }, [activeId])

  // ── Safe-triangle hover intent ──────────────────────────────────────────
  // When the user moves their cursor diagonally from a left-pane item toward
  // the right pane, we don't want intermediate left items to flicker as
  // active. Defer the switch ~60ms; cancel if they reach the right pane.
  const intentRef = useRef<{ timer: ReturnType<typeof setTimeout> | null; pendingId: string | null }>({
    timer: null,
    pendingId: null,
  })
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const rightPanelRef = useRef<HTMLDivElement>(null)

  const handleSuiteHover = useCallback(
    (suiteId: string) => {
      if (suiteId === activeId) {
        if (intentRef.current.timer) clearTimeout(intentRef.current.timer)
        intentRef.current.pendingId = null
        return
      }
      const panel = rightPanelRef.current
      if (!panel) {
        setActiveId(suiteId)
        return
      }
      const panelRect = panel.getBoundingClientRect()
      const mouse = lastMousePos.current
      const movingRight = mouse.x > 0 && mouse.x < panelRect.left
      if (movingRight) {
        if (intentRef.current.timer) clearTimeout(intentRef.current.timer)
        intentRef.current.pendingId = suiteId
        intentRef.current.timer = setTimeout(() => {
          setActiveId(suiteId)
          intentRef.current.pendingId = null
        }, 60)
      } else {
        if (intentRef.current.timer) clearTimeout(intentRef.current.timer)
        intentRef.current.pendingId = null
        setActiveId(suiteId)
      }
    },
    [activeId],
  )

  const handleRightEnter = useCallback(() => {
    if (intentRef.current.pendingId) {
      if (intentRef.current.timer) clearTimeout(intentRef.current.timer)
      intentRef.current.pendingId = null
    }
  }, [])

  const activeSuite =
    catalog.suites.suites.find((s) => s.id === activeId) ?? owned[0] ?? explore[0]
  const activeOwned = activeSuite ? ownedSuites.has(activeSuite.id) : false

  // Apps shown in the active suite's right pane:
  //   - Direct apps (parent suite is activeSuite)
  //   - Capabilities cross-listed via `appearsIn` from other suites
  // Cross-listed entries carry `linkedFrom` so the UI can annotate them.
  type ShownApp = { app: App; linkedFrom?: Suite }
  const visibleApps = useMemo<ShownApp[]>(() => {
    if (!activeSuite) return []
    const direct: ShownApp[] = (
      !activeOwned
        ? activeSuite.apps
        : activeSuite.apps.filter(
            (a) => resolve(a, { ...ctx, suiteId: activeSuite.id }) === 'visible',
          )
    ).map((app) => ({ app }))

    const linked: ShownApp[] = []
    for (const otherSuite of catalog.suites.suites) {
      if (otherSuite.id === activeSuite.id) continue
      for (const app of otherSuite.apps) {
        if (!app.appearsIn?.includes(activeSuite.id)) continue
        // Resolve against the active (linked-into) suite so persona/condition
        // gating still applies. We deliberately use the active suite as
        // suiteId so suite-ownership fallback uses the consumer's plan.
        if (activeOwned && resolve(app, { ...ctx, suiteId: activeSuite.id }) !== 'visible') continue
        linked.push({ app, linkedFrom: otherSuite })
      }
    }
    return [...direct, ...linked]
  }, [activeSuite, activeOwned, ctx, catalog.suites.suites])

  return (
    <div
      className="flex"
      onMouseMove={(e) => {
        lastMousePos.current = { x: e.clientX, y: e.clientY }
      }}
    >
      <div className="flex w-[300px] flex-col py-2">
        {groupedSuites.map((g, gi) => (
          <div key={g.group.id} className={gi > 0 ? 'mt-2' : undefined}>
            <div className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
              {g.group.label}
            </div>
            {g.suites.map((s) => (
              <SuiteRow
                key={s.id}
                suite={s}
                active={s.id === activeId}
                locked={!ownedSuites.has(s.id)}
                onHover={() => {
                  handleSuiteHover(s.id)
                  setActiveAppGroup(null)
                }}
                onClick={() =>
                  ownedSuites.has(s.id)
                    ? onSelect({ kind: 'suite', id: s.id, label: s.label })
                    : setActiveId(s.id)
                }
              />
            ))}
          </div>
        ))}
      </div>
      <div className="w-px self-stretch bg-neutral-200" />

      <div ref={rightPanelRef} onMouseEnter={handleRightEnter} className="flex w-[280px] flex-col py-3">
        {activeSuite && (
          <>
            <div className="max-h-[440px] overflow-y-auto">
              {visibleApps.length === 0 ? (
                <div className="px-3 py-4 text-xs text-neutral-400">
                  No apps available in this suite.
                </div>
              ) : (
                renderAppList(
                  activeAppGroup
                    ? visibleApps.filter((e) => e.app.group === activeAppGroup)
                    : visibleApps,
                  activeSuite,
                  activeOwned,
                  onSelect,
                  activeAppGroup,
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/**
 * If the active suite defines `appGroups`, render the apps bucketed under
 * those group headers (skip empty groups). Otherwise render flat.
 */
function renderAppList(
  apps: { app: App; linkedFrom?: Suite }[],
  suite: Suite,
  owned: boolean,
  onSelect: (n: { kind: 'app' | 'suite'; id: string; label: string }) => void,
  filterToGroup?: string | null,
) {
  const groups = suite.appGroups
  if (filterToGroup) {
    // When user has hovered a specific group, render flat (no sub-headers).
    return apps.map((entry) => (
      <AppRow key={`${entry.linkedFrom?.id ?? 'self'}-${entry.app.id}`} entry={entry} owned={owned} onSelect={onSelect} />
    ))
  }
  if (!groups?.length) {
    return apps.map((entry) => (
      <AppRow key={`${entry.linkedFrom?.id ?? 'self'}-${entry.app.id}`} entry={entry} owned={owned} onSelect={onSelect} />
    ))
  }
  const ordered = [...groups].sort((a, b) => a.order - b.order)
  const byGroup = new Map<string, { app: App; linkedFrom?: Suite }[]>()
  const ungrouped: { app: App; linkedFrom?: Suite }[] = []
  for (const e of apps) {
    const g = e.app.group
    if (g && groups.some((x) => x.id === g)) {
      const arr = byGroup.get(g) ?? []
      arr.push(e)
      byGroup.set(g, arr)
    } else {
      ungrouped.push(e)
    }
  }
  return (
    <>
      {ordered.map((g) => {
        const list = byGroup.get(g.id) ?? []
        if (list.length === 0) return null
        return (
          <div key={g.id} className="mt-2 first:mt-0">
            <div className="px-3 pb-0.5 pt-1.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
              {g.label}
            </div>
            {list.map((entry) => (
              <AppRow key={`${entry.linkedFrom?.id ?? 'self'}-${entry.app.id}`} entry={entry} owned={owned} onSelect={onSelect} />
            ))}
          </div>
        )
      })}
      {ungrouped.length > 0 && (
        <div className="mt-2">
          {ungrouped.map((entry) => (
            <AppRow key={`${entry.linkedFrom?.id ?? 'self'}-${entry.app.id}`} entry={entry} owned={owned} onSelect={onSelect} />
          ))}
        </div>
      )}
    </>
  )
}

function AppRow({
  entry,
  owned,
  onSelect,
}: {
  entry: { app: App; linkedFrom?: Suite }
  owned: boolean
  onSelect: (n: { kind: 'app' | 'suite'; id: string; label: string }) => void
}) {
  const { app, linkedFrom } = entry
  return (
    <button
      type="button"
      onClick={() => (owned ? onSelect({ kind: 'app', id: app.id, label: app.label }) : undefined)}
      disabled={!owned}
      title={linkedFrom ? `Linked from ${linkedFrom.label}` : undefined}
      className={cn(
        'flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px]',
        owned
          ? 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
          : 'cursor-default text-neutral-400',
      )}
    >
      <Icon name={app.icon} size={14} className={owned ? 'text-neutral-500' : 'text-neutral-300'} />
      <span className="flex-1 truncate">{app.label}</span>
      {linkedFrom && (
        <span className="text-[10px] text-neutral-400">{linkedFrom.label}</span>
      )}
      {!owned && <Lock size={11} className="text-neutral-300" />}
    </button>
  )
}


function SearchResults({
  catalog,
  ctx,
  ownedSuites,
  q,
  onSelect,
}: {
  catalog: CatalogResponse
  ctx: ResolveContext
  ownedSuites: Set<string>
  q: string
  onSelect: (node: Selection) => void
}) {
  const matches = (label: string) => label.toLowerCase().includes(q)

  type Hit =
    | { kind: 'suite'; suite: Suite; owned: boolean }
    | { kind: 'app'; app: App; suite: Suite; owned: boolean; visible: boolean }

  const hits: Hit[] = []
  for (const suite of catalog.suites.suites) {
    const owned = ownedSuites.has(suite.id)
    if (matches(suite.label)) hits.push({ kind: 'suite', suite, owned })
    for (const app of suite.apps) {
      if (!matches(app.label)) continue
      const visible = resolve(app, { ...ctx, suiteId: suite.id }) === 'visible'
      hits.push({ kind: 'app', app, suite, owned, visible })
    }
  }

  if (hits.length === 0) {
    return (
      <div className="w-[520px] px-6 py-12 text-center text-sm text-neutral-500">
        No apps or suites match "{q}".
      </div>
    )
  }

  return (
    <ul className="max-h-[60vh] w-[520px] overflow-y-auto py-1.5">
      {hits.slice(0, 50).map((hit, i) => {
        if (hit.kind === 'suite') {
          return (
            <li key={`s-${hit.suite.id}-${i}`}>
              <button
                type="button"
                onClick={() => onSelect({ kind: 'suite', id: hit.suite.id, label: hit.suite.label })}
                className={cn(
                  'flex w-full items-center gap-2.5 px-4 py-1.5 text-left text-[13px]',
                  hit.owned ? 'hover:bg-neutral-100' : 'opacity-70 hover:bg-neutral-50',
                )}
              >
                <Icon name={hit.suite.icon} size={14} className="text-neutral-500" />
                <span className="flex-1 font-medium text-neutral-900">{hit.suite.label}</span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400">
                  {hit.owned ? 'Suite' : 'Suite · Explore'}
                </span>
              </button>
            </li>
          )
        }
        const dim = !hit.owned || !hit.visible
        return (
          <li key={`a-${hit.app.id}-${i}`}>
            <button
              type="button"
              onClick={() =>
                hit.owned && hit.visible
                  ? onSelect({ kind: 'app', id: hit.app.id, label: hit.app.label })
                  : undefined
              }
              disabled={dim}
              className={cn(
                'flex w-full items-center gap-2.5 px-4 py-1.5 text-left text-[13px]',
                dim ? 'cursor-default opacity-50' : 'hover:bg-neutral-100',
              )}
            >
              <Icon name={hit.app.icon} size={13} className="text-neutral-400" />
              <span className="flex-1 truncate text-neutral-800">{hit.app.label}</span>
              <span className="text-[10px] text-neutral-400">{hit.suite.label}</span>
              {!hit.owned && <Lock size={11} className="text-neutral-300" />}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

function SuiteRow({
  suite,
  active,
  locked,
  onHover,
  onClick,
}: {
  suite: Suite
  active: boolean
  locked?: boolean
  onHover: () => void
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onMouseEnter={onHover}
      onClick={onClick}
      className={cn(
        'flex w-full items-start gap-2.5 px-4 py-1.5 text-left',
        active
          ? 'bg-neutral-100'
          : 'hover:bg-neutral-50',
      )}
    >
      <Icon
        name={suite.icon}
        size={15}
        className={cn(
          'mt-0.5 shrink-0',
          locked ? 'text-neutral-400' : 'text-neutral-600',
        )}
      />
      <div className="min-w-0 flex-1">
        <div
          className={cn(
            'flex items-center gap-1 truncate text-[13px]',
            locked ? 'text-neutral-500' : 'text-neutral-900 font-medium',
          )}
        >
          <span className="truncate">{suite.label}</span>
          {locked && <Lock size={10} className="shrink-0 text-neutral-300" />}
        </div>
        {suite.description && (
          <div className="truncate text-[11px] text-neutral-500">
            {suite.description}
          </div>
        )}
      </div>
    </button>
  )
}
