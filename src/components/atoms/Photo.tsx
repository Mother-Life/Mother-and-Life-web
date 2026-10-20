import NextImage from 'next/image'
import type { Image } from '@/lib/content/types'
import { cn } from '@/lib/cn'

type Props = {
  image: Image
  /** Largeurs d'affichage, pour que le navigateur choisisse la bonne taille. */
  sizes: string
  /** Image principale du premier écran (LCP) : chargée en priorité, jamais différée. */
  prioritaire?: boolean
  className?: string
}

/**
 * Photo du site. Remplit son cadre (le parent fixe la forme et le ratio) et
 * respecte le point focal saisi dans l'admin, pour qu'aucun masque ne coupe un
 * visage. Formats AVIF/WebP et tailles adaptées sont servis par next/image.
 */
export function Photo({ image, sizes, prioritaire = false, className }: Props) {
  const focal = image.focal ? `${image.focal.x}% ${image.focal.y}%` : '50% 50%'
  return (
    <NextImage
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      quality={75}
      priority={prioritaire}
      fetchPriority={prioritaire ? 'high' : undefined}
      placeholder={image.blurDataURL ? 'blur' : 'empty'}
      blurDataURL={image.blurDataURL}
      className={cn('object-cover', className)}
      style={{ objectPosition: focal }}
    />
  )
}
