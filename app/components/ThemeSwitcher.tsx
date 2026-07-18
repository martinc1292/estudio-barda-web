'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

type Theme = 'light' | 'stone' | 'dark'

/* Rayados de corte arquitectónico: punteado = arena,
   grava = piedra, diagonal 45° = acero/hierro. */
const HATCH_ARENA = (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="currentColor">
    <circle cx="3" cy="3.5" r="0.9" />
    <circle cx="8.2" cy="2.6" r="0.9" />
    <circle cx="13.6" cy="4" r="0.9" />
    <circle cx="5.6" cy="7.4" r="0.9" />
    <circle cx="11" cy="8.6" r="0.9" />
    <circle cx="15.4" cy="7" r="0.9" />
    <circle cx="2.6" cy="11.4" r="0.9" />
    <circle cx="8.4" cy="12.4" r="0.9" />
    <circle cx="14" cy="11.6" r="0.9" />
    <circle cx="5" cy="15.4" r="0.9" />
    <circle cx="11.2" cy="15" r="0.9" />
    <circle cx="15.6" cy="15.4" r="0.9" />
  </svg>
)

/* Piedra oculto por el momento — para restaurarlo, descomentar el hatch
   y su entrada en THEMES (el tema theme-stone sigue vivo en globals.css).
const HATCH_PIEDRA = (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="currentColor">
    <polygon points="3,6.6 6.2,6.6 4.6,3.8" />
    <polygon points="10.4,4.4 13.6,4.4 12,7.2" />
    <polygon points="5.4,14 8.6,14 7,11.2" />
    <polygon points="11.8,11.6 15,11.6 13.4,14.4" />
    <circle cx="8.6" cy="9" r="0.8" />
    <circle cx="15.4" cy="8.2" r="0.8" />
    <circle cx="2.6" cy="10.4" r="0.8" />
    <circle cx="9" cy="16.2" r="0.8" />
    <circle cx="15.8" cy="2.4" r="0.8" />
    <circle cx="2.8" cy="15.8" r="0.8" />
  </svg>
)
*/

// Perfil doble T en corte: a escala chica el acero se dibuja como silueta llena.
const HATCH_HIERRO = (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="currentColor">
    <path d="M2.5 2.5 H15.5 V4.9 H10.2 V13.1 H15.5 V15.5 H2.5 V13.1 H7.8 V4.9 H2.5 Z" />
  </svg>
)

const THEMES: { key: Theme; label: string; hatch: React.ReactNode }[] = [
  { key: 'light', label: 'Arena',  hatch: HATCH_ARENA },
  // { key: 'stone', label: 'Piedra', hatch: HATCH_PIEDRA },
  { key: 'dark',  label: 'Hierro', hatch: HATCH_HIERRO },
]

export default function ThemeSwitcher() {
  const pathname = usePathname()
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    document.body.classList.remove('theme-dark', 'theme-stone')
    if (theme === 'dark')  document.body.classList.add('theme-dark')
    if (theme === 'stone') document.body.classList.add('theme-stone')
  }, [theme])

  if (pathname.startsWith('/studio')) return null

  return (
    <div className="theme-switcher">
      {THEMES.map(({ key, label, hatch }) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className={theme === key ? 'active' : ''}
          aria-label={`Tema ${label}`}
          aria-pressed={theme === key}
        >
          {hatch}
          <span className="label">{label}</span>
        </button>
      ))}
    </div>
  )
}
