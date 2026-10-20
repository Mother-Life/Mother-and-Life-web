import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { LeafIcon } from '@/components/ui/LeafIcon'
import { Heading } from '@/components/ui/Heading'
import { ArrowLink } from '@/components/ui/ArrowLink'
import { pillars } from '@/data/defaults'
import type { Locale } from '@/lib/i18n/config'
import { getLocalizedPath } from '@/lib/i18n/config'

export function MissionTrio({ locale }: { locale: Locale }) {
  const isFr = locale === 'fr'
  const links = [
    getLocalizedPath('/a-propos/raison-d-etre', locale),
    getLocalizedPath('/a-propos/perinatalite-sociale', locale),
    getLocalizedPath('/a-propos/pourquoi-agir', locale),
  ]
  const titles = isFr
    ? ["Qu'est-ce que Mother & Life ?", 'La p\u00e9rinatalit\u00e9 sociale', 'Qui accompagnons-nous ?']
    : ['What is Mother & Life?', 'Social perinatality', 'Who do we support?']

  return (
    <Section id="mission" bg="gray">
      <Container>
        <div className="grid gap-8 md:grid-cols-3 md:gap-12">
          {pillars.map((pillar, i) => (
            <div key={pillar.slug} className="rv">
              <LeafIcon pillar={pillar.slug} />
              <Heading as="h3" level={3} className="mt-4">
                {titles[i]}
              </Heading>
              <p className="mt-3 text-[16px] text-gris-600">{pillar.description}</p>
              <ArrowLink href={links[i]} pillar={pillar.slug} className="mt-3 inline-block">
                {isFr ? 'En savoir plus' : 'Learn more'}
              </ArrowLink>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
