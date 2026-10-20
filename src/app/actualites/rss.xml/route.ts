import { getPayloadClient } from '@/lib/payload'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://motherandlife.org'

const echapper = (texte: string) =>
  texte.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

/** Flux RSS des actualités publiées (français). */
export async function GET() {
  let items = ''
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'articles',
      locale: 'fr',
      overrideAccess: false,
      depth: 0,
      sort: '-datePublication',
      limit: 20,
    })
    items = docs
      .map((a) => {
        const lien = `${baseUrl}/actualites/${a.slug}`
        const date = a.datePublication ? new Date(a.datePublication).toUTCString() : new Date(a.createdAt).toUTCString()
        return `<item><title>${echapper(a.titre)}</title><link>${lien}</link><guid>${lien}</guid><pubDate>${date}</pubDate>${a.chapo ? `<description>${echapper(a.chapo)}</description>` : ''}</item>`
      })
      .join('')
  } catch (erreur) {
    console.error('[rss] lecture des articles impossible', erreur)
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Mother &amp; Life · Actualités</title><link>${baseUrl}/actualites</link><description>La maternité positive, à Douala</description><language>fr</language>${items}</channel></rss>`
  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=900, stale-while-revalidate=3600' },
  })
}
