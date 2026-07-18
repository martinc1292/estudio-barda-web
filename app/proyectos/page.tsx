import type { Metadata } from 'next'
import { safeFetch } from '@/sanity/lib/client'
import { allProjectsQuery } from '@/sanity/lib/queries'
import type { Project } from '@/sanity/types'
import ProyectosClient from './ProyectosClient'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Obras',
  description: 'Obras de arquitectura desarrolladas por Barda Arquitectura en Buenos Aires y el país.',
}

export default async function ProyectosPage() {
  const proyectos = (await safeFetch<Project[]>(allProjectsQuery)) ?? []

  return (
    <ProyectosClient proyectos={proyectos} intro="titulo" cols={4} />
  )
}
