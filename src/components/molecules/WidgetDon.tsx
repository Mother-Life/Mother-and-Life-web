'use client'

import { useId, useState } from 'react'
import main from '@/assets/decor/widget-hand.svg'
import { formaterEquivalentEuro, formaterFcfa } from '@/lib/currency'
import type { Locale } from '@/lib/i18n/config'
import { cn } from '@/lib/cn'
import { BoutonPinceau } from '../atoms/BoutonPinceau'
import { Illustration } from '../atoms/Illustration'

type Props = {
  locale: Locale
  action: string
  campagne?: string
  paliers: { montant: number; libelle?: string }[]
  libelles: {
    bandeauTitre: string
    bandeauTexte: string
    choisir: string
    libre: string
    libreExemple: string
    bouton: string
    moyens: string
    transparence: string
  }
}

const MONTANT_MIN = 500

/**
 * Choix du montant de don. Un vrai formulaire (GET vers la page Don) :
 * il fonctionne sans JavaScript. Avec, l'équivalent en euros suit la saisie.
 * Les euros sont calculés au taux fixe FCFA/EUR, jamais saisis.
 */
export function WidgetDon({ locale, action, campagne, paliers, libelles }: Props) {
  const id = useId()
  const [choix, setChoix] = useState<number | null>(paliers[0]?.montant ?? null)
  const [libre, setLibre] = useState('')
  const montantLibre = Number(libre.replace(/\D/g, ''))

  return (
    <div className="relative mt-14 rounded-porte border border-white/15 bg-nuit px-6 pt-20 pb-8 sm:px-8">
      <div className="absolute inset-x-6 -top-14 flex items-center justify-between gap-4 rounded-bandeau bg-axe-vert py-4 ps-4 pe-4 text-craie shadow-[0_10px_15px_-3px_rgb(0_0_0/0.1),0_4px_6px_-4px_rgb(0_0_0/0.1)] sm:inset-x-8">
        <div>
          <p className="text-h6 font-semibold">{libelles.bandeauTitre}</p>
          <p className="text-[0.875rem] leading-4 text-craie/90">{libelles.bandeauTexte}</p>
        </div>
        <Illustration src={main} className="h-[4.4rem] w-auto shrink-0 max-sm:hidden" />
      </div>

      <form action={action} method="get" className="flex flex-col gap-5">
        {campagne && <input type="hidden" name="campagne" value={campagne} />}
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-legende font-bold tracking-[0.04em] text-argile uppercase">
            {libelles.choisir}
          </legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {paliers.map((palier) => {
              const actif = choix === palier.montant && !montantLibre
              return (
                <label
                  key={palier.montant}
                  className={cn(
                    'flex cursor-pointer items-center justify-between gap-1.5 rounded-panneau px-4 py-3 text-center transition-colors sm:flex-col sm:justify-center sm:px-2 sm:pt-3 sm:pb-4 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-vert-clair',
                    actif
                      ? 'border-2 border-pigment-rose bg-pigment-rose/20'
                      : 'border border-white/20 bg-white/5 hover:border-white/40',
                  )}
                >
                  <input
                    type="radio"
                    name="montant"
                    value={palier.montant}
                    checked={actif}
                    onChange={() => {
                      setChoix(palier.montant)
                      setLibre('')
                    }}
                    className="lecteur-seul"
                  />
                  <span className="text-[0.875rem] leading-5 font-bold text-craie">
                    {formaterFcfa(palier.montant, locale)}
                  </span>
                  <span className="text-legende text-argile">
                    {formaterEquivalentEuro(palier.montant, locale)}
                    {palier.libelle && ` · ${palier.libelle}`}
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-libre`} className="text-legende font-bold tracking-[0.04em] text-argile uppercase">
            {libelles.libre}
          </label>
          <div className="relative">
            <input
              id={`${id}-libre`}
              name="montant_libre"
              inputMode="numeric"
              autoComplete="off"
              pattern="[0-9 ]*"
              placeholder={libelles.libreExemple}
              value={libre}
              onChange={(e) => setLibre(e.target.value.replace(/[^\d ]/g, '').slice(0, 9))}
              aria-describedby={`${id}-euro`}
              className="h-[2.625rem] w-full rounded-panneau border border-white/20 bg-white/10 ps-4 pe-16 text-[0.875rem] text-craie placeholder:text-argile/80 focus-visible:border-vert-clair focus-visible:outline-none"
            />
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-legende font-bold text-argile">
              FCFA
            </span>
          </div>
          <p id={`${id}-euro`} aria-live="polite" className="min-h-5 text-legende text-argile">
            {montantLibre >= MONTANT_MIN ? formaterEquivalentEuro(montantLibre, locale) : ''}
          </p>
        </div>

        <BoutonPinceau type="submit" variante="rose" taille="l" iconeApres="fleche-droite" className="w-full">
          {libelles.bouton}
        </BoutonPinceau>

        <div className="flex flex-col items-center gap-1.5 pt-1 text-center">
          <p className="max-w-[22rem] text-[0.875rem] leading-[1.18] text-papier">{libelles.moyens}</p>
          <p className="font-main text-petit leading-5 text-pigment-bleu">{libelles.transparence}</p>
        </div>
      </form>
    </div>
  )
}
