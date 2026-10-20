'use client'

import { useActionState, useId } from 'react'
import { inscrireLettre, type EtatInscription } from '@/lib/actions/newsletter'
import type { Locale } from '@/lib/i18n/config'
import { BoutonPinceau } from '../atoms/BoutonPinceau'

type Libelles = { titre: string; champ: string; bouton: string; merci: string; erreur: string }

/**
 * Inscription à la lettre. Fonctionne sans JavaScript (action serveur) ; avec,
 * le résultat s'affiche sans recharger la page et est annoncé aux lecteurs d'écran.
 */
export function FormulaireLettre({ locale, libelles }: { locale: Locale; libelles: Libelles }) {
  const [etat, action, envoi] = useActionState<EtatInscription, FormData>(inscrireLettre, { statut: 'repos' })
  const id = useId()

  return (
    <form action={action} className="flex flex-col gap-3" aria-describedby={`${id}-statut`}>
      <h2 className="text-h4 font-semibold">{libelles.titre}</h2>
      <input type="hidden" name="langue" value={locale} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Site web
          <input type="text" name="site" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex w-full max-w-[27.4rem]">
        <label htmlFor={`${id}-email`} className="lecteur-seul">
          {libelles.champ}
        </label>
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          required
          maxLength={254}
          autoComplete="email"
          inputMode="email"
          placeholder={libelles.champ}
          className="min-w-0 flex-1 rounded-s-panneau border-[1.5px] border-encre bg-transparent px-4 py-3.5 text-normal text-texte placeholder:text-texte-doux focus-visible:border-vert-clair focus-visible:outline-none"
        />
        <BoutonPinceau
          type="submit"
          variante="action"
          aria-busy={envoi}
          disabled={envoi}
          className="rounded-e-panneau rounded-s-none bg-axe-rose px-6"
        >
          {libelles.bouton}
        </BoutonPinceau>
      </div>
      <p id={`${id}-statut`} role="status" className="min-h-6 text-petit">
        {etat.statut === 'ok' && <span className="text-vert-clair">{libelles.merci}</span>}
        {etat.statut === 'erreur' && <span className="text-pigment-rose">{libelles.erreur}</span>}
      </p>
    </form>
  )
}
