'use client'

import { useEffect } from 'react'
import StatusPage from './components/StatusPage'

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <StatusPage
      eyebrow="ERROR"
      title="Algo se desordeno en el recorrido."
      description="Podes intentar recargar esta vista o volver al inicio."
      links={[{ href: '/', label: 'Inicio' }]}
      action={
        <button
          type="button"
          onClick={() => unstable_retry()}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10.5px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--arena)',
            background: 'var(--hierro)',
            border: '1px solid var(--hierro)',
            padding: '10px 14px',
            cursor: 'pointer',
          }}
        >
          Reintentar
        </button>
      }
    />
  )
}
