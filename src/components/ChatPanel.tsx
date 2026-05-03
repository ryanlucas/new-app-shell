import { X, ChatCircle, MagnifyingGlass } from '@phosphor-icons/react'
import { cn } from '@/lib/cn.ts'

interface Props {
  onClose: () => void
}

interface Conversation {
  id: string
  name: string
  preview: string
  meta: string
  unread?: boolean
  kind: 'dm' | 'channel'
}

const FAKE_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    name: 'Maya Patel',
    preview: 'Sent you the Q3 review draft, lmk',
    meta: '12m',
    unread: true,
    kind: 'dm',
  },
  {
    id: '2',
    name: '#hiring',
    preview: 'Devon: offer accepted, start date Mon',
    meta: '1h',
    unread: true,
    kind: 'channel',
  },
  {
    id: '3',
    name: 'Devon Walker',
    preview: 'Thanks! See you Monday.',
    meta: '2h',
    kind: 'dm',
  },
  {
    id: '4',
    name: '#payroll-ops',
    preview: 'Run for tomorrow is queued',
    meta: '4h',
    kind: 'channel',
  },
  {
    id: '5',
    name: 'Sasha Reyes',
    preview: 'Coffee Wednesday?',
    meta: 'Yesterday',
    kind: 'dm',
  },
  {
    id: '6',
    name: '#leadership',
    preview: 'Q4 OKRs are live',
    meta: '2d',
    kind: 'channel',
  },
]

export function ChatPanel({ onClose }: Props) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-neutral-200 px-4">
        <div className="flex items-center gap-2">
          <ChatCircle size={16} weight="duotone" className="text-neutral-700" />
          <span className="text-sm font-medium">Chat</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
          aria-label="Close chat"
        >
          <X size={16} />
        </button>
      </header>

      <div className="shrink-0 px-3 pb-2 pt-3">
        <div className="flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1.5">
          <MagnifyingGlass size={14} className="text-neutral-400" />
          <input
            type="text"
            placeholder="Search conversations…"
            disabled
            className="flex-1 bg-transparent text-[13px] placeholder:text-neutral-400 focus:outline-none"
          />
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto">
        {FAKE_CONVERSATIONS.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              className="flex w-full items-start gap-3 border-b border-neutral-100 px-4 py-3 text-left hover:bg-neutral-50"
            >
              <div className="mt-0.5 h-7 w-7 shrink-0 rounded-full bg-neutral-200 text-center text-[11px] font-medium leading-7 text-neutral-600">
                {c.kind === 'channel' ? '#' : c.name[0]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span
                    className={cn(
                      'truncate text-[13px]',
                      c.unread ? 'font-semibold text-neutral-900' : 'font-medium text-neutral-700',
                    )}
                  >
                    {c.name}
                  </span>
                  <span className="text-[10px] text-neutral-400">{c.meta}</span>
                </div>
                <div
                  className={cn(
                    'truncate text-[12px]',
                    c.unread ? 'text-neutral-700' : 'text-neutral-500',
                  )}
                >
                  {c.preview}
                </div>
              </div>
              {c.unread && <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-neutral-900" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
