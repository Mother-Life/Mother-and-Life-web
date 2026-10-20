import type { ElementType, ReactNode } from 'react'
import { Soulignement } from '../atoms/Soulignement'

/**
 * Titre dont un mot (choisi dans l'admin) reçoit le soulignement peint.
 * Si le mot n'apparaît pas tel quel dans le titre, le titre reste simple :
 * la validation de l'admin empêche ce cas, ceci n'est qu'un filet.
 */
export function TitreSouligne({
  titre,
  mot,
  id,
  as: Balise = 'h1',
  className,
  classeSoulignement,
  avant,
}: {
  titre: string
  mot?: string
  id?: string
  as?: ElementType
  className?: string
  classeSoulignement?: string
  avant?: ReactNode
}) {
  const index = mot ? titre.indexOf(mot) : -1
  if (!mot || index < 0) {
    return (
      <Balise id={id} className={className}>
        {avant}
        {titre}
      </Balise>
    )
  }
  return (
    <Balise id={id} className={className}>
      {avant}
      {titre.slice(0, index)}
      <span className="relative inline-block whitespace-nowrap">
        {mot}
        <Soulignement className={classeSoulignement} />
      </span>
      {titre.slice(index + mot.length)}
    </Balise>
  )
}
