import { safeFetch } from '@/sanity/lib/client'
import { allProjectsQuery } from '@/sanity/lib/queries'
import type { Project } from '@/sanity/types'
import ProyectosClient from './proyectos/ProyectosClient'

export const revalidate = 60

export default async function Home() {
  const proyectos = (await safeFetch<Project[]>(allProjectsQuery)) ?? []

  return (
    <ProyectosClient proyectos={proyectos} intro="manifesto" cols={4} />
  )
}
