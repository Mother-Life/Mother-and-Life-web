import type { CollectionConfig } from 'payload'
import { isAdminOrEditor, canReadPublished } from '@/access/roles'
import { mediaPubliable } from '@/access/media'
import { contentBlocks } from '@/blocks'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'titre',
    defaultColumns: ['titre', 'categorie', 'datePublication', '_status'],
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
        if (data?.contenu) {
          const text = JSON.stringify(data.contenu)
          data.tempsLecture = Math.max(1, Math.ceil(text.length / 1500))
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'titre', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, localized: true },
    {
      name: 'chapo',
      type: 'textarea',
      maxLength: 200,
      localized: true,
    },
    {
      name: 'categorie',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'pilier',
      type: 'relationship',
      relationTo: 'piliers',
      hasMany: true,
    },
    {
      name: 'couverture',
      type: 'upload',
      relationTo: 'media',
      filterOptions: mediaPubliable,
      required: true,
    },
    {
      name: 'contenu',
      type: 'blocks',
      blocks: contentBlocks,
      localized: true,
    },
    {
      name: 'auteur',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'datePublication',
      type: 'date',
      required: true,
    },
    {
      name: 'tempsLecture',
      type: 'number',
      admin: { readOnly: true },
    },
    {
      name: 'albumLie',
      type: 'relationship',
      relationTo: 'albums',
    },
    {
      name: 'articlesLies',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
      maxRows: 3,
    },
    {
      name: 'miseEnAvant',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
