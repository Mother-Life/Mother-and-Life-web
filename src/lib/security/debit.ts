/**
 * Limiteur de débit en mémoire, par clé (ex. adresse IP + action).
 * Garde-fou contre le spam d'un formulaire depuis une même adresse. En
 * déploiement serverless, chaque instance a sa propre mémoire : la limite est
 * donc approximative. Pour une limite stricte, brancher un stockage partagé.
 */
const compteurs = new Map<string, { debut: number; nombre: number }>()

export function limiterDebit(cle: string, { max, fenetreMs }: { max: number; fenetreMs: number }): boolean {
  const maintenant = Date.now()
  const actuel = compteurs.get(cle)
  if (!actuel || maintenant - actuel.debut > fenetreMs) {
    compteurs.set(cle, { debut: maintenant, nombre: 1 })
    if (compteurs.size > 5000) nettoyer(maintenant, fenetreMs)
    return true
  }
  actuel.nombre += 1
  return actuel.nombre <= max
}

function nettoyer(maintenant: number, fenetreMs: number) {
  for (const [cle, valeur] of compteurs) {
    if (maintenant - valeur.debut > fenetreMs) compteurs.delete(cle)
  }
}
