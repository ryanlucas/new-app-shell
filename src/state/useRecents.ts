import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'app-shell-prototype-recents-v1'
const MAX = 8

function load(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

/** Tracks recently navigated app ids. MRU-ordered. */
export function useRecents() {
  const [items, setItems] = useState<string[]>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* ignore */
    }
  }, [items])

  const add = useCallback((id: string) => {
    setItems((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, MAX))
  }, [])

  return { recents: items, addRecent: add }
}
