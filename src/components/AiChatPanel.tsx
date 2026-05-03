import { X, Sparkle, PaperPlaneRight } from '@phosphor-icons/react'
import { cn } from '@/lib/cn.ts'

interface Props {
  open: boolean
  onClose: () => void
}

const FAKE_THREAD: Array<{ role: 'user' | 'assistant'; content: string }> = [
  { role: 'user', content: 'How many people did we hire in Q3?' },
  {
    role: 'assistant',
    content:
      'In Q3 you made 47 hires across 8 departments. Engineering led with 19 (up from 12 in Q2). Want me to break down by location, or pull the offer-acceptance rate?',
  },
  { role: 'user', content: 'Acceptance rate by department.' },
  {
    role: 'assistant',
    content:
      "Q3 offer-acceptance rate (top to bottom): Engineering 91%, Sales 88%, Design 85%, Product 82%, Operations 79%, Customer Support 76%, Marketing 71%, People 67%. Want me to look at what's driving People's lower rate?",
  },
]

export function AiChatPanel({ open, onClose }: Props) {
  return (
    <aside
      className={cn(
        'fixed top-0 right-0 z-30 flex h-full w-[420px] flex-col border-l border-neutral-200 bg-white shadow-xl transition-transform duration-200',
        open ? 'translate-x-0' : 'translate-x-full',
      )}
    >
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 px-4">
        <div className="flex items-center gap-2">
          <Sparkle size={18} className="text-violet-600" />
          <span className="text-sm font-medium">Rippling AI</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
          aria-label="Close chat"
        >
          <X size={18} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <ul className="flex flex-col gap-3">
          {FAKE_THREAD.map((msg, i) => (
            <li
              key={i}
              className={cn(
                'max-w-[85%] rounded-xl px-3 py-2 text-sm',
                msg.role === 'user'
                  ? 'self-end bg-violet-600 text-white'
                  : 'self-start bg-neutral-100 text-neutral-800',
              )}
            >
              {msg.content}
            </li>
          ))}
        </ul>
      </div>

      <footer className="shrink-0 border-t border-neutral-200 p-3">
        <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-400">
          <input
            type="text"
            disabled
            placeholder="Ask Rippling AI…  (placeholder — not wired up yet)"
            className="flex-1 bg-transparent outline-none placeholder:text-neutral-400"
          />
          <PaperPlaneRight size={16} className="text-neutral-300" />
        </div>
      </footer>
    </aside>
  )
}
