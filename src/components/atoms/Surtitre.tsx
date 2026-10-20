import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Feuille } from './Feuille'

type Ton = 'accent' | 'bleu' | 'doux'

const couleurs: Record<Ton, string> = {
  accent: 'text-accent',
  bleu: 'text-axe-bleu',
  doux: 'text-texte-doux',
}

/**
 * Surtitre manuscrit (Caveat) précédé de la feuille du logo.
 * Placé avant le titre de section, il n'est pas lui-même un titre : c'est un <p>.
 */
export function Surtitre({
  children,
  ton = 'accent',
  puce = true,
  className,
}: {
  children: ReactNode
  ton?: Ton
  puce?: boolean
  className?: string
}) {
  return (
    <p className={cn('flex items-center gap-2.5 font-main text-main font-bold', couleurs[ton], className)}>
      {puce && <Feuille className="shrink-0" />}
      <span>{children}</span>
    </p>
  )
}
