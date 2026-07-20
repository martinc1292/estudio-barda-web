import type { Project } from '@/sanity/types'

// `||` y no `??`: en el CI un secret sin definir se inyecta como string vacío
// (no undefined), y `'' ?? fallback` devolvería '' → `new URL('')` tira. Con `||`
// el string vacío también cae al fallback y el build no explota.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://estudio-barda.com'

export const CONTACT_DEFAULTS = {
  email: 'bardaarquitectura@gmail.com',
  whatsapp: '5492215718737',
  instagram: 'estudio_barda',
}

export function normalizeWhatsAppNumber(value?: string | null) {
  const digits = (value ?? CONTACT_DEFAULTS.whatsapp).replace(/\D/g, '')

  if (digits.startsWith('54')) return digits
  if (digits.startsWith('9')) return `54${digits}`
  if (digits.length === 10) return `549${digits}`

  return digits || CONTACT_DEFAULTS.whatsapp
}

export function formatWhatsAppDisplay(value?: string | null) {
  const digits = normalizeWhatsAppNumber(value)

  if (digits.startsWith('549') && digits.length >= 13) {
    return `+54 9 ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`
  }

  return `+${digits}`
}

export function normalizeInstagramHandle(value?: string | null) {
  return (value ?? CONTACT_DEFAULTS.instagram).replace(/^@/, '')
}

export const TIPO_LABELS: Record<NonNullable<Project['tipo']>, string> = {
  casa: 'Casa',
  departamento: 'Departamento',
  refaccion: 'Refacción',
  local: 'Local',
  trabajo: 'Espacio de trabajo',
  cultural: 'Cultural',
  otro: 'Proyecto',
}

export const TIPO_LABELS_SHORT: Record<NonNullable<Project['tipo']>, string> = {
  ...TIPO_LABELS,
  departamento: 'Depto.',
  trabajo: 'Trabajo',
}

/** All project `tipo` enum values, in display order (source of truth: schema). */
export const TIPO_VALUES = [
  'casa',
  'departamento',
  'refaccion',
  'local',
  'trabajo',
  'cultural',
  'otro',
] as const satisfies readonly NonNullable<Project['tipo']>[]
