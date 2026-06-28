export default function ModularSection() {
  return (
    <section style={{
      padding: '56px var(--pad-x)',
      borderBottom: '1px solid var(--rule)',
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: '56px',
    }} className="modular-section-grid">
      <div>
        <h3 style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
          fontSize: 'clamp(28px, 3vw, 44px)',
          letterSpacing: '-0.035em',
          margin: '0 0 18px',
          lineHeight: 1.05,
          textWrap: 'balance',
        } as React.CSSProperties}>
          Un sistema modular:{' '}
          <span style={{ color: 'var(--accent)' }}>planos, desplazamientos y apoyos.</span>
        </h3>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '14.5px',
          lineHeight: 1.55,
          color: 'var(--ink-soft)',
          maxWidth: '540px',
          margin: '0 0 14px',
        }}>
          Cada proyecto responde a una lógica clara, donde forma y función se construyen en simultáneo. Se evita la representación literal y se prioriza una lógica constructiva.
        </p>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '14.5px',
          lineHeight: 1.55,
          color: 'var(--ink-soft)',
          maxWidth: '540px',
          margin: '0 0 14px',
        }}>
          Diseñar es tomar posición frente al espacio. Cada decisión construye un límite, cada plano responde a un sistema.
        </p>
        <div style={{
          marginTop: '28px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '14px 24px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: 'var(--ink-soft)',
        }}>
          {['Claridad', 'Coherencia', 'Precisión técnica', 'Adaptación', 'Compromiso con el proceso', 'Idea = ejecución'].map(v => (
            <div key={v} style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
              <span style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                background: 'var(--accent)',
                flexShrink: 0,
              }} />
              {v}
            </div>
          ))}
        </div>
      </div>

      <div className="modular-diagram">
        <div className="grid-bg" />
        <div className="mplane" style={{ left: '8.33%',  top: '16.66%', width: '33.33%', height: '41.66%', background: 'var(--hierro)' }} />
        <div className="mplane" style={{ left: '33.33%', top: '33.33%', width: '41.66%', height: '33.33%', background: 'var(--ladrillo)' }} />
        <div className="mplane" style={{ left: '50%',    top: '8.33%',  width: '25%',    height: '25%',    background: 'var(--piedra)' }} />
        <div className="mplane" style={{ left: '16.66%', top: '66.66%', width: '41.66%', height: '16.66%', background: 'var(--ladrillo-d)' }} />
        <div className="mplane" style={{ left: '66.66%', top: '66.66%', width: '16.66%', height: '16.66%', border: '1.5px solid var(--hierro)', background: 'transparent' }} />
        <span style={{ position: 'absolute', top: 8, left: 8,    fontFamily: 'var(--font-mono)', fontSize: '9.5px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>FIG. 02</span>
        <span style={{ position: 'absolute', top: 8, right: 8,   fontFamily: 'var(--font-mono)', fontSize: '9.5px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--accent)' }}>● PLANO</span>
        <span style={{ position: 'absolute', bottom: 8, left: 8,  fontFamily: 'var(--font-mono)', fontSize: '9.5px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>MÓDULO 12 × 12</span>
        <span style={{ position: 'absolute', bottom: 8, right: 8, fontFamily: 'var(--font-mono)', fontSize: '9.5px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>SISTEMA / 03</span>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .modular-section-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
