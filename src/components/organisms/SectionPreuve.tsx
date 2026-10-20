import motifMains from '@/assets/decor/motif-mains.svg'
import pinceau from '@/assets/decor/preuve-pinceau.svg'
import type { Axe, HomeContent } from '@/lib/content/types'
import type { Locale } from '@/lib/i18n/config'
import type { Ui } from '@/lib/i18n/ui'
import { cn } from '@/lib/cn'
import { vars } from '@/lib/style'
import { Illustration } from '../atoms/Illustration'
import { LienFleche } from '../atoms/LienFleche'
import { Photo } from '../atoms/Photo'
import { Surtitre } from '../atoms/Surtitre'
import { CompteurChiffre } from '../molecules/CompteurChiffre'

const couleurChiffre: Record<Axe, string> = {
  accompagner: 'text-axe-rose',
  prevenir: 'text-axe-bleu',
  autonomie: 'text-axe-vert',
}

/**
 * S3 · Preuve « Confiance » : le collage de photos réelles, le badge
 * « association de soignants » et les quatre chiffres clés sourcés.
 */
export function SectionPreuve({ preuve, ui, locale }: { preuve: HomeContent['preuve']; ui: Ui; locale: Locale }) {
  return (
    <section aria-labelledby="preuve-titre" className="relative isolate overflow-hidden bg-fond section-py">
      <Illustration
        src={motifMains}
        derive
        className="absolute top-0 left-0 -z-10 hidden h-auto w-[46.5625rem] opacity-[0.06] lg:block"
      />
      <Illustration src={pinceau} encre="droite" className="absolute top-0 right-0 -z-10 hidden h-auto w-[24.34rem] lg:block" />
      <div className="contenu flex flex-col gap-20">
        <div className="grid items-center gap-x-24 gap-y-14 lg:grid-cols-[minmax(0,35rem)_1fr]">
          <Collage preuve={preuve} />
          <div className="flex flex-col items-start gap-6" data-revele>
            <Surtitre ton="bleu">{preuve.surtitre}</Surtitre>
            <h2 id="preuve-titre" className="text-h1 font-bold text-texte">
              {preuve.titre}
            </h2>
            <p className="text-large text-texte-doux">{preuve.texte}</p>
            <LienFleche href={preuve.lien.href} ton="bleu">
              {preuve.lien.libelle}
            </LienFleche>
          </div>
        </div>

        <dl aria-label={ui.chiffresCles} className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {preuve.chiffres.map((chiffre, i) => (
            <div
              key={chiffre.libelle}
              data-revele
              style={vars({ '--i': i })}
              className={cn(
                'flex flex-col-reverse justify-end gap-1.5 pe-4',
                i % 2 === 1 && 'border-s border-filet ps-6 sm:ps-8',
                i >= 2 && 'lg:border-s lg:border-filet lg:ps-8',
              )}
            >
              <dt className="max-w-[12.5rem] text-normal text-texte-doux">{chiffre.libelle}</dt>
              <dd className={cn('text-display font-bold whitespace-nowrap', couleurChiffre[chiffre.axe])}>
                <CompteurChiffre valeur={chiffre.valeur} locale={locale === 'fr' ? 'fr-FR' : 'en-GB'} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Collage({ preuve }: { preuve: HomeContent['preuve'] }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[35rem]" data-revele="fondu">
      <div
        aria-hidden="true"
        className="absolute top-[13.46%] left-[-3.57%] h-[74.5%] w-[70.5%] border-[5px] border-pigment-rose [border-radius:7.6%_75.9%_7.6%_75.9%/7.2%_71.9%_7.2%_71.9%]"
      />
      <div data-feuille className="absolute top-0 left-0 h-[83.9%] w-[71.4%] overflow-hidden bg-sable [border-radius:12%_75%_12%_75%/10.2%_63.8%_10.2%_63.8%]">
        <Photo image={preuve.photoPrincipale} sizes="(min-width: 1024px) 400px, 72vw" />
      </div>
      <div data-feuille className="absolute top-[55.36%] left-[42.86%] h-[44.64%] w-[57.14%] overflow-hidden border-[10px] border-fond bg-sable [border-radius:15%_62.5%_15%_62.5%/19.2%_80%_19.2%_80%]">
        <Photo image={preuve.photoSecondaire} sizes="(min-width: 1024px) 320px, 58vw" />
      </div>
      {preuve.badge && (
        <p
          data-surface="nuit"
          className="absolute top-[7.14%] left-[53.57%] flex flex-col gap-1 rounded-porte border border-craie px-5 pt-4 pb-5 sm:px-6 sm:pt-5 sm:pb-[1.375rem]"
          data-revele="penche"
          style={vars({ '--penche-de': '6deg' })}
        >
          <strong className="text-[clamp(1.75rem,0.9rem+3.6vw,3.5rem)] leading-[1.14] font-semibold whitespace-nowrap text-pigment-vert">
            {preuve.badge.valeur}
          </strong>
          <span className="max-w-[11rem] text-petit leading-snug sm:text-normal">{preuve.badge.libelle}</span>
        </p>
      )}
    </div>
  )
}
