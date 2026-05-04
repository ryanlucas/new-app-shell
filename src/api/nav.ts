import { buildCatalog, type CatalogResponse } from '@/lib/catalogStore.ts'

export type { CatalogResponse }

/** In-process catalog "fetch". No network, so it works in dev, in
 *  production builds, and in the desktop shell — all from the same
 *  imported JSON. */
export async function fetchCatalog(view: string): Promise<CatalogResponse> {
  const catalog = buildCatalog(view)
  if (!catalog) throw new Error(`fetchCatalog: unknown view "${view}"`)
  return catalog
}
