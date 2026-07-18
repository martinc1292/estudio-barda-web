'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
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

  // El Studio de Sanity ocupa el viewport completo; ocultamos el header ahí.
  if (pathname.startsWith('/studio')) return null

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="topbar">
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

        <nav className="nav">
          {NAV_LINKS.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className={`item ${isActive(href) ? 'active' : ''}`}
              aria-current={isActive(href) ? 'page' : undefined}
            >
              {t(COPY.nav[key])}
            </Link>
          ))}

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
        </nav>
      </div>

      <style>{`
        .brand-logo--light { display: none; }
        body.theme-dark  .brand-logo--dark,
        body.theme-stone .brand-logo--dark { display: none; }
        body.theme-dark  .brand-logo--light,
        body.theme-stone .brand-logo--light { display: block; }
      `}</style>
    </header>
  )
}
