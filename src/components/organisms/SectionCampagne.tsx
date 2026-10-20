import mainsDroite from '@/assets/decor/campagne-mains-droite.svg'
import mainsGauche from '@/assets/decor/campagne-mains-gauche.svg'
import { formaterEquivalentEuro, formaterFcfa, formaterNombre } from '@/lib/currency'
import type { HomeContent } from '@/lib/content/types'
import type { Locale } from '@/lib/i18n/config'
import type { Ui } from '@/lib/i18n/ui'
import { vars } from '@/lib/style'
import { Dechirure } from '../atoms/Dechirure'
import { Illustration } from '../atoms/Illustration'
import { Surtitre } from '../atoms/Surtitre'
import { JaugeFeuilles } from '../molecules/JaugeFeuilles'
import { WidgetDon } from '../molecules/WidgetDon'

/**
 * S7 · Campagne en cours « Action ». Surface Nuit, bords déchirés, la jauge
 * de feuilles mise à jour par le rôle Finance, et le choix du montant.
 */
export function SectionCampagne({ bloc, locale, ui }: { bloc: HomeContent['campagne']; locale: Locale; ui: Ui }) {
  const c = bloc.campagne
  if (!c) return null
  const objectifFcfa = c.coutUnitaire * c.objectifUnites
  const titreAvecMot = decouper(c.titre, c.motColore)
  const slug = c.lien.href.split('/').pop()

  return (
    <section
      aria-labelledby="campagne-titre"
      data-surface="nuit"
      className="relative isolate overflow-hidden pt-[clamp(6rem,16vw,14.375rem)] pb-[clamp(7rem,16vw,14.375rem)]"
    >
      <Illustration src={mainsGauche} encre="gauche" className="absolute top-0 left-0 -z-10 hidden h-auto w-[15.3125rem] lg:block" />
      <Illustration src={mainsDroite} encre="droite" className="absolute top-0 right-0 -z-10 hidden h-auto w-[17.09rem] lg:block" />
      <Dechirure bord="haut" className="text-craie" />
      <Dechirure bord="bas" className="text-craie" />

      <div className="contenu grid items-start gap-x-24 gap-y-20 lg:grid-cols-[minmax(0,34.5rem)_minmax(0,34.5rem)] lg:justify-between">
        <div className="flex flex-col gap-6" data-revele>
          <Surtitre>{c.surtitre}</Surtitre>
          <h2 id="campagne-titre" className="text-display font-semibold">
            {titreAvecMot.avant}
            {titreAvecMot.mot && <span className="text-bleu-clair">{titreAvecMot.mot}</span>}
            {titreAvecMot.apres}
          </h2>
          <p className="text-large text-texte-doux">{c.resume}</p>
          <p className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <span className="text-petit">
              {formaterFcfa(c.coutUnitaire, locale)}{' '}
              <span className="text-argile">({formaterEquivalentEuro(c.coutUnitaire, locale)})</span>
            </span>
            <span className="text-normal font-semibold text-vert-clair">
              = {locale === 'fr' ? `${majuscule(c.unite.singulier)} complet` : `One full ${c.unite.singulier}`}
            </span>
          </p>

          <div className="mt-2 flex flex-col gap-3">
            <p className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <span className="text-normal font-semibold">
                {ui.objectif(`${formaterNombre(c.objectifUnites, locale)} ${c.unite.pluriel}`)}
              </span>
              <span className="text-normal text-texte-doux">
                {formaterFcfa(objectifFcfa, locale)} ({formaterEquivalentEuro(objectifFcfa, locale)})
              </span>
            </p>
            <JaugeFeuilles
              financees={c.unitesFinancees}
              objectif={c.objectifUnites}
              libelle={ui.jaugeLibelle(c.unitesFinancees, c.objectifUnites, c.unite.pluriel)}
            />
            <p className="text-petit text-texte-doux">{ui.jaugeNote}</p>
          </div>
        </div>

        <div data-revele style={vars({ '--i': 1 })}>
          <WidgetDon
            locale={locale}
            action={bloc.don.action}
            campagne={slug}
            paliers={c.paliers}
            libelles={{
              bandeauTitre: bloc.don.bandeauTitre,
              bandeauTexte: bloc.don.bandeauTexte,
              choisir: ui.choisirMontant,
              libre: ui.montantLibre,
              libreExemple: ui.montantLibreExemple,
              bouton: bloc.don.libelleBouton,
              moyens: bloc.don.moyens,
              transparence: bloc.don.transparence,
            }}
          />
        </div>
      </div>
    </section>
  )
}

function decouper(titre: string, mot?: string) {
  const i = mot ? titre.indexOf(mot) : -1
  if (!mot || i < 0) return { avant: titre, mot: '', apres: '' }
  return { avant: titre.slice(0, i), mot, apres: titre.slice(i + mot.length) }
}

function majuscule(mot: string) {
  return mot.charAt(0).toLocaleUpperCase('fr') + mot.slice(1)
}
