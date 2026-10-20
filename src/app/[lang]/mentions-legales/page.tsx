import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GabaritTexte } from '@/components/templates/GabaritTexte'
import { getSite } from '@/lib/cms/site'
import { isValidLocale, type Locale } from '@/lib/i18n/config'
import { buildMetadata } from '@/lib/seo/metadata'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isValidLocale(lang)) return {}
  const fr = lang === 'fr'
  return buildMetadata({
    title: fr ? 'Mentions légales' : 'Legal notice',
    description: fr ? 'Informations légales de l’association Mother & Life.' : 'Legal information about Mother & Life.',
    locale: lang as Locale,
    path: '/mentions-legales',
  })
}

export default async function PageMentionsLegales({ params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) notFound()
  const site = await getSite(lang as Locale)
  const fr = lang === 'fr'
  return (
    <GabaritTexte titre={fr ? 'Mentions légales' : 'Legal notice'}>
      <p>
        <strong>{site.denomination}</strong>
      </p>
      <p>
        {fr ? 'Récépissé de déclaration' : 'Registration'} n° {site.numeroEnregistrement}
      </p>
      <p>{site.adresse}</p>
      <p>
        <a href={`mailto:${site.email}`}>{site.email}</a> · {site.telephones.join(' · ')}
      </p>
    </GabaritTexte>
  )
}
