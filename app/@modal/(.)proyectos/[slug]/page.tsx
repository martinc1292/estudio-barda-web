import { notFound } from 'next/navigation'
import { safeFetch } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { projectBySlugQuery, allProjectsQuery } from '@/sanity/lib/queries'
import ProyectoModal from '@/app/components/ProyectoModal'
import type { Project } from '@/sanity/types'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export default async function ProyectoModalRoute({ params }: Props) {
  const { slug } = await params
  const [proyecto, todos] = await Promise.all([
    safeFetch<Project | null>(projectBySlugQuery, { slug }),
    safeFetch<Project[]>(allProjectsQuery),
  ])

  if (!proyecto) notFound()

  const lista = todos ?? []
  const idx = lista.findIndex(p => p.slug.current === slug)
  const next = idx >= 0 && lista.length > 1 ? lista[(idx + 1) % lista.length] : null

  const heroUrl = proyecto.imagenPrincipal
    ? urlForImage(proyecto.imagenPrincipal).width(1600).height(900).fit('crop').url()
    : null

  return <ProyectoModal proyecto={proyecto} heroUrl={heroUrl} next={next} />

}
