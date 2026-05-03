import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { projectBySlugQuery, allProjectsQuery } from '@/sanity/lib/queries'
import type { Project } from '@/sanity/types'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const proyectos = await client.fetch<Project[]>(allProjectsQuery)
  return proyectos.map((p) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const proyecto = await client.fetch<Project | null>(projectBySlugQuery, { slug })
  if (!proyecto) return {}
  return {
    title: proyecto.titulo,
    description: proyecto.descripcionCorta,
  }
}

const tipoLabel: Record<string, string> = {
  casa: 'Casa',
  departamento: 'Departamento',
  refaccion: 'Refacción',
  local: 'Local',
  trabajo: 'Espacio de trabajo',
  cultural: 'Cultural',
  otro: 'Proyecto',
}

export default async function ProyectoPage({ params }: Props) {
  const { slug } = await params
  const [proyecto, todosLosProyectos] = await Promise.all([
    client.fetch<Project | null>(projectBySlugQuery, { slug }),
    client.fetch<Project[]>(allProjectsQuery),
  ])

  if (!proyecto) notFound()

  const heroUrl = proyecto.imagenPrincipal
    ? urlForImage(proyecto.imagenPrincipal).width(1800).height(1000).fit('crop').url()
    : null

  const currentIndex = todosLosProyectos.findIndex(p => p.slug.current === slug)
  const nextProyecto = currentIndex >= 0 && currentIndex < todosLosProyectos.length - 1
    ? todosLosProyectos[currentIndex + 1]
    : null

  return (
    <div style={{ paddingTop: '56px' }}>

      {/* ── Detail bar ─────────────────────────────────── */}
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
        }}>
          <Link href="/proyectos" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10.5px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ink-mute)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s ease',
          }}>
            ← Proyectos
          </Link>

          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10.5px',
            letterSpacing: '0.06em',
            color: 'var(--ink-mute)',
          }}>
            {currentIndex >= 0 ? String(currentIndex + 1).padStart(2, '0') : '—'}
          </span>

          {nextProyecto ? (
            <Link href={`/proyectos/${nextProyecto.slug.current}`} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--ink-mute)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.2s ease',
            }}>
              Siguiente →
            </Link>
          ) : (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--rule)',
            }}>
              Siguiente →
            </span>
          )}
        </div>
      </div>

      {/* ── Hero image ─────────────────────────────────── */}
      {heroUrl && (
        <div style={{
          position: 'relative',
          width: '100%',
          height: '70svh',
          background: 'var(--card-bg)',
          overflow: 'hidden',
        }}>
          <Image
            src={heroUrl}
            alt={proyecto.imagenPrincipal?.alt ?? proyecto.titulo}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* ── Project title header ───────────────────────── */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px var(--pad-x)',
        borderBottom: '1px solid var(--rule)',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '2rem',
        alignItems: 'flex-end',
      }} className="detail-header">
        <div>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10.5px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--ink-mute)',
            display: 'block',
            marginBottom: '10px',
          }}>
            {[proyecto.tipo ? tipoLabel[proyecto.tipo] : null, proyecto.ciudad].filter(Boolean).join(' — ')}
          </span>
          <h1 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(28px, 4vw, 56px)',
            fontWeight: 500,
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            color: 'var(--ink)',
          }}>
            {proyecto.titulo}
          </h1>
        </div>
        {proyecto.anio && (
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(24px, 2.5vw, 36px)',
            fontWeight: 300,
            color: 'var(--piedra)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            flexShrink: 0,
          }}>
            {proyecto.anio}
          </span>
        )}
      </div>

      {/* ── Body: descripción + specs ──────────────────── */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '48px var(--pad-x)',
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr',
        gap: '64px',
        borderBottom: '1px solid var(--rule)',
      }} className="detail-body">

        {/* Descripción */}
        <div>
          {proyecto.descripcionCorta && (
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(16px, 1.5vw, 20px)',
              fontWeight: 400,
              lineHeight: 1.55,
              letterSpacing: '-0.01em',
              color: 'var(--ink)',
              marginBottom: '32px',
            }}>
              {proyecto.descripcionCorta}
            </p>
          )}
          {proyecto.descripcionLarga && (
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              lineHeight: 1.75,
              color: 'var(--ink-mute)',
            }} className="prose-barda">
              <PortableText value={proyecto.descripcionLarga} />
            </div>
          )}
        </div>

        {/* Specs */}
        <div style={{ borderLeft: '1px solid var(--rule)', paddingLeft: '40px' }} className="detail-specs">
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9.5px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--ink-mute)',
            marginBottom: '24px',
          }}>
            Ficha técnica
          </p>
          <dl style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', rowGap: '0' }}>
            {([
              { label: 'Tipo', value: proyecto.tipo ? tipoLabel[proyecto.tipo] : null },
              { label: 'Ciudad', value: proyecto.ciudad },
              { label: 'Año', value: proyecto.anio?.toString() },
            ] as Array<{ label: string; value: string | undefined | null }>)
              .filter(s => s.value)
              .map(s => (
                <div key={s.label} style={{
                  gridColumn: '1 / -1',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  borderBottom: '1px solid var(--rule)',
                  padding: '12px 0',
                }}>
                  <dt style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9.5px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-mute)',
                  }}>{s.label}</dt>
                  <dd style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10.5px',
                    letterSpacing: '0.04em',
                    color: 'var(--ink)',
                  }}>{s.value}</dd>
                </div>
              ))}
          </dl>
        </div>
      </div>

      {/* ── Galería ────────────────────────────────────── */}
      {proyecto.galeria && proyecto.galeria.length > 0 && (
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          borderBottom: '1px solid var(--rule)',
        }}>
          {/* Gallery header */}
          <div style={{
            padding: '0 var(--pad-x)',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid var(--rule)',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--ink-mute)',
            }}>
              Galería — {proyecto.galeria.length} imágenes
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
            gap: 0,
          }}>
            {proyecto.galeria.map((img, i) => {
              const src = urlForImage(img).width(1200).height(800).fit('crop').url()
              return (
                <div key={i} style={{
                  position: 'relative',
                  aspectRatio: '3/2',
                  background: 'var(--card-bg)',
                  overflow: 'hidden',
                  borderRight: '1px solid var(--rule)',
                  borderBottom: '1px solid var(--rule)',
                }}>
                  <Image
                    src={src}
                    alt={img.alt ?? `${proyecto.titulo} — imagen ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Next project bar ───────────────────────────── */}
      {nextProyecto && (
        <Link href={`/proyectos/${nextProyecto.slug.current}`} style={{
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
          borderBottom: '1px solid var(--rule)',
          transition: 'background 0.2s ease',
        }} className="next-bar">
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '28px var(--pad-x)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9.5px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--ink-mute)',
                display: 'block',
                marginBottom: '6px',
              }}>
                Siguiente proyecto
              </span>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(18px, 2vw, 26px)',
                fontWeight: 500,
                letterSpacing: '-0.03em',
                color: 'var(--ink)',
              }}>
                {nextProyecto.titulo}
              </span>
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '20px',
              color: 'var(--ink-mute)',
            }}>
              →
            </span>
          </div>
        </Link>
      )}

      <style>{`
        @media (max-width: 768px) {
          .detail-header { grid-template-columns: 1fr !important; }
          .detail-body { grid-template-columns: 1fr !important; gap: 32px !important; }
          .detail-specs { border-left: none !important; padding-left: 0 !important; border-top: 1px solid var(--rule); padding-top: 32px !important; }
        }
        .prose-barda p { margin-bottom: 1.25rem; }
        .prose-barda p:last-child { margin-bottom: 0; }
        .next-bar:hover { background: var(--bg-alt); }
      `}</style>
    </div>
  )
}
