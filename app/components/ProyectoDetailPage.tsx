'use client'

import Link from 'next/link'
import ProyectoDetail from './ProyectoDetail'
import { COPY, pickTitulo } from '@/app/lib/i18n'
import { useLang } from './LangProvider'
import type { Project } from '@/sanity/types'

/** Full-page (hard-nav / deep-link) detail view. Chrome uses Links, not router.back. */
export default function ProyectoDetailPage({
  proyecto,
  heroUrl,
  next,
}: {
  proyecto: Project
  heroUrl: string | null
  next: Project | null
}) {
  const { lang, t } = useLang()
  const name = pickTitulo(proyecto, lang)

  return (
    <div style={{ paddingTop: 'var(--navbar-h)' }}>
      <div className="detail-bar">
        <div className="wrap">
          <Link href="/proyectos">← {t(COPY.detail.back)}</Link>
          <div className="center">
            {name} / {proyecto.anio}
          </div>
          {next ? (
            <Link href={`/proyectos/${next.slug.current}`}>{t(COPY.detail.next)} →</Link>
          ) : (
            <span style={{ opacity: 0.4 }}>{t(COPY.detail.next)} →</span>
          )}
        </div>
      </div>

      <ProyectoDetail
        proyecto={proyecto}
        heroUrl={heroUrl}
        next={next ? { name: pickTitulo(next, lang), href: `/proyectos/${next.slug.current}` } : null}
      />
    </div>
  )
}
