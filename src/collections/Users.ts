import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    maxLoginAttempts: 5,
    lockTime: 600 * 1000,
    // Session de 2 h, prolongée tant que l'admin est actif ; cookie réservé au HTTPS en production.
    tokenExpiration: 2 * 60 * 60,
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'prenom', 'nom', 'role', 'actif'],
  },
  access: {
    read: isAdminOrEditor,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation !== 'create' || !data) return data
        const existants = await req.payload.count({
          collection: 'users',
          overrideAccess: true,
          req,
        })
        if (existants.totalDocs === 0) data.role = 'admin'
        return data
      },
    ],
  },
  fields: [
    {
      name: 'prenom',
      type: 'text',
      required: true,
    },
    {
      name: 'nom',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'lecteur',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Éditeur', value: 'editeur' },
        { label: 'Rédacteur', value: 'redacteur' },
        { label: 'Finance', value: 'finance' },
        { label: 'Lecteur', value: 'lecteur' },
      ],
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'fonction',
      type: 'text',
      localized: true,
    },
    {
      name: 'professionAffichee',
      type: 'text',
      localized: true,
    },
    {
      name: 'publicProfile',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'antenne',
      type: 'relationship',
      relationTo: 'antennes',
    },
    {
      name: 'actif',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
