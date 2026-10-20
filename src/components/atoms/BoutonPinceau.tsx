import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icone, type NomIcone } from './Icone'
import { Pinceau } from './Pinceau'

type Variante = 'encre' | 'contour' | 'rose' | 'action' | 'vert'
type Taille = 's' | 'm' | 'l'

type Commun = {
  variante?: Variante
  taille?: Taille
  iconeAvant?: NomIcone
  iconeApres?: NomIcone
  /** Animation du trait à l'apparition : au chargement (hero) ou au défilement. */
  apparition?: 'chargement' | 'defilement'
  className?: string
  children: ReactNode
}

type EnLien = Commun & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, keyof Commun | 'href'>
type EnBouton = Commun & { href?: undefined } & Omit<ComponentPropsWithoutRef<'button'>, keyof Commun>

/**
 * Bouton « empreinte d'encre ». Lien si `href` est fourni, bouton sinon.
 * Les états (survol, pression, attente…) animent le tracé du pinceau : voir
 * styles/composants/bouton-pinceau.css.
 */
export function BoutonPinceau(props: EnLien | EnBouton) {
  const { variante = 'encre', taille = 's', iconeAvant, iconeApres, apparition, className, children, ...reste } = props

  const tailleIcone = taille === 's' ? 20 : 24
  const contenu = (
    <>
      <span
        className={cn('bouton-pinceau__fond', apparition === 'chargement' && 'entree-trace')}
        data-revele={apparition === 'defilement' ? 'trace' : undefined}
      >
        {variante === 'contour' ? (
          <Pinceau className="bouton-pinceau__couche bouton-pinceau__couche--trait" />
        ) : (
          <Pinceau className="bouton-pinceau__couche bouton-pinceau__couche--seconde" />
        )}
        <Pinceau className="bouton-pinceau__couche bouton-pinceau__couche--principale" />
      </span>
      {iconeAvant && (
        <Icone nom={iconeAvant} taille={tailleIcone} className="bouton-pinceau__icone" data-position="avant" />
      )}
      <span>{children}</span>
      {iconeApres && (
        <Icone nom={iconeApres} taille={tailleIcone} className="bouton-pinceau__icone" data-position="apres" />
      )}
    </>
  )

  const attributs = { className: cn('bouton-pinceau', className), 'data-variante': variante, 'data-taille': taille }

  if (reste.href !== undefined) {
    const { href, ...lien } = reste as Omit<EnLien, keyof Commun>
    return (
      <Link href={href} {...lien} {...attributs}>
        {contenu}
      </Link>
    )
  }

  const { type = 'button', ...bouton } = reste as Omit<EnBouton, keyof Commun>
  return (
    <button type={type} {...bouton} {...attributs}>
      {contenu}
    </button>
  )
}
