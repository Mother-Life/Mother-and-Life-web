import type { StaticImageData } from 'next/image'
import Link from 'next/link'
import logoCraie from '@/assets/decor/logo.svg'
import logoNuit from '@/assets/decor/logo-nuit.svg'
import { cn } from '@/lib/cn'

/**
 * Logo cliquable vers l'accueil. Version « nuit » pour les surfaces sombres.
 * Le nom de l'association est porté par le texte alternatif.
 */
export function Logo({
  href,
  surface = 'craie',
  libelle,
  className,
}: {
  href: string
  surface?: 'craie' | 'nuit'
  libelle: string
  className?: string
}) {
  const fichier = (surface === 'nuit' ? logoNuit : logoCraie) as StaticImageData
  return (
    <Link href={href} className={cn('inline-block shrink-0', className)}>
      {/* SVG statique : next/image ne l'optimiserait pas, une balise simple suffit. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={fichier.src} width={fichier.width} height={fichier.height} alt={libelle} className="h-full w-auto" />
    </Link>
  )
}
