import { notFound } from 'next/navigation'
import { AlbumsListPage } from '@/components/filters/AlbumsListPage'
import { buildMetadata } from '@/lib/seo/metadata'
import { isValidLocale, type Locale } from '@/lib/i18n/config'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) return {}
  const isFr = lang === 'fr'
  return buildMetadata({
    title: isFr ? "Galerie d'activit\u00e9s" : 'Activity gallery',
    description: isFr
      ? 'Photos de terrain : sensibilisation, permanences, ateliers et actions communautaires Mother & Life.'
      : 'Field photos: outreach, clinics, workshops and community actions by Mother & Life.',
    locale: lang as Locale,
    path: '/albums',
  })
}

export default async function AlbumsPage({ params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) notFound()
  return <AlbumsListPage locale={lang as Locale} />
}
