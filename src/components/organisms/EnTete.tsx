import type { SiteContent } from '@/lib/content/types'
import type { Locale } from '@/lib/i18n/config'
import type { Ui } from '@/lib/i18n/ui'
import { BoutonPinceau } from '../atoms/BoutonPinceau'
import { Icone } from '../atoms/Icone'
import { Logo } from '../atoms/Logo'
import { MenuMobile } from '../molecules/MenuMobile'
import { NavigationPrincipale } from '../molecules/NavigationPrincipale'
import { ReseauxSociaux } from '../molecules/ReseauxSociaux'
import { SelecteurLangue } from '../molecules/SelecteurLangue'

type Props = { site: SiteContent; locale: Locale; ui: Ui; accueil: string }

/**
 * Barre utilitaire (contact, langue, réseaux) puis en-tête collant.
 * Deux éléments frères : seul le second reste visible au défilement.
 */
export function EnTete({ site, locale, ui, accueil }: Props) {
  return (
    <>
      <div data-surface="nuit" className="hidden text-petit md:block">
        <div className="contenu flex items-center justify-between gap-6 py-2.5">
          <ul className="flex items-center gap-6 font-semibold">
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 hover:underline">
                <Icone nom="email" className="size-4 text-vert-clair" />
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Icone nom="lieu" className="h-4 w-3 text-vert-clair" />
              {site.siegeCourt}
            </li>
          </ul>
          <div className="flex items-center gap-6">
            <SelecteurLangue locale={locale} libelle={ui.langue} />
            <div className="flex items-center gap-3.5">
              <span className="font-semibold">{ui.suivezNous}</span>
              <span aria-hidden="true" className="h-3 w-px bg-craie/40" />
              <ReseauxSociaux reseaux={site.reseaux} ui={ui} />
            </div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-filet bg-craie/85 backdrop-blur-md backdrop-saturate-150">
        <div className="contenu flex h-[var(--ml-entete)] items-center justify-between gap-4">
          <Logo href={accueil} libelle={ui.accueil} className="h-12 sm:h-[4.25rem]" />

          <div className="hidden xl:block">
            <NavigationPrincipale items={site.navigation} libelle={ui.navigationPrincipale} />
          </div>

          <div className="flex items-center gap-3">
            <BoutonPinceau href={site.boutons.accompagnee.href} className="hidden xl:inline-flex">
              {site.boutons.accompagnee.libelle}
            </BoutonPinceau>
            <BoutonPinceau href={site.boutons.don.href} variante="contour" className="hidden sm:inline-flex">
              {site.boutons.don.libelle}
            </BoutonPinceau>
            <div className="xl:hidden">
              <MenuMobile
                items={site.navigation}
                libelleOuvrir={ui.ouvrirMenu}
                libelleFermer={ui.fermerMenu}
                libelleNavigation={ui.navigationPrincipale}
                pied={
                  <div className="flex flex-col items-start gap-6">
                    <div className="flex flex-wrap gap-3">
                      <BoutonPinceau href={site.boutons.accompagnee.href} iconeAvant="messages">
                        {site.boutons.accompagnee.libelle}
                      </BoutonPinceau>
                      <BoutonPinceau href={site.boutons.don.href} variante="contour">
                        {site.boutons.don.libelle}
                      </BoutonPinceau>
                    </div>
                    <SelecteurLangue locale={locale} libelle={ui.langue} className="text-normal" />
                    <a
                      href={`mailto:${site.email}`}
                      className="text-petit text-texte-doux underline-offset-4 hover:underline"
                    >
                      {site.email}
                    </a>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
