'use client'

import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { TIPO_LABELS } from '@/app/lib/proyecto-utils'
import { COPY, TIPO_LABELS_EN, pickTitulo, pickDescCorta } from '@/app/lib/i18n'
import { useLang } from './LangProvider'
import type { Project } from '@/sanity/types'

/**
 * The v4 project-detail body, shared by the overlay modal and the full-page
 * fallback. Chrome (sticky bar with back/next) is provided by the wrapper so
 * "back" can mean either router.back() (modal) or a link (full page).
 */
export default function ProyectoDetail({
  proyecto,
  heroUrl,
  next,
}: {
  proyecto: Project
  heroUrl: string | null
  next?: { name: string; onClick?: () => void; href?: string } | null
}) {
  const { lang, t } = useLang()

  const name = pickTitulo(proyecto, lang)
  const desc = pickDescCorta(proyecto, lang)
  const tipo = proyecto.tipo
    ? (lang === 'en' ? TIPO_LABELS_EN[proyecto.tipo] : TIPO_LABELS[proyecto.tipo])
    : null
  const largaField = lang === 'en'
    ? (proyecto.descripcionLarga_en ?? proyecto.descripcionLarga)
    : proyecto.descripcionLarga
  const larga = largaField as PortableTextBlock[] | undefined

  return (
    <>
      <div className="detail-hero wrap">
        <div className="ph">
          {heroUrl ? (
            <Image
              src={heroUrl}
              alt={proyecto.imagenPrincipal?.alt ?? name}
              fill
              priority
              sizes="(max-width: 1240px) 100vw, 1240px"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div className="ph-fallback" aria-hidden="true" />
          )}
        </div>
      </div>

      <div className="detail-body wrap">
        <div>
          <h2>{name}</h2>
          {desc && <p className="lede">{desc}</p>}
          {larga && larga.length > 0 && (
            <div style={{ marginTop: 24, color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.7 }}>
              <PortableText value={larga} />
            </div>
          )}
        </div>

        <div className="detail-specs">
          <div>
            <span className="label">{t(COPY.detail.year)}</span>
            {proyecto.anio ?? '—'}
          </div>
          <div>
            <span className="label">{t(COPY.detail.type)}</span>
            {tipo ?? '—'}
          </div>
          <div>
            <span className="label">{t(COPY.detail.place)}</span>
            {proyecto.ciudad ?? '—'}
          </div>
          <div>
            <span className="label">{t(COPY.detail.role)}</span>
            {t(COPY.detail.roleValue)}
          </div>
        </div>
      </div>

      {next && (
        <div className="next-bar">
          <div className="wrap">
            <span>BARDA · ARQUITECTURA</span>
            {next.href ? (
              <a className="next" href={next.href}>
                {t(COPY.detail.nextWork)} <span className="accent">→</span>
              </a>
            ) : (
              <button className="next" onClick={next.onClick} style={{ textTransform: 'none' }}>
                {t(COPY.detail.nextWork)} <span className="accent">→</span>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
