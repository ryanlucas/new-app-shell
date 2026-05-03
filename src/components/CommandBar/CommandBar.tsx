import { useEffect, useMemo, useRef, useState } from 'react'
import { MagnifyingGlass, Sparkle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import type { CatalogResponse } from '@/api/nav.ts'
import { Icon } from '@/lib/icon.tsx'
import { resolve, buildConditionSet, type ResolveContext } from '@/lib/visibility.ts'
import { cn } from '@/lib/cn.ts'
import { useHud } from '@/state/HudContext.tsx'

interface Props {
  open: boolean
  onClose: () => void
  catalog: CatalogResponse
  onToggleChat: () => void
  onToggleInbox: () => void
  onNavigate: (appId: string) => void
  recents: string[]
}

interface CommandItem {
  id: string
  label: string
  hint?: string
  icon?: string
  kind: 'app' | 'suite' | 'action'
  run: () => void
}

const EXIT_MS = 120

export function CommandBar({
  open,
  onClose,
  catalog,
  onToggleChat,
  onToggleInbox,
  onNavigate,
  recents,
}: Props) {
  const hud = useHud()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const [mounted, setMounted] = useState(open)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (open) {
      setMounted(true)
      setExiting(false)
      setQuery('')
      setActive(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    } else if (mounted) {
      setExiting(true)
      const t = setTimeout(() => {
        setMounted(false)
        setExiting(false)
      }, EXIT_MS)
      return () => clearTimeout(t)
    }
  }, [open, mounted])

  const ctx: ResolveContext = useMemo(
    () => ({
      personas: new Set(hud.personas),
      partialScopes: new Set(hud.partialScopes),
      eeArchetypes: new Set(hud.eeArchetypes),
      ownedSuites: new Set(
        catalog.plans.plans.find((p) => p.id === hud.planId)?.ownedSuites ?? [],
      ),
      conditions: buildConditionSet(hud.derivedConditions, catalog.plans, hud.planId),
    }),
    [hud, catalog.plans],
  )

  // Lookup of all visible apps for searching + suggestion-building.
  const allItems = useMemo<CommandItem[]>(() => {
    const out: CommandItem[] = [
      {
        id: 'action:toggle-ai',
        label: 'Toggle Rippling AI',
        hint: 'Action',
        icon: 'Sparkle',
        kind: 'action',
        run: onToggleChat,
      },
      {
        id: 'action:toggle-inbox',
        label: 'Toggle Inbox',
        hint: 'Action',
        icon: 'Tray',
        kind: 'action',
        run: onToggleInbox,
      },
    ]
    for (const suite of catalog.suites.suites) {
      for (const app of suite.apps) {
        if (resolve(app, { ...ctx, suiteId: suite.id }) !== 'visible') continue
        out.push({
          id: `app:${app.id}`,
          label: app.label,
          hint: suite.label,
          icon: app.icon,
          kind: 'app',
          run: () => onNavigate(app.id),
        })
      }
    }
    return out
  }, [catalog.suites.suites, ctx, onToggleChat, onToggleInbox, onNavigate])

  // Default view (empty query): a curated short list of recents + a few
  // suggested actions. Search expands to the full universe.
  type Section = { title: string; items: CommandItem[] }
  const sections = useMemo<Section[]>(() => {
    const q = query.trim().toLowerCase()
    if (q) {
      const filtered = allItems
        .filter(
          (i) => i.label.toLowerCase().includes(q) || i.hint?.toLowerCase().includes(q),
        )
        .slice(0, 50)
      return [{ title: 'Results', items: filtered }]
    }
    const itemById = new Map(allItems.map((i) => [`app:${i.id.replace(/^app:/, '')}`, i]))
    // Recents (visible only)
    const recentItems: CommandItem[] = []
    for (const id of recents) {
      const it = itemById.get(`app:${id}`)
      if (it) recentItems.push(it)
    }
    const out: Section[] = []
    if (recentItems.length > 0) {
      out.push({ title: 'Recent', items: recentItems.slice(0, 5) })
    }
    const suggestions = allItems
      .filter((i) => i.kind === 'action' || i.id === 'app:my-profile' || i.id === 'app:inbox')
      .slice(0, 5)
    out.push({ title: 'Suggestions', items: suggestions })
    return out
  }, [allItems, query, recents])

  const filtered = useMemo(() => sections.flatMap((s) => s.items), [sections])

  // Reset active index when filtered set changes.
  useEffect(() => {
    setActive(0)
  }, [query])

  // Keyboard nav: ↑ ↓ Enter Esc
  useEffect(() => {
    if (!mounted) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((v) => Math.min(v + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((v) => Math.max(v - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const item = filtered[active]
        if (item) {
          item.run()
          onClose()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mounted, filtered, active, onClose])

  if (!mounted) return null

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.12 }}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.985 }}
        animate={{
          opacity: exiting ? 0 : 1,
          y: exiting ? 8 : 0,
          scale: exiting ? 0.985 : 1,
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 36, mass: 0.8 }}
        className="fixed left-1/2 top-[18vh] z-50 flex w-[560px] -translate-x-1/2 flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-neutral-100 px-4 py-3">
          <MagnifyingGlass size={18} className="text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          />
          <kbd className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[10px] text-neutral-500">
            esc
          </kbd>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto py-1">
          {filtered.length === 0 ? (
            <li className="px-4 py-6 text-center text-sm text-neutral-400">
              No matches.
            </li>
          ) : (
            (() => {
              let idx = 0
              return sections.map((section) => (
                <li key={section.title}>
                  <div className="px-4 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    {section.title}
                  </div>
                  <ul>
                    {section.items.map((item) => {
                      const i = idx++
                      const isActive = i === active
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            onMouseEnter={() => setActive(i)}
                            onClick={() => {
                              item.run()
                              onClose()
                            }}
                            className={cn(
                              'flex w-full items-center gap-2.5 px-4 py-2 text-left text-[13px]',
                              isActive ? 'bg-neutral-100' : 'hover:bg-neutral-50',
                            )}
                          >
                            {item.icon === 'Sparkle' ? (
                              <Sparkle size={14} className="text-neutral-500" />
                            ) : (
                              <Icon name={item.icon} size={14} className="text-neutral-500" />
                            )}
                            <span className="flex-1 truncate text-neutral-800">{item.label}</span>
                            {item.hint && (
                              <span className="text-[10px] uppercase tracking-wider text-neutral-400">
                                {item.hint}
                              </span>
                            )}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              ))
            })()
          )}
        </ul>
      </motion.div>
    </>
  )
}
