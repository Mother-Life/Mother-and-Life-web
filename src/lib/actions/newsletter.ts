'use server'

import { headers } from 'next/headers'
import { z } from 'zod'
import { getPayloadClient } from '@/lib/payload'
import { limiterDebit } from '@/lib/security/debit'

export type EtatInscription = { statut: 'repos' | 'ok' | 'erreur' }

const schema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  langue: z.enum(['fr', 'en']),
  // Pot de miel : un humain ne voit pas ce champ et le laisse vide.
  site: z.string().max(0),
})

/**
 * Inscription à la lettre d'information.
 * Action serveur : Next vérifie l'origine de la requête (protection CSRF) et le
 * formulaire fonctionne sans JavaScript. La réponse ne révèle jamais si une
 * adresse est déjà inscrite.
 */
export async function inscrireLettre(_precedent: EtatInscription, form: FormData): Promise<EtatInscription> {
  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'inconnue'
  if (!limiterDebit(`lettre:${ip}`, { max: 5, fenetreMs: 10 * 60_000 })) return { statut: 'erreur' }

  const donnees = schema.safeParse({
    email: form.get('email'),
    langue: form.get('langue'),
    site: form.get('site') ?? '',
  })
  if (!donnees.success) {
    // Robot (pot de miel rempli) : on répond comme si tout allait bien.
    return { statut: form.get('site') ? 'ok' : 'erreur' }
  }

  try {
    const payload = await getPayloadClient()
    const existe = await payload.count({ collection: 'abonnes', where: { email: { equals: donnees.data.email } } })
    if (existe.totalDocs === 0) {
      await payload.create({
        collection: 'abonnes',
        data: { email: donnees.data.email, langue: donnees.data.langue, confirme: false },
      })
    }
    return { statut: 'ok' }
  } catch (erreur) {
    console.error('[lettre] inscription impossible', erreur)
    return { statut: 'erreur' }
  }
}
