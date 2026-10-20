import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import { CMS_TAG } from '@/lib/cms/cache'

/**
 * Après chaque publication dans l'admin, on invalide le cache du site
 * pour que la modification apparaisse sans nouveau déploiement.
 * Le site est petit : on vide toutes les lectures du CMS (étiquette `cms`) et
 * toute la mise en page, plutôt qu'une route précise.
 * Hors du contexte Next (seed, CLI Payload), l'appel échoue sans conséquence.
 * Pour un import en masse, passer `context: { disableRevalidate: true }`.
 */
function revalidateSite() {
  try {
    revalidateTag(CMS_TAG)
    revalidatePath('/', 'layout')
  } catch {
    // Exécuté hors de Next.js (script, migration) : rien à invalider.
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc, req }) => {
  if (!req.context?.disableRevalidate) revalidateSite()
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  if (!req.context?.disableRevalidate) revalidateSite()
  return doc
}

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({ doc, req }) => {
  if (!req.context?.disableRevalidate) revalidateSite()
  return doc
}
