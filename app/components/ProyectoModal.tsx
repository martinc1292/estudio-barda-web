'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProyectoDetail from './ProyectoDetail'
import { COPY, pickTitulo } from '@/app/lib/i18n'
import { useLang } from './LangProvider'
import type { Project } from '@/sanity/types'

export default function ProyectoModal({
  proyecto,
  heroUrl,
  next,
}: {
  proyecto: Project
  heroUrl: string | null
  next: Project | null
}) {
  const router = useRouter()
  const { lang, t } = useLang()

  const close = () => router.back()
  const goNext = () => {
    if (next) router.replace(`/proyectos/${next.slug.current}`, { scroll: false })
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.back()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [router])

  const name = pickTitulo(proyecto, lang)

  return (
    <div
      className="detail-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={name}
    >
      <div className="detail-bar">
        <div className="wrap">
          <button onClick={close}>← {t(COPY.detail.back)}</button>
          <div className="center">
            {name} / {proyecto.anio}
          </div>
          {next ? (
            <button onClick={goNext}>{t(COPY.detail.next)} →</button>
          ) : (
            <span style={{ opacity: 0.4 }}>{t(COPY.detail.next)} →</span>
          )}
        </div>
      </div>

      <ProyectoDetail
        proyecto={proyecto}
        heroUrl={heroUrl}
        next={next ? { name: pickTitulo(next, lang), onClick: goNext } : null}
      />
    </div>
  )
}
