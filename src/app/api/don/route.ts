import { z } from 'zod'
import { getPayloadClient } from '@/lib/payload'
import { estUnRobot, garderFormulaire, reponseNeutre } from '@/lib/security/formulaire'

const schema = z.object({
  donateurNom: z.string().trim().max(120).optional(),
  donateurEmail: z.string().trim().toLowerCase().email().max(254).optional(),
  donateurTelephone: z.string().trim().max(30).optional(),
  // Plafond de sécurité : au-delà, la déclaration passe par l'équipe.
  montant: z.coerce.number().int().positive().max(100_000_000),
  affectation: z.enum(['general', 'grossesse', 'education', 'autonomie']),
  canal: z.enum(['momo', 'om', 'virement', 'especes', 'international']),
  anonyme: z.enum(['true', 'false']).optional(),
  consentement: z.literal('true'),
})

/**
 * Déclaration de don (le paiement lui-même se fait hors du site : Mobile Money,
 * virement). Garde commune : origine, taille, débit, pot de miel.
 */
export async function POST(request: Request) {
  const refus = garderFormulaire(request, 'don')
  if (refus) return refus

  const form = await request.formData().catch(() => null)
  if (!form) return Response.json({ ok: false }, { status: 400 })
  if (estUnRobot(form)) return reponseNeutre()

  const champ = (nom: string) => form.get(nom) || undefined
  const donnees = schema.safeParse({
    donateurNom: champ('donateurNom'),
    donateurEmail: champ('donateurEmail'),
    donateurTelephone: champ('donateurTelephone'),
    montant: form.get('montant'),
    affectation: form.get('affectation'),
    canal: form.get('canal'),
    anonyme: champ('anonyme'),
    consentement: form.get('consentement'),
  })
  if (!donnees.success) return Response.json({ ok: false }, { status: 400 })

  try {
    const payload = await getPayloadClient()
    const { anonyme, consentement: _c, ...don } = donnees.data
    await payload.create({
      collection: 'dons',
      data: { ...don, devise: 'XAF', anonyme: anonyme === 'true', statut: 'declare' },
    })
    return reponseNeutre()
  } catch (erreur) {
    console.error('[don] enregistrement impossible', erreur)
    return Response.json({ ok: false }, { status: 503 })
  }
}
