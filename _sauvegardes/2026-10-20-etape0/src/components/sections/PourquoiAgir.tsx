import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { statistiquesExternes } from '@/data/defaults'
import type { Locale } from '@/lib/i18n/config'

export function PourquoiAgir({ locale }: { locale: Locale }) {
  const isFr = locale === 'fr'
  return (
    <Section bg="white">
      <Container narrow>
        <Heading level={1} className="rv mb-6">
          {isFr ? 'Pourquoi agir au Cameroun ?' : 'Why act in Cameroon?'}
        </Heading>
        <p className="rv mb-10 text-gris-600">
          {isFr
            ? "Le problème n'est pas que les femmes ne connaissent pas l'information, c'est que l'information ne va pas jusqu'à elles."
            : "The problem isn't that women don't know the information — it's that the information doesn't reach them."}
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {statistiquesExternes.map((stat) => (
            <div key={stat.enonce} className="rv rounded-[12px] border border-hairline p-6">
              <div className="font-display text-[clamp(2rem,4vw,3rem)] text-bleu-700">{stat.valeur}</div>
              <p className="mt-2 font-medium">{stat.enonce}</p>
              <p className="mt-2 text-[13px] text-gris-600">
                Source : {stat.source}
                {stat.annee ? ` · ${stat.annee}` : ''}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
