import type { StaticImageData } from 'next/image'
import { cn } from '@/lib/cn'

/**
 * Illustration décorative (pinceaux, mains, vagues). Toujours ignorée par les
 * lecteurs d'écran, chargée en différé hors du premier écran. Les dimensions
 * natives sont posées pour que le ratio ne soit jamais déformé.
 */
export function Illustration({
  src,
  className,
  differee = true,
  encre,
  encreAuChargement = false,
  derive = false,
}: {
  src: StaticImageData | string
  className?: string
  differee?: boolean
  /** Sens dans lequel le décor se peint (voir « Décors encre » dans motion.css). */
  encre?: 'gauche' | 'droite' | 'haut' | 'bas'
  /** Peint au premier rendu (hero) plutôt qu'à l'arrivée à l'écran. */
  encreAuChargement?: boolean
  /** Motif de fond qui dérive lentement au défilement (bureau). */
  derive?: boolean
}) {
  const fichier = src as StaticImageData
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={fichier.src}
      width={fichier.width}
      height={fichier.height}
      alt=""
      aria-hidden="true"
      loading={differee ? 'lazy' : undefined}
      decoding="async"
      draggable={false}
      data-encre={encre}
      data-encre-quand={encre && encreAuChargement ? 'chargement' : undefined}
      data-derive={derive ? '' : undefined}
      className={cn('pointer-events-none select-none', className)}
    />
  )
}
