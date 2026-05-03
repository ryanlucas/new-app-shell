import type { CatalogResponse } from '@/mocks/handlers.ts'

export type { CatalogResponse }

export async function fetchCatalog(view: string): Promise<CatalogResponse> {
  const r = await fetch(`/api/catalog?view=${encodeURIComponent(view)}`)
  if (!r.ok) throw new Error(`fetchCatalog failed: ${r.status} ${r.statusText}`)
  return (await r.json()) as CatalogResponse
}
