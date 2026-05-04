import type { CatalogResponse } from '@/api/nav.ts'

interface Props {
  catalog: CatalogResponse
  selectedAppId: string | null
}

export function ContentPlaceholder({ catalog, selectedAppId }: Props) {
  // Find the app and its suite (if any) by walking the composed catalog
  let app: { id: string; label: string; path: string | null } | null = null
  let suiteLabel: string | null = null

  for (const surface of [
    ...catalog.frame.sidebar.firstSection,
    ...catalog.frame.sidebar.thirdSection,
  ]) {
    if (surface.id === selectedAppId) {
      app = { id: surface.id, label: surface.label, path: surface.path ?? null }
      break
    }
  }
  if (!app) {
    for (const suite of catalog.suites.suites) {
      const found = (suite.apps ?? []).find((a) => a.id === selectedAppId)
      if (found) {
        app = { id: found.id, label: found.label, path: found.path ?? null }
        suiteLabel = suite.label
        break
      }
    }
  }

  const l3 = selectedAppId ? catalog.apps[selectedAppId] : null

  return (
    <main className="flex-1 overflow-auto bg-white p-8">
      {!app ? (
        <div className="mx-auto max-w-xl text-center text-neutral-500">
          <h1 className="text-xl font-medium text-neutral-900">Rippling Shell Prototype</h1>
          <p className="mt-2 text-sm">
            Pick something from the sidebar. The main content area is intentionally a placeholder
            for this prototype — we're focused on shell, navigation, and AI chat.
          </p>
          <p className="mt-4 text-xs text-neutral-400">
            <kbd className="rounded border border-neutral-300 bg-neutral-100 px-1.5 py-0.5">⌘.</kbd>{' '}
            opens the dev HUD to switch personas, plans, and IA proposals.
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl">
          <div className="text-xs text-neutral-500">
            {suiteLabel && <span>{suiteLabel} ›</span>}
          </div>
          <h1 className="mt-1 text-2xl font-semibold text-neutral-900">{app.label}</h1>
          <p className="mt-1 text-sm text-neutral-500">
            <code>{app.path ?? '(no path)'}</code>
          </p>

          {l3 && l3.nav && Array.isArray(l3.nav) && l3.nav.length > 0 ? (
            <section className="mt-6">
              <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-500">
                Internal navigation
              </h2>
              <ul className="mt-2 grid grid-cols-2 gap-2">
                {(l3.nav as Array<{ id: string; label: string; path: string | null }>).map((n) => (
                  <li
                    key={n.id}
                    className="rounded border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm"
                  >
                    <div className="font-medium text-neutral-800">{n.label}</div>
                    <div className="text-xs text-neutral-500">{n.path ?? '—'}</div>
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <p className="mt-6 text-sm text-neutral-400">
              No L3 internal nav defined for this app. (Phase 2 marked it as a single-page or
              third-party app.)
            </p>
          )}
        </div>
      )}
    </main>
  )
}
