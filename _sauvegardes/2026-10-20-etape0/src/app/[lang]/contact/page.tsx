import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { ContactForm } from '@/components/forms/ContactForm'
import { buildMetadata } from '@/lib/seo/metadata'
import { isValidLocale, type Locale } from '@/lib/i18n/config'
import { organisationDefaults } from '@/data/defaults'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) return {}
  const isFr = lang === 'fr'
  return buildMetadata({
    title: isFr ? 'Contact' : 'Contact',
    description: isFr ? 'Contactez Mother & Life.' : 'Contact Mother & Life.',
    locale: lang as Locale,
    path: '/contact',
  })
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) notFound()
  const locale = lang as Locale
  const isFr = locale === 'fr'
  const org = organisationDefaults

  return (
    <Section bg="gray">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Heading level={1} className="rv mb-6">{isFr ? 'Contact' : 'Contact'}</Heading>
            <p className="rv mb-6 text-gris-600">
              {isFr
                ? 'WhatsApp prioritaire. Trois antennes : Bépanda, Batié, Bafandji.'
                : 'WhatsApp preferred. Three branches: Bepanda, Batie, Bafandji.'}
            </p>
            <ul className="rv space-y-3 text-[16px]">
              <li><strong>Bépanda-Omnisports, Douala</strong><br />{org.telephones[1]}</li>
              <li><strong>Batie (Ouest)</strong></li>
              <li><strong>Bafandji (Nord-Ouest)</strong></li>
              <li>{org.email}</li>
            </ul>
          </div>
          <ContactForm locale={locale} />
        </div>
      </Container>
    </Section>
  )
}
