'use client'

import { COPY } from '@/app/lib/i18n'
import { useLang } from '../LangProvider'

export default function ContactoPage({
  email,
  whatsappDisplay,
  whatsappHref,
  instagram,
}: {
  email: string
  whatsappDisplay: string
  whatsappHref: string
  instagram: string
}) {
  const { t } = useLang()
  const [a, b, c] = t(COPY.contact.title)

  return (
    <div className="page wrap">
      <div className="kicker">{t(COPY.contact.kicker)}</div>
      <h1>
        {a}
        <span className="accent">{b}</span>
        {c}
      </h1>
      <p className="lede">{t(COPY.contact.lede)}</p>
      <div className="contact-grid">
        <div>
          <span className="label">{t(COPY.contact.email)}</span>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
        <div>
          <span className="label">{t(COPY.contact.phone)}</span>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            {whatsappDisplay}
          </a>
        </div>
        <div>
          <span className="label">{t(COPY.contact.instagram)}</span>
          <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer">
            @{instagram}
          </a>
        </div>
        <div>
          <span className="label">{t(COPY.contact.base)}</span>
          <span>Buenos Aires, AR</span>
        </div>
      </div>
    </div>
  )
}
