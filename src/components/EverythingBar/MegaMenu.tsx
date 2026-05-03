import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CaretRight, Lock, Star } from '@phosphor-icons/react'
import type { CatalogResponse } from '@/api/nav.ts'
import type { App, Suite } from '@/lib/types.ts'
import { Icon } from '@/lib/icon.tsx'
import { resolve, buildConditionSet, type ResolveContext } from '@/lib/visibility.ts'
import { deriveSpine, FAVORITES_FLOOR, type L1Entry, type VisibleAppGroup } from '@/lib/derive.ts'
import { cn } from '@/lib/cn.ts'
import { useHud } from '@/state/HudContext.tsx'
import { useFavorites } from '@/state/FavoritesContext.tsx'

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
    return <SearchResults catalog={catalog} ctx={ctx} q={q} onSelect={onSelect} />
  }
  return <BrowseList catalog={catalog} ctx={ctx} ownedSuites={ownedSuites} onSelect={onSelect} />
}

// ─── Browse mode (single column with flyouts) ──────────────────────────

function BrowseList({
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
  const { favorites, isFavorite, toggle: toggleFavorite } = useFavorites()

  // Derived L1 spine — applies hide / flatten-sparse / keep-dense /
  // collapse-dominant rules to the resolved tree.
  const rawSpine = useMemo(
    () => deriveSpine(catalog.suites, ctx, { favorites }),
    [catalog.suites, ctx, favorites],
  )

  // Standalone product context: when only one non-utility suite is owned,
  // show "Rippling [Suite]" as a header so the user knows which product
  // they're using.
  const standaloneProductLabel = useMemo(() => {
    const UTILITY = new Set(['custom-apps', 'studio', 'data', 'tools', 'settings'])
    const primary = [...ownedSuites].filter((id) => !UTILITY.has(id))
    if (primary.length !== 1) return null
    const suite = catalog.suites.suites.find((s) => s.id === primary[0])
    if (!suite) return null
    return `Rippling ${suite.label}`
  }, [ownedSuites, catalog.suites.suites])

  // In standalone mode, expand any flat my-* app at L1 into its L3
  // sub-tabs.
  const spine = useMemo(() => {
    if (!standaloneProductLabel) return rawSpine
    const expanded: L1Entry[] = []
    for (const e of rawSpine.entries) {
      if (
        e.kind === 'app' &&
        (e.app.id.startsWith('my-') || e.app.label.startsWith('My '))
      ) {
        const l3 = catalog.apps[e.app.id]
        const nav = (l3?.nav as Array<{
          id: string
          label: string
          icon?: string
          path: string | null
        }>) ?? []
        if (nav.length >= 2) {
          for (const n of nav) {
            expanded.push({
              kind: 'app',
              app: {
                id: n.id,
                label: n.label,
                icon: n.icon ?? e.app.icon,
                path: n.path ?? undefined,
                parent: e.suite.id,
              } as App,
              suite: e.suite,
              resolution: 'visible',
            })
          }
          continue
        }
      }
      expanded.push(e)
    }
    return { entries: expanded }
  }, [rawSpine, catalog.apps, standaloneProductLabel])

  const totalVisibleApps = useMemo(() => {
    let n = 0
    for (const s of catalog.suites.suites) {
      for (const a of s.apps ?? []) {
        if (resolve(a, { ...ctx, suiteId: s.id }) === 'visible') n++
      }
    }
    return n
  }, [catalog.suites.suites, ctx])
  const favoritesEnabled = totalVisibleApps >= FAVORITES_FLOOR

  const isPersonal = (e: L1Entry): boolean => {
    if (e.kind === 'my-cluster' || e.kind === 'favorites') return true
    if (e.kind === 'app')
      return !!(e.app.pinAtL1 || e.app.id.startsWith('my-') || e.app.label.startsWith('My '))
    return false
  }
  const isPlatform = (e: L1Entry): boolean => {
    if (e.kind === 'suite') return e.suite.group === 'platform'
    if (e.kind === 'group') return e.suite.group === 'platform'
    if (e.kind === 'app') return e.suite.group === 'platform'
    return false
  }

  const myEntries = spine.entries.filter(isPersonal)
  const otherEntries = spine.entries.filter((e) => !isPersonal(e))
  const myOtherSepHandlesPlatform =
    myEntries.length > 0 && otherEntries.length > 0 && isPlatform(otherEntries[0])
  let insertedPlatformSep = myOtherSepHandlesPlatform

  const renderEntry = (e: L1Entry) => {
    if (e.kind === 'suite') {
      return (
        <SuiteFlyout
          key={`s:${e.suite.id}`}
          suite={e.suite}
          visibleApps={e.visibleApps}
          visibleGroups={e.visibleGroups}
          ownedSuites={ownedSuites}
          catalog={catalog}
          favoritesEnabled={favoritesEnabled}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onSelect={onSelect}
        />
      )
    }
    if (e.kind === 'group') {
      return (
        <GroupFlyout
          key={`g:${e.suite.id}/${e.group.id}`}
          suite={e.suite}
          group={e.group}
          apps={e.visibleApps}
          favoritesEnabled={favoritesEnabled}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onSelect={onSelect}
        />
      )
    }
    if (e.kind === 'my-cluster') {
      return (
        <ClusterFlyout
          key="my-cluster"
          icon="UserCircle"
          label="My Rippling"
          apps={e.apps.map(({ app }) => app)}
          favoritesEnabled={favoritesEnabled}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onSelect={onSelect}
        />
      )
    }
    if (e.kind === 'favorites') {
      return (
        <ClusterFlyout
          key="fav-cluster"
          customIcon={<Star size={15} weight="duotone" className="shrink-0 text-neutral-600" />}
          label="Favorites"
          apps={e.apps.map(({ app }) => app)}
          favoritesEnabled={favoritesEnabled}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onSelect={onSelect}
        />
      )
    }
    // Flat app — has L3? open flyout. Else direct nav.
    return (
      <AppL1Row
        key={`a:${e.app.id}`}
        app={e.app}
        suite={e.suite}
        catalog={catalog}
        favoritesEnabled={favoritesEnabled}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
        onSelect={onSelect}
      />
    )
  }

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
    <div className="flex flex-col">
      {standaloneProductLabel && (
        <div className="bg-neutral-50 px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-400">
          {standaloneProductLabel}
        </div>
      )}
      <div className="flex w-[300px] flex-col py-2">
        {myEntries.map(renderEntry)}
        {myEntries.length > 0 && otherEntries.length > 0 && (
          <hr className="mx-4 my-2 border-neutral-200" />
        )}
        {otherEntries.map(renderOther)}
      </div>
    </div>
  )
}

function entryKey(e: L1Entry): string {
  if (e.kind === 'suite') return `s:${e.suite.id}`
  if (e.kind === 'group') return `g:${e.suite.id}/${e.group.id}`
  if (e.kind === 'my-cluster') return 'my-cluster'
  if (e.kind === 'favorites') return 'fav-cluster'
  return `a:${e.app.id}`
}

// ─── Flyout primitive ──────────────────────────────────────────────────

interface FlyoutContent {
  /** Hero row pinned to the top — typically a suite-overview link. */
  hero?: { label: string; onClick: () => void; icon?: string }
  /** Grouped sections rendered with subheaders. */
  groups?: VisibleAppGroup[]
  /** Flat trailing apps (after groups). */
  flat?: App[]
  /** Whether to render the favorite-toggle on each app. */
  favoritesEnabled?: boolean
  isFavorite?: (id: string) => boolean
  onToggleFavorite?: (id: string) => void
  onSelect: (node: Selection) => void
}

interface FlyoutItemProps {
  /** The trigger row content. */
  trigger: React.ReactNode
  /** Click on the trigger itself (e.g. to navigate to the suite landing). */
  onTriggerClick?: () => void
  /** What to render inside the flyout. */
  content: FlyoutContent
}

function FlyoutItem({ trigger, onTriggerClick, content }: FlyoutItemProps) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const measure = () => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const W = 300
    const itemCount =
      (content.hero ? 1 : 0) +
      (content.groups?.reduce((n, g) => n + g.apps.length + 1, 0) ?? 0) +
      (content.flat?.length ?? 0)
    const H_MAX = Math.min(itemCount * 32 + 24, 480)
    // Subtle overlap with the parent (macOS-style) — submenu starts a few
    // pixels inside the parent's right edge so it visually butts up.
    const OVERLAP = 10
    const PAD = 8
    let left = rect.right - OVERLAP
    if (left + W > window.innerWidth - PAD) left = rect.left + OVERLAP - W
    let top = rect.top
    if (top + H_MAX > window.innerHeight - PAD) top = window.innerHeight - PAD - H_MAX
    if (top < PAD) top = PAD
    setPos({ top, left })
  }

  useLayoutEffect(() => {
    if (open) measure()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const handleLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 100)
  }

  return (
    <div ref={buttonRef} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        type="button"
        onClick={onTriggerClick}
        className={cn(
          'group/row flex w-full items-center gap-2.5 px-4 py-1.5 text-left text-[13px]',
          open ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-700 hover:bg-neutral-50',
        )}
      >
        {trigger}
        <CaretRight size={11} className="shrink-0 text-neutral-400" />
      </button>

      {open && pos &&
        createPortal(
          <div
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 60 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.12 }}
              className="w-[300px] overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl"
            >
              <FlyoutBody content={content} />
            </motion.div>
          </div>,
          document.body,
        )}
    </div>
  )
}

function FlyoutBody({ content }: { content: FlyoutContent }) {
  const { hero, groups, flat, favoritesEnabled, isFavorite, onToggleFavorite, onSelect } = content
  return (
    <div className="max-h-[480px] overflow-y-auto py-1.5">
      {hero && (
        <button
          type="button"
          onClick={hero.onClick}
          className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
        >
          <Icon name={hero.icon} size={14} className="shrink-0 text-neutral-500" />
          <span className="flex-1 truncate">{hero.label}</span>
        </button>
      )}
      {groups?.map((vg) => (
        <div key={vg.group.id} className="mt-2 first:mt-0">
          <div className="px-3 pb-0.5 pt-1.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
            {vg.group.label}
          </div>
          {vg.apps.map((app) => (
            <AppRow
              key={`g-${app.id}`}
              app={app}
              onSelect={onSelect}
              favoritesEnabled={favoritesEnabled}
              isFavorite={isFavorite?.(app.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ))}
      {flat && flat.length > 0 && (
        <div className={cn(groups && groups.length > 0 && 'mt-2')}>
          {flat.map((app) => (
            <AppRow
              key={`f-${app.id}`}
              app={app}
              onSelect={onSelect}
              favoritesEnabled={favoritesEnabled}
              isFavorite={isFavorite?.(app.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Specific row variants ─────────────────────────────────────────────

function SuiteFlyout({
  suite,
  visibleApps,
  visibleGroups,
  ownedSuites,
  catalog,
  favoritesEnabled,
  isFavorite,
  onToggleFavorite,
  onSelect,
}: {
  suite: Suite
  visibleApps: App[]
  visibleGroups: VisibleAppGroup[]
  ownedSuites: Set<string>
  catalog: CatalogResponse
  favoritesEnabled: boolean
  isFavorite: (id: string) => boolean
  onToggleFavorite: (id: string) => void
  onSelect: (node: Selection) => void
}) {
  const locked = !ownedSuites.has(suite.id)
  // Suite landing = '<suite>-overview' app, by convention. Some suites
  // (Settings, Tools, Data, etc.) don't have one — no hero in that case.
  const overviewId = `${suite.id}-overview`
  const overviewApp =
    suite.apps.find((a) => a.id === overviewId) ??
    (catalog.apps[overviewId] ? ({ id: overviewId } as App) : null)
  const heroLabel = `${suite.label} Overview`
  const hero = overviewApp
    ? {
        label: heroLabel,
        icon: suite.icon,
        onClick: () => onSelect({ kind: 'app', id: overviewId, label: heroLabel }),
      }
    : undefined
  // Strip the overview app from the rendered groups/flat so it's not
  // shown twice (it's now the hero row, when present).
  const filteredGroups = visibleGroups
    .map((vg) => ({ ...vg, apps: vg.apps.filter((a) => a.id !== overviewId) }))
    .filter((vg) => vg.apps.length > 0)
  const filteredFlat = visibleApps.filter((a) => a.id !== overviewId)

  return (
    <FlyoutItem
      trigger={
        <>
          <Icon
            name={suite.icon}
            size={14}
            className={cn('shrink-0', locked ? 'text-neutral-400' : 'text-neutral-600')}
          />
          <span className={cn('flex-1 truncate', locked && 'text-neutral-500')}>{suite.label}</span>
          {locked && <Lock size={10} className="shrink-0 text-neutral-300" />}
        </>
      }
      onTriggerClick={
        overviewApp
          ? () => onSelect({ kind: 'app', id: overviewId, label: heroLabel })
          : undefined
      }
      content={{
        hero,
        groups: filteredGroups,
        flat: filteredFlat,
        favoritesEnabled,
        isFavorite,
        onToggleFavorite,
        onSelect,
      }}
    />
  )
}

function GroupFlyout({
  suite: _suite,
  group,
  apps,
  favoritesEnabled,
  isFavorite,
  onToggleFavorite,
  onSelect,
}: {
  suite: Suite
  group: { id: string; label: string; icon?: string }
  apps: App[]
  favoritesEnabled: boolean
  isFavorite: (id: string) => boolean
  onToggleFavorite: (id: string) => void
  onSelect: (node: Selection) => void
}) {
  return (
    <FlyoutItem
      trigger={
        <>
          <Icon
            name={group.icon ?? 'FolderSimple'}
            size={14}
            className="shrink-0 text-neutral-600"
          />
          <span className="flex-1 truncate">{group.label}</span>
        </>
      }
      content={{ flat: apps, favoritesEnabled, isFavorite, onToggleFavorite, onSelect }}
    />
  )
}

function ClusterFlyout({
  icon,
  customIcon,
  label,
  apps,
  favoritesEnabled,
  isFavorite,
  onToggleFavorite,
  onSelect,
}: {
  icon?: string
  customIcon?: React.ReactNode
  label: string
  apps: App[]
  favoritesEnabled: boolean
  isFavorite: (id: string) => boolean
  onToggleFavorite: (id: string) => void
  onSelect: (node: Selection) => void
}) {
  return (
    <FlyoutItem
      trigger={
        <>
          {customIcon ?? (
            <Icon name={icon ?? 'FolderSimple'} size={14} className="shrink-0 text-neutral-600" />
          )}
          <span className="flex-1 truncate">{label}</span>
        </>
      }
      content={{ flat: apps, favoritesEnabled, isFavorite, onToggleFavorite, onSelect }}
    />
  )
}

function AppL1Row({
  app,
  suite: _suite,
  catalog,
  favoritesEnabled,
  isFavorite,
  onToggleFavorite,
  onSelect,
}: {
  app: App
  suite: Suite
  catalog: CatalogResponse
  favoritesEnabled: boolean
  isFavorite: (id: string) => boolean
  onToggleFavorite: (id: string) => void
  onSelect: (node: Selection) => void
}) {
  // L3 flyouts are reserved for my-* apps where the sub-tabs are real
  // peer destinations (my-it → My Devices / My Apps / My Password).
  // Other apps' L3 tabs are internal to the app and shouldn't be
  // surfaced from the menu.
  const isMyApp = app.id.startsWith('my-') || app.label.startsWith('My ')
  const l3 = isMyApp ? catalog.apps[app.id] : null
  const nav = (l3?.nav as Array<{
    id: string
    label: string
    icon?: string
    path?: string | null
  }>) ?? []

  if (nav.length >= 2) {
    const subApps: App[] = nav.map(
      (n) =>
        ({
          id: n.id,
          label: n.label,
          icon: n.icon ?? app.icon,
          path: n.path ?? undefined,
          parent: app.parent,
        }) as App,
    )
    return (
      <FlyoutItem
        trigger={
          <>
            <Icon name={app.icon} size={14} className="shrink-0 text-neutral-600" />
            <span className="flex-1 truncate">{app.label}</span>
          </>
        }
        onTriggerClick={() => onSelect({ kind: 'app', id: app.id, label: app.label })}
        content={{ flat: subApps, favoritesEnabled, isFavorite, onToggleFavorite, onSelect }}
      />
    )
  }

  return (
    <div className="group/row relative hover:bg-neutral-50">
      <button
        type="button"
        onClick={() => onSelect({ kind: 'app', id: app.id, label: app.label })}
        className="flex w-full items-center gap-2.5 px-4 py-1.5 text-left text-[13px] text-neutral-700 group-hover/row:text-neutral-900"
      >
        <Icon name={app.icon} size={14} className="shrink-0 text-neutral-600" />
        <span className="flex-1 truncate">{app.label}</span>
        {favoritesEnabled && <span className="w-[15px] shrink-0" aria-hidden />}
      </button>
      {favoritesEnabled && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite(app.id)
          }}
          title={isFavorite(app.id) ? 'Remove from favorites' : 'Add to favorites'}
          className={cn(
            'absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded p-0.5 transition-colors',
            isFavorite(app.id)
              ? 'text-neutral-700'
              : 'text-neutral-300 hover:text-neutral-700 group-hover/row:text-neutral-500',
          )}
        >
          <Star size={13} weight={isFavorite(app.id) ? 'fill' : 'regular'} />
        </button>
      )}
    </div>
  )
}

function AppRow({
  app,
  onSelect,
  favoritesEnabled,
  isFavorite,
  onToggleFavorite,
}: {
  app: App
  onSelect: (node: Selection) => void
  favoritesEnabled?: boolean
  isFavorite?: boolean
  onToggleFavorite?: (id: string) => void
}) {
  return (
    <div className="group/row relative hover:bg-neutral-100">
      <button
        type="button"
        onClick={() => onSelect({ kind: 'app', id: app.id, label: app.label })}
        className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-neutral-700 group-hover/row:text-neutral-900"
      >
        <Icon name={app.icon} size={14} className="shrink-0 text-neutral-500" />
        <span className="flex-1 truncate">{app.label}</span>
        {favoritesEnabled && <span className="w-[15px] shrink-0" aria-hidden />}
      </button>
      {favoritesEnabled && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite?.(app.id)
          }}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className={cn(
            'absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded p-0.5 transition-colors',
            isFavorite
              ? 'text-neutral-700'
              : 'text-neutral-300 hover:text-neutral-700 group-hover/row:text-neutral-500',
          )}
        >
          <Star size={13} weight={isFavorite ? 'fill' : 'regular'} />
        </button>
      )}
    </div>
  )
}

// ─── Search results (unchanged behavior) ──────────────────────────────

function SearchResults({
  catalog,
  ctx,
  q,
  onSelect,
}: {
  catalog: CatalogResponse
  ctx: ResolveContext
  q: string
  onSelect: (node: Selection) => void
}) {
  const matches = (label: string) => label.toLowerCase().includes(q)

  type Hit = { app: App; suite: Suite }
  const hits: Hit[] = []
  for (const suite of catalog.suites.suites) {
    for (const app of suite.apps) {
      if (!matches(app.label)) continue
      if (resolve(app, { ...ctx, suiteId: suite.id }) !== 'visible') continue
      hits.push({ app, suite })
    }
  }

  if (hits.length === 0) {
    return (
      <div className="w-[420px] px-6 py-12 text-center text-sm text-neutral-500">
        No apps match "{q}".
      </div>
    )
  }

  return (
    <ul className="max-h-[60vh] w-[420px] overflow-y-auto py-1.5">
      {hits.slice(0, 50).map((hit, i) => (
        <li key={`${hit.app.id}-${i}`}>
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
      ))}
    </ul>
  )
}

