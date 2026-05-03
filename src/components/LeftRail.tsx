import { MagnifyingGlass, Sparkle, SquaresFour, Tray } from '@phosphor-icons/react'
import { cn } from '@/lib/cn.ts'

interface Props {
  onOpenMenu: () => void
  onToggleChat: () => void
  chatOpen: boolean
  onOpenSearch?: () => void
  onOpenInbox?: () => void
  onGoHome?: () => void
}

export function LeftRail({
  onOpenMenu,
  onToggleChat,
  chatOpen,
  onOpenSearch,
  onOpenInbox,
  onGoHome,
}: Props) {
  return (
    <nav className="flex w-12 shrink-0 flex-col items-center rounded-xl border border-neutral-200/80 bg-white/95 py-2 shadow-md backdrop-blur-sm">
      <button
        type="button"
        onClick={onGoHome}
        title="Home"
        aria-label="Home"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-900 hover:bg-neutral-100"
      >
        <RipplingLogomark />
      </button>

      <div className="my-2 h-px w-6 bg-neutral-200" />

      <RailButton icon={<SquaresFour size={20} weight="duotone" />} label="Open menu" onClick={onOpenMenu} />
      <RailButton icon={<Tray size={20} weight="duotone" />} label="Inbox" onClick={onOpenInbox} />
      <RailButton icon={<MagnifyingGlass size={20} weight="duotone" />} label="Search" onClick={onOpenSearch} />
      <RailButton
        icon={<Sparkle size={20} weight={chatOpen ? 'fill' : 'duotone'} />}
        label={chatOpen ? 'Close Rippling AI' : 'Open Rippling AI'}
        onClick={onToggleChat}
        active={chatOpen}
      />
    </nav>
  )
}

/** Avatar floats at the bottom of the rail column with no surrounding pill. */
export function AvatarRail({ onOpenProfile }: { onOpenProfile?: () => void }) {
  return (
    <div className="mb-3 flex w-12 shrink-0 items-center justify-center">
      <button
        type="button"
        onClick={onOpenProfile}
        title="Profile"
        aria-label="Profile"
        className="h-9 w-9 overflow-hidden rounded-xl ring-1 ring-neutral-200 shadow-[0_4px_10px_-2px_rgba(0,0,0,0.22)] hover:ring-neutral-300"
      >
        <img
          src="/avatar.png"
          alt="Profile"
          className="h-full w-full object-cover"
        />
      </button>
    </div>
  )
}

function RailButton({
  icon,
  label,
  onClick,
  active,
}: {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  active?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        'mb-1 flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
        active
          ? 'bg-neutral-100 text-neutral-900'
          : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900',
      )}
    >
      {icon}
    </button>
  )
}

/** Just the three R's from the Rippling lockup — the logomark. */
function RipplingLogomark() {
  return (
    <svg
      width="22"
      height="14"
      viewBox="0 0 22.93 17.998"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M2.878 4.99C2.878 3.01 1.875 1.374 0 0h4.358a6.26 6.26 0 012.467 4.99 6.26 6.26 0 01-2.467 4.99c1.415.59 2.22 2.03 2.22 4.091v3.927H2.632v-3.927c0-1.963-.937-3.337-2.631-4.09 1.875-1.375 2.878-3.01 2.878-4.99zm8.552 0c0-1.98-1.003-3.616-2.878-4.99h4.359a6.26 6.26 0 012.466 4.99 6.26 6.26 0 01-2.466 4.99c1.414.59 2.22 2.03 2.22 4.091v3.927h-3.947v-3.927c0-1.963-.938-3.337-2.632-4.09 1.875-1.375 2.878-3.01 2.878-4.99zm8.554 0c0-1.98-1.003-3.616-2.878-4.99h4.358a6.26 6.26 0 012.467 4.99 6.26 6.26 0 01-2.467 4.99c1.415.59 2.22 2.03 2.22 4.091v3.927h-3.947v-3.927c0-1.963-.937-3.337-2.631-4.09 1.875-1.375 2.878-3.01 2.878-4.99z" />
    </svg>
  )
}
