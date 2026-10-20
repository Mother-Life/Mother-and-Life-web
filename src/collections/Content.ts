import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, canReadContent, isAdminOrFinance } from '@/access/roles'
import { mediaPubliable } from '@/access/media'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'titre' },
  access: {
    read: canReadContent,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'pilier',
      type: 'relationship',
      relationTo: 'piliers',
      required: true,
      unique: true,
    },
    { name: 'titre', type: 'text', required: true, localized: true },
    { name: 'accroche', type: 'text', localized: true },
    { name: 'description', type: 'richText', localized: true },
    {
      name: 'prestations',
      type: 'array',
      fields: [
        { name: 'libelle', type: 'text', localized: true, required: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'gratuit', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      filterOptions: mediaPubliable,
    },
    {
      name: 'etapesParcours',
      type: 'array',
      fields: [
        { name: 'numero', type: 'number', required: true },
        { name: 'titre', type: 'text', localized: true, required: true },
        { name: 'texte', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'orientationPartenaires',
      type: 'relationship',
      relationTo: 'partenaires',
      hasMany: true,
    },
  ],
}

export const Temoignages: CollectionConfig = {
  slug: 'temoignages',
  labels: { singular: 'Histoire', plural: 'Histoires' },
  admin: {
    useAsTitle: 'auteurAffiche',
    defaultColumns: ['auteurAffiche', 'voix', 'annee', 'consentementVerifie'],
    description: 'Témoignages réels uniquement. Rien n’est affiché sur le site sans consentement vérifié.',
  },
  access: {
    read: canReadContent,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: 'citation', type: 'textarea', required: true, localized: true },
    { name: 'extrait', type: 'textarea', localized: true, maxLength: 180, admin: { description: 'Version courte pour l’accueil et les cartes. Laisser vide pour couper la citation automatiquement.' } },
    { name: 'auteurAffiche', label: 'Prénom affiché', type: 'text', required: true, admin: { description: 'Prénom réel ou modifié (ajouter * et le préciser dans le rôle).' } },
    { name: 'roleAuteur', label: 'Rôle', type: 'text', localized: true, admin: { description: 'Ex. : Bénéficiaire du programme' } },
    { name: 'annee', label: 'Année', type: 'number' },
    {
      name: 'voix',
      type: 'select',
      options: [
        { label: 'Mère', value: 'mere' },
        { label: 'Soignant·e', value: 'soignant' },
        { label: 'Bénévole', value: 'benevole' },
        { label: 'Partenaire', value: 'partenaire' },
      ],
    },
    { name: 'noteVocale', label: 'Note vocale', type: 'upload', relationTo: 'media', filterOptions: { mimeType: { contains: 'audio' } } },
    { name: 'transcription', type: 'textarea', localized: true, admin: { condition: (_, s) => Boolean(s?.noteVocale) } },
    { name: 'photo', type: 'upload', relationTo: 'media', filterOptions: mediaPubliable },
    { name: 'consentementVerifie', type: 'checkbox', required: true, defaultValue: false },
    { name: 'pilier', type: 'relationship', relationTo: 'piliers' },
    { name: 'miseEnAvant', type: 'checkbox', defaultValue: false },
  ],
}

export const Partenaires: CollectionConfig = {
  slug: 'partenaires',
  admin: { useAsTitle: 'nom' },
  access: {
    read: canReadContent,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: 'nom', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Institutionnel', value: 'institutionnel' },
        { label: 'Financier', value: 'financier' },
        { label: 'Technique', value: 'technique' },
        { label: 'Média', value: 'media' },
        { label: 'Orientation', value: 'orientation' },
      ],
    },
    { name: 'siteWeb', type: 'text' },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'ordre', type: 'number', defaultValue: 0 },
    { name: 'actif', type: 'checkbox', defaultValue: true },
    {
      name: 'accordSigne',
      label: 'Accord signé',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Un logo n’apparaît sur le site que si l’accord de partenariat est signé.' },
    },
    { name: 'afficherAccueil', label: 'Afficher sur l’accueil', type: 'checkbox', defaultValue: false },
  ],
}

export const Rapports: CollectionConfig = {
  slug: 'rapports',
  admin: { useAsTitle: 'titre' },
  access: {
    read: canReadContent,
    create: isAdminOrFinance,
    update: isAdminOrFinance,
    delete: isAdminOrFinance,
  },
  fields: [
    { name: 'titre', type: 'text', required: true, localized: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Annuel', value: 'annuel' },
        { label: 'Financier', value: 'financier' },
        { label: 'Activité', value: 'activite' },
        { label: 'Fiche technique', value: 'fiche-technique' },
      ],
    },
    { name: 'exercice', type: 'text', required: true },
    { name: 'fichierFr', type: 'upload', relationTo: 'media' },
    { name: 'fichierEn', type: 'upload', relationTo: 'media' },
    { name: 'resume', type: 'textarea', localized: true },
    { name: 'couverture', type: 'upload', relationTo: 'media', filterOptions: mediaPubliable },
    { name: 'publie', type: 'checkbox', defaultValue: false },
  ],
}

export const Dons: CollectionConfig = {
  slug: 'dons',
  admin: { useAsTitle: 'reference' },
  access: {
    read: isAdminOrFinance,
    // Création via les routes /api (API locale) uniquement : l'API REST publique est fermée.
    create: isAdmin,
    update: isAdminOrFinance,
    delete: isAdminOrFinance,
  },
  fields: [
    { name: 'reference', type: 'text', unique: true, admin: { readOnly: true } },
    { name: 'montant', type: 'number', required: true },
    {
      name: 'devise',
      type: 'select',
      defaultValue: 'XAF',
      options: [
        { label: 'FCFA', value: 'XAF' },
        { label: 'EUR', value: 'EUR' },
        { label: 'USD', value: 'USD' },
      ],
    },
    {
      name: 'canal',
      type: 'select',
      required: true,
      options: [
        { label: 'MTN MoMo', value: 'momo' },
        { label: 'Orange Money', value: 'om' },
        { label: 'Virement', value: 'virement' },
        { label: 'Espèces', value: 'especes' },
        { label: 'International', value: 'international' },
      ],
    },
    { name: 'donateurNom', type: 'text' },
    { name: 'donateurEmail', type: 'email' },
    { name: 'donateurTéléphone', type: 'text' },
    { name: 'anonyme', type: 'checkbox', defaultValue: false },
    { name: 'message', type: 'textarea' },
    {
      name: 'affectation',
      type: 'select',
      options: [
        { label: 'Général', value: 'general' },
        { label: 'Grossesse', value: 'grossesse' },
        { label: 'Éducation', value: 'education' },
        { label: 'Autonomie', value: 'autonomie' },
      ],
    },
    {
      name: 'statut',
      type: 'select',
      defaultValue: 'declare',
      options: [
        { label: 'Déclaré', value: 'declare' },
        { label: 'Confirmé', value: 'confirme' },
        { label: 'Annulé', value: 'annule' },
      ],
    },
    { name: 'confirmePar', type: 'relationship', relationTo: 'users' },
    { name: 'dateConfirmation', type: 'date' },
    { name: 'notesInternes', type: 'textarea' },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && !data?.reference) {
          const year = new Date().getFullYear()
          const rand = Math.floor(Math.random() * 9000) + 1000
          data.reference = `ML-${year}-${rand}`
        }
        return data
      },
    ],
  },
}

export const Messages: CollectionConfig = {
  slug: 'messages',
  admin: { useAsTitle: 'nom' },
  access: {
    read: isAdminOrEditor,
    // Création via les routes /api (API locale) uniquement : l'API REST publique est fermée.
    create: isAdmin,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: 'nom', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'telephone', type: 'text' },
    {
      name: 'sujet',
      type: 'select',
      required: true,
      options: [
        { label: 'Information générale', value: 'info' },
        { label: 'Bénévolat', value: 'benevolat' },
        { label: 'Partenariat', value: 'partenariat' },
        { label: 'Don', value: 'don' },
        { label: 'Autre', value: 'autre' },
      ],
    },
    { name: 'message', type: 'textarea', required: true },
    { name: 'consentement', type: 'checkbox', required: true },
  ],
}

export const Candidatures: CollectionConfig = {
  slug: 'candidatures',
  admin: { useAsTitle: 'nom' },
  access: {
    read: isAdminOrEditor,
    // Création via les routes /api (API locale) uniquement : l'API REST publique est fermée.
    create: isAdmin,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: 'type', type: 'select', required: true, options: [
      { label: 'Bénévolat', value: 'benevolat' },
      { label: 'Partenariat', value: 'partenaire' },
    ]},
    { name: 'nom', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'telephone', type: 'text' },
    { name: 'ville', type: 'text' },
    { name: 'organisation', type: 'text' },
    { name: 'disponibilite', type: 'text' },
    { name: 'competences', type: 'textarea' },
    { name: 'motivation', type: 'textarea', required: true },
  ],
}

export const Abonnes: CollectionConfig = {
  slug: 'abonnes',
  admin: { useAsTitle: 'email' },
  access: {
    read: isAdminOrEditor,
    // Création via les routes /api (API locale) uniquement : l'API REST publique est fermée.
    create: isAdmin,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true },
    {
      name: 'langue',
      type: 'select',
      defaultValue: 'fr',
      options: [
        { label: 'Français', value: 'fr' },
        { label: 'English', value: 'en' },
      ],
    },
    { name: 'confirme', type: 'checkbox', defaultValue: false },
  ],
}

export const StatistiquesExternes: CollectionConfig = {
  slug: 'statistiques-externes',
  labels: { singular: 'Statistique externe', plural: 'Statistiques externes' },
  admin: { useAsTitle: 'enonce' },
  access: {
    read: canReadContent,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: 'valeur', type: 'text', required: true },
    { name: 'enonce', type: 'text', required: true, localized: true },
    { name: 'source', type: 'text', required: true },
    { name: 'annee', type: 'number' },
    { name: 'lienSource', type: 'text' },
    {
      name: 'theme',
      type: 'select',
      options: [
        { label: 'Pauvreté', value: 'pauvrete' },
        { label: 'Information', value: 'information' },
        { label: 'Nutrition', value: 'nutrition' },
        { label: 'Accompagnement', value: 'accompagnement' },
        { label: 'Santé', value: 'sante' },
      ],
    },
  ],
}
