import type { Block } from 'payload'

export const HeroDeclaration: Block = {
  slug: 'heroDeclaration',
  labels: { singular: 'Hero dclaration (P1)', plural: 'Hero dclaration' },
  fields: [
    { name: 'kicker', type: 'text', localized: true },
    { name: 'titre', type: 'text', required: true, localized: true },
    { name: 'sousTitre', type: 'textarea', localized: true },
    { name: 'ctaLabel', type: 'text', localized: true },
    { name: 'ctaHref', type: 'text' },
    { name: 'lienSecondaire', type: 'text', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'afficherBadgeGratuit', type: 'checkbox', defaultValue: true },
  ],
}

export const TrioMission: Block = {
  slug: 'trioMission',
  labels: { singular: 'Trio mission (P2)', plural: 'Trio mission' },
  fields: [
    {
      name: 'entrees',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      fields: [
        { name: 'pilier', type: 'relationship', relationTo: 'piliers' },
        { name: 'titre', type: 'text', localized: true, required: true },
        { name: 'texte', type: 'textarea', localized: true },
        { name: 'lien', type: 'text' },
        { name: 'lienLabel', type: 'text', localized: true },
      ],
    },
  ],
}

export const Zigzag: Block = {
  slug: 'zigzag',
  labels: { singular: 'Zigzag (P3)', plural: 'Zigzag' },
  fields: [
    { name: 'kicker', type: 'text', localized: true },
    { name: 'numero', type: 'text' },
    { name: 'titre', type: 'text', localized: true, required: true },
    { name: 'texte', type: 'textarea', localized: true },
    {
      name: 'puces',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'href', type: 'text' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Droite', value: 'right' },
        { label: 'Gauche', value: 'left' },
      ],
    },
    { name: 'pilier', type: 'relationship', relationTo: 'piliers' },
    { name: 'lien', type: 'text' },
    { name: 'lienLabel', type: 'text', localized: true },
  ],
}

export const BandeChiffres: Block = {
  slug: 'bandeChiffres',
  labels: { singular: 'Bande de chiffres (P4)', plural: 'Bande de chiffres' },
  fields: [
    {
      name: 'chiffres',
      type: 'array',
      minRows: 4,
      maxRows: 4,
      fields: [
        { name: 'cle', type: 'text' },
        { name: 'valeur', type: 'text' },
        { name: 'libelle', type: 'text', localized: true },
        { name: 'pilier', type: 'relationship', relationTo: 'piliers' },
        { name: 'source', type: 'text' },
      ],
    },
  ],
}

export const CitationSignee: Block = {
  slug: 'citationSignee',
  labels: { singular: 'Citation signe (P5)', plural: 'Citations signes' },
  fields: [
    { name: 'citation', type: 'textarea', localized: true, required: true },
    { name: 'auteur', type: 'text', required: true },
    { name: 'fonction', type: 'text', localized: true },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'varianteRose', type: 'checkbox', defaultValue: false },
  ],
}

export const BandeCampagne: Block = {
  slug: 'bandeCampagne',
  labels: { singular: 'Bande campagne (P6)', plural: 'Bande campagne' },
  fields: [
    { name: 'kicker', type: 'text', localized: true },
    { name: 'objectif', type: 'text', localized: true, required: true },
    { name: 'texte', type: 'textarea', localized: true },
    { name: 'ctaLabel', type: 'text', localized: true },
    { name: 'ctaHref', type: 'text' },
    { name: 'ctaSecondaire', type: 'text', localized: true },
    { name: 'ctaSecondaireHref', type: 'text' },
  ],
}

export const GrilleArticles: Block = {
  slug: 'grilleArticles',
  labels: { singular: 'Grille articles (P7)', plural: 'Grille articles' },
  fields: [
    { name: 'titre', type: 'text', localized: true },
    { name: 'kicker', type: 'text', localized: true },
    {
      name: 'mode',
      type: 'select',
      defaultValue: 'auto',
      options: [
        { label: 'Automatique', value: 'auto' },
        { label: 'Slection manuelle', value: 'manuel' },
      ],
    },
    { name: 'categorie', type: 'relationship', relationTo: 'categories' },
    {
      name: 'articles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
    },
    { name: 'nombre', type: 'number', defaultValue: 3 },
  ],
}

export const Formulaire: Block = {
  slug: 'formulaire',
  labels: { singular: 'Formulaire (P8)', plural: 'Formulaires' },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Contact', value: 'contact' },
        { label: 'Bnvolat', value: 'benevolat' },
        { label: 'Partenariat', value: 'partenaire' },
        { label: 'Newsletter', value: 'newsletter' },
      ],
    },
    { name: 'reassurance', type: 'richText', localized: true },
  ],
}

export const TexteRiche: Block = {
  slug: 'texteRiche',
  labels: { singular: 'Texte riche', plural: 'Textes riches' },
  fields: [{ name: 'contenu', type: 'richText', localized: true }],
}

export const Galerie: Block = {
  slug: 'galerie',
  labels: { singular: 'Galerie', plural: 'Galeries' },
  fields: [
    { name: 'album', type: 'relationship', relationTo: 'albums' },
    {
      name: 'medias',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
  ],
}

export const PourquoiAgir: Block = {
  slug: 'pourquoiAgir',
  labels: { singular: 'Pourquoi agir', plural: 'Pourquoi agir' },
  fields: [
    { name: 'titre', type: 'text', localized: true },
    {
      name: 'entrees',
      type: 'array',
      fields: [
        { name: 'titre', type: 'text', localized: true },
        { name: 'texte', type: 'textarea', localized: true },
        { name: 'statistique', type: 'relationship', relationTo: 'statistiques-externes' },
      ],
    },
  ],
}

export const ChaineImpact: Block = {
  slug: 'chaineImpact',
  labels: { singular: "Chane d'impact", plural: "Chanes d'impact" },
  fields: [
    { name: 'titre', type: 'text', localized: true },
    {
      name: 'etapes',
      type: 'array',
      fields: [
        { name: 'titre', type: 'text', localized: true },
        { name: 'texte', type: 'textarea', localized: true },
      ],
    },
  ],
}

export const ParcoursSante: Block = {
  slug: 'parcoursSante',
  labels: { singular: 'Parcours sant', plural: 'Parcours sant' },
  fields: [
    { name: 'titre', type: 'text', localized: true },
    { name: 'introduction', type: 'textarea', localized: true },
    {
      name: 'moments',
      type: 'array',
      fields: [
        { name: 'titre', type: 'text', localized: true },
        { name: 'prestations', type: 'textarea', localized: true },
      ],
    },
  ],
}

export const DimensionsPerinatalite: Block = {
  slug: 'dimensionsPerinatalite',
  labels: { singular: 'Dimensions prinatalit', plural: 'Dimensions prinatalit' },
  fields: [
    { name: 'titre', type: 'text', localized: true },
    { name: 'definition', type: 'textarea', localized: true },
    {
      name: 'dimensions',
      type: 'array',
      fields: [
        { name: 'nom', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
  ],
}

export const Transparence: Block = {
  slug: 'transparence',
  labels: { singular: 'Transparence', plural: 'Transparence' },
  fields: [
    { name: 'titre', type: 'text', localized: true },
    {
      name: 'points',
      type: 'array',
      fields: [{ name: 'texte', type: 'text', localized: true }],
    },
  ],
}

export const Projections: Block = {
  slug: 'projections',
  labels: { singular: 'Projections', plural: 'Projections' },
  fields: [
    { name: 'titre', type: 'text', localized: true },
    {
      name: 'chantiers',
      type: 'array',
      fields: [
        { name: 'titre', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
  ],
}

export const contentBlocks = [
  HeroDeclaration,
  TrioMission,
  Zigzag,
  BandeChiffres,
  CitationSignee,
  BandeCampagne,
  GrilleArticles,
  Formulaire,
  TexteRiche,
  Galerie,
  PourquoiAgir,
  ChaineImpact,
  ParcoursSante,
  DimensionsPerinatalite,
  Transparence,
  Projections,
]
