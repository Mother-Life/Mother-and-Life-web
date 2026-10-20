import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GabaritAccueil } from '@/components/templates/GabaritAccueil'
import { getAccueil } from '@/lib/cms/accueil'
import { isValidLocale, type Locale } from '@/lib/i18n/config'
import { getUi } from '@/lib/i18n/ui'
import { buildMetadata } from '@/lib/seo/metadata'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isValidLocale(lang)) return {}
  const fr = lang === 'fr'
  return buildMetadata({
    title: fr ? 'La maternité positive, à Douala' : 'Positive motherhood in Douala',
    description: fr
      ? 'Mother & Life accompagne gratuitement les futures mères vulnérables de Douala : suivi de grossesse, prévention et autonomie.'
      : 'Mother & Life provides free support to vulnerable expectant mothers in Douala: pregnancy care, prevention and self-reliance.',
    locale: lang as Locale,
    path: '/',
  })
}

export default async function PageAccueil({ params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) notFound()
  const locale = lang as Locale
  const accueil = await getAccueil(locale)
  return <GabaritAccueil accueil={accueil} locale={locale} ui={getUi(locale)} />
}
