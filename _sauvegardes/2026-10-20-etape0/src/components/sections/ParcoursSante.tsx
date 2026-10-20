import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { BadgeGratuit } from '@/components/ui/BadgeGratuit'
import { parcoursSanteMoments } from '@/data/defaults'
import type { Locale } from '@/lib/i18n/config'

export function ParcoursSante({ locale }: { locale: Locale }) {
  const isFr = locale === 'fr'
  return (
    <Section id="parcours" bg="white">
      <Container>
        <Heading level={2} className="rv mb-4">
          {isFr ? "Le parcours d'accompagnement" : 'The care pathway'}
        </Heading>
        <p className="rv mb-10 max-w-[65ch] text-gris-600">
          {isFr
            ? 'Les 1000 premiers jours : de la naissance jusqu\'aux 2 ans de l\'enfant.'
            : 'The first 1,000 days: from birth until the child is 2 years old.'}
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {parcoursSanteMoments.map((moment, i) => (
            <div key={moment.titre} className="rv rounded-[12px] border border-hairline bg-gris-100 p-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-display text-[2rem] text-rose-700">{i + 1}</span>
                <BadgeGratuit />
              </div>
              <h3 className="mb-2 font-semibold">{moment.titre}</h3>
              <p className="text-[15px] text-gris-600">{moment.prestations}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
