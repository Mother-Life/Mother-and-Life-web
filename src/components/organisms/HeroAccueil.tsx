import pinceauBas from '@/assets/decor/hero-pinceau-bas.svg'
import pinceauHaut from '@/assets/decor/hero-pinceau-haut.svg'
import type { HomeContent } from '@/lib/content/types'
import type { Ui } from '@/lib/i18n/ui'
import { vars } from '@/lib/style'
import { BoutonPinceau } from '../atoms/BoutonPinceau'
import { Illustration } from '../atoms/Illustration'
import { LienFleche } from '../atoms/LienFleche'
import { Photo } from '../atoms/Photo'
import { Surtitre } from '../atoms/Surtitre'
import { TitreSouligne } from '../molecules/TitreSouligne'

type Props = { hero: HomeContent['hero']; ui: Ui; ancreSuite: string }

/**
 * S1 · Hero « Joie ». Une seule figure expressive : la photo dans la
 * feuille-goutte, son contour rose décalé et l'annotation manuscrite.
 * Le titre est le candidat LCP sur mobile, la photo sur bureau : aucun des deux
 * n'attend une animation d'opacité.
 */
export function HeroAccueil({ hero, ui, ancreSuite }: Props) {
  return (
    <section aria-labelledby="hero-titre" className="relative isolate overflow-hidden bg-fond">
      {/* Deux coups de pinceau : Sable derrière la photo, Papier qui fond vers les portes. */}
      <Illustration
        src={pinceauHaut}
        differee={false}
        className="absolute top-0 right-0 -z-10 hidden h-auto w-[33.34rem] lg:block"
      />
      <Illustration
        src={pinceauBas}
        differee={false}
        className="absolute bottom-0 left-0 -z-10 h-auto w-[96%] max-w-none"
      />
      <div className="contenu grid items-center gap-y-12 pt-10 pb-28 lg:min-h-[53.75rem] lg:grid-cols-[minmax(0,32.5rem)_1fr] lg:content-start lg:gap-x-24 lg:pt-16 lg:pb-36">
        <div className="relative z-10 flex flex-col gap-7">
          <div className="flex flex-col gap-4">
            <Surtitre className="entree tracking-[0.08em] lowercase">{hero.surtitre}</Surtitre>
            <TitreSouligne
              id="hero-titre"
              titre={hero.titre}
              mot={hero.motSouligne}
              className="entree-titre text-marque font-extrabold text-texte lg:me-[-3.75rem]"
              classeSoulignement="entree-trace w-[64%]"
            />
            <p className="entree max-w-[32.5rem] text-large text-texte-doux" style={vars({ '--i': 2 })}>
              {hero.sousTitre}
            </p>
          </div>
          <div className="entree flex flex-wrap items-center gap-x-6 gap-y-4" style={vars({ '--i': 3 })}>
            <BoutonPinceau href={hero.boutonPrincipal.href} taille="m" iconeAvant="messages" apparition="chargement">
              {hero.boutonPrincipal.libelle}
            </BoutonPinceau>
            <LienFleche href={hero.lienSecondaire.href}>{hero.lienSecondaire.libelle}</LienFleche>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[33.75rem] lg:ms-[0.1875rem] lg:me-0 lg:justify-self-start">
          <FiguresDecor />
          <div className="relative aspect-[540/640]">
            {/* Contour rose décalé, qui se trace à l'arrivée */}
            <svg
              viewBox="0 0 523 623"
              aria-hidden="true"
              className="absolute top-[3.1%] left-[3.7%] h-[96.9%] w-[96.3%] overflow-visible"
              preserveAspectRatio="none"
            >
              <path
                className="contour-trace"
                pathLength={1}
                fill="none"
                stroke="var(--color-pigment-rose)"
                strokeWidth={3}
                vectorEffect="non-scaling-stroke"
                d="M1.5 368.11C1.5 114.72 200.33-31.98 516.13 8.03c35.09 373.42-105.27 613.47-315.8 613.47C83.37 621.5 1.5 528.15 1.5 368.11Z"
              />
            </svg>
            <div className="entree-feuille masque-feuille absolute inset-0 h-[96.9%] w-[96.3%]">
              <Photo image={hero.image} prioritaire sizes="(min-width: 1024px) 520px, 90vw" />
            </div>
          </div>

          {hero.annotation && (
            <p className="absolute right-0 bottom-[-5.5rem] flex w-44 flex-col items-start font-main text-[1.5rem] leading-none font-bold text-axe-rose sm:right-[-2.5rem] sm:w-[12.5rem] sm:text-[1.875rem] lg:right-[-2.2rem] lg:bottom-[-4.5rem]">
              <svg
                viewBox="0 0 70 60"
                width="70"
                height="60"
                aria-hidden="true"
                className="annotation-fleche ms-2 overflow-visible"
              >
                <path
                  pathLength={1}
                  d="M60 52C48 40 40 26 22 14M34 14H22l4 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />
              </svg>
              <span className="annotation-ecrite -rotate-4">{hero.annotation}</span>
            </p>
          )}
        </div>
      </div>

      <a
        href={`#${ancreSuite}`}
        className="group absolute top-[9.25rem] left-1/2 hidden -translate-x-1/2 flex-col items-center gap-5 text-limon lg:flex"
      >
        <span aria-hidden="true" className="h-[19.9rem] w-[1.5px] bg-current" />
        <span className="text-[1.25rem] font-bold tracking-wide uppercase [writing-mode:vertical-rl] rotate-180">
          {ui.faireDefiler}
        </span>
        <svg
          viewBox="0 0 15 51"
          width="15"
          height="51"
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-y-1.5"
        >
          <path
            fill="currentColor"
            d="M7.36 0h-1v50h2V0zm-.7 50.71a1 1 0 0 0 1.41 0l6.37-6.37a1 1 0 0 0 0-1.41 1 1 0 0 0-1.42 0l-5.66 5.66-5.65-5.66a1 1 0 0 0-1.42 0 1 1 0 0 0 0 1.41z"
          />
        </svg>
      </a>
    </section>
  )
}

/** Cœur-feuille vert au-dessus du trait de défilement (bureau). */
function FiguresDecor() {
  return (
    <svg
      viewBox="0 0 51 48"
      width="51"
      height="48"
      aria-hidden="true"
      className="souffle-une-fois absolute top-[3.5rem] left-[-3.9rem] hidden rotate-[-22deg] lg:block"
    >
      <path
        fill="var(--color-pigment-vert)"
        d="M38.45 42.43c16.62-5.47 13.69-17.95 4.27-21.14-4.3-1.44-10.38.06-14.4 2.27C40.79 3.94 27.26-5.1 17.54 2.91 6.7 11.85 3.28 31.73 0 47.37c18.31-1.17 30.49-2.33 38.45-4.94"
      />
    </svg>
  )
}
