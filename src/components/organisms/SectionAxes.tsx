import type { HomeContent } from '@/lib/content/types'
import { cn } from '@/lib/cn'
import { vars } from '@/lib/style'
import { LienFleche } from '../atoms/LienFleche'
import { Surtitre } from '../atoms/Surtitre'
import { CarteAxe } from '../molecules/CarteAxe'

/** S4 · Trois axes « Compréhension ». L'axe mis en avant se règle dans l'admin. */
export function SectionAxes({ axes }: { axes: HomeContent['axes'] }) {
  return (
    <section aria-labelledby="axes-titre" data-surface="papier" className="relative isolate overflow-hidden section-py">
      <div className="contenu flex flex-col gap-14">
        <div className="grid items-end gap-x-24 gap-y-6 lg:grid-cols-2" data-revele>
          <div className="flex flex-col gap-4">
            <Surtitre>{axes.surtitre}</Surtitre>
            <h2 id="axes-titre" className="text-h1 font-bold text-texte">
              {axes.titre}
            </h2>
          </div>
          <div className="flex flex-col items-start gap-3">
            <p className="text-large text-texte-doux">{axes.texte}</p>
            <LienFleche href={axes.lien.href}>{axes.lien.libelle}</LienFleche>
          </div>
        </div>

        <ul className="mx-auto grid w-full max-w-md justify-center gap-12 sm:max-w-none md:grid-cols-[repeat(3,minmax(0,18.75rem))] md:gap-6 lg:gap-12">
          {axes.cartes.map((carte, i) => (
            <li
              key={carte.axe}
              data-revele={carte.axe === axes.axeMisEnAvant ? 'penche' : ''}
              style={vars({ '--i': i })}
              className={cn(carte.axe !== axes.axeMisEnAvant && 'md:my-4')}
            >
              <CarteAxe carte={carte} enAvant={carte.axe === axes.axeMisEnAvant} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
