import { notFound } from 'next/navigation'
import { NewsListPage } from '@/components/filters/NewsListPage'
import { buildMetadata } from '@/lib/seo/metadata'
import { isValidLocale, type Locale } from '@/lib/i18n/config'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) return {}
  const isFr = lang === 'fr'
  return buildMetadata({
    title: isFr ? 'Actualités' : 'News',
    description: isFr ? 'Actualités Mother & Life.' : 'Mother & Life news.',
    locale: lang as Locale,
    path: '/actualites',
  })
}

export default async function ActualitésPage({ params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) notFound()
  return <NewsListPage locale={lang as Locale} />
}
