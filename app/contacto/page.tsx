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
    <div style={{ paddingTop: '64px', minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
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
          Contacto
        </h1>
      </div>

      {/* Contenido */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          padding: '5rem 2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6rem',
          flex: 1,
        }}
        className="contacto-grid"
      >
        {/* Texto */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.375rem, 2.5vw, 1.875rem)',
              fontWeight: 300,
              lineHeight: 1.5,
              marginBottom: '3rem',
              letterSpacing: '0.01em',
            }}
          >
            Contanos tu proyecto. Trabajamos de forma cercana con cada cliente desde la primera consulta.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--muted)',
              lineHeight: 1.7,
              maxWidth: '380px',
            }}
          >
            El medio principal es WhatsApp. Podés también escribirnos por email o seguirnos en Instagram para ver el trabajo del estudio.
          </p>
        </div>

        {/* Links de contacto */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          <ContactItem
            label="WhatsApp"
            value={`+54 ${whatsapp}`}
            href={`https://wa.me/54${whatsapp}`}
            external
            principal
          />
          <ContactItem
            label="Email"
            value={email}
            href={`mailto:${email}`}
          />
          <ContactItem
            label="Instagram"
            value={`@${instagram}`}
            href={`https://instagram.com/${instagram}`}
            external
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contacto-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </div>
  )
}

function ContactItem({
  label,
  value,
  href,
  external,
  principal,
}: {
  label: string
  value: string
  href: string
  external?: boolean
  principal?: boolean
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.75rem 0',
        borderBottom: '1px solid var(--border)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'background 0.15s ease',
      }}
      className="contact-item"
    >
      <div>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '0.4rem',
          }}
        >
          {label}
          {principal && (
            <span
              style={{
                marginLeft: '0.5rem',
                background: 'var(--accent)',
                color: 'var(--foreground)',
                padding: '1px 6px',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
              }}
            >
              Principal
            </span>
          )}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 300,
          }}
        >
          {value}
        </p>
      </div>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          color: 'var(--muted)',
          transition: 'transform 0.2s ease',
        }}
        className="contact-arrow"
      >
        →
      </span>
      <style>{`
        .contact-item:hover { padding-left: 0.5rem; }
        .contact-item:hover .contact-arrow { transform: translateX(4px); }
      `}</style>
    </a>
  )
}
