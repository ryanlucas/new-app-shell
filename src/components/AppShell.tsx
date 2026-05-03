import { useState } from 'react'
import { useHud } from '@/state/HudContext.tsx'
import { useCatalog } from '@/state/useCatalog.ts'
import { Sidebar } from './Sidebar.tsx'
import { TopBar } from './TopBar.tsx'
import { ContentPlaceholder } from './ContentPlaceholder.tsx'
import { AiChatPanel } from './AiChatPanel.tsx'
import { DevHud } from './DevHud.tsx'

export function AppShell() {
  const hud = useHud()
  const { data: catalog, loading, error } = useCatalog(hud.view)
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null)
  const [chatOpen, setChatOpen] = useState(false)

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
    <div className="flex h-full flex-col bg-white text-neutral-900">
      <TopBar catalog={catalog} onOpenChat={() => setChatOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar catalog={catalog} selectedAppId={selectedAppId} onSelect={setSelectedAppId} />
        <ContentPlaceholder catalog={catalog} selectedAppId={selectedAppId} />
      </div>
      <AiChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
      <DevHud catalog={catalog} />
    </div>
  )
}
