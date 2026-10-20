import type { CollectionConfig } from 'payload'
import { isAdminOrEditor, canReadPublished } from '@/access/roles'
import { contentBlocks } from '@/blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'titre',
    defaultColumns: ['titre', 'slug', 'updatedAt'],
  },
  versions: { drafts: true },
  access: {
    read: canReadPublished,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: 'titre', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, localized: true },
    {
      name: 'chapo',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'contenu',
      type: 'blocks',
      blocks: contentBlocks,
      localized: true,
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      localized: true,
    },
  ],
}
