import type { MetadataRoute } from 'next'
import { safeFetch } from '@/sanity/lib/client'
import { allProjectsQuery } from '@/sanity/lib/queries'
import { SITE_URL } from '@/app/lib/proyecto-utils'
import type { Project } from '@/sanity/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const proyectos = await safeFetch<Project[]>(allProjectsQuery) ?? []

  const proyectoEntries: MetadataRoute.Sitemap = proyectos.map((p) => ({
    url: `${SITE_URL}/proyectos/${p.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/proyectos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/sobre-nosotros`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/proceso`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...proyectoEntries,
  ]
}
