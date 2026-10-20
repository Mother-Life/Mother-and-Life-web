/**
 * Validateurs partagés par les champs de l'admin.
 * Les messages sont en français : ils s'affichent directement aux bénévoles.
 */

/** Le mot mis en valeur (souligné au pinceau, coloré) doit exister dans le titre voisin. */
export const motPresentDansTitre = (
  value: unknown,
  { siblingData }: { siblingData: Record<string, unknown> },
): true | string => {
  if (!value) return true
  const titre = typeof siblingData?.titre === 'string' ? siblingData.titre : ''
  return titre.includes(String(value))
    ? true
    : 'Ce mot doit apparaître tel quel dans le titre (mêmes majuscules et accents).'
}
