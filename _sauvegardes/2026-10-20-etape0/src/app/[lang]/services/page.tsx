import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { BadgeGratuit } from '@/components/ui/BadgeGratuit'
import { ParcoursSante } from '@/components/sections/ParcoursSante'
import { pillars } from '@/data/defaults'
import { buildMetadata } from '@/lib/seo/metadata'
import { isValidLocale, type Locale } from '@/lib/i18n/config'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) return {}
  const isFr = lang === 'fr'
  return buildMetadata({
    title: isFr ? 'Soins & services' : 'Care & services',
    description: isFr ? 'Prévenir, accompagner, renforcer l\'autonomie.' : 'Prevent, accompany, strengthen autonomy.',
    locale: lang as Locale,
    path: '/services',
  })
}

export default async function ServicesPage({ params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) notFound()
  const locale = lang as Locale
  const isFr = locale === 'fr'

  return (
    <>
      <Section bg="white">
        <Container>
          <Heading level={1} className="rv mb-4">
            {isFr ? 'Soins & services' : 'Care & services'}
          </Heading>
          <p className="rv mb-12 max-w-[65ch] text-gris-600">
            {isFr
              ? 'Trois axes d\'intervention pour accompagner les femmes et les familles de la conception aux 1000 premiers jours.'
              : 'Three areas of intervention to support women and families from conception through the first 1,000 days.'}
          </p>
          {pillars.map((pillar) => (
            <div key={pillar.slug} id={pillar.slug} className="rv mb-16 scroll-mt-24">
              <div className="mb-4 flex items-center gap-3">
                <Heading level={2}>{pillar.nom}</Heading>
                <BadgeGratuit />
              </div>
              <p className="max-w-[65ch] text-gris-600">{pillar.description}</p>
            </div>
          ))}
          <div id="psychosocial" className="rv mb-16 scroll-mt-24">
            <Heading level={2} className="mb-4">
              {isFr ? 'Suivi psychosocial' : 'Psychosocial support'}
            </Heading>
            <p className="max-w-[65ch] text-gris-600">
              {isFr
                ? 'Un accompagnement psychosocial à chaque étape : écoute, orientation, soutien post-partum et lien avec les structures partenaires.'
                : 'Psychosocial support at every stage: listening, guidance, postpartum support, and connection with partner organizations.'}
            </p>
          </div>
          <div id="orientation" className="rv scroll-mt-24">
            <Heading level={2} className="mb-4">
              {isFr ? 'Orientation & transfert' : 'Referral & transfer'}
            </Heading>
            <p className="max-w-[65ch] text-gris-600">
              {isFr
                ? 'Mother & Life oriente et transfère vers les associations et structures adaptées lorsque le cas le nécessite.'
                : 'Mother & Life refers and transfers to appropriate organizations and structures when needed.'}
            </p>
          </div>
        </Container>
      </Section>
      <ParcoursSante locale={locale} />
    </>
  )
}
