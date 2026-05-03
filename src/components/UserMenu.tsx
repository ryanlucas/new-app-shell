import { useState, useRef, useEffect, useLayoutEffect, type MouseEvent as ReactMouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { cn } from '@/lib/cn.ts'
import {
  Gear,
  SignOut,
  UserCircle,
  ShareNetwork,
  Buildings,
  Question,
  Megaphone,
  Translate,
  CaretRight,
  Check,
} from '@phosphor-icons/react'

const CURRENT_USER = {
  name: 'Parker Conrad',
  initials: 'PC',
  role: 'CEO & Co-Founder',
  department: 'Executive',
  employeeId: 'EMP-00001',
  location: 'San Francisco, CA',
  since: 'Aug 2016',
  photo: '/avatar.png',
}

const PLUM = 'rgb(74, 0, 57)'
const ELEVATION_OVERLAY =
  '0 16px 40px -8px rgba(0,0,0,0.35), 0 6px 16px -4px rgba(0,0,0,0.18)'
const INSET_BEVEL =
  'inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.4)'

// --- Tilt hook ---

function useTilt() {
  const x = useSpring(0, { stiffness: 200, damping: 20 })
  const y = useSpring(0, { stiffness: 200, damping: 20 })
  const rotateX = useTransform(y, [-0.5, 0.5], [3, -3])
  const rotateY = useTransform(x, [-0.5, 0.5], [-3, 3])

  function onMove(e: ReactMouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return { rotateX, rotateY, x, y, onMove, onLeave }
}

// --- WebGL metallic shine ---

const METAL_FRAG = `
precision highp float;
uniform vec2 u_resolution;
uniform vec2 u_tilt;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv.y = 1.0 - uv.y;

  float tx = u_tilt.x;
  float ty = u_tilt.y;

  float a = tx * 0.6;
  float ca = cos(a), sa = sin(a);
  vec2 c = uv - 0.5;
  float p = c.x * sa + c.y * ca;

  float b1 = p + ty * 0.8;
  float band1 = exp(-b1 * b1 * 40.0) * 0.65;

  float b2 = p + ty * 0.8 + 0.25;
  float band2 = exp(-b2 * b2 * 8.0) * 0.18;

  float ambient = ty * (0.5 - uv.y) * 0.12;

  float grain = noise(vec2(uv.x * 300.0, uv.y * 12.0));
  float grainFine = noise(vec2(uv.x * 800.0, uv.y * 4.0));
  float texture = mix(grain, grainFine, 0.4) * 0.12 - 0.06;

  float splotch = noise(uv * 8.0) * 0.04 - 0.02;

  float result = band1 + band2 + ambient + texture + splotch;
  result = clamp(result, 0.0, 0.85);

  vec3 col = vec3(1.0, 0.85, 0.9);
  gl_FragColor = vec4(col, result);
}`

function MetalShine({
  cursorX,
  cursorY,
}: {
  cursorX: MotionValue<number>
  cursorY: MotionValue<number>
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glRef = useRef<{
    gl: WebGLRenderingContext
    prog: WebGLProgram
    tiltLoc: WebGLUniformLocation | null
    resLoc: WebGLUniformLocation | null
  } | null>(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false })
    if (!gl) return

    const vs = gl.createShader(gl.VERTEX_SHADER)!
    gl.shaderSource(vs, 'attribute vec2 a_pos;void main(){gl_Position=vec4(a_pos,0,1);}')
    gl.compileShader(vs)

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(fs, METAL_FRAG)
    gl.compileShader(fs)

    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    const resLoc = gl.getUniformLocation(prog, 'u_resolution')
    const tiltLoc = gl.getUniformLocation(prog, 'u_tilt')
    glRef.current = { gl, prog, tiltLoc, resLoc }

    function resize() {
      const parent = canvas!.parentElement
      if (!parent) return
      const dpr = window.devicePixelRatio || 1
      const rect = parent.getBoundingClientRect()
      canvas!.width = rect.width * dpr
      canvas!.height = rect.height * dpr
      canvas!.style.width = rect.width + 'px'
      canvas!.style.height = rect.height + 'px'
      gl!.viewport(0, 0, canvas!.width, canvas!.height)
      gl!.uniform2f(resLoc, canvas!.width, canvas!.height)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement!)
    resize()

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buf)
      glRef.current = null
    }
  }, [])

  useEffect(() => {
    function render() {
      const ctx = glRef.current
      if (ctx) {
        const { gl, tiltLoc } = ctx
        gl.uniform2f(tiltLoc, cursorX.get(), cursorY.get())
        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }
      rafRef.current = requestAnimationFrame(render)
    }
    rafRef.current = requestAnimationFrame(render)
    return () => cancelAnimationFrame(rafRef.current)
  }, [cursorX, cursorY])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 rounded-[10px]"
      style={{ zIndex: 1, mixBlendMode: 'soft-light' }}
    />
  )
}

// --- Badge Card ---

const LOGO_PATH =
  'M15.35 26.61C15.35 16.05 10 7.33 0 0h23.24c8.31 6.33 13.17 16.17 13.16 26.61 0 10.44-4.85 20.29-13.16 26.61 7.55 3.15 11.84 10.83 11.84 21.82v20.94H14.04V75.05c0-10.47-5-17.8-14.03-21.81C10 45.9 15.35 37.18 15.35 26.62zm45.61 0C60.96 16.05 55.61 7.33 45.61 0h23.25c8.3 6.33 13.17 16.17 13.15 26.61 0 10.44-4.85 20.29-13.15 26.61 7.54 3.15 11.84 10.83 11.84 21.82v20.94H59.65V75.05c0-10.47-5-17.8-14.04-21.81C55.61 45.9 60.96 37.18 60.96 26.62zm45.62 0c0-10.56-5.35-19.28-15.35-26.61h23.24c8.31 6.33 13.17 16.17 13.16 26.61 0 10.44-4.87 20.29-13.16 26.61 7.55 3.15 11.84 10.83 11.84 21.82v20.94h-21.05V75.05c0-10.47-5-17.8-14.03-21.81 10-7.33 15.35-16.05 15.35-26.61z'

function BadgeCard({
  rotateX,
  rotateY,
  cursorX,
  cursorY,
}: {
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
  cursorX: MotionValue<number>
  cursorY: MotionValue<number>
}) {
  const shadowX = useTransform(rotateY, [-3, 3], [6, -6])
  const shadowY = useTransform(rotateX, [-3, 3], [-3, 8])
  const shadow = useTransform(
    [shadowX, shadowY],
    ([sx, sy]: number[]) =>
      `${sx}px ${sy}px 28px rgba(40,0,30,0.5), 0 2px 6px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(120,40,100,0.3)`,
  )

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 600, boxShadow: shadow }}
      className="relative w-[232px] cursor-grab select-none overflow-hidden rounded-[10px] active:cursor-grabbing"
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="relative overflow-hidden rounded-[10px]" style={{ background: PLUM }}>
        <div className="relative overflow-hidden" style={{ height: 180 }}>
          <img
            src={CURRENT_USER.photo}
            alt={CURRENT_USER.name}
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{ filter: 'grayscale(1) contrast(1.15) brightness(0.95)' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(74, 0, 57, 0.55)', mixBlendMode: 'color' }}
          />
          <svg
            className="absolute bottom-0 left-0 w-full"
            viewBox="0 0 232 60"
            preserveAspectRatio="none"
            style={{ height: 60 }}
          >
            <polygon points="0,60 232,20 232,60" fill={PLUM} />
          </svg>
          <div className="absolute left-4 top-3.5 z-10" style={{ opacity: 0.7 }}>
            <svg width="22" height="16" viewBox="0 0 128 96" fill="none">
              <path d={LOGO_PATH} fill="white" />
            </svg>
          </div>
        </div>

        <div className="relative px-5 pb-4 pt-1">
          <div>
            <div
              className="text-[20px] font-bold leading-tight tracking-[-0.03em]"
              style={{ color: 'rgba(255,255,255,0.95)' }}
            >
              {CURRENT_USER.name}
            </div>
            <div
              className="mt-0.5 text-[11px] font-medium uppercase tracking-wide"
              style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em' }}
            >
              {CURRENT_USER.role}
            </div>
          </div>

          <div className="my-3" style={{ height: 1, background: 'rgba(255,255,255,0.1)' }} />

          <div className="space-y-1">
            {(
              [
                ['Dept', CURRENT_USER.department, false],
                ['ID', CURRENT_USER.employeeId, true],
                [
                  'Joined',
                  (() => {
                    const start = new Date(CURRENT_USER.since)
                    const years = Math.floor(
                      (Date.now() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000),
                    )
                    return `${CURRENT_USER.since} · ${years} yrs`
                  })(),
                  false,
                ],
              ] as const
            ).map(([label, value, mono]) => (
              <div key={label} className="flex items-baseline justify-between">
                <span
                  className="text-[9px] font-semibold uppercase"
                  style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em' }}
                >
                  {label}
                </span>
                <span
                  className={`text-[11px] ${mono ? 'font-mono tracking-wide' : 'font-medium'}`}
                  style={{ color: 'rgba(255,255,255,0.85)' }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MetalShine cursorX={cursorX} cursorY={cursorY} />

      <div
        className="pointer-events-none absolute inset-0 rounded-[10px]"
        style={{
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.08),
            inset 0 -1px 0 rgba(0,0,0,0.15),
            inset 1px 0 0 rgba(255,255,255,0.04),
            inset -1px 0 0 rgba(255,255,255,0.04)
          `,
        }}
      />
    </motion.div>
  )
}

// --- Submenus ---

const LANGUAGES = [
  { id: 'en', label: 'English' },
  { id: 'es', label: 'Español' },
  { id: 'fr', label: 'Français' },
  { id: 'de', label: 'Deutsch' },
  { id: 'pt', label: 'Português' },
  { id: 'ja', label: '日本語' },
  { id: 'zh', label: '中文' },
]

const COMPANIES = [
  { id: 'rippling', label: 'Rippling' },
  { id: 'acme', label: 'Acme Corp' },
  { id: 'demo', label: 'Demo Co' },
]

function SubmenuItem({
  icon: Icon,
  label,
  items,
  activeId,
  onPick,
}: {
  icon: React.ComponentType<{ size?: number; weight?: string; className?: string }>
  label: string
  items: Array<{ id: string; label: string }>
  activeId?: string
  onPick: () => void
}) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useLayoutEffect(() => {
    if (!open || !buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const SUBMENU_W = 200
    const SUBMENU_H_MAX = items.length * 32 + 12
    const GAP = 14
    const PAD = 12

    // Horizontal: prefer right of button; flip to left if it would clip.
    let left = rect.right + GAP
    if (left + SUBMENU_W > window.innerWidth - PAD) {
      left = rect.left - GAP - SUBMENU_W
    }
    // Vertical: prefer top-aligned with button; lift up if it would clip
    // the bottom of the viewport.
    let top = rect.top
    if (top + SUBMENU_H_MAX > window.innerHeight - PAD) {
      top = window.innerHeight - PAD - SUBMENU_H_MAX
    }
    if (top < PAD) top = PAD

    setPos({ top, left })
  }, [open, items.length])

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const handleLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  return (
    <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-[13px] text-neutral-300 transition-colors hover:bg-white/10 hover:text-white',
          open && 'bg-white/10 text-white',
        )}
      >
        <Icon size={16} />
        <span className="flex-1 text-left">{label}</span>
        <CaretRight size={12} className="text-neutral-500" />
      </button>

      {open && pos &&
        createPortal(
          <div
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 60 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.12 }}
              className="w-[200px] rounded-xl p-[6px]"
              style={{
                boxShadow: `${ELEVATION_OVERLAY}, ${INSET_BEVEL}`,
                backgroundColor: '#1c1c1e',
              }}
            >
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setOpen(false)
                    onPick()
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-[13px] text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <span className="flex-1 text-left">{item.label}</span>
                  {activeId === item.id && <Check size={12} className="text-neutral-300" />}
                </button>
              ))}
            </motion.div>
          </div>,
          document.body,
        )}
    </div>
  )
}

// --- User Menu ---

interface Props {
  open: boolean
  onClose: () => void
  anchorRef?: React.RefObject<HTMLElement | null>
}

export function UserMenu({ open, onClose, anchorRef }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const tilt = useTilt()

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (ref.current && ref.current.contains(e.target as Node)) return
      if (anchorRef?.current && anchorRef.current.contains(e.target as Node)) return
      onClose()
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose, anchorRef])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="fixed bottom-[20px] left-[58px] z-50 flex w-[500px] overflow-hidden rounded-xl"
          style={{
            boxShadow: `${ELEVATION_OVERLAY}, ${INSET_BEVEL}`,
            backgroundColor: '#1c1c1e',
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
            style={{ opacity: 0.1 }}
          >
            <svg width="100%" height="100%">
              <filter id="avatar-grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#avatar-grain)" />
            </svg>
          </div>

          <div
            className="shrink-0 p-4"
            onMouseMove={tilt.onMove}
            onMouseLeave={tilt.onLeave}
            style={{ perspective: 600 }}
          >
            <BadgeCard
              rotateX={tilt.rotateX}
              rotateY={tilt.rotateY}
              cursorX={tilt.x}
              cursorY={tilt.y}
            />
          </div>

          <div className="flex flex-1 flex-col py-4 pl-1 pr-2">
            {[
              { icon: UserCircle, label: 'My profile' },
              { icon: Gear, label: 'Account settings' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={onClose}
                className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-[13px] text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </button>
            ))}

            <div className="my-1 mx-2 border-t border-white/10" />

            {[
              { icon: Question, label: 'Help' },
              { icon: Megaphone, label: "What's new" },
              { icon: ShareNetwork, label: 'Refer a friend' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={onClose}
                className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-[13px] text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </button>
            ))}
            <SubmenuItem
              icon={Translate}
              label="Language"
              items={LANGUAGES}
              activeId="en"
              onPick={onClose}
            />

            <div className="my-1 mx-2 border-t border-white/10" />

            <SubmenuItem
              icon={Buildings}
              label="Switch company"
              items={COMPANIES}
              activeId="rippling"
              onPick={onClose}
            />
            <button
              onClick={onClose}
              className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-[13px] text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <SignOut size={16} />
              <span>Sign out</span>
            </button>

            <div className="mx-3 mt-3 flex flex-wrap gap-x-2 gap-y-1 text-[10px] text-neutral-500">
              <button onClick={onClose} className="hover:text-neutral-300">
                Legal
              </button>
              <span className="text-neutral-600">·</span>
              <button onClick={onClose} className="hover:text-neutral-300">
                Terms
              </button>
              <span className="text-neutral-600">·</span>
              <button onClick={onClose} className="hover:text-neutral-300">
                Accessibility
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
