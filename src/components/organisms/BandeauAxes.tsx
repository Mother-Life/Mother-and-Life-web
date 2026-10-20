'use client'

import { useState } from 'react'
import type { HomeContent } from '@/lib/content/types'
import { cn } from '@/lib/cn'
import { Feuille } from '../atoms/Feuille'
import { Icone } from '../atoms/Icone'

type Props = {
  bandeau: HomeContent['bandeau']
  libelles: { pause: string; reprise: string; titre: string }
}

/** Rythme de la maquette : contour rose, contour ardoise, puis aplat ardoise. */
const styles = ['contour-rose', 'contour-ardoise', 'contour-rose', 'plein', 'contour-rose', 'plein'] as const

/**
 * Bandeau défilant des trois axes, légèrement incliné (−2°).
 * Mouvement de plus de 5 s : un bouton permet de l'arrêter (WCAG 2.2.2).
 * Il s'arrête aussi au survol, et reste immobile en mouvement réduit.
 * Décoratif pour les lecteurs d'écran, qui reçoivent la liste des axes une fois.
 */
export function BandeauAxes({ bandeau, libelles }: Props) {
  const [pause, setPause] = useState(false)
  const sequence = Array.from({ length: 6 }, (_, i) => ({
    ...bandeau.mots[i % bandeau.mots.length]!,
    style: styles[i],
  }))

  return (
    <section data-surface="papier" data-pause={pause} className="relative overflow-hidden py-14 lg:h-[12.5rem]">
      <h2 className="lecteur-seul">{libelles.titre}</h2>
      <p className="lecteur-seul">{bandeau.mots.map((m) => m.libelle).join(', ')}</p>

      <div aria-hidden="true" className="-mx-10 -rotate-2">
        <div className="defilement">
          {[0, 1].map((copie) => (
            <ul key={copie} className="flex shrink-0 items-center gap-6 pe-6">
              {sequence.map((mot, i) => (
                <li key={`${copie}-${i}`} className="flex items-center gap-6">
                  <span
                    className={cn(
                      'text-defilement font-extrabold whitespace-nowrap',
                      mot.style === 'plein' && 'text-ardoise',
                      mot.style === 'contour-rose' && 'contour-texte [--contour:var(--color-axe-rose)]',
                      mot.style === 'contour-ardoise' && 'contour-texte [--contour:var(--color-ardoise)]',
                    )}
                  >
                    {mot.libelle}
                  </span>
                  <Feuille taille={22} className="shrink-0 text-axe-rose" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPause(!pause)}
        className="absolute right-[max(1rem,var(--ml-gouttiere))] bottom-3 grid size-10 place-items-center rounded-full bg-craie/90 text-encre shadow-flottant transition-opacity motion-reduce:hidden"
      >
        <Icone nom={pause ? 'lecture' : 'pause'} taille={18} />
        <span className="lecteur-seul">{pause ? libelles.reprise : libelles.pause}</span>
      </button>
    </section>
  )
}
