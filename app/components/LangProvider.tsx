'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { Lang } from '@/app/lib/i18n'
import { LANG_COOKIE } from '@/app/lib/i18n'

interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Pick a value from an `{ es, en }` pair (branches may differ in type). */
  t: <E, S>(pair: { es: S; en: E }) => S | E
}

const LangContext = createContext<LangContextValue | null>(null)

const ONE_YEAR = 60 * 60 * 24 * 365

export function LangProvider({
  initialLang,
  children,
}: {
  initialLang: Lang
  children: React.ReactNode
}) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    // Persist so the next server render (and reloads) match the choice.
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=${ONE_YEAR}; samesite=lax`
    // Keep <html lang> in sync for a11y without a reload.
    document.documentElement.lang = next
  }, [])

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang,
      t: (pair) => (lang === 'en' ? pair.en : pair.es),
    }),
    [lang, setLang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within <LangProvider>')
  return ctx
}
