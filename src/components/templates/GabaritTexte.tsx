import type { ReactNode } from 'react'
import { Surtitre } from '../atoms/Surtitre'

/**
 * Page de texte simple (mentions légales, confidentialité, erreurs).
 * Provisoire : le « Bandeau de page » de la maquette (composant Figma 190:684)
 * remplacera cet en-tête lors de l'intégration des pages intérieures.
 */
export function GabaritTexte({ surtitre, titre, children }: { surtitre?: string; titre: string; children: ReactNode }) {
  return (
    <section className="bg-fond section-py">
      <div className="contenu flex max-w-[48rem] flex-col gap-6">
        {surtitre && <Surtitre>{surtitre}</Surtitre>}
        <h1 className="text-h1 font-bold text-texte">{titre}</h1>
        <div className="flex flex-col gap-4 text-large text-texte-doux [&_a]:text-axe-bleu [&_a]:underline [&_strong]:text-texte">
          {children}
        </div>
      </div>
    </section>
  )
}
