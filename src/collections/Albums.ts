import type { CollectionConfig } from 'payload'
import { isAdminOrEditor, canReadPublished } from '@/access/roles'
import { mediaPubliable } from '@/access/media'

export const Albums: CollectionConfig = {
  slug: 'albums',
  admin: {
    useAsTitle: 'titre',
    defaultColumns: ['titre', 'annee', 'typeActivite', 'updatedAt'],
  },
  versions: { drafts: true },
  access: {
    read: canReadPublished,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.dateDebut) {
          data.annee = new Date(data.dateDebut).getFullYear()
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'titre', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, localized: true },
    { name: 'resume', type: 'textarea', localized: true },
    {
      name: 'recit',
      type: 'richText',
      localized: true,
    },
    {
      name: 'couverture',
      type: 'upload',
      relationTo: 'media',
      filterOptions: mediaPubliable,
      required: true,
    },
    {
      name: 'photos',
      type: 'relationship',
      relationTo: 'media',
      filterOptions: mediaPubliable,
      hasMany: true,
    },
    { name: 'dateDebut', type: 'date', required: true },
    { name: 'dateFin', type: 'date' },
    { name: 'annee', type: 'number', admin: { readOnly: true }, index: true },
    {
      name: 'pilier',
      type: 'relationship',
      relationTo: 'piliers',
      hasMany: true,
      required: true,
    },
    {
      name: 'antenne',
      type: 'relationship',
      relationTo: 'antennes',
    },
    {
      name: 'typeActivite',
      type: 'select',
      options: [
        { label: 'Sensibilisation', value: 'sensibilisation' },
        { label: 'Consultation', value: 'consultation' },
        { label: 'Formation', value: 'formation' },
        { label: 'Distribution', value: 'distribution' },
        { label: 'Cérémonie', value: 'ceremonie' },
        { label: 'Partenariat', value: 'partenariat' },
        { label: 'Événement', value: 'evenement' },
        { label: 'Porte-à-porte', value: 'porte-a-porte' },
        { label: 'Atelier bien-être', value: 'atelier-bien-etre' },
      ],
    },
    {
      name: 'chiffresCles',
      type: 'array',
      fields: [
        { name: 'libelle', type: 'text', localized: true },
        { name: 'valeur', type: 'text' },
      ],
    },
    {
      name: 'articleLie',
      type: 'relationship',
      relationTo: 'articles',
    },
    {
      name: 'miseEnAvant',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
