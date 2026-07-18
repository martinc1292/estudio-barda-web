import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { safeFetch } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { projectBySlugQuery, allProjectsQuery } from '@/sanity/lib/queries'
import { SITE_URL } from '@/app/lib/proyecto-utils'
import ProyectoDetailPage from '@/app/components/ProyectoDetailPage'
import type { Project } from '@/sanity/types'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const proyectos = (await safeFetch<Project[]>(allProjectsQuery)) ?? []
  return proyectos.map((p) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const proyecto = await safeFetch<Project | null>(projectBySlugQuery, { slug })
  if (!proyecto) return {}

  const heroUrl = proyecto.imagenPrincipal
    ? urlForImage(proyecto.imagenPrincipal).width(1200).height(630).fit('crop').url()
    : undefined

  return {
    title: proyecto.titulo,
    description: proyecto.descripcionCorta,
    alternates: { canonical: `${SITE_URL}/proyectos/${slug}` },
    openGraph: {
      title: proyecto.titulo,
      description: proyecto.descripcionCorta,
      type: 'article',
      ...(heroUrl && { images: [{ url: heroUrl, width: 1200, height: 630, alt: proyecto.titulo }] }),
    },
  }
}

export default async function ProyectoPage({ params }: Props) {
  const { slug } = await params
  const [proyecto, todos] = await Promise.all([
    safeFetch<Project | null>(projectBySlugQuery, { slug }),
    safeFetch<Project[]>(allProjectsQuery),
  ])

  if (!proyecto) notFound()

  const lista = todos ?? []
  const idx = lista.findIndex((p) => p.slug.current === slug)
  const next = idx >= 0 && lista.length > 1 ? lista[(idx + 1) % lista.length] : null

  const heroUrl = proyecto.imagenPrincipal
    ? urlForImage(proyecto.imagenPrincipal).width(1600).height(900).fit('crop').url()
    : null

  const ogImageUrl = proyecto.imagenPrincipal
    ? urlForImage(proyecto.imagenPrincipal).width(1200).height(630).fit('crop').url()
    : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: proyecto.titulo,
    description: proyecto.descripcionCorta,
    url: `${SITE_URL}/proyectos/${slug}`,
    creator: { '@type': 'Organization', name: 'Barda Arquitectura', url: SITE_URL },
    ...(proyecto.ciudad && {
      locationCreated: { '@type': 'Place', addressLocality: proyecto.ciudad, addressCountry: 'AR' },
    }),
    ...(proyecto.anio && { dateCreated: proyecto.anio.toString() }),
    ...(ogImageUrl && { image: ogImageUrl }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProyectoDetailPage proyecto={proyecto} heroUrl={heroUrl} next={next} />
    </>
  )
}
