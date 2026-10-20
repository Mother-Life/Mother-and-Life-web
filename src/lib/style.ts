import type { CSSProperties } from 'react'

/** Propriétés personnalisées CSS typées (`--i`, `--progression`…) pour l'attribut style. */
export function vars(valeurs: Record<`--${string}`, string | number>): CSSProperties {
  return valeurs as CSSProperties
}
