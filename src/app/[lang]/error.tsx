'use client'

import { useEffect } from 'react'
import { BoutonPinceau } from '@/components/atoms/BoutonPinceau'
import { GabaritTexte } from '@/components/templates/GabaritTexte'

/** Erreur inattendue : message sobre, possibilité de réessayer, rien de technique affiché. */
export default function Erreur({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <GabaritTexte surtitre="Oups" titre="Un souci est survenu">
      <p>La page n’a pas pu s’afficher. Réessayez dans un instant. / Something went wrong, please try again.</p>
      <p>
        <BoutonPinceau onClick={reset}>Réessayer</BoutonPinceau>
      </p>
    </GabaritTexte>
  )
}
