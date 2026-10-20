import { BoutonPinceau } from '@/components/atoms/BoutonPinceau'
import { GabaritTexte } from '@/components/templates/GabaritTexte'

/** Page introuvable. Les pages intérieures arrivent au fil de l'intégration. */
export default function PageIntrouvable() {
  return (
    <GabaritTexte surtitre="Oups" titre="Cette page n’existe pas (encore)">
      <p>
        Elle a peut-être changé d’adresse, ou elle est en cours de construction. / This page may have moved, or is still
        being built.
      </p>
      <p>
        <BoutonPinceau href="/">Retour à l’accueil</BoutonPinceau>
      </p>
    </GabaritTexte>
  )
}
