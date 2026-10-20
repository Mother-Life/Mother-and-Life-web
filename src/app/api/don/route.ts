import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  donateurNom: z.string().optional(),
  donateurEmail: z.string().email().optional(),
  donateurTéléphone: z.string().optional(),
  montant: z.coerce.number().positive(),
  affectation: z.string(),
  canal: z.string(),
  reference: z.string().optional(),
  anonyme: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const data = schema.parse({
      donateurNom: form.get('donateurNom') || undefined,
      donateurEmail: form.get('donateurEmail') || undefined,
      donateurTéléphone: form.get('donateurTéléphone') || undefined,
      montant: form.get('montant'),
      affectation: form.get('affectation'),
      canal: form.get('canal'),
      reference: form.get('reference') || undefined,
      anonyme: form.get('anonyme') || undefined,
    })

    try {
      const { getPayloadClient } = await import('@/lib/payload')
      const payload = await getPayloadClient()
      await payload.create({
        collection: 'dons',
        data: {
          montant: data.montant,
          devise: 'XAF',
          canal: data.canal as 'momo' | 'om' | 'virement' | 'especes' | 'international',
          donateurNom: data.donateurNom,
          donateurEmail: data.donateurEmail,
          donateurTéléphone: data.donateurTéléphone,
          anonyme: data.anonyme === 'true',
          affectation: data.affectation as 'general' | 'grossesse' | 'education' | 'autonomie',
          statut: 'declare',
        },
      })
    } catch {
      // DB not configured
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }
}
