import StatusPage from './components/StatusPage'

export default function NotFound() {
  return (
    <StatusPage
      eyebrow="404 / SIN PLANO"
      title="Esta pagina no esta disponible."
      description="El recorrido solicitado no existe o cambio de lugar. Podes volver al inicio o seguir explorando las obras."
      links={[
        { href: '/', label: 'Inicio' },
        { href: '/proyectos', label: 'Obras' },
      ]}
    />
  )
}
