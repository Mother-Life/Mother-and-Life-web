import type { StaticImageData } from 'next/image'
import sprite from '@/assets/decor/pinceau.svg'
import { cn } from '@/lib/cn'

/** Adresse du symbole partagé : un seul fichier, haché et mis en cache longtemps. */
const href = `${(sprite as StaticImageData).src}#pinceau`

/**
 * Empreinte de pinceau de la maquette (« Blockbuster »), tracé vectoriel unique.
 * S'étire sur toute la boîte du parent, comme la contrainte SCALE de Figma.
 * La couleur vient de `fill` (CSS), pour que chaque état puisse l'animer.
 */
export function Pinceau({ className }: { className?: string }) {
  return (
    <svg className={cn('block', className)} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <use href={href} />
    </svg>
  )
}
