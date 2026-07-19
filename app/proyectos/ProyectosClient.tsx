'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { urlForImage } from '@/sanity/lib/image'
import { TIPO_LABELS, TIPO_VALUES } from '@/app/lib/proyecto-utils'
import { COPY, TIPO_LABELS_EN, pickTitulo } from '@/app/lib/i18n'
import { useLang } from '@/app/components/LangProvider'
import type { Project } from '@/sanity/types'

type Vista = 'grid' | 'list'
type Sort = 'desc' | 'asc'
type IntroVariant = 'manifesto' | 'titulo' | 'none'

export default function ProyectosClient({
  proyectos,
  intro = 'manifesto',
  cols = 4,
}: {
  proyectos: Project[]
  intro?: IntroVariant
  cols?: number
}) {
  const { lang, t } = useLang()
  const [filtro, setFiltro] = useState<'all' | NonNullable<Project['tipo']>>('all')
  const [sort, setSort] = useState<Sort>('desc')
  const [vista, setVista] = useState<Vista>('grid')

  const shown = useMemo(() => {
    const base = filtro === 'all' ? proyectos : proyectos.filter(p => p.tipo === filtro)
    return [...base].sort((a, b) => {
      const ay = a.anio ?? 0
      const by = b.anio ?? 0
      return sort === 'desc' ? by - ay : ay - by
    })
  }, [proyectos, filtro, sort])

  const tipoLabel = (tp: NonNullable<Project['tipo']>) =>
    lang === 'en' ? TIPO_LABELS_EN[tp] : TIPO_LABELS[tp]

  return (
    <>
      {intro !== 'none' && (
        <div className={`intro ${intro === 'titulo' ? 'titulo' : 'manifesto'} wrap`}>
          {intro === 'titulo' ? (
            <h1>{t(COPY.intro.titulo)}</h1>
          ) : (
            <p>
              {(() => {
                const [a, b, c] = t(COPY.intro.manifesto)
                return (
                  <>
                    {a}
                    <span className="accent">{b}</span>
                    {c}
                  </>
                )
              })()}
            </p>
          )}
        </div>
      )}

      {/* Toolbar: filtros / orden / vista */}
      <div className="toolbar wrap">
        <div className="filters">
          <button className={filtro === 'all' ? 'on' : ''} onClick={() => setFiltro('all')}>
            {t(COPY.toolbar.todos)}
          </button>
          {TIPO_VALUES.filter(tp => tp !== 'otro').map(tp => (
            <button key={tp} className={filtro === tp ? 'on' : ''} onClick={() => setFiltro(tp)}>
              {tipoLabel(tp)}
            </button>
          ))}
        </div>

        <div className="right">
          <div className="sort">
            <button
              className="on"
              onClick={() => setSort(sort === 'desc' ? 'asc' : 'desc')}
              aria-label={t(sort === 'desc' ? COPY.toolbar.yearDesc : COPY.toolbar.yearAsc)}
            >
              {t(sort === 'desc' ? COPY.toolbar.yearDesc : COPY.toolbar.yearAsc)}
            </button>
          </div>
          <div className="view-switch">
            <button
              className={vista === 'grid' ? 'on' : ''}
              onClick={() => setVista('grid')}
              title={t(COPY.toolbar.grid)}
              aria-label={t(COPY.toolbar.grid)}
              aria-pressed={vista === 'grid'}
            >
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="0.5" y="0.5" width="4.5" height="4.5" />
                <rect x="7" y="0.5" width="4.5" height="4.5" />
                <rect x="0.5" y="7" width="4.5" height="4.5" />
                <rect x="7" y="7" width="4.5" height="4.5" />
              </svg>
            </button>
            <button
              className={vista === 'list' ? 'on' : ''}
              onClick={() => setVista('list')}
              title={t(COPY.toolbar.list)}
              aria-label={t(COPY.toolbar.list)}
              aria-pressed={vista === 'list'}
            >
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
                <line x1="0" y1="2.5" x2="12" y2="2.5" />
                <line x1="0" y1="6" x2="12" y2="6" />
                <line x1="0" y1="9.5" x2="12" y2="9.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {shown.length === 0 ? (
        <div className="wrap" style={{ padding: '60px 0 88px', textAlign: 'center' }}>
          <p className="label">{t(COPY.toolbar.empty)}</p>
        </div>
      ) : vista === 'grid' ? (
        <div className="grid wrap" style={{ '--cols': cols } as React.CSSProperties}>
          {shown.map((p, i) => (
            <Card key={p._id} p={p} lang={lang} name={pickTitulo(p, lang)} priority={i < cols} />
          ))}
        </div>
      ) : (
        <div className="list-view wrap">
          {shown.map((p, i) => (
            <ListRow key={p._id} p={p} idx={i} name={pickTitulo(p, lang)} />
          ))}
        </div>
      )}
    </>
  )
}

function Card({
  p,
  name,
  priority,
}: {
  p: Project
  lang: string
  name: string
  priority?: boolean
}) {
  const imgUrl = p.imagenPrincipal
    ? urlForImage(p.imagenPrincipal).width(800).height(600).fit('crop').url()
    : null

  return (
    <Link href={`/proyectos/${p.slug.current}`} className="pcard" scroll={false}>
      <div className="ph">
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={p.imagenPrincipal?.alt ?? name}
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 1000px) 50vw, 25vw"
            style={{ objectFit: 'cover' }}
            priority={priority}
          />
        ) : (
          <div className="ph-fallback" aria-hidden="true" />
        )}
        <div className="cap">
          <h3 className="name">{name}</h3>
          <div className="meta">
            <span>{p.anio}</span>
            <span>{p.ciudad}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function ListRow({ p, idx, name }: { p: Project; idx: number; name: string }) {
  return (
    <Link href={`/proyectos/${p.slug.current}`} className="list-row" scroll={false}>
      <div className="num">{String(idx + 1).padStart(3, '0')}</div>
      <div className="name">{name}</div>
      <div className="meta-cell">{p.ciudad}</div>
      <div className="meta-cell">{p.anio}</div>
      <div className="arrow" aria-hidden="true">→</div>
    </Link>
  )
}
