import { Picture } from '@/components/media/Picture'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Kicker } from '@/components/ui/Kicker'
import { Heading } from '@/components/ui/Heading'
import { ArrowLink } from '@/components/ui/ArrowLink'
import { pillars } from '@/data/defaults'
import { getPillarImage } from '@/lib/assets/images'
import type { Locale } from '@/lib/i18n/config'
import type { PillarSlug } from '@/styles/tokens'
import { cn } from '@/lib/utils'

const bulletLinks: Record<PillarSlug, string[]> = {
  prevenir: [
    'Ateliers en milieu scolaire et communautaire',
    'Groupes de parole jeunes & parents',
    'Planification familiale & contraception',
  ],
  accompagner: [
    'Consultations & échographies gratuites',
    'Accouchement assisté et sécurisé',
    'Soutien psychosocial & juridique',
  ],
  autonomie: [
    'Formation professionnelle des jeunes mères',
    'Activités génératrices de revenus',
    'Vie communautaire & entraide',
  ],
}

export function ZigzagPillars({ locale }: { locale: Locale }) {
  const isFr = locale === 'fr'
  const prefix = locale === 'fr' ? '' : '/en'

  return (
    <Section id="actions" bg="white">
      <Container>
        {pillars.map((pillar, index) => {
          const reversed = index % 2 === 1
          const image = getPillarImage(pillar.slug)

          return (
            <div
              key={pillar.slug}
              className={cn(
                'rv grid items-center gap-10 md:grid-cols-[6fr_5fr] md:gap-[72px]',
                index > 0 && 'mt-[88px]',
              )}
            >
              <div className={reversed ? 'md:order-2' : ''}>
                <Kicker pillar={pillar.slug}>
                  {isFr ? `Nos actions / 0${index + 1}` : `Our work / 0${index + 1}`}
                </Kicker>
                <Heading level={2}>{pillar.accroche}</Heading>
                <p className="mt-4 max-w-[52ch] text-gris-600">{pillar.description}</p>
                <ul className="my-5 flex flex-col gap-2.5">
                  {bulletLinks[pillar.slug].map((item) => (
                    <li key={item}>
                      <a
                        href={`${prefix}/services#${pillar.slug}`}
                        className="block border-b border-hairline pb-2.5 text-[16px] font-medium text-encre hover:text-rose-700"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
                <ArrowLink href={`${prefix}/services#${pillar.slug}`} pillar={pillar.slug}>
                  {pillar.nom}
                </ArrowLink>
              </div>
              <div
                className={cn(
                  'aspect-[4/3] overflow-hidden rounded-[12px] bg-gris-100',
                  reversed ? 'md:order-1' : '',
                )}
              >
                <Picture
                  src={image.src}
                  alt={image.alt[locale]}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 768px) 100vw, 560px"
                />
              </div>
            </div>
          )
        })}
      </Container>
    </Section>
  )
}
