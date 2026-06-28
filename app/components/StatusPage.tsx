'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

type StatusLink = {
  href: string
  label: string
}

export default function StatusPage({
  eyebrow,
  title,
  description,
  links = [],
  action,
}: {
  eyebrow: string
  title: string
  description: string
  links?: StatusLink[]
  action?: ReactNode
}) {
  return (
    <section style={{
      minHeight: 'calc(100svh - var(--navbar-h, 88px))',
      padding: 'calc(var(--navbar-h, 88px) + 56px) var(--pad-x) 56px',
      display: 'grid',
      alignItems: 'center',
      borderBottom: '1px solid var(--rule)',
    }}>
      <div style={{
        maxWidth: '960px',
        width: '100%',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '200px 1fr',
        gap: '32px',
      }} className="status-grid">
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10.5px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--ink-mute)',
          paddingTop: '8px',
        }}>
          <span style={{ color: 'var(--accent)' }}>{eyebrow}</span>
        </p>

        <div>
          <h1 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(42px, 7vw, 96px)',
            fontWeight: 500,
            lineHeight: 0.96,
            letterSpacing: '-0.045em',
            color: 'var(--ink)',
            maxWidth: '780px',
          }}>
            {title}
          </h1>
          <p style={{
            maxWidth: '560px',
            marginTop: '24px',
            fontFamily: 'var(--font-sans)',
            fontSize: '15px',
            lineHeight: 1.6,
            color: 'var(--ink-soft)',
          }}>
            {description}
          </p>

          {(links.length > 0 || action) && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '0',
              marginTop: '32px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              {links.map((link) => (
                <Link key={link.href} href={link.href} style={{
                  color: 'var(--ink)',
                  padding: '10px 14px',
                  border: '1px solid var(--rule)',
                  marginRight: '-1px',
                }}>
                  {link.label}
                </Link>
              ))}
              {action}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .status-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
