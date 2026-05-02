import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--background)',
        padding: '3rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '2rem',
          alignItems: 'end',
        }}
        className="footer-grid"
      >
        {/* Logo */}
        <div>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 300,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--foreground)',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            Barda
          </Link>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'var(--muted)',
              letterSpacing: '0.04em',
              margin: 0,
            }}
          >
            Ciudad de Buenos Aires
          </p>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
          {[
            { href: '/proyectos', label: 'Proyectos' },
            { href: '/sobre-nosotros', label: 'Estudio' },
            { href: '/contacto', label: 'Contacto' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Contact */}
        <div style={{ textAlign: 'right' }}>
          <a
            href="https://wa.me/542215718737"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              letterSpacing: '0.04em',
              color: 'var(--muted)',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '0.4rem',
            }}
          >
            WhatsApp
          </a>
          <a
            href="mailto:bardaarquitectura@gmail.com"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              letterSpacing: '0.04em',
              color: 'var(--muted)',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '0.4rem',
            }}
          >
            bardaarquitectura@gmail.com
          </a>
          <a
            href="https://instagram.com/estudio_barda"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              letterSpacing: '0.04em',
              color: 'var(--muted)',
              textDecoration: 'none',
              display: 'block',
            }}
          >
            @estudio_barda
          </a>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1400px',
          margin: '2rem auto 0',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--muted)', margin: 0, letterSpacing: '0.04em' }}>
          © {new Date().getFullYear()} Barda Arquitectura
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--muted)', margin: 0, letterSpacing: '0.04em' }}>
          Arquitectura real.
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            text-align: left !important;
          }
          .footer-grid > div:last-child {
            text-align: left !important;
          }
          .footer-grid nav {
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  )
}
