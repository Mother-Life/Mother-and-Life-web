import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Ton = 'texte' | 'accent' | 'bleu' | 'vert' | 'craie'

const couleurs: Record<Ton, string> = {
  texte: 'text-texte',
  accent: 'text-accent',
  bleu: 'text-axe-bleu',
  vert: 'text-axe-vert',
  craie: 'text-craie',
}

/**
 * Lien textuel suivi d'une flèche qui glisse au survol.
 * `etendu` agrandit la zone de clic à toute la carte parente (positionnée).
 */
export function LienFleche({
  href,
  children,
  ton = 'texte',
  taille = 'fort',
  etendu = false,
  libelleAccessible,
  className,
}: {
  href: string
  children: ReactNode
  ton?: Ton
  taille?: 'fort' | 'petit'
  etendu?: boolean
  /** Libellé complet pour les lecteurs d'écran quand le texte visible est court (« Lire »). */
  libelleAccessible?: string
  className?: string
}) {
  return (
    <Link
      href={href}
      aria-label={libelleAccessible}
      className={cn(
        'group inline-flex items-baseline gap-2 underline-offset-4 hover:underline',
        taille === 'fort' ? 'text-normal font-semibold' : 'text-petit',
        couleurs[ton],
        etendu && 'lien-etendu',
        className,
      )}
    >
      {children}
      <span aria-hidden="true" className="fleche">
        →
      </span>
    </Link>
  )
}
