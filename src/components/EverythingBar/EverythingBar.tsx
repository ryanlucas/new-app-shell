import { useEffect, useRef, useState } from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'
import type { CatalogResponse } from '@/api/nav.ts'
import { MegaMenu } from './MegaMenu.tsx'

interface Props {
  open: boolean
  onClose: () => void
  catalog: CatalogResponse
}

export function EverythingBar({ open, onClose, catalog }: Props) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  if (!open) return null

  const handleSelect = (node: { kind: 'suite' | 'app'; id: string; label: string }) => {
    // eslint-disable-next-line no-console
    console.log('[EverythingBar]', node)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-[10vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex w-auto flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-neutral-100 px-4 py-3">
          <MagnifyingGlass size={18} className="text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Rippling or browse all apps"
            className="w-[460px] bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          />
          <kbd className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[10px] text-neutral-500">
            esc
          </kbd>
        </div>
        <MegaMenu catalog={catalog} query={query} onSelect={handleSelect} />
      </div>
    </div>
  )
}
