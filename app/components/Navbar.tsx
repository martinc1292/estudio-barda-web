'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import Isotipo from './Isotipo'

const NAV_LINKS = [
  { href: '/proyectos',      label: 'Obras' },
  { href: '/sobre-nosotros', label: 'Estudio' },
  { href: '/proceso',        label: 'Proceso' },
]

function UtilityBar() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString('es-AR', {
          hour: '2-digit', minute: '2-digit', hour12: false,
        })
      )
    }
    update()
    const id = setInterval(update, 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      alignItems: 'center',
      gap: '24px',
      padding: '8px var(--pad-x)',
      borderBottom: '1px solid var(--rule)',
      fontFamily: 'var(--font-mono)',
      fontSize: '10px',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--ink-mute)',
    }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <span>BARDA / 2026</span>
        <span style={{ color: 'var(--rule)' }}>·</span>
        <span>S 34.6° W 58.4°</span>
        <span style={{ color: 'var(--rule)' }}>·</span>
        <span style={{ color: 'var(--ink-soft)' }}>BUENOS AIRES</span>
      </div>
      <div />
      {time && (
        <span style={{ color: 'var(--ink-soft)' }}>{time} ART</span>
      )}
    </div>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      background: scrolled || menuOpen
        ? 'color-mix(in srgb, var(--bg) 92%, transparent)'
        : 'transparent',
      backdropFilter: scrolled || menuOpen ? 'blur(8px)' : 'none',
      borderBottom: scrolled || menuOpen ? '1px solid var(--rule)' : '1px solid transparent',
      transition: 'background 0.3s ease, border-color 0.3s ease',
    }}>
      {/* Utility bar — solo en desktop */}
      <div className="utility-bar-wrapper">
        <UtilityBar />
      </div>

      {/* Topbar principal */}
      <nav style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 var(--pad-x)',
        height: '56px',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        alignItems: 'center',
        gap: '2rem',
      }}>

        {/* Logo */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
          color: 'var(--ink)',
        }}>
          <Isotipo size={28} variant="color" />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 1 }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: '17px',
              letterSpacing: '-0.035em',
              lineHeight: 0.9,
              color: 'var(--ink)',
            }}>
              BARDA
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 400,
              fontSize: '8px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--ink-mute)',
              marginTop: '3px',
            }}>
              ARQUITECTURA
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="navbar-desktop" style={{
          alignItems: 'center',
          gap: 0,
          listStyle: 'none',
          flex: 1,
          justifyContent: 'center',
        }}>
          {NAV_LINKS.map(({ href, label }) => {
            const active = isActive(href)
            return (
              <li key={href} style={{ position: 'relative' }}>
                {active && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '4px',
                    height: '4px',
                    background: 'var(--accent)',
                  }} />
                )}
                <Link href={href} style={{
                  display: 'block',
                  padding: '6px 16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: active ? 'var(--ink)' : 'var(--ink-mute)',
                  borderLeft: '1px solid var(--rule)',
                  transition: 'color 0.2s ease',
                }}>
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* CTA desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
          <Link href="/contacto" className="navbar-cta" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10.5px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--arena)',
            background: 'var(--hierro)',
            padding: '8px 14px',
            flexShrink: 0,
            transition: 'opacity 0.2s ease',
            whiteSpace: 'nowrap',
          }}>
            Iniciar proyecto ↗
          </Link>

          {/* Mobile hamburger */}
          <button
            className="navbar-hamburger"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menú"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 4px', marginLeft: '12px', flexDirection: 'column', gap: '5px' }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: '20px', height: '1px', background: 'var(--ink)',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform:
                  i === 0 && menuOpen ? 'translateY(6px) rotate(45deg)' :
                  i === 2 && menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
                opacity: i === 1 && menuOpen ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar-mobile-menu" style={{
          background: 'var(--bg)',
          borderTop: '1px solid var(--rule)',
          padding: '1.5rem var(--pad-x) 2rem',
        }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[...NAV_LINKS, { href: '/contacto', label: 'Contacto' }].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} onClick={() => setMenuOpen(false)} style={{
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

      <style>{`
        .utility-bar-wrapper { display: none; }
        .navbar-desktop { display: none; }
        .navbar-cta { display: none; }
        .navbar-hamburger { display: flex; }
        .navbar-mobile-menu { display: block; }
        @media (min-width: 768px) {
          .utility-bar-wrapper { display: block; }
          .navbar-desktop { display: flex; }
          .navbar-cta { display: block; }
          .navbar-hamburger { display: none; }
          .navbar-mobile-menu { display: none !important; }
        }
      `}</style>
    </header>
  )
}
