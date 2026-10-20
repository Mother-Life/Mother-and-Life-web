import type { Locale } from './config'

/**
 * Textes d'interface fixes (libellés d'accessibilité, mentions de formulaires).
 * Le contenu éditorial, lui, vient du CMS.
 */
const fr = {
  allerAuContenu: 'Aller au contenu',
  navigationPrincipale: 'Navigation principale',
  ouvrirMenu: 'Ouvrir le menu',
  fermerMenu: 'Fermer le menu',
  sousMenu: (libelle: string) => `Sous-menu ${libelle}`,
  accueil: 'Accueil, Mother & Life',
  langue: 'Langue',
  langues: { fr: 'Français', en: 'English' },
  suivezNous: 'Suivez-nous',
  reseau: (nom: string) => `Mother & Life sur ${nom}`,
  faireDefiler: 'Faire défiler',
  defilementPause: 'Mettre le bandeau en pause',
  defilementReprise: 'Relancer le bandeau',
  troisAxes: 'Nos trois axes',
  chiffresCles: 'Nos chiffres clés',
  objectif: (n: string) => `Objectif : ${n}`,
  jaugeLibelle: (financees: number, objectif: number, unite: string) =>
    `${financees} ${unite} financés sur ${objectif}`,
  jaugeNote: 'Chaque feuille s’allume quand un panier est financé. Compteur mis à jour par l’équipe.',
  choisirMontant: 'Choisissez un montant',
  montantLibre: 'Ou montant libre',
  montantLibreExemple: 'Ex : 25 000',
  montantInvalide: 'Indiquez un montant d’au moins 500 FCFA.',
  equivalentEuro: 'équivalent en euros',
  albumPhare: 'Album phare',
  voirAlbum: 'Voir l’album',
  lire: 'Lire',
  lireArticle: (titre: string) => `Lire : ${titre}`,
  newsletterTitre: 'Recevez nos nouvelles',
  newsletterChamp: 'Votre adresse e-mail',
  newsletterBouton: 'S’inscrire',
  newsletterMerci: 'Merci, à très vite dans votre boîte mail.',
  newsletterErreur: 'L’inscription n’a pas abouti. Réessayez dans un instant.',
  whatsapp: 'WhatsApp',
  whatsappLibelle: 'Nous écrire sur WhatsApp',
  contact: 'Contact',
  partenaires: 'Nos partenaires',
  droits: (annee: number, denomination: string, numero: string) => `© ${annee} ${denomination} · N° ${numero}`,
}

type Ui = typeof fr

const en: Ui = {
  allerAuContenu: 'Skip to content',
  navigationPrincipale: 'Main navigation',
  ouvrirMenu: 'Open menu',
  fermerMenu: 'Close menu',
  sousMenu: (libelle) => `${libelle} submenu`,
  accueil: 'Home, Mother & Life',
  langue: 'Language',
  langues: { fr: 'Français', en: 'English' },
  suivezNous: 'Follow us',
  reseau: (nom) => `Mother & Life on ${nom}`,
  faireDefiler: 'Scroll down',
  defilementPause: 'Pause the banner',
  defilementReprise: 'Play the banner',
  troisAxes: 'Our three areas',
  chiffresCles: 'Key figures',
  objectif: (n) => `Goal: ${n}`,
  jaugeLibelle: (financees, objectif, unite) => `${financees} of ${objectif} ${unite} funded`,
  jaugeNote: 'Each leaf lights up when a basket is funded. Counter updated by the team.',
  choisirMontant: 'Choose an amount',
  montantLibre: 'Or another amount',
  montantLibreExemple: 'E.g. 25,000',
  montantInvalide: 'Enter at least 500 FCFA.',
  equivalentEuro: 'euro equivalent',
  albumPhare: 'Featured album',
  voirAlbum: 'View the album',
  lire: 'Read',
  lireArticle: (titre) => `Read: ${titre}`,
  newsletterTitre: 'Get our news',
  newsletterChamp: 'Your email address',
  newsletterBouton: 'Subscribe',
  newsletterMerci: 'Thank you, see you soon in your inbox.',
  newsletterErreur: 'Subscription failed. Please try again shortly.',
  whatsapp: 'WhatsApp',
  whatsappLibelle: 'Message us on WhatsApp',
  contact: 'Contact',
  partenaires: 'Our partners',
  droits: (annee, denomination, numero) => `© ${annee} ${denomination} · No. ${numero}`,
}

const dictionaries: Record<Locale, Ui> = { fr, en }

export function getUi(locale: Locale): Ui {
  return dictionaries[locale]
}

export type { Ui }
