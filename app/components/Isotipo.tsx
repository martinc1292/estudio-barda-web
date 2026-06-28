// Isotipo oficial Barda — Manual de identidad visual 2026
// Dos planos con desplazamiento: inferior (ladrillo) + superior derecho (ladrillo desat)
// ViewBox 20×12 (ratio 5:3)

const VARIANTS: Record<string, { top: string; bot: string }> = {
  color:        { top: '#DD7845', bot: '#E24F05' },
  'mono-dark':  { top: '#6B6B6E', bot: '#0F0F10' },
  'mono-light': { top: '#FFFFFF', bot: '#949491' },
  'mono-white': { top: '#F8F0E5', bot: '#FFFFFF' },
  'mono-black': { top: '#0F0F10', bot: '#0F0F10' },
}

interface IsotipoProps {
  size?: number
  variant?: keyof typeof VARIANTS
  title?: string
  className?: string
}

export default function Isotipo({
  size = 32,
  variant = 'color',
  title = 'Barda Arquitectura',
  className,
}: IsotipoProps) {
  const { top, bot } = VARIANTS[variant] ?? VARIANTS.color
  const w = size
  const h = Math.round((size * 12) / 20)

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 20 12"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      shapeRendering="crispEdges"
      className={className}
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* Plano inferior + apoyo — forma de L */}
      <path d="M0 6 L10 6 L10 7 L20 7 L20 12 L0 12 Z" fill={bot} />
      {/* Plano superior — desat, alineado a la derecha */}
      <rect x="10" y="0" width="10" height="5" fill={top} />
    </svg>
  )
}
