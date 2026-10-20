import { sampleNews } from '@/data/defaults'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://motherandlife.org'

  const items = sampleNews
    .map(
      (article) => `
    <item>
      <title>${article.titre}</title>
      <link>${baseUrl}/actualites/${article.slug}</link>
      <description>${article.extrait}</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>`,
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Mother &amp; Life — Actualités</title>
    <link>${baseUrl}/actualites</link>
    <description>Actualités de l'association Mother &amp; Life</description>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
