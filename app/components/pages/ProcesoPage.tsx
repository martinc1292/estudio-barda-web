'use client'

import { COPY } from '@/app/lib/i18n'
import { useLang } from '../LangProvider'

export default function ProcesoPage() {
  const { lang, t } = useLang()

  return (
    <div className="page wrap">
      <div className="kicker">{t(COPY.process.kicker)}</div>
      <h1>{t(COPY.process.title)}</h1>
      <div className="steps">
        {COPY.process.steps[lang].map(([title, desc], i) => (
          <div key={i}>
            <div className="num">{String(i + 1).padStart(2, '0')}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
