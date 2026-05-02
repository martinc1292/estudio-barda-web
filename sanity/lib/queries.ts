import { groq } from 'next-sanity'

export const allProjectsQuery = groq`
  *[_type == "proyecto"] | order(orden asc, anio desc) {
    _id,
    titulo,
    slug,
    ciudad,
    anio,
    tipo,
    categoria,
    destacadoEnHome,
    orden,
    descripcionCorta,
    imagenPrincipal
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "proyecto" && destacadoEnHome == true] | order(orden asc) {
    _id,
    titulo,
    slug,
    ciudad,
    anio,
    tipo,
    descripcionCorta,
    imagenPrincipal
  }
`

export const projectBySlugQuery = groq`
  *[_type == "proyecto" && slug.current == $slug][0] {
    _id,
    titulo,
    slug,
    ciudad,
    anio,
    tipo,
    categoria,
    descripcionCorta,
    descripcionLarga,
    imagenPrincipal,
    galeria,
    titulo_en,
    descripcionCorta_en,
    descripcionLarga_en
  }
`

export const allServicesQuery = groq`
  *[_type == "servicio"] | order(orden asc) {
    _id,
    titulo,
    descripcion,
    tipo,
    orden,
    titulo_en,
    descripcion_en
  }
`

export const configQuery = groq`
  *[_type == "configuracion"][0] {
    nombreEstudio,
    lema,
    bioEstudio,
    bioArquitecto,
    email,
    whatsapp,
    instagram,
    fotoArquitecto,
    lema_en,
    bioEstudio_en,
    bioArquitecto_en
  }
`
