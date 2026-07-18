import type { Metadata } from 'next'
import EstudioPage from '@/app/components/pages/EstudioPage'

export const metadata: Metadata = {
  title: 'Estudio',
  description:
    'Barda Arquitectura — estudio de arquitectura en Buenos Aires. El espacio como límite y como decisión.',
}

export default function SobreNosotrosPage() {
  return <EstudioPage />
}
