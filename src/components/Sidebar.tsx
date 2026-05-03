import { Lock } from '@phosphor-icons/react'
import type { CatalogResponse } from '@/api/nav.ts'
import { Icon } from '@/lib/icon.tsx'
import {
  resolve,
  resolveSuite,
  buildConditionSet,
  type ResolveContext,
} from '@/lib/visibility.ts'
import { cn } from '@/lib/cn.ts'
import { useHud } from '@/state/HudContext.tsx'
import type { App, Suite } from '@/lib/types.ts'

interface Props {
  catalog: CatalogResponse
  selectedAppId: string | null
  onSelect: (appId: string) => void
}

export function Sidebar({ catalog, selectedAppId, onSelect }: Props) {
  const hud = useHud()
  const ctx: ResolveContext = {
    personas: new Set(hud.personas),
    partialScopes: new Set(hud.partialScopes),
    eeArchetypes: new Set(hud.eeArchetypes),
    ownedSuites: new Set(
      catalog.plans.plans.find((p) => p.id === hud.planId)?.ownedSuites ?? [],
    ),
    conditions: buildConditionSet(hud.derivedConditions, catalog.plans, hud.planId),
  }

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col gap-1 overflow-y-auto border-r border-neutral-200 bg-neutral-50 px-3 py-3 text-sm">
      {/* sidebar first section */}
      <Section nodes={catalog.frame.sidebar.firstSection} ctx={ctx} onSelect={onSelect} selectedAppId={selectedAppId} />

      <hr className="my-2 border-neutral-200" />

      {/* suites + apps */}
      {catalog.suites.suites.map((suite) => (
        <SuiteBlock
          key={suite.id}
          suite={suite}
          catalog={catalog}
          ctx={ctx}
          selectedAppId={selectedAppId}
          onSelect={onSelect}
        />
      ))}

      <hr className="my-2 border-neutral-200" />

      {/* sidebar third section */}
      <Section nodes={catalog.frame.sidebar.thirdSection} ctx={ctx} onSelect={onSelect} selectedAppId={selectedAppId} />
    </aside>
  )
}

function Section({
  nodes,
  ctx,
  onSelect,
  selectedAppId,
}: {
  nodes: App[]
  ctx: ResolveContext
  onSelect: (id: string) => void
  selectedAppId: string | null
}) {
  return (
    <ul className="flex flex-col gap-0.5">
      {nodes.map((node) => {
        const r = resolve(node, ctx)
        if (r === 'hidden') return null
        return (
          <NavRow
            key={node.id}
            node={node}
            locked={r === 'locked'}
            selected={selectedAppId === node.id}
            onSelect={onSelect}
          />
        )
      })}
    </ul>
  )
}

function SuiteBlock({
  suite,
  catalog,
  ctx,
  selectedAppId,
  onSelect,
}: {
  suite: Suite
  catalog: CatalogResponse
  ctx: ResolveContext
  selectedAppId: string | null
  onSelect: (id: string) => void
}) {
  const suiteResolution = resolveSuite(suite, ctx, { suites: catalog.suites.suites })
  if (suiteResolution === 'hidden') return null

  // For apps within the suite, productGate falls back to suite ownership.
  const childCtx: ResolveContext = { ...ctx, suiteId: suite.id }

  return (
    <div className="mt-2">
      <div className="flex items-center gap-2 px-2 py-1 text-xs font-medium uppercase tracking-wide text-neutral-500">
        <Icon name={suite.icon} size={14} />
        <span>{suite.label}</span>
        {suiteResolution === 'locked' && <Lock size={12} className="text-neutral-400" />}
      </div>
      {suiteResolution === 'visible' && (
        <ul className="mt-1 flex flex-col gap-0.5">
          {(suite.apps ?? []).map((app) => {
            const r = resolve(app, childCtx)
            if (r === 'hidden') return null
            return (
              <NavRow
                key={app.id}
                node={app}
                locked={r === 'locked'}
                selected={selectedAppId === app.id}
                onSelect={onSelect}
                indent
              />
            )
          })}
        </ul>
      )}
    </div>
  )
}

function NavRow({
  node,
  locked,
  selected,
  onSelect,
  indent,
}: {
  node: App
  locked: boolean
  selected: boolean
  onSelect: (id: string) => void
  indent?: boolean
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(node.id)}
        className={cn(
          'flex w-full items-center gap-2 rounded px-2 py-1.5 text-left',
          indent && 'pl-7',
          locked
            ? 'text-neutral-400 hover:bg-neutral-100'
            : selected
              ? 'bg-neutral-200 text-neutral-900'
              : 'text-neutral-700 hover:bg-neutral-100',
        )}
        title={node.path ?? undefined}
      >
        {!indent && <Icon name={node.icon} size={16} />}
        <span className="truncate flex-1">{node.label}</span>
        {locked && <Lock size={12} className="text-neutral-400" />}
      </button>
    </li>
  )
}
