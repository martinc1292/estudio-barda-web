'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

type Theme = 'light' | 'stone' | 'dark'

const THEMES: { key: Theme; label: string }[] = [
  { key: 'light', label: 'Arena' },
  { key: 'stone', label: 'Piedra' },
  { key: 'dark',  label: 'Hierro' },
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
      {THEMES.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className={theme === key ? 'active' : ''}
          aria-label={`Tema ${label}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
