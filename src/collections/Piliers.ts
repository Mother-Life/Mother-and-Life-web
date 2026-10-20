import type { CollectionConfig } from 'payload'
import { isAdminOrEditor, canReadContent } from '@/access/roles'

export const Piliers: CollectionConfig = {
  slug: 'piliers',
  labels: {
    singular: "Axe d'intervention",
    plural: "Axes d'intervention",
  },
  admin: {
    useAsTitle: 'nom',
    defaultColumns: ['nom', 'slug', 'couleur'],
  },
  access: {
    read: canReadContent,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: () => false,
  },
  fields: [
    {
      name: 'nom',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { readOnly: true },
    },
    {
      name: 'couleur',
      type: 'select',
      required: true,
      options: [
        { label: 'Bleu (Prévenir)', value: 'bleu' },
        { label: 'Rose (Accompagner)', value: 'rose' },
        { label: 'Vert (Autonomie)', value: 'vert' },
      ],
    },
    {
      name: 'accroche',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'descriptionCourte',
      label: 'Description courte (accueil)',
      type: 'textarea',
      localized: true,
      maxLength: 120,
      admin: { description: 'Affichée dans la carte de l’axe sur l’accueil.' },
    },
    {
      name: 'picto',
      type: 'select',
      options: [
        { label: 'Accompagner (personne)', value: 'accompagner' },
        { label: 'Prévenir (bulle)', value: 'prevenir' },
        { label: 'Autonomie (pousse)', value: 'autonomie' },
      ],
      admin: { description: 'Picto dessiné affiché dans la carte.' },
    },
    { name: 'lienPage', label: 'Lien de la carte', type: 'text', admin: { description: 'Ex. : /nos-actions#accompagner' } },
    { name: 'ordre', type: 'number', defaultValue: 0 },
    {
      name: 'sousThemes',
      type: 'array',
      fields: [
        {
          name: 'libelle',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
}
