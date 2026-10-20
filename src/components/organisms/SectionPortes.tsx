import mains from '@/assets/decor/doors-hands.svg'
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
      className="relative isolate overflow-hidden pt-2 pb-[clamp(4rem,7vw,6.5rem)]"
    >
      <h2 id={`${id}-titre`} className="lecteur-seul">
        {portes.titre}
      </h2>
      <Illustration
        src={mains}
        className="absolute top-1/2 left-[-7rem] -z-10 hidden h-[21.5rem] w-auto -translate-y-1/2 lg:block"
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
