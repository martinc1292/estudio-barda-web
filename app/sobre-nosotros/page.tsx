import type { Metadata } from 'next'
import { safeFetch } from '@/sanity/lib/client'
import { allServicesQuery } from '@/sanity/lib/queries'
import type { Service } from '@/sanity/types'
import ModularSection from '@/app/components/ModularSection'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Estudio',
  description: 'Barda Arquitectura — estudio de arquitectura en Buenos Aires.',
}

const SERVICIOS_FALLBACK = [
  'Vivienda',
  'Refacción y ampliación',
  'Comercial y oficinas',
  'Cultural / Instalaciones',
  'Concursos',
  'Propuestas urbanas',
]

export default async function SobreNosotrosPage() {
  const servicios = await safeFetch<Service[]>(allServicesQuery) ?? []
  const serviciosPrincipales = servicios.filter(s => s.tipo === 'principal')
  const titulos = serviciosPrincipales.length > 0
    ? serviciosPrincipales.map(s => s.titulo)
    : SERVICIOS_FALLBACK

  return (
    <div style={{ paddingTop: 'var(--navbar-h, 88px)' }}>

      {/* Section header 00 — Estudio */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '200px 1fr auto',
        alignItems: 'flex-end',
        gap: '32px',
        padding: '56px var(--pad-x) 28px',
        borderBottom: '1px solid var(--rule)',
      }} className="studio-section-head">
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10.5px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--ink-mute)',
        }}>
          <strong style={{ color: 'var(--accent)', fontWeight: 400, marginRight: '8px' }}>00</strong>
          SECCIÓN
        </div>
        <h1 style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
          fontSize: 'clamp(28px, 3vw, 44px)',
          letterSpacing: '-0.035em',
          lineHeight: 1,
          margin: 0,
          color: 'var(--ink)',
        }}>
          Estudio
        </h1>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10.5px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--ink-mute)',
        }}>
          MANIFIESTO / 2026
        </div>
      </div>

      {/* Modular section */}
      <ModularSection />

      {/* Section header 01 — Servicios */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '200px 1fr auto',
        alignItems: 'flex-end',
        gap: '32px',
        padding: '56px var(--pad-x) 28px',
        borderBottom: '1px solid var(--rule)',
      }} className="studio-section-head">
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10.5px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--ink-mute)',
        }}>
          <strong style={{ color: 'var(--accent)', fontWeight: 400, marginRight: '8px' }}>01</strong>
          SECCIÓN
        </div>
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
          fontSize: 'clamp(28px, 3vw, 44px)',
          letterSpacing: '-0.035em',
          lineHeight: 1,
          margin: 0,
          color: 'var(--ink)',
        }}>
          Servicios
        </h2>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10.5px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--ink-mute)',
        }}>
          {String(titulos.length).padStart(2, '0')} ÁREAS
        </div>
      </div>

      {/* Services grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        borderBottom: '1px solid var(--rule)',
      }} className="servicios-grid">
        {titulos.map((titulo, i) => (
          <div key={i} style={{
            borderRight: '1px solid var(--rule)',
            borderBottom: '1px solid var(--rule)',
            marginRight: '-1px',
            marginBottom: '-1px',
            background: 'var(--bg-alt)',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              padding: '14px 16px 10px',
              borderBottom: '1px solid var(--rule-soft)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--ink-mute)',
            }}>
              <span style={{ color: 'var(--accent)' }}>{String(i + 1).padStart(3, '0')}</span>
              <span>SERVICIO</span>
            </div>
            <div style={{ padding: '32px 16px 40px' }}>
              <h3 style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                fontSize: '28px',
                letterSpacing: '-0.035em',
                lineHeight: 1.1,
                color: 'var(--ink)',
                margin: 0,
              }}>
                {titulo}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .studio-section-head { grid-template-columns: auto 1fr auto !important; }
          .servicios-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .studio-section-head { grid-template-columns: 1fr !important; }
          .studio-section-head > *:last-child { display: none; }
          .servicios-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
