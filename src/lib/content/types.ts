/**
 * Modèles de vue du site public.
 *
 * Les composants ne connaissent que ces types, jamais ceux de Payload : la
 * couche `lib/cms` traduit les documents du CMS vers ces modèles, et
 * `lib/content/fallback` fournit des valeurs de secours quand la base est vide.
 * Changer de CMS ou de schéma ne touche donc aucun composant.
 */

export type Axe = 'accompagner' | 'prevenir' | 'autonomie'

export type Lien = {
  libelle: string
  href: string
}

export type Image = {
  src: string
  alt: string
  width: number
  height: number
  /** Point focal en pourcentage (0 à 100), pour que le recadrage garde les visages. */
  focal?: { x: number; y: number }
  /** Aperçu flou en data URL, affiché pendant le chargement. */
  blurDataURL?: string
}

export type NavigationItem = Lien & { enfants?: Lien[] }

export type ReseauSocial = 'facebook' | 'x' | 'youtube' | 'linkedin' | 'instagram' | 'tiktok'

export type SiteContent = {
  denomination: string
  baseline: string
  email: string
  telephones: string[]
  adresse: string
  siegeCourt: string
  numeroEnregistrement: string
  whatsapp: { numero: string; message: string } | null
  reseaux: { plateforme: ReseauSocial; url: string }[]
  ligneTransparence: string
  navigation: NavigationItem[]
  boutons: { accompagnee: Lien; don: Lien }
  piedDePage: { titre: string; liens: Lien[] }[]
  legal: Lien[]
}

export type Chiffre = {
  valeur: string
  libelle: string
  axe: Axe
}

export type Porte = {
  icone: 'accompagnee' | 'don' | 'rejoindre'
  titre: string
  texte: string
  lien: Lien
}

export type CarteAxe = {
  axe: Axe
  titre: string
  description: string
  lien: Lien
}

export type Histoire = {
  citation: string
  prenom: string
  role: string
}

export type Campagne = {
  surtitre: string
  titre: string
  motColore?: string
  resume: string
  unite: { singulier: string; pluriel: string }
  coutUnitaire: number
  objectifUnites: number
  unitesFinancees: number
  paliers: { montant: number; libelle?: string }[]
  lien: Lien
}

export type Article = {
  categorie: string
  titre: string
  href: string
  image: Image
}

export type Album = {
  titre: string
  resume: string
  href: string
  image: Image
}

export type Partenaire = {
  nom: string
  logo: Image
  href?: string
}

type Section<T> = { afficher: boolean } & T

export type HomeContent = {
  hero: Section<{
    surtitre: string
    titre: string
    motSouligne?: string
    sousTitre: string
    boutonPrincipal: Lien
    lienSecondaire: Lien
    image: Image
    annotation?: string
  }>
  portes: Section<{ titre: string; items: Porte[] }>
  preuve: Section<{
    surtitre: string
    titre: string
    texte: string
    lien: Lien
    photoPrincipale: Image
    photoSecondaire: Image
    badge: { valeur: string; libelle: string } | null
    chiffres: Chiffre[]
  }>
  bandeau: Section<{ mots: { libelle: string; axe: Axe }[] }>
  axes: Section<{
    surtitre: string
    titre: string
    texte: string
    lien: Lien
    cartes: CarteAxe[]
    axeMisEnAvant: Axe
  }>
  histoire: Section<{ surtitre: string; histoire: Histoire | null; lien: Lien }>
  campagne: Section<{
    campagne: Campagne | null
    don: {
      action: string
      bandeauTitre: string
      bandeauTexte: string
      libelleBouton: string
      moyens: string
      transparence: string
    }
  }>
  actualites: Section<{
    surtitre: string
    titre: string
    lienTous: Lien
    album: Album | null
    articles: Article[]
  }>
  partenaires: Section<{ surtitre: string; logos: Partenaire[] }>
}
