import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { CatalogResponse } from '@/api/nav.ts'
import { cn } from '@/lib/cn.ts'
import { MegaMenu } from './MegaMenu.tsx'

interface Props {
  open: boolean
  onClose: () => void
  catalog: CatalogResponse
  onNavigate: (appId: string) => void
}

const EXIT_MS = 140

/** Smoothly animates height when content changes. ResizeObserver tracks
 *  the inner content's natural height; framer-motion drives the wrapper
 *  with a spring. */
function HeightMotion({ children }: { children: React.ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | undefined>()

  useLayoutEffect(() => {
    if (!innerRef.current) return
    setHeight(innerRef.current.offsetHeight)
    const obs = new ResizeObserver((entries) => {
      const h = entries[0]?.contentRect.height
      if (typeof h === 'number') setHeight(h)
    })
    obs.observe(innerRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <motion.div
      initial={false}
      animate={{ height }}
      transition={{ type: 'spring', stiffness: 380, damping: 36, mass: 0.9 }}
      style={{ overflow: 'hidden' }}
    >
      <div ref={innerRef}>{children}</div>
    </motion.div>
  )
}

export function EverythingBar({ open, onClose, catalog, onNavigate }: Props) {
  const [mounted, setMounted] = useState(open)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (open) {
      setMounted(true)
      setExiting(false)
    } else if (mounted) {
      setExiting(true)
      const t = setTimeout(() => {
        setMounted(false)
        setExiting(false)
      }, EXIT_MS)
      return () => clearTimeout(t)
    }
  }, [open, mounted])

  if (!mounted) return null

  const handleSelect = (node: { kind: 'suite' | 'app'; id: string; label: string }) => {
    // App ids navigate directly. Suites have no canonical landing page in
    // the prototype yet — log and close.
    if (node.kind === 'app') onNavigate(node.id)
    onClose()
  }

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/30',
          exiting ? 'menu-overlay-exit' : 'menu-overlay',
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          'fixed left-[64px] top-[60px] z-50 flex w-[520px] flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl',
          exiting ? 'menu-pop-exit' : 'menu-pop',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <HeightMotion>
          <MegaMenu catalog={catalog} query="" onSelect={handleSelect} />
        </HeightMotion>
      </div>
    </>
  )
}
