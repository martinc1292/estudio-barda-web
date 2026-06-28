import type { Metadata } from 'next'
import { safeFetch } from '@/sanity/lib/client'
import { allProjectsQuery } from '@/sanity/lib/queries'
import type { Project } from '@/sanity/types'
import ProyectosClient from './ProyectosClient'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Proyectos',
  description: 'Proyectos de arquitectura desarrollados por Barda Arquitectura en Buenos Aires y el país.',
}

export default async function ProyectosPage() {
  const proyectos = await safeFetch<Project[]>(allProjectsQuery) ?? []

  return (
    <div style={{ paddingTop: 'var(--navbar-h, 88px)', borderTop: '1px solid var(--rule)' }}>
      {/* Page header */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '48px var(--pad-x) 40px',
        borderBottom: '1px solid var(--rule)',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        alignItems: 'flex-end',
        gap: '2rem',
      }} className="proj-header">
        <div>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10.5px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--ink-mute)',
            display: 'block',
            marginBottom: '12px',
          }}>
            Obra
          </span>
          <h1 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(36px, 5vw, 72px)',
            fontWeight: 500,
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            color: 'var(--ink)',
          }}>
            Proyectos
          </h1>
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10.5px',
          letterSpacing: '0.08em',
          color: 'var(--ink-mute)',
          alignSelf: 'flex-end',
        }}>
          {String(proyectos.length).padStart(2, '0')} total
        </span>
      </div>

      <ProyectosClient proyectos={proyectos} />

      <style>{`
        @media (max-width: 600px) {
          .proj-header { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
