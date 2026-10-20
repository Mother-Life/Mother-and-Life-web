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
 * Lien textuel suivi d'une flèche qui glisse au survol ; le soulignement se
 * peint de gauche à droite (composants/survols.css).
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
        'lien-encre group inline-flex items-baseline gap-2',
        taille === 'fort' ? 'text-normal font-semibold' : 'text-petit',
        couleurs[ton],
        etendu && 'lien-etendu',
        className,
      )}
    >
      <span className="lien-encre__texte">{children}</span>
      <span aria-hidden="true" className="fleche">
        →
      </span>
    </Link>
  )
}
