import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { allProjectsQuery } from '@/sanity/lib/queries'
import type { Project } from '@/sanity/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Proyectos',
  description: 'Proyectos de arquitectura desarrollados por Barda Arquitectura en Buenos Aires y el país.',
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

export default async function ProyectosPage() {
  const proyectos = await client.fetch<Project[]>(allProjectsQuery)

  const principales = proyectos.filter((p) => p.categoria === 'principal')
  const secundarios = proyectos.filter((p) => p.categoria === 'secundario' || !p.categoria)

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Header */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '4rem 2rem 3rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '2rem',
          flexWrap: 'wrap',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 300,
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          Proyectos
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--muted)',
            maxWidth: '360px',
            lineHeight: 1.6,
          }}
        >
          Trabajamos en distintas escalas, desde viviendas individuales hasta proyectos de uso mixto.
        </p>
      </div>

      {/* Proyectos principales */}
      {principales.length > 0 && (
        <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 2rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 420px), 1fr))',
              gap: '2px',
            }}
          >
            {principales.map((proyecto, i) => (
              <ProyectoItem key={proyecto._id} proyecto={proyecto} priority={i < 2} large={i === 0} />
            ))}
          </div>
        </section>
      )}

      {/* Proyectos secundarios */}
      {secundarios.length > 0 && (
        <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem 6rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '2rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--border)',
            }}
          >
            Otros proyectos
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
              gap: '2px',
            }}
          >
            {secundarios.map((proyecto) => (
              <ProyectoItem key={proyecto._id} proyecto={proyecto} />
            ))}
          </div>
        </section>
      )}

      {proyectos.length === 0 && (
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '8rem 2rem',
            textAlign: 'center',
          }}
        >
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--muted)', fontSize: '0.9375rem' }}>
            Los proyectos se están cargando próximamente.
          </p>
        </div>
      )}
    </div>
  )
}

function ProyectoItem({
  proyecto,
  priority,
  large,
}: {
  proyecto: Project
  priority?: boolean
  large?: boolean
}) {
  const imgUrl = proyecto.imagenPrincipal
    ? urlForImage(proyecto.imagenPrincipal)
        .width(large ? 1200 : 800)
        .height(large ? 800 : 600)
        .fit('crop')
        .url()
    : null

  return (
    <Link
      href={`/proyectos/${proyecto.slug.current}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <article className="proyecto-item" style={{ overflow: 'hidden', cursor: 'pointer' }}>
        <div
          style={{
            position: 'relative',
            aspectRatio: large ? '16/9' : '4/3',
            background: 'var(--border)',
          }}
        >
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={proyecto.imagenPrincipal?.alt ?? proyecto.titulo}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover', transition: 'transform 0.7s ease' }}
              priority={priority}
              className="proyecto-img"
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: '#e8e4de',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  color: 'var(--muted)',
                  letterSpacing: '0.08em',
                  fontStyle: 'italic',
                }}
              >
                {proyecto.titulo}
              </span>
            </div>
          )}
        </div>

        <div
          style={{
            padding: '1.25rem 0 1.75rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1rem',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: large ? '1.375rem' : '1.125rem',
                fontWeight: 400,
                marginBottom: '0.3rem',
                lineHeight: 1.2,
              }}
            >
              {proyecto.titulo}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'var(--muted)',
                letterSpacing: '0.02em',
              }}
            >
              {[proyecto.ciudad, proyecto.tipo ? tipoLabel[proyecto.tipo] : null]
                .filter(Boolean)
                .join(' · ')}
            </p>
          </div>
          {proyecto.anio && (
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                color: 'var(--muted)',
                letterSpacing: '0.04em',
                flexShrink: 0,
              }}
            >
              {proyecto.anio}
            </span>
          )}
        </div>
      </article>
      <style>{`
        .proyecto-item:hover .proyecto-img { transform: scale(1.04); }
      `}</style>
    </Link>
  )
}
