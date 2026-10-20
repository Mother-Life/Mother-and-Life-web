import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { organisationDefaults } from '@/data/defaults'
import { isValidLocale } from '@/lib/i18n/config'

type Props = { params: Promise<{ lang: string }> }

export default async function MentionsLegalesPage({ params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) notFound()
  const isFr = lang === 'fr'
  const org = organisationDefaults

  return (
    <Section bg="white">
      <Container narrow>
        <Heading level={1} className="mb-6">
          {isFr ? 'Mentions légales' : 'Legal notice'}
        </Heading>
        <div className="space-y-4 text-gris-600">
          <p><strong>{org.denomination}</strong></p>
          <p>{org.numeroEnregistrement}</p>
          <p>{org.siege}</p>
          <p>{org.email}</p>
          <p>{org.telephones.join(' à')}</p>
          <p>{org.dateAG}</p>
        </div>
      </Container>
    </Section>
  )
}
