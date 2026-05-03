import { Sparkle, SquaresFour } from '@phosphor-icons/react'
import type { CatalogResponse } from '@/api/nav.ts'
import { Icon } from '@/lib/icon.tsx'
import { resolve, buildConditionSet, type ResolveContext } from '@/lib/visibility.ts'
import { cn } from '@/lib/cn.ts'
import { useHud } from '@/state/HudContext.tsx'

interface Props {
  catalog: CatalogResponse
  onOpenChat: () => void
  onOpenBar: () => void
}

export function TopBar({ catalog, onOpenChat, onOpenBar }: Props) {
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

  // The frame's topBar is a flat list. We render visible widgets only.
  const widgets = (catalog.frame.topBar ?? []).filter(
    (w) => resolve(w, ctx) === 'visible',
  )

  // Logo = the first node id "rippling-logo" if present; rest renders right-aligned
  const logo = widgets.find((w) => w.id === 'rippling-logo')
  const others = widgets.filter((w) => w.id !== 'rippling-logo')

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-neutral-200 bg-white px-3">
      {/* Global nav affordance — opens the mega menu. */}
      <button
        type="button"
        onClick={onOpenBar}
        title="Open navigation"
        aria-label="Open navigation"
        className="flex h-9 w-9 items-center justify-center rounded-md text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
      >
        <SquaresFour size={20} weight="duotone" />
      </button>

      {logo && (
        <button
          className="ml-1 flex items-center text-neutral-900"
          title={logo.label}
          aria-label={logo.label}
        >
          <RipplingWordmark />
        </button>
      )}

      <div className="ml-auto flex items-center gap-1">
        {others.map((w) => (
          <TopBarButton
            key={w.id}
            label={w.label}
            iconName={w.icon}
            onClick={w.id === 'ai-assistant' || w.id === 'chat-assistant' ? onOpenChat : undefined}
            isAi={w.id === 'ai-assistant' || w.id === 'chat-assistant'}
          />
        ))}
        {!others.some((w) => w.id === 'ai-assistant' || w.id === 'chat-assistant') && (
          <TopBarButton label="Rippling AI" iconName="Sparkle" onClick={onOpenChat} isAi />
        )}
      </div>
    </header>
  )
}

function RipplingWordmark() {
  return (
    <svg
      height="16"
      width="113"
      viewBox="0 0 127 18"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M2.878 4.99C2.878 3.01 1.875 1.374 0 0h4.358a6.26 6.26 0 012.467 4.99 6.26 6.26 0 01-2.467 4.99c1.415.59 2.22 2.03 2.22 4.091v3.927H2.632v-3.927c0-1.963-.937-3.337-2.631-4.09 1.875-1.375 2.878-3.01 2.878-4.99zm8.552 0c0-1.98-1.003-3.616-2.878-4.99h4.359a6.26 6.26 0 012.466 4.99 6.26 6.26 0 01-2.466 4.99c1.414.59 2.22 2.03 2.22 4.091v3.927h-3.947v-3.927c0-1.963-.938-3.337-2.632-4.09 1.875-1.375 2.878-3.01 2.878-4.99zm8.554 0c0-1.98-1.003-3.616-2.878-4.99h4.358a6.26 6.26 0 012.467 4.99 6.26 6.26 0 01-2.467 4.99c1.415.59 2.22 2.03 2.22 4.091v3.927h-3.947v-3.927c0-1.963-.937-3.337-2.631-4.09 1.875-1.375 2.878-3.01 2.878-4.99zM35.952 14.728H32.96V3.272h7.352c3.536 0 5.279 1.31 5.279 3.453 0 1.456-.855 2.552-2.45 3.109 1.644.245 2.384 1.112 2.384 2.667v2.225h-3.026v-2.094c0-1.31-.658-1.833-2.385-1.833h-4.16v3.929zm4.194-9.787h-4.194v4.19h4.161c1.513 0 2.45-.835 2.45-2.144 0-1.293-.87-2.046-2.417-2.046zM50.787 3.272h-2.993v11.456h2.993V3.272zM59.964 10.995h-3.651v3.731h-2.994V3.272h6.71c3.536 0 5.395 1.473 5.395 3.83 0 2.437-1.891 3.893-5.46 3.893zm-.066-6.054h-3.585v4.385h3.552c1.546 0 2.5-.785 2.5-2.208 0-1.391-.954-2.177-2.467-2.177zM73.845 10.995h-3.651v3.731H67.2V3.272h6.71c3.536 0 5.395 1.473 5.395 3.83 0 2.437-1.892 3.893-5.46 3.893zm-.066-6.054h-3.585v4.385h3.552c1.546 0 2.5-.785 2.5-2.208 0-1.391-.954-2.177-2.467-2.177zM84.074 3.272v9.752h7.467v1.704h-10.46V3.272h2.993zM96.407 3.272h-2.993v11.456h2.993V3.272zM100.914 7.101v7.627H98.94V3.272h2.239l8.157 7.625V3.272h1.974v11.456h-2.237L100.914 7.1zM121.08 4.614c-2.846 0-4.704 1.8-4.704 4.483 0 2.65 1.776 4.287 4.539 4.287h.197c.938 0 1.99-.197 2.961-.507V9.784h-4.835V8.148H127v5.383c-1.611.835-4.046 1.49-6.019 1.49h-.263c-4.54 0-7.467-2.39-7.467-5.859 0-3.436 3.01-6.184 7.631-6.184h.263c1.925 0 4.128.605 5.757 1.554l-.856 1.39c-1.463-.801-3.207-1.308-4.769-1.308h-.197z" />
    </svg>
  )
}

function TopBarButton({
  label,
  iconName,
  onClick,
  isAi,
}: {
  label: string
  iconName?: string | null
  onClick?: () => void
  isAi?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded text-neutral-600',
        isAi
          ? 'text-violet-600 hover:bg-violet-50'
          : 'hover:bg-neutral-100 hover:text-neutral-900',
      )}
    >
      {isAi ? <Sparkle size={18} /> : <Icon name={iconName} size={18} />}
    </button>
  )
}
