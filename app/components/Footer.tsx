import { safeFetch } from '@/sanity/lib/client'
import { configQuery } from '@/sanity/lib/queries'
import type { StudioConfig } from '@/sanity/types'
import {
  CONTACT_DEFAULTS,
  normalizeInstagramHandle,
} from '@/app/lib/proyecto-utils'

export default async function Footer() {
  const config = await safeFetch<StudioConfig>(configQuery)
  const email = config?.email ?? CONTACT_DEFAULTS.email
  const instagram = normalizeInstagramHandle(config?.instagram)

  return (
    <footer className="footer">
      <div className="wrap">
        <span>© BARDA · ARQUITECTURA</span>
        <span>Buenos Aires</span>
        <a href={`mailto:${email}`}>{email}</a>
        <a
          href={`https://instagram.com/${instagram}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          @{instagram}
        </a>
      </div>
    </footer>
  )
}
