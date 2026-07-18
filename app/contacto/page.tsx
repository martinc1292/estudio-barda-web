import type { Metadata } from 'next'
import { safeFetch } from '@/sanity/lib/client'
import { configQuery } from '@/sanity/lib/queries'
import type { StudioConfig } from '@/sanity/types'
import {
  CONTACT_DEFAULTS,
  formatWhatsAppDisplay,
  normalizeInstagramHandle,
  normalizeWhatsAppNumber,
} from '@/app/lib/proyecto-utils'
import ContactoPageView from '@/app/components/pages/ContactoPage'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Iniciemos un proyecto juntos. Contactate con Barda Arquitectura.',
}

export default async function ContactoPage() {
  const config = await safeFetch<StudioConfig>(configQuery)

  const whatsapp = normalizeWhatsAppNumber(config?.whatsapp)
  const email = config?.email ?? CONTACT_DEFAULTS.email
  const instagram = normalizeInstagramHandle(config?.instagram)

  return (
    <ContactoPageView
      email={email}
      whatsappDisplay={formatWhatsAppDisplay(whatsapp)}
      whatsappHref={`https://wa.me/${whatsapp}`}
      instagram={instagram}
    />
  )
}
