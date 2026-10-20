import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  nom: z.string().min(2),
  email: z.string().email(),
  telephone: z.string().optional(),
  sujet: z.string(),
  message: z.string().min(10),
  consentement: z.literal('true'),
  honeypot: z.string().max(0).optional(),
})

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    if (form.get('honeypot')) return NextResponse.json({ ok: true })

    const data = schema.parse({
      nom: form.get('nom'),
      email: form.get('email'),
      telephone: form.get('telephone') || undefined,
      sujet: form.get('sujet'),
      message: form.get('message'),
      consentement: form.get('consentement'),
      honeypot: form.get('honeypot') || '',
    })

    // Payload integration when DB is available
    try {
      const { getPayloadClient } = await import('@/lib/payload')
      const payload = await getPayloadClient()
      await payload.create({
        collection: 'messages',
        data: {
          nom: data.nom,
          email: data.email,
          telephone: data.telephone,
          sujet: data.sujet as 'info' | 'benevolat' | 'partenariat' | 'don' | 'autre',
          message: data.message,
          consentement: true,
        },
      })
    } catch {
      // DB not configured Â — accept form in dev
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }
}
