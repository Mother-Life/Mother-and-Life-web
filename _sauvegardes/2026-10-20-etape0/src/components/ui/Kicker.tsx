import { cn } from '@/lib/utils'
import type { PillarSlug } from '@/styles/tokens'

type KickerProps = {
  children: React.ReactNode
  pillar?: PillarSlug | 'neutral'
  className?: string
}

const pillarColors: Record<PillarSlug | 'neutral', string> = {
  prevenir: 'text-bleu-700',
  accompagner: 'text-rose-700',
  autonomie: 'text-vert-700',
  neutral: 'text-gris-600',
}

export function Kicker({ children, pillar = 'neutral', className }: KickerProps) {
  return (
    <p
      className={cn(
        'mb-4 text-[13px] font-semibold uppercase tracking-[0.08em]',
        pillarColors[pillar],
        className,
      )}
    >
      {children}
    </p>
  )
}
