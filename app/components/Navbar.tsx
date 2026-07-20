'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLang } from './LangProvider'
import { COPY } from '@/app/lib/i18n'

const NAV_LINKS = [
  { href: '/',               key: 'obras' as const },
  { href: '/sobre-nosotros', key: 'estudio' as const },
  { href: '/proceso',        key: 'proceso' as const },
  { href: '/contacto',       key: 'contacto' as const },
]

export default function Navbar() {
  const pathname = usePathname()
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)

  // Cerrar el overlay al navegar (los <Link> son client-side, no recargan).
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Mientras el menú está abierto: bloquear scroll del body y cerrar con Escape.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // El Studio de Sanity ocupa el viewport completo; ocultamos el header ahí.
  if (pathname.startsWith('/studio')) return null

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const navLinks = (className: string) =>
    NAV_LINKS.map(({ href, key }) => (
      <Link
        key={href}
        href={href}
        className={`${className} ${isActive(href) ? 'active' : ''}`}
        aria-current={isActive(href) ? 'page' : undefined}
      >
        {t(COPY.nav[key])}
      </Link>
    ))

  const langSwitch = (
    <span className="lang" aria-label="Idioma / Language">
      <button
        className={lang === 'es' ? 'on' : ''}
        onClick={() => setLang('es')}
        aria-pressed={lang === 'es'}
      >
        ES
      </button>
      <span aria-hidden="true">/</span>
      <button
        className={lang === 'en' ? 'on' : ''}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
    </span>
  )

  return (
    <>
    <header className="topbar" data-menu-open={open}>
      <div className="wrap">
        <Link href="/" className="brand" aria-label="Barda Arquitectura — inicio">
          {/* Isotipo ladrillo — mismo asset en todos los temas */}
          <Image
            className="brand-iso"
            src="/brand/isotipo-ladrillo.png"
            alt=""
            width={501}
            height={360}
            priority
            style={{ height: 34, width: 'auto' }}
          />
          {/* Logo negro (light) / ladrillo (stone·dark) — swap por tema vía CSS */}
          <Image
            className="brand-logo brand-logo--dark"
            src="/brand/logo-h-negro.png"
            alt="Barda Arquitectura"
            width={119}
            height={34}
            priority
            style={{ height: 34, width: 'auto' }}
          />
          <Image
            className="brand-logo brand-logo--light"
            src="/brand/logo-h-ladrillo.png"
            alt="Barda Arquitectura"
            width={119}
            height={34}
            priority
            style={{ height: 34, width: 'auto' }}
          />
        </Link>

        {/* Nav horizontal — se oculta ≤860px vía CSS */}
        <nav className="nav">
          {navLinks('item')}
          {langSwitch}
        </nav>

        {/* Botón "+" — visible solo ≤860px vía CSS */}
        <button
          type="button"
          className="nav-toggle"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={t(open ? COPY.nav.menuClose : COPY.nav.menuOpen)}
        >
          <span className="nav-toggle-glyph" aria-hidden="true">
            +
          </span>
        </button>
      </div>

      <style>{`
        .brand-logo--light { display: none; }
        body.theme-dark  .brand-logo--dark,
        body.theme-stone .brand-logo--dark { display: none; }
        body.theme-dark  .brand-logo--light,
        body.theme-stone .brand-logo--light { display: block; }
      `}</style>
    </header>

    {/* Overlay full-screen mobile — fuera del <header> para que `position:fixed`
        se resuelva contra el viewport y no contra el bloque contenedor que crea
        el `backdrop-filter` de .topbar. `data-menu-open` en <html> permite rotar
        el "+" desde acá. */}
    <div
      id="mobile-menu"
      className="mobile-menu"
      data-open={open}
      role="dialog"
      aria-modal="true"
      aria-label={t(COPY.nav.menuOpen)}
    >
      <nav className="mobile-menu-nav">{navLinks('mobile-item')}</nav>
      <div className="mobile-menu-lang">{langSwitch}</div>
    </div>
    </>
  )
}
