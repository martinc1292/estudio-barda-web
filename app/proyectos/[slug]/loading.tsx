export default function ProyectoLoading() {
  return (
    <div style={{ paddingTop: 'var(--navbar-h, 88px)' }}>
      <div style={{
        height: '70svh',
        background: 'var(--bg-alt)',
        borderBottom: '1px solid var(--rule)',
      }} />
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px var(--pad-x)',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '2rem',
        borderBottom: '1px solid var(--rule)',
      }}>
        <div>
          <div style={{
            width: '160px',
            height: '11px',
            background: 'var(--rule)',
            marginBottom: '18px',
          }} />
          <div style={{
            width: 'min(520px, 80vw)',
            height: '52px',
            background: 'var(--bg-alt)',
          }} />
        </div>
        <div style={{ width: '72px', height: '36px', background: 'var(--bg-alt)' }} />
      </div>
    </div>
  )
}
