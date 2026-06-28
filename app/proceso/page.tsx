import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Proceso',
  description: 'El proceso de proyecto de Barda Arquitectura en cuatro fases: escucha, anteproyecto, proyecto y obra.',
}

const FASES = [
  { titulo: 'Escucha',       descripcion: 'Lectura del cliente, programa y contexto. Estimación temprana de viabilidad.' },
  { titulo: 'Anteproyecto', descripcion: 'Volumetría, partido y materialidad. Sistema de planos en planta y corte.' },
  { titulo: 'Proyecto',     descripcion: 'Documentación técnica, especificaciones, cómputos y plan de obra.' },
  { titulo: 'Obra',         descripcion: 'Dirección, control de calidad, ajustes y entrega final.' },
]

export default function ProcesoPage() {
  return (
    <div style={{ paddingTop: 'var(--navbar-h, 88px)' }}>

      {/* Section header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '200px 1fr auto',
        alignItems: 'flex-end',
        gap: '32px',
        padding: '56px var(--pad-x) 28px',
        borderBottom: '1px solid var(--rule)',
      }} className="proceso-section-head">
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10.5px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--ink-mute)',
        }}>
          <strong style={{ color: 'var(--accent)', fontWeight: 400, marginRight: '8px' }}>02</strong>
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
          Proceso de proyecto
        </h1>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10.5px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--ink-mute)',
        }}>
          04 FASES
        </div>
      </div>

      {/* Phases grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        borderBottom: '1px solid var(--rule)',
      }} className="fases-grid">
        {FASES.map((fase, i) => (
          <div key={i} style={{
            borderRight: '1px solid var(--rule)',
            borderBottom: '1px solid var(--rule)',
            marginRight: '-1px',
            marginBottom: '-1px',
            background: 'var(--bg-alt)',
          }}>
            {/* Card meta top */}
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
              <span style={{ color: 'var(--accent)' }}>FASE {String(i + 1).padStart(2, '0')}</span>
              <span>· · ·</span>
            </div>
            {/* Body */}
            <div style={{ padding: '24px 16px 32px' }}>
              <h2 style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                fontSize: '32px',
                letterSpacing: '-0.035em',
                lineHeight: 1.05,
                color: 'var(--ink)',
                margin: '0 0 14px',
              }}>
                {fase.titulo}
              </h2>
              <p style={{
                margin: 0,
                fontFamily: 'var(--font-sans)',
                fontSize: '13.5px',
                lineHeight: 1.55,
                color: 'var(--ink-soft)',
              }}>
                {fase.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .proceso-section-head { grid-template-columns: auto 1fr auto !important; }
          .fases-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .proceso-section-head { grid-template-columns: 1fr !important; }
          .proceso-section-head > *:last-child { display: none; }
          .fases-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
