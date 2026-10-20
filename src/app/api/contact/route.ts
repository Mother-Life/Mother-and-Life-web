import { z } from 'zod'
import { getPayloadClient } from '@/lib/payload'
import { estUnRobot, garderFormulaire, reponseNeutre } from '@/lib/security/formulaire'

const schema = z.object({
  nom: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  telephone: z.string().trim().max(30).optional(),
  sujet: z.enum(['info', 'benevolat', 'partenariat', 'don', 'autre']),
  message: z.string().trim().min(10).max(4000),
  // Consentement explicite (loi camerounaise n° 2024/017) : case non cochée par défaut.
  consentement: z.literal('true'),
})

/** Formulaire de contact. Garde commune : origine, taille, débit, pot de miel. */
export async function POST(request: Request) {
  const refus = garderFormulaire(request, 'contact')
  if (refus) return refus

  const form = await request.formData().catch(() => null)
  if (!form) return Response.json({ ok: false }, { status: 400 })
  if (estUnRobot(form)) return reponseNeutre()

  const donnees = schema.safeParse({
    nom: form.get('nom'),
    email: form.get('email'),
    telephone: form.get('telephone') || undefined,
    sujet: form.get('sujet'),
    message: form.get('message'),
    consentement: form.get('consentement'),
  })
  if (!donnees.success) return Response.json({ ok: false }, { status: 400 })

  try {
    const payload = await getPayloadClient()
    const { consentement: _c, ...message } = donnees.data
    await payload.create({ collection: 'messages', data: { ...message, consentement: true } })
    return reponseNeutre()
  } catch (erreur) {
    console.error('[contact] enregistrement impossible', erreur)
    return Response.json({ ok: false }, { status: 503 })
  }
}
