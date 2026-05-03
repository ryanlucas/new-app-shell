import { useEffect, useState } from 'react'
import { fetchCatalog, type CatalogResponse } from '@/api/nav.ts'

export interface CatalogQuery {
  data: CatalogResponse | null
  loading: boolean
  error: Error | null
}

export function useCatalog(view: string): CatalogQuery {
  const [data, setData] = useState<CatalogResponse | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchCatalog(view)
      .then((d) => {
        if (cancelled) return
        setData(d)
        setError(null)
      })
      .catch((e: unknown) => {
        if (cancelled) return
        setError(e instanceof Error ? e : new Error(String(e)))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [view])

  return { data, loading, error }
}
