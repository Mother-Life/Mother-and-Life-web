import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
})

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const data = schema.parse({ email: form.get('email') })

    try {
      const { getPayloadClient } = await import('@/lib/payload')
      const payload = await getPayloadClient()
      await payload.create({
        collection: 'abonnes',
        data: {
          email: data.email,
          langue: 'fr',
          confirme: false,
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
