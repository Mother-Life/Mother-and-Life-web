'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/Button'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const params = useParams<{ lang?: string }>()
  const isFr = params?.lang !== 'en'

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Section bg="white">
      <Container narrow>
        <Heading level={1} className="mb-4">
          {isFr ? 'Une erreur est survenue' : 'Something went wrong'}
        </Heading>
        <p className="mb-8 text-gris-600">
          {isFr
            ? "La page n'a pas pu s'afficher. Vous pouvez r\u00e9essayer, ou nous \u00e9crire si le probl\u00e8me persiste."
            : 'This page could not be displayed. You can try again, or contact us if the problem persists.'}
        </p>
        <div className="flex flex-wrap gap-4">
          <Button onClick={reset}>{isFr ? 'R\u00e9essayer' : 'Try again'}</Button>
          <Button variant="outline" href={isFr ? '/contact' : '/en/contact'}>
            {isFr ? 'Nous contacter' : 'Contact us'}
          </Button>
        </div>
        {error.digest && (
          <p className="mt-8 text-[13px] text-gris-600">
            {isFr ? 'R\u00e9f\u00e9rence' : 'Reference'} : {error.digest}
          </p>
        )}
      </Container>
    </Section>
  )
}
