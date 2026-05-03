import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { configQuery, featuredProjectsQuery, allServicesQuery } from '@/sanity/lib/queries'
import type { StudioConfig, Project, Service } from '@/sanity/types'

export const revalidate = 60

const tipoLabel: Record<string, string> = {
  casa: 'Casa',
  departamento: 'Depto.',
  refaccion: 'Refacción',
  local: 'Local',
  trabajo: 'Trabajo',
  cultural: 'Cultural',
  otro: 'Proyecto',
}

export default async function Home() {
  const [config, proyectosDestacados, servicios] = await Promise.all([
    client.fetch<StudioConfig>(configQuery),
    client.fetch<Project[]>(featuredProjectsQuery),
    client.fetch<Service[]>(allServicesQuery),
  ])

  const serviciosPrincipales = servicios.filter(s => s.tipo === 'principal')

  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section style={{
        minHeight: '100svh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderBottom: '1px solid var(--rule)',
        overflow: 'hidden',
        paddingTop: '56px',
      }} className="hero-grid">

        {/* Left — text */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'var(--pad-x)',
          paddingBottom: '56px',
          borderRight: '1px solid var(--rule)',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10.5px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--ink-mute)',
            marginBottom: '32px',
            display: 'block',
          }}>
            BA — ARQ
          </span>
          <h1 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(40px, 5.4vw, 88px)',
            fontWeight: 500,
            lineHeight: 0.96,
            letterSpacing: '-0.045em',
            color: 'var(--ink)',
            marginBottom: '40px',
          }}>
            {config?.lema ?? 'Arquitectura\nreal.'}
          </h1>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/proyectos" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--bg)',
              background: 'var(--ink)',
              padding: '10px 20px',
              transition: 'opacity 0.2s ease',
            }}>
              Ver proyectos
            </Link>
            <a href={`https://wa.me/54${config?.whatsapp ?? '2215718737'}`} target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10.5px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink-mute)',
                border: '1px solid var(--rule)',
                padding: '10px 20px',
                transition: 'border-color 0.2s ease, color 0.2s ease',
              }}>
              WhatsApp
            </a>
          </div>

          {/* Corner label */}
          <span style={{
            position: 'absolute',
            bottom: '56px',
            right: 'calc(50% + var(--pad-x))',
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ink-mute)',
          }}>
            FIG. 01
          </span>
        </div>

        {/* Right — modular planes */}
        <div style={{ position: 'relative', background: 'var(--bg-alt)', overflow: 'hidden' }}>
          {/* Grid background */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(var(--rule) 1px, transparent 1px), linear-gradient(90deg, var(--rule) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }} />

          {/* Modular planes */}
          <div style={{ position: 'absolute', inset: 0 }}>
            {/* p1 — iron block */}
            <div style={{
              position: 'absolute',
              top: '16.67%', left: '16.67%',
              width: '41.67%', height: '33.33%',
              background: 'var(--hierro)',
            }} />
            {/* p2 — brick accent */}
            <div style={{
              position: 'absolute',
              top: '16.67%', left: '58.34%',
              width: '8.33%', height: '33.33%',
              background: 'var(--ladrillo)',
            }} />
            {/* p3 — stone block */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '8.33%',
              width: '25%', height: '25%',
              background: 'var(--piedra)',
              opacity: 0.5,
            }} />
            {/* p4 — outline only */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '33.33%',
              width: '33.33%', height: '16.67%',
              border: '1px solid var(--rule)',
            }} />
            {/* p5 — brick desaturated small */}
            <div style={{
              position: 'absolute',
              top: '66.67%', left: '66.67%',
              width: '16.67%', height: '8.33%',
              background: 'var(--ladrillo-d)',
              opacity: 0.6,
            }} />
          </div>

          {/* Corner annotations */}
          <span style={{
            position: 'absolute', top: '24px', left: '24px',
            fontFamily: 'var(--font-mono)', fontSize: '9px',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--ink-mute)',
          }}>Sistema</span>
          <span style={{
            position: 'absolute', top: '24px', right: '24px',
            fontFamily: 'var(--font-mono)', fontSize: '9px',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--accent)',
          }}>Módulo 12</span>
          <span style={{
            position: 'absolute', bottom: '24px', right: '24px',
            fontFamily: 'var(--font-mono)', fontSize: '9px',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--ink-mute)',
          }}>Barda — 2025</span>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid var(--rule)' }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }} className="stats-grid">
          {[
            { num: '47', sup: '+', label: 'Proyectos' },
            { num: '8', sup: 'yr', label: 'Trayectoria' },
            { num: '12', sup: '', label: 'Ciudades' },
            { num: '6.4k', sup: 'm²', label: 'Construidos' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '32px var(--pad-x)',
              borderRight: i < 3 ? '1px solid var(--rule)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2px', marginBottom: '6px' }}>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(28px, 3vw, 44px)',
                  fontWeight: 500,
                  letterSpacing: '-0.04em',
                  color: 'var(--ink)',
                  lineHeight: 1,
                }}>
                  {s.num}
                </span>
                {s.sup && (
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--accent)',
                    marginTop: '4px',
                  }}>
                    {s.sup}
                  </span>
                )}
              </div>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10.5px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink-mute)',
              }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Proyectos destacados ───────────────────────── */}
      {proyectosDestacados.length > 0 && (
        <section style={{ borderBottom: '1px solid var(--rule)' }}>
          {/* Section header */}
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 var(--pad-x)',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--rule)',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--ink-mute)',
            }}>
              Proyectos
            </span>
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
              Ver todos →
            </Link>
          </div>

          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))',
            gap: 0,
          }} className="cards-grid">
            {proyectosDestacados.map((proyecto, i) => (
              <ProjectCard key={proyecto._id} proyecto={proyecto} index={i + 1} priority={i === 0} />
            ))}
          </div>
        </section>
      )}

      {/* ── Servicios ─────────────────────────────────── */}
      {serviciosPrincipales.length > 0 && (
        <section style={{ borderBottom: '1px solid var(--rule)' }}>
          {/* Section header */}
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 var(--pad-x)',
            height: '48px',
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
              Servicios
            </span>
          </div>

          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
          }} className="services-grid">
            {serviciosPrincipales.map((s, i) => (
              <div key={s._id} style={{
                padding: '32px var(--pad-x)',
                borderRight: i % 3 < 2 ? '1px solid var(--rule)' : 'none',
                borderBottom: i < serviciosPrincipales.length - (serviciosPrincipales.length % 3 || 3) ? '1px solid var(--rule)' : 'none',
              }}>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  letterSpacing: '0.1em',
                  color: 'var(--accent)',
                  marginBottom: '12px',
                }}>
                  0{i + 1}
                </p>
                <h3 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  fontWeight: 500,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.1,
                  color: 'var(--ink)',
                  marginBottom: '12px',
                }}>
                  {s.titulo}
                </h3>
                {s.descripcion && (
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    color: 'var(--ink-mute)',
                    lineHeight: 1.6,
                  }}>
                    {s.descripcion}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────── */}
      <section style={{ background: 'var(--hierro)' }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '80px var(--pad-x)',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10.5px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--piedra)',
          }}>
            ¿Tenés un proyecto?
          </span>
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(28px, 3.5vw, 52px)',
            fontWeight: 500,
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            color: 'var(--arena)',
            maxWidth: '600px',
          }}>
            Trabajamos de forma cercana desde la primera consulta.
          </h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/54${config?.whatsapp ?? '2215718737'}`} target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10.5px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--hierro)',
                background: 'var(--arena)',
                padding: '12px 24px',
                transition: 'opacity 0.2s ease',
              }}>
              WhatsApp
            </a>
            <Link href="/contacto" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--arena)',
              border: '1px solid rgba(248,240,229,0.25)',
              padding: '12px 24px',
              transition: 'border-color 0.2s ease',
            }}>
              Contacto
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; min-height: auto !important; }
          .hero-grid > div:first-child { min-height: 70svh; border-right: none !important; border-bottom: 1px solid var(--rule); }
          .hero-grid > div:last-child { min-height: 40svh; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-grid > div:nth-child(2) { border-right: none !important; }
          .stats-grid > div:nth-child(3) { border-top: 1px solid var(--rule); }
          .stats-grid > div:nth-child(4) { border-top: 1px solid var(--rule); border-right: none !important; }
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .services-grid > div:nth-child(even) { border-right: none !important; }
        }
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .services-grid > div { border-right: none !important; border-bottom: 1px solid var(--rule) !important; }
        }
        .project-card-link { display: block; text-decoration: none; color: inherit; border-right: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
        .project-card-link:hover .card-arrow { transform: translateX(4px); }
        .project-card-link:hover .card-img { transform: scale(1.04); }
        .card-img { transition: transform 0.8s cubic-bezier(.2,.7,.2,1); }
        .card-arrow { transition: transform 0.25s ease; }
      `}</style>
    </>
  )
}

function ProjectCard({
  proyecto,
  index,
  priority,
}: {
  proyecto: Project
  index: number
  priority?: boolean
}) {
  const imgUrl = proyecto.imagenPrincipal
    ? urlForImage(proyecto.imagenPrincipal).width(800).height(600).fit('crop').url()
    : null

  const tipo = proyecto.tipo ? tipoLabel[proyecto.tipo] : null

  return (
    <Link href={`/proyectos/${proyecto.slug.current}`} className="project-card-link">
      <article>
        {/* Top meta */}
        <div style={{
          padding: '10px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--rule)',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9.5px',
            letterSpacing: '0.1em',
            color: 'var(--ink-mute)',
          }}>
            {String(index).padStart(2, '0')}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9.5px',
            letterSpacing: '0.06em',
            color: 'var(--ink-mute)',
          }}>
            {[proyecto.ciudad, proyecto.anio].filter(Boolean).join(' · ')}
          </span>
        </div>

        {/* Image */}
        <div style={{
          position: 'relative',
          aspectRatio: '4/3',
          background: 'var(--card-bg)',
          overflow: 'hidden',
        }}>
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={proyecto.imagenPrincipal?.alt ?? proyecto.titulo}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              priority={priority}
              className="card-img"
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--card-bg)',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9.5px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--piedra)',
              }}>
                Sin imagen
              </span>
            </div>
          )}
          {/* Corner tag */}
          {tipo && (
            <span style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--arena)',
              background: 'rgba(15,15,16,0.65)',
              padding: '3px 8px',
            }}>
              {tipo}
            </span>
          )}
          {/* Accent pin */}
          <span style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--accent)',
          }} />
        </div>

        {/* Body */}
        <div style={{
          padding: '14px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(16px, 1.5vw, 20px)',
            fontWeight: 500,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            color: 'var(--ink)',
          }}>
            {proyecto.titulo}
          </h3>
          <span className="card-arrow" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: 'var(--ink-mute)',
            flexShrink: 0,
          }}>
            →
          </span>
        </div>
      </article>
    </Link>
  )
}
