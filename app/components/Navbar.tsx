'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const links = [
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/sobre-nosotros', label: 'Estudio' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      background: scrolled || menuOpen ? 'var(--bg)' : 'transparent',
      borderBottom: scrolled || menuOpen ? '1px solid var(--rule)' : '1px solid transparent',
      transition: 'background 0.3s ease, border-color 0.3s ease',
    }}>
      <nav style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 var(--pad-x)',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
      }}>

        {/* Logo */}
        <Link href="/" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--ink)',
          flexShrink: 0,
        }}>
          Barda
        </Link>

        {/* Desktop nav */}
        <ul className="navbar-desktop" style={{
          alignItems: 'center',
          gap: '2rem',
          listStyle: 'none',
          flex: 1,
          justifyContent: 'center',
        }}>
          {links.map(({ href, label }) => {
            const active = isActive(href)
            return (
              <li key={href} style={{ position: 'relative' }}>
                {active && (
                  <span style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                  }} />
                )}
                <Link href={href} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: active ? 'var(--ink)' : 'var(--ink-mute)',
                  transition: 'color 0.2s ease',
                }}>
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <Link href="/contacto" className="navbar-cta" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10.5px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--bg)',
          background: 'var(--ink)',
          padding: '8px 16px',
          flexShrink: 0,
          transition: 'opacity 0.2s ease',
        }}>
          Contacto
        </Link>

        {/* Mobile hamburger */}
        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menú"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', flexDirection: 'column', gap: '5px' }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: '20px', height: '1px', background: 'var(--ink)',
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              transform: i === 0 && menuOpen ? 'translateY(6px) rotate(45deg)' : i === 2 && menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
              opacity: i === 1 && menuOpen ? 0 : 1,
            }} />
          ))}
        </button>

        <style>{`
          .navbar-desktop { display: none; }
          .navbar-cta { display: none; }
          .navbar-hamburger { display: flex; }
          .navbar-mobile-menu { display: block; }
          @media (min-width: 768px) {
            .navbar-desktop { display: flex; }
            .navbar-cta { display: block; }
            .navbar-hamburger { display: none; }
            .navbar-mobile-menu { display: none !important; }
          }
        `}</style>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar-mobile-menu" style={{
          background: 'var(--bg)',
          borderTop: '1px solid var(--rule)',
          padding: '1.5rem var(--pad-x) 2rem',
        }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[...links, { href: '/contacto', label: 'Contacto' }].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: isActive(href) ? 'var(--accent)' : 'var(--ink)',
                }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
