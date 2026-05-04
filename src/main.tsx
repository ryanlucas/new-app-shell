import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Catalog is built in-process via `lib/catalogStore.ts` — no network,
// no service worker. Works in dev, production, and any embedded shell
// (Tauri etc.) without bootstrapping mocks.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
