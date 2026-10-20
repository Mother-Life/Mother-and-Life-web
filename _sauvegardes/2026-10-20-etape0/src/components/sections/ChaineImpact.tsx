import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { chaineImpactEtapes } from '@/data/defaults'
import type { Locale } from '@/lib/i18n/config'

export function ChaineImpact({ locale }: { locale: Locale }) {
  const isFr = locale === 'fr'
  return (
    <Section bg="gray">
      <Container>
        <Heading level={2} className="rv mb-10 text-center">
          {isFr ? "Notre chaîne d'impact" : 'Our impact chain'}
        </Heading>
        <ol className="rv grid gap-6 md:grid-cols-5">
          {chaineImpactEtapes.map((etape, i) => (
            <li key={etape.titre} className="relative rounded-[12px] border border-hairline bg-white p-5">
              <span className="mb-2 block font-display text-[2rem] text-rose-700">{i + 1}</span>
              <h3 className="mb-2 font-semibold">{etape.titre}</h3>
              <p className="text-[15px] text-gris-600">{etape.texte}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
