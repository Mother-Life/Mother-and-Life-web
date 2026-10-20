import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://motherandlife.org'

/**
 * Plan du site. Ne liste que les pages déjà intégrées ; chaque page intérieure
 * s'ajoute ici quand elle est livrée (plan v1.5, spec delta §3.2).
 */
const routes = ['', '/mentions-legales', '/politique-de-confidentialite']

const url = (route: string, locale: 'fr' | 'en') => (locale === 'fr' ? `${baseUrl}${route}` : `${baseUrl}/en${route}`)

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    (['fr', 'en'] as const).map((locale) => ({
      url: url(route, locale),
      changeFrequency: route === '' ? ('weekly' as const) : ('yearly' as const),
      priority: route === '' ? (locale === 'fr' ? 1 : 0.9) : 0.3,
      alternates: { languages: { fr: url(route, 'fr'), en: url(route, 'en') } },
    })),
  )
}
