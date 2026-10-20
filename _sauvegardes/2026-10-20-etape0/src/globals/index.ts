import type { GlobalConfig } from 'payload'
import { isAdmin, isAdminOrEditor, isAdminOrFinance } from '@/access/roles'
import { contentBlocks } from '@/blocks'

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
    { name: 'whatsapp', type: 'text' },
    { name: 'banque', type: 'text' },
    { name: 'regleSignature', type: 'textarea', localized: true },
    { name: 'dateAG', type: 'text' },
  ],
}

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Paramtres',
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
  ],
}

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Accueil',
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'sections',
      type: 'blocks',
      blocks: contentBlocks,
      localized: true,
    },
  ],
}

export const ChiffresCles: GlobalConfig = {
  slug: 'chiffresCles',
  label: 'Chiffres cls',
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
  label: "Chane d'impact",
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
  Home,
  ChiffresCles,
  Don,
  ChaineImpactGlobal,
]
