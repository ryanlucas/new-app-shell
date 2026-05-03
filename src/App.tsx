import { HudProvider } from '@/state/HudContext.tsx'
import { AppShell } from '@/components/AppShell.tsx'

export default function App() {
  return (
    <HudProvider>
      <AppShell />
    </HudProvider>
  )
}
