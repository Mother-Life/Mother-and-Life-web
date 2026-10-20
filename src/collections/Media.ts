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
  labels: { singular: 'Média', plural: 'Médiathèque' },
  upload: {
    staticDir: 'media',
    // Liste fermée : pas de SVG (il peut contenir du script, donc une faille XSS
    // une fois servi depuis notre domaine). audio/* : notes vocales des témoignages.
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'application/pdf', 'audio/*'],
    focalPoint: true,
    imageSizes,
    // L'original est réencodé en WebP : sharp retire au passage les métadonnées
    // EXIF (dont la position GPS), essentiel pour la sécurité des bénéficiaires.
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
        { label: 'Activité', value: 'activite' },
        { label: 'Portrait', value: 'portrait' },
        { label: 'Événement', value: 'evenement' },
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
      validate: (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) =>
        siblingData?.contientMineur && value !== 'ecrit'
          ? 'Une photo où apparaît un mineur exige un consentement écrit.'
          : true,
      defaultValue: 'absent',
      options: [
        { label: 'Écrit', value: 'ecrit' },
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
        { label: 'Réseaux', value: 'reseaux' },
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
