import { Sparkle } from '@phosphor-icons/react'
import type { CatalogResponse } from '@/api/nav.ts'
import { Icon } from '@/lib/icon.tsx'
import { resolve, buildConditionSet, type ResolveContext } from '@/lib/visibility.ts'
import { cn } from '@/lib/cn.ts'
import { useHud } from '@/state/HudContext.tsx'
import { EverythingBarButton } from './EverythingBar/EverythingBarButton.tsx'

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
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-neutral-200 bg-white px-4">
      {logo && (
        <button className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
          <Icon name={logo.icon} size={20} />
          <span className="hidden sm:inline">{logo.label}</span>
        </button>
      )}

      <EverythingBarButton onClick={onOpenBar} />

      <div className="flex items-center gap-1">
        {others.map((w) => (
          <TopBarButton
            key={w.id}
            label={w.label}
            iconName={w.icon}
            onClick={w.id === 'ai-assistant' || w.id === 'chat-assistant' ? onOpenChat : undefined}
            isAi={w.id === 'ai-assistant' || w.id === 'chat-assistant'}
          />
        ))}
        {/* Always-on AI trigger for the prototype, even if widget isn't in the frame for this view */}
        {!others.some((w) => w.id === 'ai-assistant' || w.id === 'chat-assistant') && (
          <TopBarButton label="Rippling AI" iconName="Sparkle" onClick={onOpenChat} isAi />
        )}
      </div>
    </header>
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
