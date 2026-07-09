import Link from 'next/link'
import { safeFetch } from '@/sanity/lib/client'
import { configQuery } from '@/sanity/lib/queries'
import type { StudioConfig } from '@/sanity/types'
import {
  CONTACT_DEFAULTS,
  normalizeInstagramHandle,
  normalizeWhatsAppNumber,
} from '@/app/lib/proyecto-utils'

export default async function Footer() {
  const config = await safeFetch<StudioConfig>(configQuery)
  const email = config?.email ?? CONTACT_DEFAULTS.email
  const whatsapp = normalizeWhatsAppNumber(config?.whatsapp)
  const instagram = normalizeInstagramHandle(config?.instagram)

  return (
    <footer style={{ borderTop: '1px solid var(--rule)', background: 'var(--bg)' }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '56px var(--pad-x) 0',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: '32px',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }} className="footer-cols">

        {/* Big call to action */}
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10.5px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 400,
            color: 'var(--ink-mute)',
            margin: '0 0 14px',
          }}>
            —— Iniciemos
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: 'clamp(36px, 5vw, 72px)',
            letterSpacing: '-0.05em',
            lineHeight: 0.92,
            textTransform: 'none',
            color: 'var(--ink)',
            margin: 0,
          }}>
            Entender,{' '}<br />
            ordenar y{' '}<span style={{ color: 'var(--accent)' }}>materializar.</span>
          </p>
          <nav style={{ marginTop: '32px', display: 'flex', gap: '0', flexWrap: 'wrap' }}>
            {[
              { href: '/proyectos',      label: 'Proyectos' },
              { href: '/sobre-nosotros', label: 'Estudio' },
              { href: '/contacto',       label: 'Contacto' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10.5px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--ink-mute)',
                padding: '6px 14px',
                borderLeft: '1px solid var(--rule)',
                transition: 'color 0.2s ease',
              }}>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contacto */}
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10.5px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 400,
            color: 'var(--ink-mute)',
            margin: '0 0 14px',
          }}>
            Contacto
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              { href: `mailto:${email}`, label: email },
              { href: `https://wa.me/${whatsapp}`,  label: 'WhatsApp' },
              { href: `https://instagram.com/${instagram}`, label: `@${instagram}` },
            ].map(({ href, label }) => (
              <li key={label} style={{ padding: '3px 0', color: 'var(--ink-soft)' }}>
                <a href={href} style={{ color: 'inherit', transition: 'color 0.2s ease' }}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Estudio */}
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10.5px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 400,
            color: 'var(--ink-mute)',
            margin: '0 0 14px',
          }}>
            Estudio
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {['Buenos Aires, AR', 'Joaquín Licera Vidal', 'Director'].map(item => (
              <li key={item} style={{ padding: '3px 0', color: 'var(--ink-soft)' }}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Sistema */}
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10.5px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 400,
            color: 'var(--ink-mute)',
            margin: '0 0 14px',
          }}>
            Sistema
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {['Archivo / IBM Plex Mono', 'Ladrillo #E24F05', 'Identidad / 2026'].map(item => (
              <li key={item} style={{ padding: '3px 0', color: 'var(--ink-soft)' }}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Baseline */}
        <div style={{
          gridColumn: '1 / -1',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          marginTop: '56px',
          paddingTop: '18px',
          paddingBottom: '24px',
          borderTop: '1px solid var(--rule-soft)',
          color: 'var(--ink-mute)',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }} className="footer-baseline">
          <span>© BARDA · 2018 — {new Date().getFullYear()}</span>
          <span style={{ textAlign: 'center', color: 'var(--accent)' }}>
            ● ESTUDIO ACTIVO
          </span>
          <span style={{ textAlign: 'right' }}>HECHO EN BUENOS AIRES</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-cols { grid-template-columns: 1fr 1fr 1fr !important; }
          .footer-cols > div:first-child { grid-column: 1 / -1; }
          .footer-baseline { grid-template-columns: 1fr auto !important; }
          .footer-baseline > span:last-child { display: none; }
        }
        @media (max-width: 600px) {
          .footer-cols { grid-template-columns: 1fr !important; }
          .footer-baseline { grid-template-columns: 1fr !important; gap: 8px; }
          .footer-baseline > span:nth-child(2) { text-align: left !important; }
        }
      `}</style>
    </footer>
  )
}
