import { HudProvider } from '@/state/HudContext.tsx'
import { FavoritesProvider } from '@/state/FavoritesContext.tsx'
import { AppShell } from '@/components/AppShell.tsx'

export default function App() {
  return (
    <HudProvider>
      <FavoritesProvider>
        <AppShell />
      </FavoritesProvider>
    </HudProvider>
  )
}
