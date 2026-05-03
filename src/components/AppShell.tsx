import { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useHud } from '@/state/HudContext.tsx'
import { useCatalog } from '@/state/useCatalog.ts'
import { AvatarRail, LeftRail } from './LeftRail.tsx'
import { ContentPlaceholder } from './ContentPlaceholder.tsx'
import { AiChatPanel } from './AiChatPanel.tsx'
import { InboxPanel } from './InboxPanel.tsx'
import { ChatPanel } from './ChatPanel.tsx'
import { DevHud } from './DevHud.tsx'
import { EverythingBar } from './EverythingBar/EverythingBar.tsx'
import { useEverythingBar } from './EverythingBar/useEverythingBar.ts'
import { CommandBar } from './CommandBar/CommandBar.tsx'
import { useCommandBar } from './CommandBar/useCommandBar.ts'

export function AppShell() {
  const hud = useHud()
  const { data: catalog, loading, error } = useCatalog(hud.view)
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null)

  // Single side-panel slot — only one of AI / Inbox / Chat can be open
  // at a time. Click the active one's rail icon to close.
  const [sidePanel, setSidePanel] = useState<null | 'ai' | 'inbox' | 'chat'>(null)
  const bar = useEverythingBar()
  const cmd = useCommandBar()

  const handleNavigate = useCallback((appId: string) => {
    setSelectedAppId(appId)
  }, [])
  const toggleAi = useCallback(
    () => setSidePanel((v) => (v === 'ai' ? null : 'ai')),
    [],
  )
  const toggleInbox = useCallback(
    () => setSidePanel((v) => (v === 'inbox' ? null : 'inbox')),
    [],
  )
  const toggleChat = useCallback(
    () => setSidePanel((v) => (v === 'chat' ? null : 'chat')),
    [],
  )
  const closeSidePanel = useCallback(() => setSidePanel(null), [])
  const aiOpen = sidePanel === 'ai'
  const inboxOpen = sidePanel === 'inbox'
  const chatOpen = sidePanel === 'chat'

  if (loading && !catalog) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-neutral-500">
        Loading catalog…
      </div>
    )
  }
  if (error) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-red-600">
        Failed to load catalog: {error.message}
      </div>
    )
  }
  if (!catalog) return null

  return (
    <div className="flex h-full gap-2 bg-neutral-200 p-2 text-neutral-900">
      <div className="flex flex-col justify-between">
        <LeftRail
          onOpenMenu={() => bar.setOpen(true)}
          onToggleAi={toggleAi}
          aiOpen={aiOpen}
          onToggleInbox={toggleInbox}
          inboxOpen={inboxOpen}
          onToggleChat={toggleChat}
          chatOpen={chatOpen}
          onOpenSearch={() => cmd.setOpen(true)}
          onGoHome={() => setSelectedAppId(null)}
        />
        <AvatarRail />
      </div>
      <AnimatePresence initial={false}>
        {sidePanel && (
          <motion.aside
            key="side-panel"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 380, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{
              width: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.18, ease: 'easeOut' },
            }}
            className="flex h-full shrink-0 flex-col overflow-hidden"
          >
            <div className="flex h-full w-[380px] flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-md">
              {sidePanel === 'ai' && <AiChatPanel onClose={closeSidePanel} />}
              {sidePanel === 'inbox' && <InboxPanel onClose={closeSidePanel} />}
              {sidePanel === 'chat' && <ChatPanel onClose={closeSidePanel} />}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      <main className="flex h-full flex-1 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-md">
        <ContentPlaceholder catalog={catalog} selectedAppId={selectedAppId} />
      </main>
      <EverythingBar
        open={bar.open}
        onClose={() => bar.setOpen(false)}
        catalog={catalog}
        onNavigate={handleNavigate}
      />
      <CommandBar
        open={cmd.open}
        onClose={() => cmd.setOpen(false)}
        catalog={catalog}
        onNavigate={handleNavigate}
        onToggleChat={toggleAi}
      />
      <DevHud catalog={catalog} />
    </div>
  )
}
