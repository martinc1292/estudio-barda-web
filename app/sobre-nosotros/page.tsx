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
    <div style={{ paddingTop: '56px' }}>

      {/* ── Page header ──────────────────────────────── */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '48px var(--pad-x) 40px',
        borderBottom: '1px solid var(--rule)',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10.5px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--ink-mute)',
          display: 'block',
          marginBottom: '12px',
        }}>
          Estudio
        </span>
        <h1 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(36px, 5vw, 72px)',
          fontWeight: 500,
          letterSpacing: '-0.04em',
          lineHeight: 1.0,
          color: 'var(--ink)',
        }}>
          Barda Arquitectura
        </h1>
      </div>

      {/* ── Bio del estudio ───────────────────────────── */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '56px var(--pad-x)',
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: '64px',
        alignItems: 'start',
        borderBottom: '1px solid var(--rule)',
      }} className="bio-grid">
        <div>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(18px, 2vw, 24px)',
            fontWeight: 400,
            lineHeight: 1.55,
            letterSpacing: '-0.01em',
            color: 'var(--ink)',
          }}>
            {config?.bioEstudio}
          </p>
        </div>

        <div style={{ borderLeft: '1px solid var(--rule)', paddingLeft: '40px' }} className="bio-info">
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9.5px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--ink-mute)',
            marginBottom: '16px',
          }}>
            Zona de trabajo
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'var(--ink-soft)',
            lineHeight: 1.7,
          }}>
            Ciudad de Buenos Aires y zona norte del Gran Buenos Aires. También desarrollamos proyectos en Río Negro, Neuquén y Misiones.
          </p>
        </div>
      </section>

      {/* ── Arquitecto ───────────────────────────────── */}
      <section style={{ borderBottom: '1px solid var(--rule)' }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '56px var(--pad-x)',
          display: 'grid',
          gridTemplateColumns: fotoUrl ? '1fr 1fr' : '1fr',
          gap: '56px',
          alignItems: 'start',
        }} className="arquitecto-grid">
          <div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9.5px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ink-mute)',
              display: 'block',
              marginBottom: '8px',
            }}>
              Arquitecto
            </span>
            <h2 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(22px, 2.5vw, 36px)',
              fontWeight: 500,
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
              color: 'var(--ink)',
              marginBottom: '32px',
            }}>
              Joaquín Licera Vidal
            </h2>

            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              color: 'var(--ink-mute)',
              lineHeight: 1.75,
            }}>
              {config?.bioArquitecto?.split('\n\n').map((párrafo, i) => (
                <p key={i} style={{ marginBottom: '1.25rem' }}>
                  {párrafo}
                </p>
              ))}
            </div>
          </div>

          {fotoUrl && (
            <div style={{
              position: 'relative',
              aspectRatio: '4/5',
              overflow: 'hidden',
              background: 'var(--card-bg)',
            }}>
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
          .bio-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .bio-info { border-left: none !important; padding-left: 0 !important; border-top: 1px solid var(--rule); padding-top: 32px !important; }
          .arquitecto-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  )
}
