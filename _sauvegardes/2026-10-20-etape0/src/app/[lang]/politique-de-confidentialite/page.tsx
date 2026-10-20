import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { isValidLocale } from '@/lib/i18n/config'

type Props = { params: Promise<{ lang: string }> }

export default async function PrivacyPage({ params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) notFound()
  const isFr = lang === 'fr'

  return (
    <Section bg="white">
      <Container narrow>
        <Heading level={1} className="mb-6">
          {isFr ? 'Politique de confidentialité' : 'Privacy policy'}
        </Heading>
        <div className="space-y-4 text-gris-600">
          <p>
            {isFr
              ? 'Mother & Life collecte uniquement les données nécessaires au traitement de vos demandes (contact, don, newsletter). Aucune donnée de bénéficiaire n\'est publiée sans consentement écrit.'
              : 'Mother & Life only collects data necessary to process your requests (contact, donation, newsletter). No beneficiary data is published without written consent.'}
          </p>
          <p>
            {isFr
              ? 'Pour toute demande : motherandlife22@gmail.com'
              : 'For any request: motherandlife22@gmail.com'}
          </p>
        </div>
      </Container>
    </Section>
  )
}
