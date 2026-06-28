'use client'

import { useRef, useEffect } from 'react'

// Los 5 planos según el diseño oficial (positions del CSS styles-v2.css)
// Colores + profundidades (--depth) según app-v2.jsx
const PLANES = [
  { cls: 'p1', color: 'var(--hierro)',   depth: 18, rot: -0.6, top: '14%', left: '12%', width: '28%', height: '44%' },
  { cls: 'p2', color: 'var(--ladrillo)', depth: 32, rot: 0.9,  top: '30%', left: '32%', width: '38%', height: '52%' },
  { cls: 'p3', color: 'var(--piedra)',   depth: 10, rot: -0.4, top: '18%', left: '56%', width: '24%', height: '22%' },
  { cls: 'p4', color: 'var(--ladrillo-d)',depth:22, rot: 0.6,  top: '56%', left: '60%', width: '18%', height: '30%' },
  { cls: 'p5', color: 'transparent',     depth: 6,  rot: -0.2, top: '60%', left: '8%',  width: '22%', height: '28%', outline: true },
]

const FLOAT_ANIMS = ['floatA', 'floatB', 'floatC', 'floatA', 'floatB']
const FLOAT_DURATIONS = ['9.2s', '11.4s', '8.6s', '10.1s', '12.8s']
const FLOAT_DIRS = ['normal', 'normal', 'normal', 'reverse', 'reverse']

export default function HeroInteractivo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const target = useRef({ x: 0, y: 0, p: 0 })
  const current = useRef({ x: 0, y: 0, p: 0 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = (e.clientX - cx) / (r.width / 2)
      const dy = (e.clientY - cy) / (r.height / 2)
      const inside =
        e.clientX >= r.left && e.clientX <= r.right &&
        e.clientY >= r.top  && e.clientY <= r.bottom
      let p: number
      if (inside) {
        p = 1
      } else {
        const ex = Math.max(r.left - e.clientX, 0, e.clientX - r.right)
        const ey = Math.max(r.top  - e.clientY, 0, e.clientY - r.bottom)
        p = Math.max(0, 1 - Math.hypot(ex, ey) / 260)
      }
      target.current.x = Math.max(-1.2, Math.min(1.2, dx))
      target.current.y = Math.max(-1.2, Math.min(1.2, dy))
      target.current.p = p
    }

    const onLeave = () => {
      target.current.x = 0
      target.current.y = 0
      target.current.p = 0
    }

    const tick = () => {
      const c = current.current
      const t = target.current
      c.x += (t.x - c.x) * 0.08
      c.y += (t.y - c.y) * 0.08
      c.p += (t.p - c.p) * 0.08
      if (el) {
        el.style.setProperty('--mx', c.x.toFixed(4))
        el.style.setProperty('--my', c.y.toFixed(4))
        el.style.setProperty('--prox', c.p.toFixed(4))
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseout', onLeave)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="hero-graphic-interactive"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Grid background */}
      <div className="grid-bg" />

      {/* 5 planos modulares */}
      {PLANES.map((plane, i) => (
        <div
          key={plane.cls}
          className={`hero-plane ${plane.cls}`}
          style={{
            position: 'absolute',
            top: plane.top,
            left: plane.left,
            width: plane.width,
            height: plane.height,
            background: plane.outline ? 'transparent' : plane.color,
            border: plane.outline ? `1.5px solid var(--hierro)` : 'none',
            // @ts-expect-error CSS custom properties
            '--depth': plane.depth,
            '--rot': plane.rot,
            animationName: FLOAT_ANIMS[i],
            animationDuration: FLOAT_DURATIONS[i],
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDirection: FLOAT_DIRS[i],
          }}
        />
      ))}

      {/* Corner annotations */}
      <span style={{
        position: 'absolute', top: 14, left: 14,
        fontFamily: 'var(--font-mono)',
        fontSize: '10.5px',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'var(--ink-mute)',
        zIndex: 2,
      }}>
        SISTEMA / PLANOS · MÓDULO 12
      </span>
      <span style={{
        position: 'absolute', top: 14, right: 14,
        fontFamily: 'var(--font-mono)',
        fontSize: '10.5px',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        zIndex: 2,
      }}>
        ● 01
      </span>
      <span style={{
        position: 'absolute', bottom: 14, right: 14,
        fontFamily: 'var(--font-mono)',
        fontSize: '10.5px',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'var(--ink-mute)',
        zIndex: 2,
      }}>
        FIG. 01 — COMPOSICIÓN BASE
      </span>
    </div>
  )
}
