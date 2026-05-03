import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--rule)', background: 'var(--bg)' }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '48px var(--pad-x) 32px',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gap: '2rem',
      }} className="footer-cols">

        {/* Studio */}
        <div>
          <Link href="/" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            display: 'block',
            marginBottom: '12px',
          }}>
            Barda Arquitectura
          </Link>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10.5px',
            letterSpacing: '0.06em',
            color: 'var(--ink-mute)',
            lineHeight: 1.6,
          }}>
            Ciudad de Buenos Aires<br />
            Arquitectura de distintas escalas
          </p>
          <nav style={{ marginTop: '20px', display: 'flex', gap: '1.5rem' }}>
            {[
              { href: '/proyectos', label: 'Proyectos' },
              { href: '/sobre-nosotros', label: 'Estudio' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10.5px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--ink-mute)',
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
            fontSize: '9.5px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink-mute)',
            marginBottom: '12px',
          }}>
            Contacto
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a href="mailto:bardaarquitectura@gmail.com" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.02em',
              color: 'var(--ink-soft)',
              transition: 'color 0.2s ease',
            }}>
              bardaarquitectura@gmail.com
            </a>
            <a href="https://wa.me/542215718737" target="_blank" rel="noopener noreferrer" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.04em',
              color: 'var(--ink-mute)',
              transition: 'color 0.2s ease',
            }}>
              WhatsApp
            </a>
            <a href="https://instagram.com/estudio_barda" target="_blank" rel="noopener noreferrer" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.04em',
              color: 'var(--ink-mute)',
              transition: 'color 0.2s ease',
            }}>
              @estudio_barda
            </a>
          </div>
        </div>

        {/* Colofón */}
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9.5px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink-mute)',
            marginBottom: '12px',
          }}>
            Colofón
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10.5px',
            letterSpacing: '0.02em',
            color: 'var(--ink-mute)',
            lineHeight: 1.7,
          }}>
            Inter + IBM Plex Mono<br />
            Next.js — Sanity CMS
          </p>
        </div>
      </div>

      {/* Baseline */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '16px var(--pad-x)',
        borderTop: '1px solid var(--rule)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
      }} className="footer-baseline">
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9.5px',
          letterSpacing: '0.08em',
          color: 'var(--ink-mute)',
          textTransform: 'uppercase',
        }}>
          © {new Date().getFullYear()} Barda Arquitectura
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9.5px',
          letterSpacing: '0.08em',
          color: 'var(--ink-mute)',
          textTransform: 'uppercase',
        }}>
          Buenos Aires — Argentina
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-cols { grid-template-columns: 1fr !important; }
          .footer-baseline { flex-direction: column; align-items: flex-start !important; gap: 8px !important; }
        }
      `}</style>
    </footer>
  )
}
