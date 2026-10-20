import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { PillarSlug } from '@/styles/tokens'

type ArrowLinkProps = {
  href: string
  children: React.ReactNode
  pillar?: PillarSlug
  className?: string
}

const colors: Record<PillarSlug, string> = {
  prevenir: 'text-bleu-700',
  accompagner: 'text-rose-700',
  autonomie: 'text-vert-700',
}

export function ArrowLink({ href, children, pillar, className }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'text-[16px] font-semibold hover:underline',
        pillar ? colors[pillar] : 'text-rose-700',
        className,
      )}
    >
      {children}
    </Link>
  )
}
