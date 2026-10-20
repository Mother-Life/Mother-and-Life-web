import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { StatCounter } from '@/components/ui/StatCounter'
import { homeStats } from '@/data/defaults'
import type { PillarSlug } from '@/styles/tokens'

const statColors: Record<PillarSlug, string> = {
  prevenir: 'text-bleu-700',
  accompagner: 'text-rose-700',
  autonomie: 'text-vert-700',
}

export function StatsBand() {
  return (
    <Section bg="white" className="border-y border-hairline !py-14">
      <Container>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {homeStats.map((stat) => {
            const numeric = parseInt(stat.valeur.replace(/\s/g, ''), 10)
            const suffix = stat.valeur.includes('+') ? '+' : ''
            return (
              <div key={stat.cle} className="rv text-center md:text-left">
                <div
                  className={`font-display text-[clamp(2.6rem,5vw,4rem)] leading-none tabular-nums ${statColors[stat.pilier]}`}
                >
                  {Number.isFinite(numeric) ? (
                    <StatCounter value={numeric} suffix={suffix} />
                  ) : (
                    stat.valeur
                  )}
                </div>
                <p className="mt-2 text-[15px] text-gris-600">{stat.libelle}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
