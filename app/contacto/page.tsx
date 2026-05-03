import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { configQuery } from '@/sanity/lib/queries'
import type { StudioConfig } from '@/sanity/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contactate con Barda Arquitectura por WhatsApp, email o Instagram.',
}

export default async function ContactoPage() {
  const config = await client.fetch<StudioConfig>(configQuery)

  const whatsapp = config?.whatsapp ?? '2215718737'
  const email = config?.email ?? 'bardaarquitectura@gmail.com'
  const instagram = config?.instagram ?? 'estudio_barda'

  return (
    <div style={{ paddingTop: '56px', minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>

      {/* ── Page header ──────────────────────────────── */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
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
          Contacto
        </span>
        <h1 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(36px, 5vw, 72px)',
          fontWeight: 500,
          letterSpacing: '-0.04em',
          lineHeight: 1.0,
          color: 'var(--ink)',
        }}>
          Hablemos
        </h1>
      </div>

      {/* ── Contenido ─────────────────────────────────── */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        padding: '56px var(--pad-x)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '64px',
        flex: 1,
      }} className="contacto-grid">

        {/* Texto */}
        <div>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(18px, 2vw, 24px)',
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: '-0.01em',
            color: 'var(--ink)',
            marginBottom: '32px',
          }}>
            Contanos tu proyecto. Trabajamos de forma cercana con cada cliente desde la primera consulta.
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'var(--ink-mute)',
            lineHeight: 1.7,
            maxWidth: '380px',
          }}>
            El medio principal es WhatsApp. Podés también escribirnos por email o seguirnos en Instagram para ver el trabajo del estudio.
          </p>
        </div>

        {/* Links de contacto */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[
            {
              label: 'WhatsApp',
              value: `+54 ${whatsapp}`,
              href: `https://wa.me/54${whatsapp}`,
              external: true,
              principal: true,
            },
            {
              label: 'Email',
              value: email,
              href: `mailto:${email}`,
              external: false,
              principal: false,
            },
            {
              label: 'Instagram',
              value: `@${instagram}`,
              href: `https://instagram.com/${instagram}`,
              external: true,
              principal: false,
            },
          ].map(item => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '24px 0',
                borderBottom: '1px solid var(--rule)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'background 0.15s ease',
              }}
              className="contact-row"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9.5px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-mute)',
                  }}>
                    {item.label}
                  </span>
                  {item.principal && (
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '8px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--bg)',
                      background: 'var(--accent)',
                      padding: '2px 6px',
                    }}>
                      Principal
                    </span>
                  )}
                </div>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(16px, 1.5vw, 20px)',
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                  color: 'var(--ink)',
                }}>
                  {item.value}
                </span>
              </div>
              <span className="contact-arrow" style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '16px',
                color: 'var(--ink-mute)',
                transition: 'transform 0.2s ease',
              }}>
                →
              </span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contacto-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        .contact-row:hover .contact-arrow { transform: translateX(4px); }
      `}</style>
    </div>
  )
}
