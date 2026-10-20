import { z } from 'zod'
import { getPayloadClient } from '@/lib/payload'
import { estUnRobot, garderFormulaire, reponseNeutre } from '@/lib/security/formulaire'

const texte = (max: number) => z.string().trim().max(max).optional()

const schema = z.object({
  type: z.enum(['benevolat', 'partenaire']),
  nom: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  telephone: texte(30),
  ville: texte(80),
  organisation: texte(160),
  disponibilite: texte(400),
  competences: texte(1000),
  motivation: z.string().trim().min(10).max(4000),
  consentement: z.literal('true'),
})

/** Candidature bénévole ou partenaire. Garde commune : origine, taille, débit, pot de miel. */
export async function POST(request: Request) {
  const refus = garderFormulaire(request, 'candidature', { max: 3 })
  if (refus) return refus

  const form = await request.formData().catch(() => null)
  if (!form) return Response.json({ ok: false }, { status: 400 })
  if (estUnRobot(form)) return reponseNeutre()

  const champ = (nom: string) => form.get(nom) || undefined
  const donnees = schema.safeParse({
    type: form.get('type'),
    nom: form.get('nom'),
    email: form.get('email'),
    telephone: champ('telephone'),
    ville: champ('ville'),
    organisation: champ('organisation'),
    disponibilite: champ('disponibilite'),
    competences: champ('competences'),
    motivation: form.get('motivation'),
    consentement: form.get('consentement'),
  })
  if (!donnees.success) return Response.json({ ok: false }, { status: 400 })

  try {
    const payload = await getPayloadClient()
    const { consentement: _c, ...candidature } = donnees.data
    await payload.create({ collection: 'candidatures', data: candidature })
    return reponseNeutre()
  } catch (erreur) {
    console.error('[candidature] enregistrement impossible', erreur)
    return Response.json({ ok: false }, { status: 503 })
  }
}
