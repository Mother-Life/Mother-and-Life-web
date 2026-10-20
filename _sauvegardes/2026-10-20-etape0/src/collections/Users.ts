import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, canReadContent } from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    maxLoginAttempts: 5,
    lockTime: 600 * 1000,
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
        { label: 'diteur', value: 'editeur' },
        { label: 'Rdacteur', value: 'redacteur' },
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
