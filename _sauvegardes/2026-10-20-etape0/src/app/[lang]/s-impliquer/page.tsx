import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { VolunteerForm } from '@/components/forms/VolunteerForm'
import { PartnerForm } from '@/components/forms/PartnerForm'
import { CampaignBand } from '@/components/sections/CampaignBand'
import { buildMetadata } from '@/lib/seo/metadata'
import { isValidLocale, type Locale } from '@/lib/i18n/config'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) return {}
  const isFr = lang === 'fr'
  return buildMetadata({
    title: isFr ? "S'impliquer" : 'Get involved',
    description: isFr ? 'Don, bénévolat, partenariat.' : 'Donate, volunteer, partner.',
    locale: lang as Locale,
    path: '/s-impliquer',
  })
}

export default async function GetInvolvedPage({ params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) notFound()
  const locale = lang as Locale
  const isFr = locale === 'fr'

  return (
    <>
      <Section bg="white">
        <Container narrow>
          <Heading level={1} className="rv mb-12">
            {isFr ? "S'impliquer" : 'Get involved'}
          </Heading>
          <div id="benevolat" className="rv mb-16 scroll-mt-24">
            <Heading level={2} className="mb-6">{isFr ? 'Devenir bénévole' : 'Volunteer'}</Heading>
            <VolunteerForm locale={locale} />
          </div>
          <div id="partenaire" className="rv scroll-mt-24">
            <Heading level={2} className="mb-6">{isFr ? 'Devenir partenaire' : 'Become a partner'}</Heading>
            <PartnerForm locale={locale} />
          </div>
        </Container>
      </Section>
      <CampaignBand locale={locale} />
    </>
  )
}
