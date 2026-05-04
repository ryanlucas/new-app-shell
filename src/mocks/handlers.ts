import { http, HttpResponse } from 'msw'
import { buildCatalog } from '@/lib/catalogStore.ts'

export type { CatalogResponse } from '@/lib/catalogStore.ts'

// MSW handlers are only registered in dev (see main.tsx). The catalog
// itself is built by `lib/catalogStore.ts` so it works in both dev and
// production. The handler exists in case anything in dev still wants to
// hit `/api/catalog` over the network.
export const handlers = [
  http.get('/api/catalog', ({ request }) => {
    const url = new URL(request.url)
    const view = url.searchParams.get('view') ?? 'current'
    const catalog = buildCatalog(view)
    if (!catalog)
      return HttpResponse.json({ error: `unknown view "${view}"` }, { status: 404 })
    return HttpResponse.json(catalog)
  }),
]
