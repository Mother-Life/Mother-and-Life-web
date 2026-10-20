import type { CollectionConfig } from 'payload'
import { isAdminOrEditor, canReadContent, canPublish } from '@/access/roles'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Catgorie', plural: 'Catgories' },
  admin: { useAsTitle: 'nom' },
  access: {
    read: canReadContent,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: 'nom', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true },
  ],
}

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: { useAsTitle: 'nom' },
  access: {
    read: canReadContent,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: 'nom', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true },
  ],
}
