import Link from 'next/link'
import bulle from '@/assets/decor/footer-bubble.svg'
import pinceau from '@/assets/decor/footer-pinceau.svg'
import dechirure from '@/assets/decor/footer-tear.svg'
import type { SiteContent } from '@/lib/content/types'
import type { Locale } from '@/lib/i18n/config'
import type { Ui } from '@/lib/i18n/ui'
import { Illustration } from '../atoms/Illustration'
import { Logo } from '../atoms/Logo'
import { FormulaireLettre } from '../molecules/FormulaireLettre'
import { ReseauxSociaux } from '../molecules/ReseauxSociaux'
import { SelecteurLangue } from '../molecules/SelecteurLangue'

type Props = { site: SiteContent; locale: Locale; ui: Ui; accueil: string }

/** Pied de page « Espoir » : surface Nuit, lettre d'information, liens et transparence. */
export function PiedDePage({ site, locale, ui, accueil }: Props) {
  const annee = new Date().getFullYear()

  return (
    <footer
      data-surface="nuit"
      className="relative isolate overflow-hidden pt-[clamp(6rem,10vw,9.4rem)] pb-28 sm:pb-10"
    >
      <Illustration src={dechirure} className="absolute inset-x-0 top-0 -z-10 h-auto w-full" />
      <Illustration
        src={pinceau}
        className="absolute bottom-0 left-0 -z-10 hidden h-auto w-[15.875rem] opacity-60 lg:block"
      />

      <div className="contenu flex flex-col gap-14">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-start">
          <div className="flex flex-col gap-3">
            <Logo href={accueil} surface="nuit" libelle={ui.accueil} className="h-[5.8rem]" />
            <p className="text-normal text-texte-doux">{site.baseline}</p>
            <ReseauxSociaux reseaux={site.reseaux} ui={ui} pastilles className="mt-1" />
          </div>
          <div className="flex items-center gap-6">
            <Illustration src={bulle} className="hidden h-[6.6rem] w-auto sm:block" />
            <FormulaireLettre
              locale={locale}
              libelles={{
                titre: ui.newsletterTitre,
                champ: ui.newsletterChamp,
                bouton: ui.newsletterBouton,
                merci: ui.newsletterMerci,
                erreur: ui.newsletterErreur,
              }}
            />
          </div>
        </div>

        <div className="grid gap-10 border-t border-filet pt-10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_22rem] lg:gap-12">
          {site.piedDePage.map((colonne) => (
            <nav key={colonne.titre} aria-label={colonne.titre}>
              <TitreColonne>{colonne.titre}</TitreColonne>
              <ul className="mt-3 flex flex-col gap-3">
                {colonne.liens.map((lien) => (
                  <li key={lien.href}>
                    <Link
                      href={lien.href}
                      className="text-normal underline-offset-4 hover:text-vert-clair hover:underline"
                    >
                      {lien.libelle}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <TitreColonne>{ui.contact}</TitreColonne>
            <address className="mt-3 flex flex-col text-normal leading-10 not-italic">
              {site.telephones.map((tel) => (
                <a key={tel} href={`tel:${tel.replace(/\s/g, '')}`} className="hover:text-vert-clair">
                  {tel}
                </a>
              ))}
              <a href={`mailto:${site.email}`} className="hover:text-vert-clair">
                {site.email}
              </a>
              <span>{site.adresse}</span>
            </address>
          </div>
        </div>

        <p className="text-[0.9375rem] leading-normal opacity-80">{site.ligneTransparence}</p>

        <div className="flex flex-col justify-between gap-3 border-t border-filet pt-6 text-legende text-texte-doux sm:flex-row">
          <p>{ui.droits(annee, site.denomination, site.numeroEnregistrement)}</p>
          <div className="flex flex-wrap items-center gap-x-1">
            <ul className="flex flex-wrap gap-x-1">
              {site.legal.map((lien, i) => (
                <li key={lien.href}>
                  {i > 0 && <span aria-hidden="true">· </span>}
                  <Link href={lien.href} className="hover:text-craie hover:underline">
                    {lien.libelle}
                  </Link>
                </li>
              ))}
            </ul>
            <span aria-hidden="true">·</span>
            <SelecteurLangue locale={locale} libelle={ui.langue} />
          </div>
        </div>
      </div>
    </footer>
  )
}

function TitreColonne({ children }: { children: string }) {
  return (
    <h2 className="flex flex-col gap-3 text-h6 font-semibold text-pigment-vert">
      {children}
      <span aria-hidden="true" className="block h-0.5 w-[6.25rem] bg-axe-vert" />
    </h2>
  )
}
