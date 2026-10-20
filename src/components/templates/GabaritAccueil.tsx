import type { HomeContent } from '@/lib/content/types'
import type { Locale } from '@/lib/i18n/config'
import type { Ui } from '@/lib/i18n/ui'
import { BandeauAxes } from '../organisms/BandeauAxes'
import { HeroAccueil } from '../organisms/HeroAccueil'
import { SectionActualites } from '../organisms/SectionActualites'
import { SectionAxes } from '../organisms/SectionAxes'
import { SectionCampagne } from '../organisms/SectionCampagne'
import { SectionHistoire } from '../organisms/SectionHistoire'
import { SectionPartenaires } from '../organisms/SectionPartenaires'
import { SectionPortes } from '../organisms/SectionPortes'
import { SectionPreuve } from '../organisms/SectionPreuve'

/**
 * Accueil : sections dans l'ordre figé de la maquette, chacune masquable
 * depuis l'admin (case « Afficher »). L'arc émotionnel suit la DA :
 * Joie → Orientation → Confiance → Compréhension → Appartenance → Action → Vie.
 */
export function GabaritAccueil({ accueil, locale, ui }: { accueil: HomeContent; locale: Locale; ui: Ui }) {
  const ancrePortes = 'portes'
  return (
    <>
      {accueil.hero.afficher && <HeroAccueil hero={accueil.hero} ui={ui} ancreSuite={ancrePortes} />}
      {accueil.portes.afficher && <SectionPortes portes={accueil.portes} id={ancrePortes} />}
      {accueil.preuve.afficher && <SectionPreuve preuve={accueil.preuve} ui={ui} locale={locale} />}
      {accueil.bandeau.afficher && accueil.bandeau.mots.length > 0 && (
        <BandeauAxes
          bandeau={accueil.bandeau}
          libelles={{ pause: ui.defilementPause, reprise: ui.defilementReprise, titre: ui.troisAxes }}
        />
      )}
      {accueil.axes.afficher && <SectionAxes axes={accueil.axes} />}
      {accueil.histoire.afficher && <SectionHistoire histoire={accueil.histoire} />}
      {accueil.campagne.afficher && <SectionCampagne bloc={accueil.campagne} locale={locale} ui={ui} />}
      {accueil.actualites.afficher && <SectionActualites actualites={accueil.actualites} ui={ui} />}
      {accueil.partenaires.afficher && <SectionPartenaires partenaires={accueil.partenaires} />}
    </>
  )
}
