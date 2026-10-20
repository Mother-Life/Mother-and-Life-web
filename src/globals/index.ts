import type { GlobalConfig } from 'payload'
import { isAdmin, isAdminOrEditor, isAdminOrFinance } from '@/access/roles'
import { Accueil } from './Accueil'

export const Organisation: GlobalConfig = {
  slug: 'organisation',
  label: 'Organisation',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    { name: 'denomination', type: 'text', required: true },
    { name: 'baseline', type: 'text', localized: true },
    { name: 'numeroEnregistrement', type: 'text', required: true },
    { name: 'siege', type: 'text', required: true },
    {
      name: 'telephones',
      type: 'array',
      fields: [{ name: 'numero', type: 'text' }],
    },
    { name: 'email', type: 'email', required: true },
    { name: 'siteWeb', type: 'text' },
    { name: 'whatsapp', type: 'text', admin: { description: 'Numéro du bouton WhatsApp, format international. Ex. : +237656279670' } },
    { name: 'messageWhatsapp', label: 'Message prérempli WhatsApp', type: 'text', localized: true },
    { name: 'ligneTransparence', label: 'Ligne transparence (pied de page)', type: 'textarea', localized: true },
    { name: 'banque', type: 'text' },
    { name: 'regleSignature', type: 'textarea', localized: true },
    { name: 'dateAG', type: 'text' },
  ],
}

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Paramètres',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    { name: 'metaTitle', type: 'text', localized: true },
    { name: 'metaDescription', type: 'textarea', localized: true },
    {
      name: 'reseaux',
      type: 'array',
      fields: [
        {
          name: 'plateforme',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'X (Twitter)', value: 'x' },
          ],
        },
        { name: 'url', type: 'text' },
      ],
    },
  ],
}

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'header',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'href', type: 'text' },
        {
          name: 'enfants',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', localized: true },
            { name: 'href', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'boutons',
      label: 'Boutons de l’en-tête',
      type: 'group',
      fields: [
        {
          name: 'accompagnee',
          label: 'Être accompagnée',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', localized: true },
            { name: 'href', type: 'text' },
          ],
        },
        {
          name: 'don',
          label: 'Faire un don',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', localized: true },
            { name: 'href', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'footer',
      type: 'array',
      fields: [
        { name: 'titre', type: 'text', localized: true },
        {
          name: 'liens',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', localized: true },
            { name: 'href', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'legal',
      label: 'Liens légaux (bas de page)',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'href', type: 'text' },
      ],
    },
  ],
}

export const ChiffresCles: GlobalConfig = {
  slug: 'chiffresCles',
  label: 'Chiffres clés',
  access: {
    read: () => true,
    update: isAdminOrFinance,
  },
  fields: [
    {
      name: 'chiffres',
      type: 'array',
      fields: [
        { name: 'cle', type: 'text', required: true },
        { name: 'valeur', type: 'text', required: true },
        { name: 'libelle', type: 'text', localized: true, required: true },
        { name: 'source', type: 'text', required: true },
        { name: 'dateMiseAJour', type: 'date', required: true },
        { name: 'pilier', type: 'relationship', relationTo: 'piliers' },
        { name: 'afficherAccueil', type: 'checkbox', defaultValue: false },
      ],
      validate: (value: unknown) => {
        const rows = Array.isArray(value) ? (value as { afficherAccueil?: boolean }[]) : []
        const n = rows.filter((r) => r?.afficherAccueil).length
        return n <= 4 ? true : `L’accueil affiche 4 chiffres : ${n} sont cochés « afficher à l’accueil ».`
      },
    },
  ],
}

export const Don: GlobalConfig = {
  slug: 'don',
  label: 'Don',
  access: {
    read: () => true,
    update: isAdminOrFinance,
  },
  fields: [
    { name: 'actif', type: 'checkbox', defaultValue: true },
    { name: 'devisePrincipale', type: 'text', defaultValue: 'XAF' },
    {
      name: 'paliers',
      type: 'array',
      fields: [
        { name: 'montant', type: 'number' },
        { name: 'libelle', type: 'text', localized: true },
        { name: 'equivalence', type: 'text', localized: true },
        { name: 'libre', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'canaux',
      type: 'group',
      fields: [
        {
          name: 'mobileMoney',
          type: 'array',
          fields: [
            { name: 'operateur', type: 'text' },
            { name: 'numero', type: 'text' },
            { name: 'titulaire', type: 'text' },
            { name: 'code', type: 'text' },
            { name: 'actif', type: 'checkbox', defaultValue: false },
            { name: 'ordre', type: 'number' },
          ],
        },
        {
          name: 'virement',
          type: 'group',
          fields: [
            { name: 'actif', type: 'checkbox', defaultValue: false },
            { name: 'titulaire', type: 'text' },
            { name: 'banque', type: 'text' },
            { name: 'rib', type: 'text' },
            { name: 'iban', type: 'text' },
            { name: 'bic', type: 'text' },
          ],
        },
        {
          name: 'especes',
          type: 'group',
          fields: [
            { name: 'actif', type: 'checkbox', defaultValue: true },
            { name: 'instructions', type: 'textarea', localized: true },
          ],
        },
        {
          name: 'international',
          type: 'group',
          fields: [
            { name: 'actif', type: 'checkbox', defaultValue: false },
            { name: 'plateforme', type: 'text' },
            { name: 'lien', type: 'text' },
            { name: 'contact', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'objectifCampagne',
      type: 'group',
      fields: [
        { name: 'libelle', type: 'text', localized: true },
        { name: 'compteurManuel', type: 'number' },
      ],
    },
  ],
}

export const ChaineImpactGlobal: GlobalConfig = {
  slug: 'chaineImpact',
  label: "Chaîne d'impact",
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
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

export const globals = [
  Organisation,
  Settings,
  Navigation,
  Accueil,
  ChiffresCles,
  Don,
  ChaineImpactGlobal,
]
