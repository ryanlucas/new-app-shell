import { X, Tray } from '@phosphor-icons/react'
import { cn } from '@/lib/cn.ts'

interface Props {
  onClose: () => void
}

interface InboxItem {
  id: string
  title: string
  meta: string
  read?: boolean
}

const FAKE_ITEMS: InboxItem[] = [
  {
    id: '1',
    title: 'Approve PTO request — Maya Patel',
    meta: 'HR · 2h ago',
  },
  {
    id: '2',
    title: 'Review expense report — $1,284 (Travel)',
    meta: 'Finance · 4h ago',
  },
  {
    id: '3',
    title: 'Q3 review cycle ready to launch',
    meta: 'Talent · yesterday',
    read: true,
  },
  {
    id: '4',
    title: 'New hire onboarding: Devon Walker',
    meta: 'HR · 2 days ago',
    read: true,
  },
  {
    id: '5',
    title: 'Open enrollment closes Friday',
    meta: 'Benefits · 3 days ago',
    read: true,
  },
]

export function InboxPanel({ onClose }: Props) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-neutral-200 px-4">
        <div className="flex items-center gap-2">
          <Tray size={16} weight="duotone" className="text-neutral-700" />
          <span className="text-sm font-medium">Inbox</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
          aria-label="Close inbox"
        >
          <X size={16} />
        </button>
      </header>

      <ul className="flex-1 overflow-y-auto">
        {FAKE_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className="flex w-full flex-col gap-0.5 border-b border-neutral-100 px-4 py-3 text-left hover:bg-neutral-50"
            >
              <span
                className={cn(
                  'text-sm',
                  item.read ? 'text-neutral-600' : 'font-medium text-neutral-900',
                )}
              >
                {item.title}
              </span>
              <span className="text-[11px] text-neutral-400">{item.meta}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
