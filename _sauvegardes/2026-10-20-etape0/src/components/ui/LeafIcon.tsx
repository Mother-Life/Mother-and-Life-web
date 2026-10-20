import { cn } from '@/lib/utils'
import type { PillarSlug } from '@/styles/tokens'

const strokeColors: Record<PillarSlug, string> = {
  prevenir: '#0077C2',
  accompagner: '#C4007A',
  autonomie: '#037A4A',
}

type LeafIconProps = {
  pillar?: PillarSlug
  className?: string
  size?: number
}

export function LeafIcon({ pillar = 'accompagner', className, size = 38 }: LeafIconProps) {
  return (
    <svg
      className={cn(className)}
      width={size}
      height={size * 1.16}
      viewBox="0 0 60 70"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M30 4 C46 12 56 28 55 44 C54 58 43 67 30 67 C17 67 6 58 5 44 C4 28 14 12 30 4 Z"
        stroke={strokeColors[pillar]}
        strokeWidth="4"
      />
    </svg>
  )
}
