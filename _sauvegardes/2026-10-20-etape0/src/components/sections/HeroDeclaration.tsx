import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Kicker } from '@/components/ui/Kicker'
import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/Button'
import { ArrowLink } from '@/components/ui/ArrowLink'
import { BadgeGratuit } from '@/components/ui/BadgeGratuit'
import { UpcomingEventBanner } from '@/components/layout/UpcomingEventBanner'
import { HeroCarousel } from '@/components/sections/HeroCarousel'
import { heroSlides } from '@/data/hero'
import type { Locale } from '@/lib/i18n/config'
import { getLocalizedPath } from '@/lib/i18n/config'

type HeroProps = {
  locale: Locale
}

export function HeroDeclaration({ locale }: HeroProps) {
  const isFr = locale === 'fr'

  return (
    <div className="pt-[72px]">
      <UpcomingEventBanner locale={locale} />
      <Section id="hero" bg="white" className="!pt-10 !pb-0 md:!pt-14">
        <Container>
          <Kicker pillar="accompagner" className="rv">
            {isFr
              ? 'P\u00e9rinatalit\u00e9 sociale \u00b7 Cameroun \u00b7 Douala'
              : 'Social perinatality \u00b7 Cameroon \u00b7 Douala'}
          </Kicker>
          <Heading level={1} className="rv max-w-[19ch]">
            {isFr
              ? 'Saisir la grossesse comme une chance : soigner, \u00e9duquer, rendre autonome.'
              : 'Embrace pregnancy as an opportunity: care, educate, empower.'}
          </Heading>
          <p className="rv mt-6 max-w-[56ch] text-[19px] text-gris-600">
            {isFr
              ? "Mother & Life accompagne gratuitement les femmes enceintes vuln\u00e9rables du Cameroun, de la conception aux 1000 premiers jours de l'enfant."
              : 'Mother & Life provides free support to vulnerable pregnant women in Cameroon, from conception through the first 1,000 days.'}
          </p>
          <div className="rv mt-9 flex flex-wrap items-center gap-7">
            <Button href={getLocalizedPath('/don', locale)}>
              {isFr ? 'Faire un don' : 'Donate'}
            </Button>
            <BadgeGratuit label={isFr ? 'Gratuit' : 'Free'} />
            <ArrowLink href="#mission">
              {isFr ? 'D\u00e9couvrir notre mission' : 'Discover our mission'}
            </ArrowLink>
          </div>

          <HeroCarousel locale={locale} slides={heroSlides} />
        </Container>
      </Section>
    </div>
  )
}
