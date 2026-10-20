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
    title: fr ? 'Politique de confidentialité' : 'Privacy policy',
    description: fr ? 'Comment Mother & Life protège vos données.' : 'How Mother & Life protects your data.',
    locale: lang as Locale,
    path: '/politique-de-confidentialite',
  })
}

export default async function PageConfidentialite({ params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) notFound()
  const site = await getSite(lang as Locale)
  const fr = lang === 'fr'
  return (
    <GabaritTexte titre={fr ? 'Politique de confidentialité' : 'Privacy policy'}>
      <p>
        {fr
          ? 'Mother & Life ne collecte que les données nécessaires au traitement de vos demandes (contact, don, lettre d’information). Aucune donnée de bénéficiaire n’est publiée sans consentement écrit. Le site n’utilise ni cookie publicitaire ni outil de suivi tiers.'
          : 'Mother & Life only collects the data needed to handle your requests (contact, donation, newsletter). No beneficiary data is published without written consent. The site uses no advertising cookies or third-party tracking.'}
      </p>
      <p>
        {fr ? 'Pour toute demande :' : 'For any request:'} <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </GabaritTexte>
  )
}
