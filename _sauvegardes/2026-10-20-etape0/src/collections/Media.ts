import type { CollectionConfig } from 'payload'
import { isAdminOrEditor, canReadContent } from '@/access/roles'

const imageSizes = [
  { name: 'thumb', width: 320 },
  { name: 'card', width: 640 },
  { name: 'content', width: 1024 },
  { name: 'hero', width: 1600 },
  { name: 'full', width: 2000 },
]

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Mdia', plural: 'Mdiathque' },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes,
    formatOptions: {
      format: 'webp',
    },
  },
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'type', 'alt', 'consentement', 'qualite'],
  },
  access: {
    read: canReadContent,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.datePrise) {
          data.annee = new Date(data.datePrise).getFullYear()
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'legende',
      type: 'text',
      localized: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Activit', value: 'activite' },
        { label: 'Portrait', value: 'portrait' },
        { label: 'vnement', value: 'evenement' },
        { label: 'Institutionnel', value: 'institutionnel' },
        { label: 'Document', value: 'document' },
        { label: 'Logo', value: 'logo' },
        { label: 'Illustration', value: 'illustration' },
      ],
    },
    {
      name: 'pilier',
      type: 'relationship',
      relationTo: 'piliers',
      hasMany: true,
    },
    {
      name: 'album',
      type: 'relationship',
      relationTo: 'albums',
    },
    {
      name: 'datePrise',
      type: 'date',
      required: true,
    },
    {
      name: 'annee',
      type: 'number',
      admin: { readOnly: true },
      index: true,
    },
    {
      name: 'antenne',
      type: 'relationship',
      relationTo: 'antennes',
    },
    { name: 'credit', type: 'text' },
    {
      name: 'consentement',
      type: 'select',
      required: true,
      defaultValue: 'absent',
      options: [
        { label: 'crit', value: 'ecrit' },
        { label: 'Oral', value: 'oral' },
        { label: 'Non requis', value: 'non-requis' },
        { label: 'Absent', value: 'absent' },
      ],
    },
    {
      name: 'consentementDoc',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.consentement === 'ecrit',
      },
    },
    {
      name: 'contientMineur',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
    {
      name: 'usageAutorise',
      type: 'select',
      hasMany: true,
      required: true,
      options: [
        { label: 'Web', value: 'web' },
        { label: 'Print', value: 'print' },
        { label: 'Rseaux', value: 'reseaux' },
        { label: 'Bailleurs', value: 'bailleurs' },
      ],
    },
    {
      name: 'qualite',
      type: 'select',
      required: true,
      defaultValue: 'exploitable',
      options: [
        { label: 'Exploitable', value: 'exploitable' },
        { label: 'Retouche requise', value: 'retouche-requise' },
        { label: 'Archive', value: 'archive' },
      ],
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
  ],
}
