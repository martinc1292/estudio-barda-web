import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { configQuery, featuredProjectsQuery, allServicesQuery } from '@/sanity/lib/queries'
import type { StudioConfig, Project, Service } from '@/sanity/types'

export const revalidate = 60

export default async function Home() {
  const [config, proyectosDestacados, servicios] = await Promise.all([
    client.fetch<StudioConfig>(configQuery),
    client.fetch<Project[]>(featuredProjectsQuery),
    client.fetch<Service[]>(allServicesQuery),
  ])

  const serviciosPrincipales = servicios.filter((s) => s.tipo === 'principal')
  const serviciosComplementarios = servicios.filter((s) => s.tipo === 'complementario')

  return (
    <>
      {/* Hero */}
      <section
        style={{
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0 2rem 4rem',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div style={{ maxWidth: '720px' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '1.5rem',
            }}
          >
            Buenos Aires — Arquitectura
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--foreground)',
              marginBottom: '2.5rem',
            }}
          >
            {config?.lema ?? 'Arquitectura real.'}
          </h1>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/proyectos"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--foreground)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--foreground)',
                paddingBottom: '3px',
              }}
            >
              Ver proyectos
            </Link>
            <a
              href={`https://wa.me/54${config?.whatsapp ?? '2215718737'}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '3px',
              }}
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            right: '2rem',
            bottom: '4rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          className="hidden md:flex"
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.625rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              writingMode: 'vertical-rl',
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: '1px',
              height: '48px',
              background: 'var(--border)',
            }}
          />
        </div>
      </section>

      {/* Proyectos destacados */}
      {proyectosDestacados.length > 0 && (
        <section style={{ padding: '6rem 2rem', background: 'var(--surface)' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '3rem',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '1.5rem',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  fontWeight: 300,
                }}
              >
                Proyectos
              </h2>
              <Link
                href="/proyectos"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '2px',
                }}
              >
                Ver todos
              </Link>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))',
                gap: '2px',
              }}
            >
              {proyectosDestacados.map((proyecto, i) => (
                <ProjectCard key={proyecto._id} proyecto={proyecto} priority={i === 0} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Servicios */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div
            style={{
              borderBottom: '1px solid var(--border)',
              paddingBottom: '1.5rem',
              marginBottom: '3rem',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 300,
              }}
            >
              Servicios
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
              gap: '3rem 4rem',
              marginBottom: serviciosComplementarios.length > 0 ? '4rem' : 0,
            }}
          >
            {serviciosPrincipales.map((s, i) => (
              <div key={s._id}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    marginBottom: '0.75rem',
                  }}
                >
                  0{i + 1}
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.375rem',
                    fontWeight: 400,
                    marginBottom: '0.75rem',
                    lineHeight: 1.2,
                  }}
                >
                  {s.titulo}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--muted)',
                    lineHeight: 1.7,
                  }}
                >
                  {s.descripcion}
                </p>
              </div>
            ))}
          </div>

          {serviciosComplementarios.length > 0 && (
            <>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginBottom: '1.5rem',
                }}
              >
                Complementarios
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                {serviciosComplementarios.map((s) => (
                  <span
                    key={s._id}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8125rem',
                      color: 'var(--muted)',
                      border: '1px solid var(--border)',
                      padding: '0.4rem 1rem',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {s.titulo}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: '6rem 2rem',
          background: 'var(--foreground)',
          color: 'var(--background)',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '2rem',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              maxWidth: '600px',
            }}
          >
            ¿Tenés un proyecto en mente?
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              color: 'rgba(248,246,242,0.6)',
              maxWidth: '400px',
              lineHeight: 1.7,
            }}
          >
            Contanos tu idea. Trabajamos de forma cercana desde la primera consulta.
          </p>
          <a
            href={`https://wa.me/54${config?.whatsapp ?? '2215718737'}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--background)',
              textDecoration: 'none',
              border: '1px solid rgba(248,246,242,0.3)',
              padding: '1rem 2.5rem',
              transition: 'background 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.background = 'var(--background)'
              ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--foreground)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--background)'
            }}
          >
            Escribinos por WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}

function ProjectCard({ proyecto, priority }: { proyecto: Project; priority?: boolean }) {
  const imgUrl = proyecto.imagenPrincipal
    ? urlForImage(proyecto.imagenPrincipal).width(800).height(600).fit('crop').url()
    : null

  return (
    <Link
      href={`/proyectos/${proyecto.slug.current}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <article
        style={{
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        className="project-card"
      >
        <div style={{ position: 'relative', aspectRatio: '4/3', background: 'var(--border)' }}>
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={proyecto.imagenPrincipal?.alt ?? proyecto.titulo}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
              priority={priority}
              className="project-img"
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
                SIN IMAGEN
              </span>
            </div>
          )}
        </div>
        <div style={{ padding: '1.25rem 0 0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.125rem',
                fontWeight: 400,
                letterSpacing: '0.01em',
              }}
            >
              {proyecto.titulo}
            </h3>
            {proyecto.anio && (
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'var(--muted)',
                  letterSpacing: '0.04em',
                }}
              >
                {proyecto.anio}
              </span>
            )}
          </div>
          {proyecto.ciudad && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'var(--muted)',
                marginTop: '0.25rem',
                letterSpacing: '0.02em',
              }}
            >
              {proyecto.ciudad}
            </p>
          )}
        </div>
      </article>
      <style>{`
        .project-card:hover .project-img { transform: scale(1.03); }
      `}</style>
    </Link>
  )
}
