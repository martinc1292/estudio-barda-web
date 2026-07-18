'use client'

import { COPY } from '@/app/lib/i18n'
import { useLang } from '../LangProvider'

export default function EstudioPage() {
  const { lang, t } = useLang()
  const [a, b, c] = t(COPY.studio.title)

  return (
    <div className="page wrap">
      <div className="kicker">{t(COPY.studio.kicker)}</div>
      <h1>
        {a}
        <span className="accent">{b}</span>
        {c}
      </h1>
      <p className="lede">{t(COPY.studio.lede1)}</p>
      <p className="lede">{t(COPY.studio.lede2)}</p>
      <div className="values">
        {COPY.studio.values[lang].map((v, i) => (
          <div key={i}>{v}</div>
        ))}
      </div>
    </div>
  )
}
