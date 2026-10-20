import type { CollectionConfig } from 'payload'
import { isAdminOrEditor, canReadContent } from '@/access/roles'

export const Antennes: CollectionConfig = {
  slug: 'antennes',
  admin: {
    useAsTitle: 'nom',
    defaultColumns: ['nom', 'ville', 'statut', 'ordre'],
  },
  access: {
    read: canReadContent,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: 'nom', type: 'text', required: true },
    { name: 'ville', type: 'text', required: true },
    { name: 'adresse', type: 'textarea', localized: true },
    { name: 'telephone', type: 'text' },
    { name: 'whatsapp', type: 'text' },
    { name: 'horaires', type: 'textarea', localized: true },
    {
      name: 'coordonnées',
      type: 'group',
      fields: [
        { name: 'latitude', type: 'number' },
        { name: 'longitude', type: 'number' },
      ],
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'ordre', type: 'number', defaultValue: 0 },
    {
      name: 'statut',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Projete', value: 'projetee' },
      ],
    },
  ],
}
