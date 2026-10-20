import type { Media } from '@/payload-types'
import type { Image } from '@/lib/content/types'

/** Relation Payload : identifiant seul (profondeur insuffisante) ou document peuplé. */
export type Relation<T> = number | T | null | undefined

export function peuple<T extends object>(relation: Relation<T>): T | null {
  return relation && typeof relation === 'object' ? relation : null
}

/**
 * Seconde barrière de consentement, côté site : même si un média non
 * publiable était sélectionné dans l'admin, il n'est jamais affiché.
 */
export function estPubliable(media: Media): boolean {
  return media.consentement !== 'absent' && media.usageAutorise.includes('web')
}

/** Média Payload → image du site (point focal en pourcentage). */
export function versImage(relation: Relation<Media>, altParDefaut = ''): Image | null {
  const media = peuple(relation)
  if (!media?.url || !media.width || !media.height || !estPubliable(media)) return null
  return {
    src: media.url,
    alt: media.alt || altParDefaut,
    width: media.width,
    height: media.height,
    focal:
      typeof media.focalX === 'number' && typeof media.focalY === 'number'
        ? { x: media.focalX, y: media.focalY }
        : undefined,
  }
}

/** Texte saisi ou valeur de secours, pour qu'aucun bloc ne s'affiche vide. */
export function texte(valeur: string | null | undefined, secours: string): string {
  return valeur?.trim() ? valeur.trim() : secours
}
