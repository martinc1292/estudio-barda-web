import Link from 'next/link'
import Image from 'next/image'
import { safeFetch } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { featuredProjectsQuery } from '@/sanity/lib/queries'
import { TIPO_LABELS_SHORT } from '@/app/lib/proyecto-utils'
import type { Project } from '@/sanity/types'
import HeroInteractivo from './components/HeroInteractivo'
import ModularSection from './components/ModularSection'

export const revalidate = 60

const CARD_PALETTE = ['#F1E6D5', '#DD7845', '#949491', '#6B6B6E', '#E24F05', '#F1E6D5']

export default async function Home() {
  const proyectos = await safeFetch<Project[]>(featuredProjectsQuery) ?? []

  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section style={{
        borderBottom: '1px solid var(--rule)',
        paddingTop: 'var(--navbar-h, 88px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '70vh',
        }} className="hero-inner">

          {/* Left — text */}
          <div style={{
            padding: '56px var(--pad-x)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid var(--rule)',
          }}>
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '32px',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-mute)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: '6px', height: '6px',
                    background: 'var(--accent)',
                    flexShrink: 0,
                  }} />
                  Estudio activo · 2018 — presente
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-mute)',
                }}>
                  001 / MANIFIESTO
                </span>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(40px, 5.4vw, 88px)',
                fontWeight: 500,
                lineHeight: 0.96,
                letterSpacing: '-0.045em',
                color: 'var(--ink)',
                margin: 0,
                textWrap: 'balance',
              } as React.CSSProperties}>
                <span style={{ display: 'block' }}>El espacio</span>
                <span style={{ display: 'block' }}>como{' '}
                  <span style={{ color: 'var(--accent)' }}>límite</span>
                </span>
                <span style={{ display: 'block' }}>y como decisión.</span>
              </h1>
            </div>

            {/* Meta block */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '18px 32px',
              marginTop: '56px',
              fontSize: '12px',
              color: 'var(--ink-soft)',
            }} className="hero-meta-grid">
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-mute)',
                  display: 'block',
                  marginBottom: '4px',
                }}>Enfoque</div>
                Vivienda · Refacción · Comercial · Cultural
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-mute)',
                  display: 'block',
                  marginBottom: '4px',
                }}>Territorio</div>
                CABA · GBA Norte · Río Negro · Neuquén
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-mute)',
                  display: 'block',
                  marginBottom: '4px',
                }}>Director</div>
                Joaquín Licera Vidal
              </div>
            </div>
          </div>

          {/* Right — Interactive composition */}
          <HeroInteractivo />
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        borderBottom: '1px solid var(--rule)',
      }} className="stats-grid">
        {[
          { num: '47', sup: '+',     label: 'Proyectos · 2018 — 2026' },
          { num: '8',  sup: 'yr',    label: 'Trayectoria' },
          { num: '12', sup: null,    label: 'Ciudades intervenidas' },
          { num: '6.4',sup: 'k m²',  label: 'Superficie proyectada' },
        ].map((s, i) => (
          <div key={i} style={{
            padding: '28px var(--pad-x)',
            borderLeft: i > 0 ? '1px solid var(--rule)' : 'none',
          }}>
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              fontSize: 'clamp(32px, 3.4vw, 52px)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: 'var(--ink)',
            }}>
              {s.num}
              {s.sup && (
                <sup style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5em',
                  verticalAlign: 'top',
                  color: 'var(--accent)',
                  marginLeft: '2px',
                  fontWeight: 500,
                }}>
                  {s.sup}
                </sup>
              )}
            </div>
            <p style={{
              marginTop: '10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--ink-mute)',
            }}>
              {s.label}
            </p>
          </div>
        ))}
      </section>

      {/* ── Obras seleccionadas ────────────────────────── */}
      {proyectos.length > 0 && (
        <>
          {/* Section header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr auto',
            alignItems: 'flex-end',
            gap: '32px',
            padding: '56px var(--pad-x) 28px',
            borderBottom: '1px solid var(--rule)',
          }} className="section-head-grid">
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--ink-mute)',
            }}>
              <strong style={{ color: 'var(--accent)', fontWeight: 400, marginRight: '8px' }}>03</strong>
              SECCIÓN
            </div>
            <h2 style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              fontSize: 'clamp(28px, 3vw, 44px)',
              letterSpacing: '-0.035em',
              lineHeight: 1,
              margin: 0,
              color: 'var(--ink)',
            }}>
              Obras seleccionadas
            </h2>
            <Link href="/proyectos" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--ink-mute)',
              transition: 'color 0.2s ease',
            }}>
              {String(proyectos.length).padStart(2, '0')} / 2018 — 2026 →
            </Link>
          </div>

          {/* Projects grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            borderBottom: '1px solid var(--rule)',
          }} className="cards-home-grid">
            {proyectos.map((proyecto, i) => (
              <ProjectCard
                key={proyecto._id}
                proyecto={proyecto}
                index={i + 1}
                priority={i === 0}
                cardBg={CARD_PALETTE[i % CARD_PALETTE.length]}
              />
            ))}
          </div>
        </>
      )}

      {/* ── Sistema Modular ────────────────────────────── */}
      <ModularSection />

      <style>{`
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr !important; min-height: auto !important; }
          .hero-inner > div:first-child { min-height: 70svh; border-right: none !important; border-bottom: 1px solid var(--rule); }
          .hero-graphic-interactive { min-height: 50svh; }
          .hero-meta-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-grid > div:nth-child(2) { border-left: 1px solid var(--rule); }
          .stats-grid > div:nth-child(3) { border-top: 1px solid var(--rule); border-left: none !important; }
          .stats-grid > div:nth-child(4) { border-top: 1px solid var(--rule); }
          .section-head-grid { grid-template-columns: auto 1fr auto !important; }
          .cards-home-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .hero-meta-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .section-head-grid { grid-template-columns: 1fr !important; padding-top: 32px !important; padding-bottom: 20px !important; }
          .section-head-grid > *:last-child { display: none; }
          .cards-home-grid { grid-template-columns: 1fr !important; }
        }
        .proj-card-link {
          display: block; text-decoration: none; color: inherit;
          border-right: 1px solid var(--rule); border-bottom: 1px solid var(--rule);
          margin-right: -1px; margin-bottom: -1px;
        }
        .proj-card-link:hover .card-img-inner { transform: scale(1.04); }
        .proj-card-link:hover .card-arrow { transform: translateX(4px); }
        .card-img-inner { transition: transform 0.8s cubic-bezier(.2,.7,.2,1); }
        .card-arrow { transition: transform 0.25s ease; }
      `}</style>
    </>
  )
}

function ProjectCard({
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
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          {tipo && (
            <span style={{
              position: 'absolute', top: '12px', left: '12px',
              fontFamily: 'var(--font-mono)', fontSize: '9.5px',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--arena)', background: 'rgba(15,15,16,0.8)',
              padding: '3px 6px', zIndex: 2,
            }}>
              {tipo}
            </span>
          )}
          <span style={{
            position: 'absolute', top: '12px', right: '12px',
            width: '8px', height: '8px',
            background: 'var(--accent)', zIndex: 2,
          }} />
        </div>

        {/* Body */}
        <div style={{ padding: '16px 16px 18px' }}>
          <h3 style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: 'clamp(18px, 1.8vw, 22px)',
            letterSpacing: '-0.035em',
            lineHeight: 1.05,
            color: 'var(--ink)',
            margin: 0,
          }}>
            {proyecto.titulo}
            <span className="card-arrow" style={{
              display: 'inline-block',
              marginLeft: '6px',
              color: 'var(--accent)',
              fontFamily: 'var(--font-mono)',
            }}>→</span>
          </h3>
        </div>
      </article>
    </Link>
  )
}
