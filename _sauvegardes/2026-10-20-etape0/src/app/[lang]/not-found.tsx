import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <Section bg="white">
      <Container narrow>
        <p className="mb-2 text-[13px] font-semibold uppercase tracking-wider text-rose-700">Erreur 404</p>
        <Heading level={1} className="mb-4">
          {'Cette page n\u2019existe pas'}
        </Heading>
        <p className="mb-8 text-gris-600">
          {'Le lien est peut-\u00eatre p\u00e9rim\u00e9 ou mal recopi\u00e9. Reprenons depuis l\u2019accueil.'}
        </p>
        <div className="flex flex-wrap gap-4">
          <Button href="/">{'Retour \u00e0 l\u2019accueil'}</Button>
          <Button variant="outline" href="/contact">
            Nous contacter
          </Button>
        </div>
      </Container>
    </Section>
  )
}
