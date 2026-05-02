'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const links = [
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/sobre-nosotros', label: 'Estudio' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.4s ease, border-color 0.4s ease',
        background: scrolled || menuOpen ? 'var(--background)' : 'transparent',
        borderBottom: scrolled || menuOpen ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <nav
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 300,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--foreground)',
            textDecoration: 'none',
          }}
        >
          Barda
        </Link>

        {/* Desktop links */}
        <ul
          style={{
            display: 'flex',
            gap: '2.5rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
          className="hidden md:flex"
        >
          {links.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <li key={href}>
                <Link
                  href={href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: active ? 'var(--foreground)' : 'var(--muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    borderBottom: active ? '1px solid var(--foreground)' : '1px solid transparent',
                    paddingBottom: '2px',
                  }}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menú"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '1px',
              background: 'var(--foreground)',
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '1px',
              background: 'var(--foreground)',
              transition: 'opacity 0.3s ease',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '1px',
              background: 'var(--foreground)',
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            background: 'var(--background)',
            borderTop: '1px solid var(--border)',
            padding: '1.5rem 2rem 2rem',
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {links.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(href + '/')
              return (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.75rem',
                      fontWeight: 300,
                      color: active ? 'var(--foreground)' : 'var(--muted)',
                      textDecoration: 'none',
                    }}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </header>
  )
}
