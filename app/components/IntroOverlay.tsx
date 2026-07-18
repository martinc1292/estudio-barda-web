'use client'

/**
 * Intro de entrada al sitio (una vez por sesión): telón negro hierro,
 * el isotipo se traza en ladrillo, aparece el wordmark, y al final el
 * logo "vuela" hasta la posición del logo del navbar mientras el telón
 * se desliza hacia arriba revelando el sitio.
 *
 * - Gating sin flash: script inline (pre-hidratación) oculta el overlay
 *   si la intro ya se vio en esta sesión o hay prefers-reduced-motion.
 * - Skip: click / tecla / scroll saltan directo al finale.
 * - Fases 0–3s en CSS puro; JS solo gating, skip, medición FLIP y unmount.
 */

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { usePathname } from 'next/navigation'
import { ISO_PATH, ISO_PERIMETER, ISO_VIEWBOX } from '@/app/lib/barda-iso'

const SEEN_KEY = 'barda-intro-seen'

// ── Timing (ms) — ajustar acá ─────────────────────────────
const DRAW_DELAY = 350    // arranque del trazado
const DRAW_MS = 1400      // duración del trazado
const FILL_DELAY = 1650   // arranque del relleno
const WORD_DELAY = 2100   // reveal de BARDA
const FINALE_AT = 3000    // arranque del vuelo + cortina
const FINALE_MS = 950     // duración del finale hasta desmontar

type Fly = { x: number; y: number; s: number }

export default function IntroOverlay() {
  const pathname = usePathname()
  const [done, setDone] = useState(false)
  const [fly, setFly] = useState<Fly | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const finaleStarted = useRef(false)
  // El Studio ocupa el viewport completo; la intro no corre ahí.
  const excluded = pathname.startsWith('/studio')

  const runFinale = useCallback(() => {
    if (finaleStarted.current) return
    finaleStarted.current = true
    try { sessionStorage.setItem(SEEN_KEY, '1') } catch { /* Safari privado */ }

    // FLIP: medir destino (logo del navbar) y origen (SVG en pantalla)
    const brand = document.querySelector('.brand img')
    const svg = svgRef.current
    if (brand && svg) {
      const b = brand.getBoundingClientRect()
      const s = svg.getBoundingClientRect()
      setFly({
        x: b.left + b.width / 2 - (s.left + s.width / 2),
        y: b.top + b.height / 2 - (s.top + s.height / 2),
        s: b.height / s.height,
      })
    } else {
      // Fallback: sin navbar visible, solo se encoge y desvanece en el centro
      setFly({ x: 0, y: 0, s: 0.2 })
    }
    setTimeout(() => setDone(true), FINALE_MS)
  }, [])

  useEffect(() => {
    if (excluded) return // el render ya devuelve null
    // ?intro=1 fuerza la intro (testing/demo): ignora sesión y reduced-motion
    const forced = window.location.search.includes('intro=1')
    let seen = false
    try { seen = sessionStorage.getItem(SEEN_KEY) !== null } catch { /* mostrar igual */ }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!forced && (seen || reduced)) {
      // El script inline ya la ocultó antes del primer frame; acá solo
      // desmontamos (diferido: setState síncrono en effect dispara re-renders en cascada)
      const t = setTimeout(() => setDone(true), 0)
      return () => clearTimeout(t)
    }

    document.body.style.overflow = 'hidden'
    const finaleTimer = setTimeout(runFinale, FINALE_AT)
    const skip = () => runFinale()
    window.addEventListener('pointerdown', skip, { passive: true })
    window.addEventListener('keydown', skip)
    window.addEventListener('wheel', skip, { passive: true })
    window.addEventListener('touchmove', skip, { passive: true })

    return () => {
      clearTimeout(finaleTimer)
      window.removeEventListener('pointerdown', skip)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('wheel', skip)
      window.removeEventListener('touchmove', skip)
      document.body.style.overflow = ''
    }
  }, [excluded, runFinale])

  // Restaurar scroll apenas arranca el finale (el sitio ya se está revelando)
  useEffect(() => {
    if (fly) document.body.style.overflow = ''
  }, [fly])

  if (done || excluded) return null

  return (
    <>
      {/* Gating pre-hidratación: sin flash para visitas repetidas / reduced-motion */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(location.search.indexOf('intro=1')===-1&&(sessionStorage.getItem('${SEEN_KEY}')!==null||matchMedia('(prefers-reduced-motion: reduce)').matches)){var s=document.createElement('style');s.textContent='#barda-intro{display:none!important}';document.head.appendChild(s)}}catch(e){}`,
        }}
      />
      <div
        id="barda-intro"
        aria-hidden="true"
        className={fly ? 'is-finale' : ''}
        style={fly ? ({ '--fly-x': `${fly.x}px`, '--fly-y': `${fly.y}px`, '--fly-s': fly.s } as CSSProperties) : undefined}
      >
        {/* Telón: fondo + detalles técnicos + wordmark (se van con la cortina) */}
        <div className="intro-curtain">
          <span className="intro-line intro-line--v" />
          <span className="intro-line intro-line--h" />
          <p className="intro-tag intro-tag--tl">Estudio de arquitectura<br />Buenos Aires · AR</p>
          <p className="intro-tag intro-tag--tr">EB — {new Date().getFullYear()}</p>
          <div className="intro-word">
            <span className="intro-word__name">BARDA</span>
            <span className="intro-word__sub">Arquitectura</span>
          </div>
        </div>

        {/* Capa independiente: el isotipo, que al final vuela al navbar */}
        <div className="intro-iso-pos">
          <svg ref={svgRef} className="intro-iso" viewBox={ISO_VIEWBOX}>
            <path d={ISO_PATH} />
          </svg>
        </div>

        <style>{`
          #barda-intro {
            position: fixed;
            inset: 0;
            z-index: 300;
          }
          #barda-intro.is-finale { pointer-events: none; }

          .intro-curtain {
            position: absolute;
            inset: 0;
            background: var(--hierro);
            transition: transform 0.75s cubic-bezier(.7,0,.2,1) 0.1s;
          }
          .is-finale .intro-curtain { transform: translateY(-101%); }

          /* Líneas de plano (crosshair sutil) */
          .intro-line { position: absolute; background: rgba(248, 240, 229, 0.09); }
          .intro-line--v { left: 50%; top: 0; bottom: 0; width: 1px; transform: scaleY(0); animation: intro-grow 1.2s cubic-bezier(.2,.7,.2,1) 0.15s forwards; }
          .intro-line--h { top: 44%; left: 0; right: 0; height: 1px; transform: scaleX(0); animation: intro-grow 1.2s cubic-bezier(.2,.7,.2,1) 0.3s forwards; }

          .intro-tag {
            position: absolute;
            font-family: var(--font-mono);
            font-size: 10px;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            line-height: 1.7;
            color: rgba(248, 240, 229, 0.55);
            opacity: 0;
            animation: intro-fade 0.8s ease 0.5s forwards;
          }
          .intro-tag--tl { left: max(var(--pad-x), 24px); bottom: 28px; }
          .intro-tag--tr { right: max(var(--pad-x), 24px); top: 24px; text-align: right; }

          /* Isotipo centrado (un poco arriba del centro) */
          .intro-iso-pos {
            position: absolute;
            left: 50%;
            top: 44%;
            transform: translate(-50%, -50%);
            width: clamp(140px, 26vw, 260px);
          }
          .intro-iso { display: block; width: 100%; height: auto; }
          .intro-iso path {
            stroke: var(--ladrillo);
            stroke-width: 5;
            stroke-linejoin: miter;
            fill: var(--ladrillo);
            fill-opacity: 0;
            stroke-dasharray: ${ISO_PERIMETER};
            stroke-dashoffset: ${ISO_PERIMETER};
            animation:
              intro-draw ${DRAW_MS}ms cubic-bezier(.65,.05,.36,1) ${DRAW_DELAY}ms forwards,
              intro-fill 0.55s ease ${FILL_DELAY}ms forwards;
          }
          /* Vuelo al navbar (FLIP) */
          .intro-iso {
            transition: transform 0.7s cubic-bezier(.7,0,.2,1), opacity 0.55s ease 0.2s;
          }
          .is-finale .intro-iso {
            transform: translate(var(--fly-x), var(--fly-y)) scale(var(--fly-s));
            opacity: 0;
          }

          /* Wordmark debajo del isotipo (alto del iso = ancho × 371/512 ≈ ×0.7246) */
          .intro-word {
            position: absolute;
            left: 50%;
            top: 44%;
            transform: translateX(-50%);
            margin-top: calc(clamp(140px, 26vw, 260px) * 0.3623 + 30px);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 7px;
          }
          .intro-word__name {
            font-family: var(--font-sans);
            font-weight: 500;
            font-size: clamp(32px, 4.6vw, 50px);
            letter-spacing: -0.02em;
            line-height: 1;
            color: var(--arena);
            opacity: 0;
            transform: translateY(14px);
            animation: intro-rise 0.6s cubic-bezier(.2,.8,.2,1) ${WORD_DELAY}ms forwards;
          }
          .intro-word__sub {
            font-family: var(--font-mono);
            font-size: 11px;
            letter-spacing: 0.34em;
            margin-right: -0.34em;
            text-transform: uppercase;
            color: rgba(248, 240, 229, 0.6);
            opacity: 0;
            transform: translateY(14px);
            animation: intro-rise 0.6s cubic-bezier(.2,.8,.2,1) ${WORD_DELAY + 150}ms forwards;
          }
          .is-finale .intro-word,
          .is-finale .intro-tag,
          .is-finale .intro-line { opacity: 0 !important; transition: opacity 0.3s ease; animation: none; }

          @keyframes intro-draw { to { stroke-dashoffset: 0; } }
          @keyframes intro-fill { to { fill-opacity: 1; } }
          @keyframes intro-rise { to { opacity: 1; transform: none; } }
          @keyframes intro-fade { to { opacity: 1; } }
          @keyframes intro-grow { to { transform: none; } }
        `}</style>
      </div>
    </>
  )
}
