import type { MetadataRoute } from 'next'
import { sampleAlbums, sampleNews } from '@/data/defaults'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://motherandlife.org'

/** Routes statiques — alignées sur SPEC §2.2 (FR sans préfixe, EN sous /en) */
const staticRoutes = [
  '',
  '/a-propos/raison-d-etre',
  '/a-propos/perinatalite-sociale',
  '/a-propos/pourquoi-agir',
  '/a-propos/equipe',
  '/a-propos/impacts',
  '/services',
  '/s-impliquer',
  '/actualites',
  '/albums', // Galerie d'activités filtrable (spec §5.1)
  '/rapports',
  '/contact',
  '/don',
  '/mentions-legales',
  '/politique-de-confidentialite',
]

function localizedUrl(route: string, locale: 'fr' | 'en') {
  if (locale === 'fr') return `${baseUrl}${route}`
  return `${baseUrl}/en${route}`
}

function entry(
  route: string,
  locale: 'fr' | 'en',
  priority = 0.8,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly',
): MetadataRoute.Sitemap[number] {
  return {
    url: localizedUrl(route, locale),
    lastModified: new Date(),
    changeFrequency,
    priority: route === '' ? (locale === 'fr' ? 1 : 0.9) : priority,
    alternates: {
      languages: {
        fr: localizedUrl(route, 'fr'),
        en: localizedUrl(route, 'en'),
      },
    },
  }
}

function localizedEntries(
  route: string,
  priority = 0.8,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly',
) {
  return [
    entry(route, 'fr', priority, changeFrequency),
    entry(route, 'en', priority - 0.1, changeFrequency),
  ]
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const route of staticRoutes) {
    entries.push(...localizedEntries(route, route === '' ? 1 : 0.8, route === '' ? 'weekly' : 'monthly'))
  }

  for (const article of sampleNews) {
    entries.push(...localizedEntries(`/actualites/${article.slug}`, 0.7, 'weekly'))
  }

  for (const album of sampleAlbums) {
    entries.push(...localizedEntries(`/albums/${album.slug}`, 0.7, 'monthly'))
  }

  entries.push({
    url: `${baseUrl}/actualites/rss.xml`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.5,
  })

  return entries
}
