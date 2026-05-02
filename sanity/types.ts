import type { PortableTextBlock } from '@portabletext/types'

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  alt?: string
}

export interface Project {
  _id: string
  titulo: string
  slug: { current: string }
  ciudad?: string
  anio?: number
  tipo?: 'casa' | 'departamento' | 'refaccion' | 'local' | 'trabajo' | 'cultural' | 'otro'
  categoria?: 'principal' | 'secundario'
  destacadoEnHome?: boolean
  orden?: number
  descripcionCorta?: string
  descripcionLarga?: PortableTextBlock[]
  imagenPrincipal?: SanityImage
  galeria?: SanityImage[]
  titulo_en?: string
  descripcionCorta_en?: string
  descripcionLarga_en?: PortableTextBlock[]
}

export interface Service {
  _id: string
  titulo: string
  descripcion?: string
  tipo?: 'principal' | 'complementario'
  orden?: number
  titulo_en?: string
  descripcion_en?: string
}

export interface StudioConfig {
  nombreEstudio?: string
  lema?: string
  bioEstudio?: string
  bioArquitecto?: string
  email?: string
  whatsapp?: string
  instagram?: string
  fotoArquitecto?: SanityImage
  lema_en?: string
  bioEstudio_en?: string
  bioArquitecto_en?: string
}
