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
  const proyecto = await client.fetch<Project | null>(projectBySlugQuery, { slug })

  if (!proyecto) notFound()

  const heroUrl = proyecto.imagenPrincipal
    ? urlForImage(proyecto.imagenPrincipal).width(1600).height(900).fit('crop').url()
    : null

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Hero image */}
      {heroUrl && (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/7', background: 'var(--border)' }}>
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

      {/* Header del proyecto */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '3rem 2rem 0',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '2rem',
          alignItems: 'end',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '2rem',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '0.75rem',
            }}
          >
            {[proyecto.tipo ? tipoLabel[proyecto.tipo] : null, proyecto.ciudad]
              .filter(Boolean)
              .join(' — ')}
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
            }}
          >
            {proyecto.titulo}
          </h1>
        </div>
        {proyecto.anio && (
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '3rem',
              fontWeight: 300,
              color: 'var(--border)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            {proyecto.anio}
          </span>
        )}
      </div>

      {/* Descripción */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '3rem 2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '4rem',
        }}
        className="proyecto-body"
      >
        <div>
          {proyecto.descripcionCorta && (
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.5,
                color: 'var(--foreground)',
              }}
            >
              {proyecto.descripcionCorta}
            </p>
          )}
        </div>

        <div>
          {proyecto.descripcionLarga && (
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                lineHeight: 1.8,
                color: 'var(--muted)',
              }}
              className="prose-barda"
            >
              <PortableText value={proyecto.descripcionLarga} />
            </div>
          )}
        </div>
      </div>

      {/* Galería */}
      {proyecto.galeria && proyecto.galeria.length > 0 && (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem 6rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
              gap: '2px',
            }}
          >
            {proyecto.galeria.map((img, i) => {
              const src = urlForImage(img).width(1200).height(800).fit('crop').url()
              return (
                <div
                  key={i}
                  style={{
                    position: 'relative',
                    aspectRatio: '3/2',
                    background: 'var(--border)',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={src}
                    alt={img.alt ?? `${proyecto.titulo} — foto ${i + 1}`}
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

      {/* Back */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem 4rem',
          borderTop: '1px solid var(--border)',
          paddingTop: '2rem',
        }}
      >
        <Link
          href="/proyectos"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            textDecoration: 'none',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '2px',
          }}
        >
          ← Todos los proyectos
        </Link>
      </div>

      <style>{`
        .proyecto-body { }
        @media (max-width: 768px) {
          .proyecto-body { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
        .prose-barda p { margin-bottom: 1.25rem; }
        .prose-barda p:last-child { margin-bottom: 0; }
      `}</style>
    </div>
  )
}
