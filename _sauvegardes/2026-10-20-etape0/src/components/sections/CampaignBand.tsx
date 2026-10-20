import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Kicker } from '@/components/ui/Kicker'
import { Button } from '@/components/ui/Button'
import { LeafIcon } from '@/components/ui/LeafIcon'
import type { Locale } from '@/lib/i18n/config'
import { getLocalizedPath } from '@/lib/i18n/config'

export function CampaignBand({ locale }: { locale: Locale }) {
  const isFr = locale === 'fr'
  return (
    <Section id="campagne" bg="night" className="relative overflow-hidden">
      <LeafIcon
        pillar="accompagner"
        size={620}
        className="pointer-events-none absolute -right-[8%] -top-[20%] opacity-[0.05]"
      />
      <Container>
        <Kicker className="!text-rose">{isFr ? 'Notre défi' : 'Our challenge'}</Kicker>
        <h2 className="rv max-w-[16ch] font-display text-[clamp(2.2rem,6vw,4.4rem)] leading-[1.1]">
          {isFr ? 'Objectif : 100 femmes suivies par an.' : 'Goal: 100 women supported per year.'}
        </h2>
        <p className="rv mt-6 max-w-[58ch] text-[18px] text-white/80">
          {isFr ? (
            <>
              Aujourd&apos;hui, seules 25 femmes sur plus de 100 identifiées peuvent tre accompagnées, faute de moyens.{' '}
              <strong className="text-white">100 000 FCFA (~160 $) suffisent pour une grossesse entièrement suivie</strong>{' '}
              — consultations, échographies, accouchement, suivi postnatal. 71 % de chaque don va directement aux programmes.
            </>
          ) : (
            <>
              Today, only 25 out of more than 100 identified women can be supported due to limited resources.{' '}
              <strong className="text-white">100,000 FCFA (~$160) covers a full pregnancy</strong>{' '}
              — consultations, ultrasounds, delivery, postnatal care. 71% of every donation goes directly to programs.
            </>
          )}
        </p>
        <div className="rv mt-8 flex flex-wrap gap-4">
          <Button variant="white" href={getLocalizedPath('/don', locale)}>
            {isFr ? 'Je donne maintenant' : 'Donate now'}
          </Button>
          <Button variant="ghost" href={getLocalizedPath('/s-impliquer#partenaire', locale)}>
            {isFr ? 'Devenir partenaire' : 'Become a partner'}
          </Button>
        </div>
      </Container>
    </Section>
  )
}
