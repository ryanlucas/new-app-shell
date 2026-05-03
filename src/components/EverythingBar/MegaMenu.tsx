import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Lock } from '@phosphor-icons/react'
import type { CatalogResponse } from '@/api/nav.ts'
import type { App, Suite, SuiteGroupDef } from '@/lib/types.ts'
import { Icon } from '@/lib/icon.tsx'
import {
  resolve,
  buildConditionSet,
  type ResolveContext,
} from '@/lib/visibility.ts'
import { deriveSpine, type L1Entry } from '@/lib/derive.ts'
import { cn } from '@/lib/cn.ts'
import { useHud } from '@/state/HudContext.tsx'

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
      eeArchetypes: new Set(hud.eeArchetypes),
      ownedSuites,
      conditions: buildConditionSet(hud.derivedConditions, catalog.plans, hud.planId),
    }),
    [
      hud.personas,
      hud.partialScopes,
      hud.eeArchetypes,
      ownedSuites,
      hud.derivedConditions,
      catalog.plans,
      hud.planId,
    ],
  )

  const q = query.trim().toLowerCase()

  if (q) {
    return <SearchResults catalog={catalog} ctx={ctx} ownedSuites={ownedSuites} q={q} onSelect={onSelect} />
  }

  return <BrowseTwoPane catalog={catalog} ctx={ctx} ownedSuites={ownedSuites} onSelect={onSelect} />
}

/** Stable key for an L1 entry. Used as activeKey for hover/selection. */
function entryKey(e: L1Entry): string {
  if (e.kind === 'suite') return `s:${e.suite.id}`
  if (e.kind === 'group') return `g:${e.suite.id}/${e.group.id}`
  if (e.kind === 'my-cluster') return `my:cluster`
  return `a:${e.app.id}`
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
  // Derived L1 spine — applies hide / flatten-sparse / keep-dense /
  // collapse-dominant rules to the resolved tree.
  const spine = useMemo(() => deriveSpine(catalog.suites, ctx), [catalog.suites, ctx])

  // First entry wins as initial active (any kind — flat apps now show a
  // graphical preview pane too).
  const [activeKey, setActiveKey] = useState<string>(() =>
    spine.entries[0] ? entryKey(spine.entries[0]) : '',
  )

  // Keep activeKey valid as the spine changes (plan/persona toggle).
  useEffect(() => {
    if (!spine.entries.some((e) => entryKey(e) === activeKey)) {
      setActiveKey(spine.entries[0] ? entryKey(spine.entries[0]) : '')
    }
  }, [spine.entries, activeKey])

  // ── Safe-triangle hover intent ──────────────────────────────────────────
  const intentRef = useRef<{
    timer: ReturnType<typeof setTimeout> | null
    pendingKey: string | null
  }>({ timer: null, pendingKey: null })
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const rightPanelRef = useRef<HTMLDivElement>(null)

  const handleEntryHover = useCallback(
    (key: string) => {
      if (key === activeKey) {
        if (intentRef.current.timer) clearTimeout(intentRef.current.timer)
        intentRef.current.pendingKey = null
        return
      }
      const panel = rightPanelRef.current
      if (!panel) {
        setActiveKey(key)
        return
      }
      const panelRect = panel.getBoundingClientRect()
      const mouse = lastMousePos.current
      const movingRight = mouse.x > 0 && mouse.x < panelRect.left
      if (movingRight) {
        if (intentRef.current.timer) clearTimeout(intentRef.current.timer)
        intentRef.current.pendingKey = key
        intentRef.current.timer = setTimeout(() => {
          setActiveKey(key)
          intentRef.current.pendingKey = null
        }, 60)
      } else {
        if (intentRef.current.timer) clearTimeout(intentRef.current.timer)
        intentRef.current.pendingKey = null
        setActiveKey(key)
      }
    },
    [activeKey],
  )

  const handleRightEnter = useCallback(() => {
    if (intentRef.current.pendingKey) {
      if (intentRef.current.timer) clearTimeout(intentRef.current.timer)
      intentRef.current.pendingKey = null
    }
  }, [])

  const activeEntry = spine.entries.find((e) => entryKey(e) === activeKey) ?? null
  // Right pane only meaningful when at least one entry can populate it
  // (suite, promoted group, or my-cluster). All-flat L1 → no pane.
  const hasPaneCapableEntry = spine.entries.some(
    (e) => e.kind === 'suite' || e.kind === 'group' || e.kind === 'my-cluster',
  )

  // Apps to show in the right pane for the active entry.
  type ShownApp = { app: App; linkedFrom?: Suite }
  const rightPane = useMemo<{
    apps: ShownApp[]
    showGroups: boolean
    suite?: Suite
    title?: string
  }>(() => {
    if (!activeEntry) return { apps: [], showGroups: false }
    if (activeEntry.kind === 'suite') {
      // Suite-with-pane: show its visible apps grouped by visibleGroups +
      // ungrouped flat. Cross-listed apps are already included by
      // `buildResolvedTree` (don't re-iterate appearsIn here or they double).
      // Annotate cross-listed entries with `linkedFrom` for the UI.
      const suite = activeEntry.suite
      const ownerById = new Map<string, Suite>()
      for (const s of catalog.suites.suites) {
        for (const a of s.apps) {
          if (!ownerById.has(a.id)) ownerById.set(a.id, s)
        }
      }
      const annotate = (app: App): ShownApp => {
        const owner = ownerById.get(app.id)
        return owner && owner.id !== suite.id ? { app, linkedFrom: owner } : { app }
      }
      const direct: ShownApp[] = activeEntry.visibleApps.map(annotate)
      const fromGroups: ShownApp[] = activeEntry.visibleGroups.flatMap((vg) =>
        vg.apps.map(annotate),
      )
      // Dedup by id (defense-in-depth — the resolver should already not
      // surface the same app twice in one suite's tree).
      const seen = new Set<string>()
      const apps: ShownApp[] = []
      for (const e of [...fromGroups, ...direct]) {
        if (seen.has(e.app.id)) continue
        seen.add(e.app.id)
        apps.push(e)
      }
      return {
        apps,
        showGroups: activeEntry.visibleGroups.length > 0,
        suite,
        title: suite.label,
      }
    }
    if (activeEntry.kind === 'group') {
      // Promoted appGroup: render its apps as a flat list.
      return {
        apps: activeEntry.visibleApps.map((app) => ({ app })),
        showGroups: false,
        suite: activeEntry.suite,
        title: activeEntry.group.label,
      }
    }
    if (activeEntry.kind === 'my-cluster') {
      // Density-conditional My-Rippling cluster: flat list of personal apps.
      return {
        apps: activeEntry.apps.map(({ app }) => ({ app })),
        showGroups: false,
        title: 'My Rippling',
      }
    }
    // Flattened single app — no pane content.
    return { apps: [], showGroups: false }
  }, [activeEntry, catalog.suites.suites, ctx])

  return (
    <div
      className="flex flex-col"
      onMouseMove={(e) => {
        lastMousePos.current = { x: e.clientX, y: e.clientY }
      }}
    >
      <div className="flex">
      <div
        className={cn(
          'flex flex-col py-2',
          hasPaneCapableEntry ? 'w-[300px]' : 'w-[540px]',
        )}
      >
        {spine.collapsed && (
          <div className="px-4 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
            {spine.collapsed.suite.label}
          </div>
        )}
        {(() => {
          // Pull personal items (pinAtL1 like Inbox + my-prefixed apps) to the
          // top of the L1 list and divide them from the rest with a horizontal
          // rule. The my-cluster (when threshold fires) also belongs in the
          // personal zone.
          const isPersonal = (e: L1Entry) =>
            e.kind === 'my-cluster' ||
            (e.kind === 'app' &&
              (e.app.pinAtL1 ||
                e.app.id.startsWith('my-') ||
                e.app.label.startsWith('My ')))
          const myEntries = spine.entries.filter(isPersonal)
          const otherEntries = spine.entries.filter((e) => !isPersonal(e))

          const renderEntry = (e: L1Entry) => {
            const key = entryKey(e)
            const isActive = key === activeKey
            if (e.kind === 'suite') {
              return (
                <SuiteRow
                  key={key}
                  suite={e.suite}
                  active={isActive}
                  locked={!ownedSuites.has(e.suite.id)}
                  onHover={() => handleEntryHover(key)}
                  onClick={() => onSelect({ kind: 'suite', id: e.suite.id, label: e.suite.label })}
                />
              )
            }
            if (e.kind === 'group') {
              return (
                <GroupRow
                  key={key}
                  suite={e.suite}
                  group={e.group}
                  active={isActive}
                  onHover={() => handleEntryHover(key)}
                />
              )
            }
            if (e.kind === 'my-cluster') {
              return (
                <MyClusterRow
                  key={key}
                  active={isActive}
                  onHover={() => handleEntryHover(key)}
                />
              )
            }
            return (
              <FlatAppRow
                key={key}
                app={e.app}
                suite={e.suite}
                active={isActive}
                onHover={() => handleEntryHover(key)}
                onClick={() => onSelect({ kind: 'app', id: e.app.id, label: e.app.label })}
              />
            )
          }

          // Insert a separator the first time we render a platform-group
          // entry (Data, Studio/custom-apps, Tools, Settings) — divides
          // product suites from cross-cutting tooling.
          const isPlatform = (e: L1Entry): boolean => {
            if (e.kind === 'suite') return e.suite.group === 'platform'
            if (e.kind === 'group') return e.suite.group === 'platform'
            if (e.kind === 'app') return e.suite.group === 'platform'
            return false
          }
          // If the first "other" entry is itself platform, the my/other
          // separator already does the platform divider's job — don't
          // double-up.
          const myOtherSepHandlesPlatform =
            myEntries.length > 0 &&
            otherEntries.length > 0 &&
            isPlatform(otherEntries[0])
          let insertedPlatformSep = myOtherSepHandlesPlatform
          const renderOther = (e: L1Entry) => {
            if (!insertedPlatformSep && isPlatform(e)) {
              insertedPlatformSep = true
              return (
                <div key={`sep-${entryKey(e)}`}>
                  <hr className="mx-4 my-2 border-neutral-200" />
                  {renderEntry(e)}
                </div>
              )
            }
            return renderEntry(e)
          }

          return (
            <>
              {myEntries.map(renderEntry)}
              {myEntries.length > 0 && otherEntries.length > 0 && (
                <hr className="mx-4 my-2 border-neutral-200" />
              )}
              {otherEntries.map(renderOther)}
            </>
          )
        })()}
      </div>
      {hasPaneCapableEntry && (
        <>
          <div className="w-px self-stretch bg-neutral-200" />
          <div
            ref={rightPanelRef}
            onMouseEnter={handleRightEnter}
            className="flex w-[280px] flex-col py-3"
          >
            {activeEntry && activeEntry.kind === 'app' ? (
              <FlatAppEmptyState
                app={activeEntry.app}
                onClick={() =>
                  onSelect({ kind: 'app', id: activeEntry.app.id, label: activeEntry.app.label })
                }
              />
            ) : activeEntry ? (
              <div className="max-h-[440px] overflow-y-auto">
                {rightPane.apps.length === 0 ? (
                  <div className="px-3 py-4 text-xs text-neutral-400">
                    No apps available.
                  </div>
                ) : rightPane.showGroups && activeEntry.kind === 'suite' ? (
                  renderGroupedAppList(activeEntry, onSelect)
                ) : (
                  rightPane.apps.map((entry) => (
                    <AppRow
                      key={`${entry.linkedFrom?.id ?? 'self'}-${entry.app.id}`}
                      entry={entry}
                      owned
                      onSelect={onSelect}
                    />
                  ))
                )}
              </div>
            ) : null}
          </div>
        </>
      )}
      </div>
      {(() => {
        let desc: string | undefined
        if (activeEntry?.kind === 'suite') desc = activeEntry.suite.description
        else if (activeEntry?.kind === 'group') desc = activeEntry.group.description
        else if (activeEntry?.kind === 'my-cluster')
          desc = 'Your personal items, scoped to just you across whatever Rippling products your company uses.'
        if (!desc) return null
        return (
          <div className="border-t border-neutral-200 px-4 py-2 text-[11px] leading-snug text-neutral-500">
            {desc}
          </div>
        )
      })()}
    </div>
  )
}

/** Render a suite-pane with dense appGroups as headers + ungrouped flat. */
function renderGroupedAppList(
  entry: Extract<L1Entry, { kind: 'suite' }>,
  onSelect: (n: { kind: 'app' | 'suite'; id: string; label: string }) => void,
) {
  return (
    <>
      {entry.visibleGroups.map((vg) => (
        <div key={vg.group.id} className="mt-2 first:mt-0">
          <div className="px-3 pb-0.5 pt-1.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
            {vg.group.label}
          </div>
          {vg.apps.map((app) => (
            <AppRow key={`g-${app.id}`} entry={{ app }} owned onSelect={onSelect} />
          ))}
        </div>
      ))}
      {entry.visibleApps.length > 0 && (
        <div className="mt-2">
          {entry.visibleApps.map((app) => (
            <AppRow key={`f-${app.id}`} entry={{ app }} owned onSelect={onSelect} />
          ))}
        </div>
      )}
    </>
  )
}

function FlatAppEmptyState({ app, onClick }: { app: App; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-full min-h-[200px] w-full flex-col items-center justify-center gap-3 px-4 py-6 text-center hover:bg-neutral-50"
    >
      <div className="rounded-full bg-neutral-100 p-4">
        <Icon name={app.icon} size={28} className="text-neutral-500" />
      </div>
      <div>
        <div className="text-sm font-medium text-neutral-900">{app.label}</div>
        <div className="mt-1 text-[11px] text-neutral-500">Click to open</div>
      </div>
    </button>
  )
}

function MyClusterRow({
  active,
  onHover,
}: {
  active: boolean
  onHover: () => void
}) {
  return (
    <button
      type="button"
      onMouseEnter={onHover}
      className={cn(
        'flex w-full items-start gap-2.5 px-4 py-1.5 text-left',
        active ? 'bg-neutral-100' : 'hover:bg-neutral-50',
      )}
    >
      <Icon name="UserCircle" size={15} className="mt-0.5 shrink-0 text-neutral-600" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-medium text-neutral-900">My Rippling</div>
      </div>
    </button>
  )
}

function GroupRow({
  suite: _suite,
  group,
  active,
  onHover,
}: {
  suite: Suite
  group: SuiteGroupDef
  active: boolean
  onHover: () => void
}) {
  return (
    <button
      type="button"
      onMouseEnter={onHover}
      className={cn(
        'flex w-full items-start gap-2.5 px-4 py-1.5 text-left',
        active ? 'bg-neutral-100' : 'hover:bg-neutral-50',
      )}
    >
      <Icon
        name={group.icon ?? 'FolderSimple'}
        size={15}
        className="mt-0.5 shrink-0 text-neutral-600"
      />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-medium text-neutral-900">{group.label}</div>
      </div>
    </button>
  )
}

function FlatAppRow({
  app,
  suite,
  active,
  onHover,
  onClick,
}: {
  app: App
  suite: Suite
  active: boolean
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
        active ? 'bg-neutral-100' : 'hover:bg-neutral-50',
      )}
      title={`${suite.label} · ${app.label}`}
    >
      <Icon name={app.icon} size={15} className="mt-0.5 shrink-0 text-neutral-600" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-medium text-neutral-900">{app.label}</div>
      </div>
    </button>
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
    | { kind: 'suite'; suite: Suite }
    | { kind: 'app'; app: App; suite: Suite }

  // Search only over things the user can actually access. No locked / not-
  // owned tiles in search results — those add noise for non-admins.
  const hits: Hit[] = []
  for (const suite of catalog.suites.suites) {
    const suiteOwned = ownedSuites.has(suite.id)
    if (suiteOwned && matches(suite.label)) hits.push({ kind: 'suite', suite })
    for (const app of suite.apps) {
      if (!matches(app.label)) continue
      if (resolve(app, { ...ctx, suiteId: suite.id }) !== 'visible') continue
      hits.push({ kind: 'app', app, suite })
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
                className="flex w-full items-center gap-2.5 px-4 py-1.5 text-left text-[13px] hover:bg-neutral-100"
              >
                <Icon name={hit.suite.icon} size={14} className="text-neutral-500" />
                <span className="flex-1 font-medium text-neutral-900">{hit.suite.label}</span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400">
                  Suite
                </span>
              </button>
            </li>
          )
        }
        return (
          <li key={`a-${hit.app.id}-${i}`}>
            <button
              type="button"
              onClick={() => onSelect({ kind: 'app', id: hit.app.id, label: hit.app.label })}
              className="flex w-full items-center gap-2.5 px-4 py-1.5 text-left text-[13px] hover:bg-neutral-100"
            >
              <Icon name={hit.app.icon} size={13} className="text-neutral-400" />
              <span className="flex-1 truncate text-neutral-800">{hit.app.label}</span>
              <span className="text-[10px] text-neutral-400">{hit.suite.label}</span>
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
      </div>
    </button>
  )
}
