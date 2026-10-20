import mains from '@/assets/decor/portes-mains.svg'
import type { HomeContent } from '@/lib/content/types'
import { vars } from '@/lib/style'
import { Illustration } from '../atoms/Illustration'
import { CartePorte } from '../molecules/CartePorte'

/** S2 · Trois portes « Orientation » : chaque public trouve son entrée en un geste. */
export function SectionPortes({ portes, id }: { portes: HomeContent['portes']; id: string }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titre`}
      data-surface="papier"
      className="relative isolate overflow-hidden bg-fond pt-12 pb-20 lg:pt-[6.6875rem] lg:pb-[12.6875rem]"
    >
      <h2 id={`${id}-titre`} className="lecteur-seul">
        {portes.titre}
      </h2>
      <Illustration
        src={mains}
        encre="gauche"
        className="absolute top-[10.375rem] left-0 -z-10 hidden h-auto w-[14.625rem] lg:block"
      />
      <ul className="contenu grid max-w-md justify-center gap-6 sm:max-w-none sm:grid-cols-[repeat(auto-fit,minmax(0,18.75rem))]">
        {portes.items.map((porte, i) => (
          <li key={porte.titre} data-revele style={vars({ '--i': i })} className="flex">
            <CartePorte porte={porte} principale={porte.icone === 'accompagnee'} />
          </li>
        ))}
      </ul>
    </section>
  )
}
