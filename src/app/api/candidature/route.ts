import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  type: z.enum(['benevolat', 'partenaire']),
  nom: z.string().min(2),
  email: z.string().email(),
  telephone: z.string().optional(),
  ville: z.string().optional(),
  organisation: z.string().optional(),
  disponibilite: z.string().optional(),
  competences: z.string().optional(),
  motivation: z.string().min(10),
})

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const data = schema.parse({
      type: form.get('type'),
      nom: form.get('nom'),
      email: form.get('email'),
      telephone: form.get('telephone') || undefined,
      ville: form.get('ville') || undefined,
      organisation: form.get('organisation') || undefined,
      disponibilite: form.get('disponibilite') || undefined,
      competences: form.get('competences') || undefined,
      motivation: form.get('motivation'),
    })

    try {
      const { getPayloadClient } = await import('@/lib/payload')
      const payload = await getPayloadClient()
      await payload.create({
        collection: 'candidatures',
        data,
      })
    } catch {
      // DB not configured
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }
}
