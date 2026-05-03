'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { urlForImage } from '@/sanity/lib/image'
import type { Project } from '@/sanity/types'

const tipoLabel: Record<string, string> = {
  casa: 'Casa',
  departamento: 'Depto.',
  refaccion: 'Refacción',
  local: 'Local',
  trabajo: 'Trabajo',
  cultural: 'Cultural',
  otro: 'Proyecto',
}

const FILTROS = [
  { key: 'todos', label: 'Todos' },
  { key: 'casa', label: 'Casa' },
  { key: 'departamento', label: 'Departamento' },
  { key: 'refaccion', label: 'Refacción' },
  { key: 'local', label: 'Local' },
  { key: 'trabajo', label: 'Trabajo' },
  { key: 'cultural', label: 'Cultural' },
]

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
        top: '56px',
        zIndex: 40,
        background: 'var(--bg)',
        borderBottom: '1px solid var(--rule)',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 var(--pad-x)',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          overflowX: 'auto',
        }}>
          {/* Filtros */}
          <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
            {FILTROS.map(f => (
              <button
                key={f.key}
                onClick={() => setFiltro(f.key)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: filtro === f.key ? 'var(--accent)' : 'var(--ink-mute)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 10px',
                  transition: 'color 0.2s ease',
                  whiteSpace: 'nowrap',
                  borderBottom: filtro === f.key ? '1px solid var(--accent)' : '1px solid transparent',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Right: count + view toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.08em',
              color: 'var(--ink-mute)',
            }}>
              {String(filtrados.length).padStart(2, '0')}
            </span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {/* Grid icon */}
              <button
                onClick={() => setVista('grid')}
                title="Vista grilla"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  opacity: vista === 'grid' ? 1 : 0.4,
                  padding: '4px',
                  transition: 'opacity 0.2s ease',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="0" y="0" width="5" height="5" fill="currentColor" />
                  <rect x="7" y="0" width="5" height="5" fill="currentColor" />
                  <rect x="0" y="7" width="5" height="5" fill="currentColor" />
                  <rect x="7" y="7" width="5" height="5" fill="currentColor" />
                </svg>
              </button>
              {/* List icon */}
              <button
                onClick={() => setVista('lista')}
                title="Vista lista"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  opacity: vista === 'lista' ? 1 : 0.4,
                  padding: '4px',
                  transition: 'opacity 0.2s ease',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="0" y="1" width="12" height="1.5" fill="currentColor" />
                  <rect x="0" y="5.25" width="12" height="1.5" fill="currentColor" />
                  <rect x="0" y="9.5" width="12" height="1.5" fill="currentColor" />
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
        }} className="proj-cards-grid">
          {filtrados.map((proyecto, i) => (
            <ProyectoCard key={proyecto._id} proyecto={proyecto} index={i + 1} priority={i < 3} />
          ))}
        </div>
      )}

      {/* List view */}
      {vista === 'lista' && (
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
        .proj-card-link { display: block; text-decoration: none; color: inherit; border-right: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
        .proj-card-link:hover .card-img { transform: scale(1.04); }
        .proj-card-link:hover .card-arrow { transform: translateX(4px); }
        .card-img { transition: transform 0.8s cubic-bezier(.2,.7,.2,1); }
        .card-arrow { transition: transform 0.25s ease; }
        .proj-row { display: grid; grid-template-columns: 48px 1fr auto auto 72px 32px; align-items: center; gap: 0; padding: 0 var(--pad-x); height: 52px; border-bottom: 1px solid var(--rule); text-decoration: none; color: inherit; transition: background 0.15s ease; }
        .proj-row:hover { background: var(--bg-alt); }
        .proj-row:hover .row-arrow { transform: translateX(4px); }
        .row-arrow { transition: transform 0.2s ease; }
        @media (max-width: 900px) {
          .proj-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .proj-row { grid-template-columns: 40px 1fr auto 32px !important; }
          .proj-row .row-tipo, .proj-row .row-surface { display: none !important; }
        }
        @media (max-width: 600px) {
          .proj-cards-grid { grid-template-columns: 1fr !important; }
          .proj-row { grid-template-columns: 32px 1fr 32px !important; }
          .proj-row .row-year { display: none !important; }
        }
      `}</style>
    </>
  )
}

function ProyectoCard({ proyecto, index, priority }: { proyecto: Project; index: number; priority?: boolean }) {
  const imgUrl = proyecto.imagenPrincipal
    ? urlForImage(proyecto.imagenPrincipal).width(800).height(600).fit('crop').url()
    : null
  const tipo = proyecto.tipo ? tipoLabel[proyecto.tipo] : null

  return (
    <Link href={`/proyectos/${proyecto.slug.current}`} className="proj-card-link">
      <article>
        {/* Top meta */}
        <div style={{
          padding: '10px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--rule)',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', letterSpacing: '0.1em', color: 'var(--ink-mute)' }}>
            {String(index).padStart(2, '0')}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', letterSpacing: '0.06em', color: 'var(--ink-mute)' }}>
            {[proyecto.ciudad, proyecto.anio].filter(Boolean).join(' · ')}
          </span>
        </div>

        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '4/3', background: 'var(--card-bg)', overflow: 'hidden' }}>
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={proyecto.imagenPrincipal?.alt ?? proyecto.titulo}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              priority={priority}
              className="card-img"
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--card-bg)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--piedra)' }}>Sin imagen</span>
            </div>
          )}
          {tipo && (
            <span style={{
              position: 'absolute', bottom: '12px', right: '12px',
              fontFamily: 'var(--font-mono)', fontSize: '9px',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--arena)', background: 'rgba(15,15,16,0.65)',
              padding: '3px 8px',
            }}>{tipo}</span>
          )}
          <span style={{
            position: 'absolute', top: '12px', left: '12px',
            width: '6px', height: '6px', borderRadius: '50%',
            background: 'var(--accent)',
          }} />
        </div>

        {/* Body */}
        <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(15px, 1.4vw, 19px)',
            fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--ink)',
          }}>
            {proyecto.titulo}
          </h2>
          <span className="card-arrow" style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--ink-mute)', flexShrink: 0 }}>→</span>
        </div>
      </article>
    </Link>
  )
}

function ProyectoRow({ proyecto, index }: { proyecto: Project; index: number }) {
  const tipo = proyecto.tipo ? tipoLabel[proyecto.tipo] : '—'
  return (
    <Link href={`/proyectos/${proyecto.slug.current}`} className="proj-row">
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', letterSpacing: '0.08em', color: 'var(--ink-mute)' }}>
        {String(index).padStart(2, '0')}
      </span>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
        {proyecto.titulo}
      </span>
      <span className="row-tipo" style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', letterSpacing: '0.08em', color: 'var(--ink-mute)', paddingRight: '24px' }}>
        {tipo}
      </span>
      <span className="row-year" style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', letterSpacing: '0.08em', color: 'var(--ink-mute)', paddingRight: '24px' }}>
        {proyecto.ciudad ?? '—'}
      </span>
      <span className="row-surface" style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', letterSpacing: '0.08em', color: 'var(--ink-mute)', paddingRight: '16px' }}>
        {proyecto.anio ?? '—'}
      </span>
      <span className="row-arrow" style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--ink-mute)', textAlign: 'right' }}>→</span>
    </Link>
  )
}

