import { cookies } from 'next/headers'
import { LANG_COOKIE, DEFAULT_LANG, isLang, type Lang } from './i18n'

/** Read the visitor's language from the cookie in a Server Component. */
export async function getServerLang(): Promise<Lang> {
  const store = await cookies()
  const value = store.get(LANG_COOKIE)?.value
  return isLang(value) ? value : DEFAULT_LANG
}
