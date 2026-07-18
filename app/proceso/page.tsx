import type { Metadata } from 'next'
import ProcesoPage from '@/app/components/pages/ProcesoPage'

export const metadata: Metadata = {
  title: 'Proceso',
  description:
    'El proceso de proyecto de Barda Arquitectura en cuatro fases: escucha, anteproyecto, proyecto y obra.',
}

export default function ProcesoRoute() {
  return <ProcesoPage />
}
