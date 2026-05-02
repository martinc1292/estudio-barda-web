import type { Metadata } from 'next'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { configQuery } from '@/sanity/lib/queries'
import type { StudioConfig } from '@/sanity/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Estudio',
  description: 'Barda Arquitectura — estudio de arquitectura en Buenos Aires.',
}

export default async function SobreNosotrosPage() {
  const config = await client.fetch<StudioConfig>(configQuery)

  const fotoUrl = config?.fotoArquitecto
    ? urlForImage(config.fotoArquitecto).width(800).height(1000).fit('crop').url()
    : null

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Título */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '4rem 2rem 3rem',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          Estudio
        </h1>
      </div>

      {/* Bio del estudio */}
      <section
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '5rem 2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6rem',
          alignItems: 'start',
        }}
        className="bio-grid"
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '2rem',
            }}
          >
            Barda Arquitectura
          </p>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)',
              fontWeight: 300,
              lineHeight: 1.55,
              letterSpacing: '0.01em',
            }}
          >
            {config?.bioEstudio}
          </p>
        </div>

        <div
          style={{
            paddingTop: '3rem',
            borderTop: '1px solid var(--border)',
          }}
          className="bio-info"
        >
          <div style={{ marginBottom: '2.5rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '0.5rem',
              }}
            >
              Zona de trabajo
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                color: 'var(--foreground)',
              }}
            >
              Ciudad de Buenos Aires y zona norte del Gran Buenos Aires. También desarrollamos proyectos en Río Negro, Neuquén y Misiones.
            </p>
          </div>
        </div>
      </section>

      {/* Arquitecto */}
      <section
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '5rem 2rem',
            display: 'grid',
            gridTemplateColumns: fotoUrl ? '1fr 1fr' : '1fr',
            gap: '5rem',
            alignItems: 'start',
          }}
          className="arquitecto-grid"
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '0.5rem',
              }}
            >
              Arquitecto
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 300,
                marginBottom: '2.5rem',
                letterSpacing: '-0.01em',
              }}
            >
              Joaquín Licera Vidal
            </h2>

            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: 'var(--muted)',
                lineHeight: 1.8,
              }}
            >
              {config?.bioArquitecto?.split('\n\n').map((párrafo, i) => (
                <p key={i} style={{ marginBottom: '1.25rem' }}>
                  {párrafo}
                </p>
              ))}
            </div>
          </div>

          {fotoUrl && (
            <div
              style={{
                position: 'relative',
                aspectRatio: '4/5',
                overflow: 'hidden',
                background: 'var(--border)',
              }}
            >
              <Image
                src={fotoUrl}
                alt={config?.fotoArquitecto?.alt ?? 'Joaquín Licera Vidal'}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .bio-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .arquitecto-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .bio-info { padding-top: 0 !important; border-top: none !important; }
        }
      `}</style>
    </div>
  )
}
