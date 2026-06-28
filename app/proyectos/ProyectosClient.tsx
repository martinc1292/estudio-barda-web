'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { urlForImage } from '@/sanity/lib/image'
import { TIPO_LABELS_SHORT } from '@/app/lib/proyecto-utils'
import type { Project } from '@/sanity/types'

const FILTROS = [
  { key: 'todos',        label: 'Todos' },
  { key: 'casa',         label: 'Casa' },
  { key: 'departamento', label: 'Departamento' },
  { key: 'refaccion',    label: 'Refacción' },
  { key: 'local',        label: 'Local' },
  { key: 'trabajo',      label: 'Trabajo' },
  { key: 'cultural',     label: 'Cultural' },
]

const CARD_PALETTE = ['#F1E6D5', '#DD7845', '#949491', '#6B6B6E', '#E24F05', '#F1E6D5']

type Vista = 'grid' | 'lista'

export default function ProyectosClient({ proyectos }: { proyectos: Project[] }) {
  const [filtro, setFiltro] = useState('todos')
  const [vista, setVista] = useState<Vista>('grid')

  const filtrados = filtro === 'todos'
    ? proyectos
    : proyectos.filter(p => p.tipo === filtro)

  return (
    <>
      {/* Toolbar */}
      <div style={{
        position: 'sticky',
        top: 'var(--navbar-h, 88px)',
        zIndex: 40,
        background: 'color-mix(in srgb, var(--bg) 94%, transparent)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--rule)',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 var(--pad-x)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          overflowX: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: '10.5px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--ink-mute)',
        }}>
          {/* Filtros */}
          <div style={{ display: 'flex', gap: 0, flexShrink: 0 }}>
            {FILTROS.map(f => (
              <button
                key={f.key}
                onClick={() => setFiltro(f.key)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: filtro === f.key ? 'var(--accent)' : 'var(--ink-mute)',
                  background: 'none',
                  border: 'none',
                  borderLeft: '1px solid var(--rule)',
                  cursor: 'pointer',
                  padding: '14px 14px',
                  transition: 'color 0.2s ease',
                  whiteSpace: 'nowrap',
                  borderBottom: 'none',
                  outline: 'none',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Right: count + view toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0, paddingRight: 0 }}>
            <span style={{ color: 'var(--ink-mute)', whiteSpace: 'nowrap' }}>
              [ {String(filtrados.length).padStart(2, '0')} / {String(proyectos.length).padStart(2, '0')} ] obras
            </span>
            <div style={{ display: 'flex', gap: '1px' }}>
              <button
                onClick={() => setVista('grid')}
                title="Vista grilla"
                style={{
                  width: '28px', height: '28px',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  background: 'none',
                  border: `1px solid ${vista === 'grid' ? 'var(--accent)' : 'var(--rule)'}`,
                  cursor: 'pointer',
                  color: vista === 'grid' ? 'var(--accent)' : 'var(--ink-mute)',
                  padding: 0,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="0.5" y="0.5" width="4.5" height="4.5" />
                  <rect x="7" y="0.5" width="4.5" height="4.5" />
                  <rect x="0.5" y="7" width="4.5" height="4.5" />
                  <rect x="7" y="7" width="4.5" height="4.5" />
                </svg>
              </button>
              <button
                onClick={() => setVista('lista')}
                title="Vista lista"
                style={{
                  width: '28px', height: '28px',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  background: 'none',
                  border: `1px solid ${vista === 'lista' ? 'var(--accent)' : 'var(--rule)'}`,
                  borderLeft: 0,
                  cursor: 'pointer',
                  color: vista === 'lista' ? 'var(--accent)' : 'var(--ink-mute)',
                  padding: 0,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
                  <line x1="0" y1="2.5" x2="12" y2="2.5" />
                  <line x1="0" y1="6"   x2="12" y2="6" />
                  <line x1="0" y1="9.5" x2="12" y2="9.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid view */}
      {vista === 'grid' && (
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 0,
        }} className="proj-cards-grid">
          {filtrados.map((proyecto, i) => (
            <ProyectoCard
              key={proyecto._id}
              proyecto={proyecto}
              index={i + 1}
              priority={i < 3}
              cardBg={CARD_PALETTE[i % CARD_PALETTE.length]}
            />
          ))}
        </div>
      )}

      {/* List view */}
      {vista === 'lista' && (
        <div style={{ maxWidth: '1400px', margin: '0 auto', borderBottom: '1px solid var(--rule)' }}>
          {filtrados.map((proyecto, i) => (
            <ProyectoRow key={proyecto._id} proyecto={proyecto} index={i + 1} />
          ))}
        </div>
      )}

      {filtrados.length === 0 && (
        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          padding: '80px var(--pad-x)', textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10.5px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ink-mute)',
          }}>
            Sin proyectos en esta categoría
          </p>
        </div>
      )}

      <style>{`
        .proj-card-link {
          display: block; text-decoration: none; color: inherit;
          border-right: 1px solid var(--rule); border-bottom: 1px solid var(--rule);
          margin-right: -1px; margin-bottom: -1px;
          transition: background 0.25s ease;
        }
        .proj-card-link:hover .card-img-inner { transform: scale(1.04); }
        .proj-card-link:hover .card-arrow { color: var(--accent); transform: translateX(4px); }
        .card-img-inner { transition: transform 0.8s cubic-bezier(.2,.7,.2,1); }
        .card-arrow { transition: transform 0.25s ease, color 0.2s ease; }
        .proj-row {
          display: grid;
          grid-template-columns: 60px 1.4fr 1fr 0.8fr 0.8fr 60px;
          gap: 24px;
          align-items: center;
          padding: 22px var(--pad-x);
          border-bottom: 1px solid var(--rule-soft);
          text-decoration: none; color: inherit;
          transition: background 0.15s;
          cursor: pointer;
        }
        .proj-row:hover { background: var(--bg-alt); }
        .proj-row:hover .row-arrow { color: var(--accent); transform: translateX(4px); }
        .row-arrow { transition: transform 0.2s ease, color 0.2s ease; }
        @media (max-width: 900px) {
          .proj-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .proj-row { grid-template-columns: 48px 1fr auto 32px !important; }
          .proj-row .row-tipo, .proj-row .row-surface { display: none !important; }
        }
        @media (max-width: 600px) {
          .proj-cards-grid { grid-template-columns: 1fr !important; }
          .proj-row { grid-template-columns: 36px 1fr 32px !important; }
          .proj-row .row-year { display: none !important; }
        }
      `}</style>
    </>
  )
}

function ProyectoCard({
  proyecto,
  index,
  priority,
  cardBg,
}: {
  proyecto: Project
  index: number
  priority?: boolean
  cardBg: string
}) {
  const imgUrl = proyecto.imagenPrincipal
    ? urlForImage(proyecto.imagenPrincipal).width(800).height(600).fit('crop').url()
    : null
  const tipo = proyecto.tipo ? TIPO_LABELS_SHORT[proyecto.tipo] : null

  return (
    <Link href={`/proyectos/${proyecto.slug.current}`} className="proj-card-link">
      <article style={{ background: cardBg }}>
        {/* Meta top */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          padding: '14px 16px 10px',
          borderBottom: '1px solid rgba(15,15,16,0.10)',
          fontFamily: 'var(--font-mono)',
          fontSize: '10.5px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--ink-mute)',
        }}>
          <span>
            <span style={{ color: 'var(--accent)' }}>{String(index).padStart(3, '0')}</span>
            {' · '}{proyecto.anio}
          </span>
          <span>{proyecto.ciudad}</span>
        </div>

        {/* Frame */}
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4/3',
          overflow: 'hidden',
          background: cardBg,
          isolation: 'isolate',
        }}>
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={proyecto.imagenPrincipal?.alt ?? proyecto.titulo}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              priority={priority}
              className="card-img-inner"
            />
          ) : (
            <div style={{ position: 'absolute', inset: 0, background: cardBg }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(180deg, color-mix(in srgb, ${cardBg} 80%, white 20%) 0%, ${cardBg} 50%, color-mix(in srgb, ${cardBg} 80%, black 14%) 100%)`,
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, transparent 32%, #E24F05 32%, #E24F05 32.4%, transparent 32.4%), linear-gradient(180deg, transparent 60%, rgba(15,15,16,0.6) 60%)',
                opacity: 0.55,
                mixBlendMode: 'multiply',
              }} />
            </div>
          )}
          {/* Corner badge */}
          {tipo && (
            <span style={{
              position: 'absolute', top: '12px', left: '12px',
              fontFamily: 'var(--font-mono)', fontSize: '9.5px',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--arena)',
              background: 'rgba(15,15,16,0.80)',
              padding: '3px 6px',
              zIndex: 2,
            }}>{tipo}</span>
          )}
          {/* Pin ladrillo */}
          <span style={{
            position: 'absolute', top: '12px', right: '12px',
            width: '8px', height: '8px',
            background: 'var(--accent)',
            zIndex: 2,
          }} />
        </div>

        {/* Body */}
        <div style={{ padding: '16px 16px 18px' }}>
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(16px, 1.6vw, 22px)',
            fontWeight: 500,
            letterSpacing: '-0.035em',
            lineHeight: 1.05,
            color: 'var(--ink)',
            margin: 0,
          }}>
            {proyecto.titulo}
            <span className="card-arrow" style={{
              display: 'inline-block',
              marginLeft: '6px',
              color: 'var(--ink-mute)',
              fontFamily: 'var(--font-mono)',
            }}>→</span>
          </h2>
        </div>
      </article>
    </Link>
  )
}

function ProyectoRow({ proyecto, index }: { proyecto: Project; index: number }) {
  const tipo = proyecto.tipo ? TIPO_LABELS_SHORT[proyecto.tipo] : '—'
  return (
    <Link href={`/proyectos/${proyecto.slug.current}`} className="proj-row">
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '11px',
        color: 'var(--accent)',
      }}>
        {String(index).padStart(3, '0')}
      </span>
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'clamp(18px, 2vw, 28px)',
        fontWeight: 500,
        letterSpacing: '-0.035em',
        color: 'var(--ink)',
        lineHeight: 1,
      }}>
        {proyecto.titulo}
      </span>
      <span className="row-tipo" style={{
        fontFamily: 'var(--font-mono)', fontSize: '11px',
        letterSpacing: '0.04em', textTransform: 'uppercase',
        color: 'var(--ink-soft)',
      }}>
        {tipo} — {proyecto.ciudad ?? '—'}
      </span>
      <span className="row-surface" style={{
        fontFamily: 'var(--font-mono)', fontSize: '11px',
        letterSpacing: '0.04em', textTransform: 'uppercase',
        color: 'var(--ink-soft)',
      }}>
        —
      </span>
      <span className="row-year" style={{
        fontFamily: 'var(--font-mono)', fontSize: '11px',
        letterSpacing: '0.04em', textTransform: 'uppercase',
        color: 'var(--ink-soft)',
      }}>
        {proyecto.anio ?? '—'}
      </span>
      <span className="row-arrow" style={{
        textAlign: 'right',
        fontFamily: 'var(--font-mono)',
        color: 'var(--ink-mute)',
      }}>→</span>
    </Link>
  )
}
