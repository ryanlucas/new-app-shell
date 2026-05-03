import { forwardRef } from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'

interface Props {
  onClick: () => void
}

export const EverythingBarButton = forwardRef<HTMLButtonElement, Props>(
  function EverythingBarButton({ onClick }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        data-everythingbar-trigger
        className="group ml-2 flex max-w-md flex-1 items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-500 transition-colors hover:border-neutral-300 hover:bg-white hover:text-neutral-700"
      >
        <MagnifyingGlass size={16} />
        <span className="flex-1 text-left">Search Rippling or browse all apps</span>
        <kbd className="hidden rounded bg-neutral-200/70 px-1.5 py-0.5 font-mono text-[10px] text-neutral-600 group-hover:bg-neutral-100 sm:inline">
          ⌘K
        </kbd>
      </button>
    )
  },
)
