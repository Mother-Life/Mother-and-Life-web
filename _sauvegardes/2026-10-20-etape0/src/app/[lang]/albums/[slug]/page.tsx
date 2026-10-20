import { notFound } from 'next/navigation'
import { AlbumDetailPage } from '@/components/media/AlbumDetailPage'
import { sampleAlbums } from '@/data/defaults'
import { getAlbumImage } from '@/lib/assets/images'
import { buildImageGalleryJsonLd, buildMetadata } from '@/lib/seo/metadata'
import { isValidLocale, type Locale } from '@/lib/i18n/config'

type Props = { params: Promise<{ lang: string; slug: string }> }

export async function generateStaticParams() {
  const langs = ['fr', 'en']
  return langs.flatMap((lang) => sampleAlbums.map((album) => ({ lang, slug: album.slug })))
}

export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params
  if (!isValidLocale(lang)) return {}
  const album = sampleAlbums.find((a) => a.slug === slug)
  if (!album) return {}
  return buildMetadata({
    title: album.titre,
    description: album.resume,
    locale: lang as Locale,
    path: `/albums/${slug}`,
  })
}

export default async function AlbumPage({ params }: Props) {
  const { lang, slug } = await params
  if (!isValidLocale(lang)) notFound()
  const album = sampleAlbums.find((a) => a.slug === slug)
  if (!album) notFound()

  const jsonLd = buildImageGalleryJsonLd({
    title: album.titre,
    description: album.resume,
    path: `/albums/${slug}`,
    locale: lang as Locale,
    images: [getAlbumImage(slug).src],
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AlbumDetailPage locale={lang as Locale} slug={slug} />
    </>
  )
}
