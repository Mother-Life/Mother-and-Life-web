import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

type QuoteBlockProps = {
  citation: string
  auteur: string
  fonction: string
  varianteRose?: boolean
}

export function QuoteBlock({ citation, auteur, fonction, varianteRose }: QuoteBlockProps) {
  return (
    <Section bg={varianteRose ? 'rose' : 'white'}>
      <Container>
        <div
          className={`rv mx-auto max-w-[820px] text-center ${varianteRose ? 'rounded-[12px] bg-rose-050 px-8 py-16' : ''}`}
        >
          <span className={`font-display text-[96px] leading-[0.6] ${varianteRose ? 'text-rose-700' : 'text-rose'}`}>
            &ldquo;
          </span>
          <blockquote className="mt-6 font-display text-[clamp(1.3rem,2.6vw,1.7rem)] italic leading-[1.45]">
            {citation}
          </blockquote>
          <p className="mt-7 text-[15px] text-gris-600">
            <b className="block font-semibold text-encre">{auteur}</b>
            {fonction}
          </p>
        </div>
      </Container>
    </Section>
  )
}
