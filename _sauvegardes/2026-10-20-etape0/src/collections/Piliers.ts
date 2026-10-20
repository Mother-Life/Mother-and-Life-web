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
        { label: 'Bleu (Prvenir)', value: 'bleu' },
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
