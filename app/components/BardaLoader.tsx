'use client'

/**
 * Pantalla de carga de marca: el isotipo de Barda (muro escalonado) se
 * traza en ladrillo (stroke-drawing), se rellena, y luego aparece el
 * wordmark BARDA / ARQUITECTURA con la tipografía de marca.
 */

import { ISO_PATH, ISO_PERIMETER, ISO_VIEWBOX } from '@/app/lib/barda-iso'

export default function BardaLoader() {
  return (
    <section
      className="barda-loader"
      role="status"
      aria-label="Cargando — Barda Arquitectura"
      style={{
        minHeight: 'calc(100svh - var(--navbar-h, 88px))',
        padding: 'calc(var(--navbar-h, 88px) + 56px) var(--pad-x) 56px',
        display: 'grid',
        placeItems: 'center',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '28px',
        }}
      >
        <svg
          className="barda-iso"
          viewBox={ISO_VIEWBOX}
          style={{ width: 'clamp(120px, 22vw, 220px)', height: 'auto' }}
          aria-hidden="true"
        >
          <path className="barda-iso__stroke" d={ISO_PATH} />
        </svg>

        <div
          className="barda-wordmark"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span
            className="barda-wordmark__name"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              fontSize: 'clamp(30px, 4.4vw, 46px)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              color: 'var(--ink)',
            }}
          >
            BARDA
          </span>
          <span
            className="barda-wordmark__sub"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.34em',
              textTransform: 'uppercase',
              color: 'var(--ink-mute)',
              // compensa el tracking del último carácter para centrar ópticamente
              marginRight: '-0.34em',
            }}
          >
            Arquitectura
          </span>
        </div>

        <p
          className="barda-loader__status"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10.5px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginTop: '12px',
          }}
        >
          Trazando el recorrido
        </p>
      </div>

      <style>{`
        .barda-iso__stroke {
          stroke: var(--accent);
          stroke-width: 5;
          stroke-linejoin: miter;
          fill: var(--accent);
          fill-opacity: 0;
          stroke-dasharray: ${ISO_PERIMETER};
          stroke-dashoffset: ${ISO_PERIMETER};
          animation:
            barda-draw 1.15s cubic-bezier(.65,.05,.36,1) forwards,
            barda-fill 0.55s ease 1.05s forwards;
        }
        .barda-iso {
          animation: barda-breathe 2.8s ease-in-out 2.4s infinite;
        }
        .barda-wordmark__name,
        .barda-wordmark__sub,
        .barda-loader__status {
          opacity: 0;
          transform: translateY(12px);
        }
        .barda-wordmark__name { animation: barda-rise 0.6s cubic-bezier(.2,.8,.2,1) 1.45s forwards; }
        .barda-wordmark__sub  { animation: barda-rise 0.6s cubic-bezier(.2,.8,.2,1) 1.6s forwards; }
        .barda-loader__status { animation: barda-rise 0.6s cubic-bezier(.2,.8,.2,1) 1.9s forwards, barda-blink 1.6s ease-in-out 2.6s infinite; }

        @keyframes barda-draw { to { stroke-dashoffset: 0; } }
        @keyframes barda-fill { to { fill-opacity: 1; } }
        @keyframes barda-rise { to { opacity: 1; transform: none; } }
        @keyframes barda-breathe {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.82; }
        }
        @keyframes barda-blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.45; }
        }

        @media (prefers-reduced-motion: reduce) {
          .barda-iso,
          .barda-iso__stroke,
          .barda-wordmark__name,
          .barda-wordmark__sub,
          .barda-loader__status {
            animation: none;
          }
          .barda-iso__stroke { stroke-dashoffset: 0; fill-opacity: 1; }
          .barda-wordmark__name,
          .barda-wordmark__sub,
          .barda-loader__status { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  )
}
