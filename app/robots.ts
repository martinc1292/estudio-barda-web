import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/app/lib/proyecto-utils'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/studio/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
