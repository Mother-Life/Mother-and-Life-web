import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'

const siteName = 'Mother & Life'

export function buildMetadata({
  title,
  description,
  locale,
  path = '/',
}: {
  title: string
  description: string
  locale: Locale
  path?: string
}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://motherandlife.org'
  const canonical = locale === 'fr' ? `${baseUrl}${path}` : `${baseUrl}/en${path === '/' ? '' : path}`

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        fr: `${baseUrl}${path}`,
        en: `${baseUrl}/en${path === '/' ? '' : path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

function baseUrl() {
  return process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://motherandlife.org'
}

/** Donnees structurees d'un article, attendues par la spec SEO. */
export function buildArticleJsonLd({
  title,
  description,
  path,
  locale,
  image,
  datePublished,
  section,
}: {
  title: string
  description: string
  path: string
  locale: Locale
  image?: string
  datePublished?: string
  section?: string
}) {
  const url = locale === 'fr' ? `${baseUrl()}${path}` : `${baseUrl()}/en${path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    inLanguage: locale,
    mainEntityOfPage: url,
    url,
    ...(image ? { image: [`${baseUrl()}${image}`] } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(section ? { articleSection: section } : {}),
    author: { '@type': 'NGO', name: siteName },
    publisher: {
      '@type': 'NGO',
      name: siteName,
      logo: { '@type': 'ImageObject', url: `${baseUrl()}/assets/logo.svg` },
    },
  }
}

/** Donnees structurees d'un album photo. */
export function buildImageGalleryJsonLd({
  title,
  description,
  path,
  locale,
  images,
}: {
  title: string
  description: string
  path: string
  locale: Locale
  images: string[]
}) {
  const url = locale === 'fr' ? `${baseUrl()}${path}` : `${baseUrl()}/en${path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: title,
    description,
    inLanguage: locale,
    url,
    associatedMedia: images.map((src) => ({
      '@type': 'ImageObject',
      contentUrl: `${baseUrl()}${src}`,
    })),
  }
}

export function buildNgoJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'Mother & Life',
    alternateName: 'Association Mother and Life',
    url: 'https://motherandlife.org',
    logo: `${process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://motherandlife.org'}/assets/logo.svg`,
    description:
      'Association camerounaise de périnatalité sociale. Suivi gratuit de grossesse, éducation à la sexualité, autonomisation des jeunes mères.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Douala',
      addressRegion: 'Littoral',
      addressCountry: 'CM',
    },
    email: 'motherandlife22@gmail.com',
    telephone: ['+237656279670', '+237677389463'],
    slogan: 'La maternité positive',
    areaServed: 'Cameroun',
    knowsAbout: [
      'santé maternelle',
      'périnatalité sociale',
      'planification familiale',
      'autonomisation des jeunes mères',
    ],
  }
}
