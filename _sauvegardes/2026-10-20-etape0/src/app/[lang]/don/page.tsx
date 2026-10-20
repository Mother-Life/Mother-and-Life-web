import { notFound } from 'next/navigation'
import { DonForm } from '@/components/forms/DonForm'
import { TransparenceBand } from '@/components/sections/TransparenceBand'
import { buildMetadata } from '@/lib/seo/metadata'
import { isValidLocale, type Locale } from '@/lib/i18n/config'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) return {}
  const isFr = lang === 'fr'
  return buildMetadata({
    title: isFr ? 'Faire un don' : 'Donate',
    description: isFr ? 'Soutenez Mother & Life.' : 'Support Mother & Life.',
    locale: lang as Locale,
    path: '/don',
  })
}

export default async function DonPage({ params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) notFound()
  const locale = lang as Locale

  return (
    <>
      <DonForm locale={locale} />
      <TransparenceBand locale={locale} />
    </>
  )
}
