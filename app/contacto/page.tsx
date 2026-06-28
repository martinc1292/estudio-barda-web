import type { Metadata } from 'next'
import { safeFetch } from '@/sanity/lib/client'
import { configQuery } from '@/sanity/lib/queries'
import type { StudioConfig } from '@/sanity/types'
import {
  CONTACT_DEFAULTS,
  formatWhatsAppDisplay,
  normalizeInstagramHandle,
  normalizeWhatsAppNumber,
} from '@/app/lib/proyecto-utils'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Iniciemos un proyecto juntos. Contactate con Barda Arquitectura.',
}

export default async function ContactoPage() {
  const config = await safeFetch<StudioConfig>(configQuery)

  const whatsapp = normalizeWhatsAppNumber(config?.whatsapp)
  const email = config?.email ?? CONTACT_DEFAULTS.email
  const instagram = normalizeInstagramHandle(config?.instagram)

  return (
    <div style={{ paddingTop: 'var(--navbar-h, 88px)' }}>

      {/* Section header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '200px 1fr auto',
        alignItems: 'flex-end',
        gap: '32px',
        padding: '56px var(--pad-x) 28px',
        borderBottom: '1px solid var(--rule)',
      }} className="contacto-section-head">
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10.5px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--ink-mute)',
        }}>
          <strong style={{ color: 'var(--accent)', fontWeight: 400, marginRight: '8px' }}>04</strong>
          SECCIÓN
        </div>
        <h1 style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
          fontSize: 'clamp(28px, 3vw, 44px)',
          letterSpacing: '-0.035em',
          lineHeight: 1,
          margin: 0,
          color: 'var(--ink)',
        }}>
          Contacto
        </h1>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10.5px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--ink-mute)',
        }}>
          ESTUDIO ACTIVO · 2026
        </div>
      </div>

      {/* Main content */}
      <section style={{
        padding: '56px var(--pad-x)',
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: '64px',
        borderBottom: '1px solid var(--rule)',
      }} className="contacto-main-grid">

        {/* Left — heading + description */}
        <div>
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: 'clamp(40px, 5.4vw, 88px)',
            letterSpacing: '-0.045em',
            lineHeight: 0.96,
            margin: 0,
            color: 'var(--ink)',
          }}>
            Iniciemos un<br />
            <span style={{ color: 'var(--accent)' }}>proyecto juntos.</span>
          </h2>
          <p style={{
            maxWidth: '540px',
            marginTop: '28px',
            fontFamily: 'var(--font-sans)',
            fontSize: '15px',
            lineHeight: 1.55,
            color: 'var(--ink-soft)',
          }}>
            Trabajamos con una primera conversación abierta para entender el programa, el contexto y los plazos antes de presupuestar.
          </p>
        </div>

        {/* Right — specs grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          border: '1px solid var(--rule)',
          alignSelf: 'start',
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          color: 'var(--ink)',
        }}>
          <div style={{ padding: '18px', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--ink-mute)',
              marginBottom: '6px',
            }}>Email</div>
            <a href={`mailto:${email}`} style={{ color: 'inherit' }}>{email}</a>
          </div>
          <div style={{ padding: '18px', borderBottom: '1px solid var(--rule)' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--ink-mute)',
              marginBottom: '6px',
            }}>Teléfono</div>
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
              {formatWhatsAppDisplay(whatsapp)}
            </a>
          </div>
          <div style={{ padding: '18px', borderRight: '1px solid var(--rule)' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--ink-mute)',
              marginBottom: '6px',
            }}>Instagram</div>
            <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
              @{instagram}
            </a>
          </div>
          <div style={{ padding: '18px' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--ink-mute)',
              marginBottom: '6px',
            }}>Sede</div>
            Buenos Aires, AR
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .contacto-section-head { grid-template-columns: auto 1fr auto !important; }
          .contacto-main-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          .contacto-section-head { grid-template-columns: 1fr !important; }
          .contacto-section-head > *:last-child { display: none; }
        }
      `}</style>
    </div>
  )
}
