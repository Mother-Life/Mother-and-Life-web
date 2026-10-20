import type { CollectionConfig } from 'payload'
import { canReadPublished, isAdminOrEditor, isAdminEditorOrFinance, financeFieldUpdate } from '@/access/roles'
import { mediaPubliable } from '@/access/media'
import { motPresentDansTitre } from '@/lib/validation'

/**
 * Campagnes de collecte (ex. Panier de vie 2026).
 * L'équipe éditoriale rédige ; le rôle Finance met à jour le compteur d'unités financées.
 * Les équivalents en euros sont calculés par le site (taux fixe), jamais saisis.
 */
export const Campagnes: CollectionConfig = {
  slug: 'campagnes',
  labels: { singular: 'Campagne', plural: 'Campagnes' },
  admin: {
    useAsTitle: 'titre',
    defaultColumns: ['titre', 'statut', 'dateEvenement', 'unitesFinancees', 'objectifUnites'],
    description: 'Une campagne « en cours » s’affiche automatiquement sur l’accueil, sauf si une autre est choisie dans Accueil › Campagne.',
  },
  versions: { drafts: true },
  access: {
    read: canReadPublished,
    create: isAdminOrEditor,
    update: isAdminEditorOrFinance,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'titre', type: 'text', required: true, localized: true, maxLength: 60, admin: { width: '60%', description: 'Ex. : Panier de vie 2026' } },
        { name: 'motColore', label: 'Mot coloré', type: 'text', localized: true, validate: motPresentDansTitre, admin: { width: '40%', description: 'Un mot du titre mis en couleur. Ex. : vie' } },
      ],
    },
    { name: 'slug', type: 'text', required: true, unique: true, index: true, admin: { description: 'Adresse de la page. Ex. : panier-de-vie-2026' } },
    {
      name: 'statut',
      type: 'select',
      required: true,
      defaultValue: 'preparation',
      options: [
        { label: 'En préparation', value: 'preparation' },
        { label: 'En cours', value: 'en-cours' },
        { label: 'Terminée', value: 'terminee' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'dateEvenement', label: 'Date de l’événement', type: 'date', admin: { position: 'sidebar' } },
    { name: 'lieu', type: 'text', localized: true, admin: { position: 'sidebar', description: 'Ex. : Douala' } },
    { name: 'resume', label: 'Résumé', type: 'textarea', localized: true, maxLength: 240, admin: { description: 'Une ou deux phrases, affichées sur l’accueil.' } },
    { name: 'image', type: 'upload', relationTo: 'media', filterOptions: mediaPubliable },
    {
      type: 'collapsible',
      label: 'Objectif et compteur',
      fields: [
        {
          name: 'unite',
          type: 'group',
          admin: { description: 'Ce que finance un don. Ex. : panier / paniers' },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'singulier', type: 'text', localized: true, defaultValue: 'panier' },
                { name: 'pluriel', type: 'text', localized: true, defaultValue: 'paniers' },
              ],
            },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'coutUnitaire', label: 'Coût d’une unité (FCFA)', type: 'number', required: true, min: 0, admin: { width: '33%', description: 'Ex. : 40000' } },
            { name: 'objectifUnites', label: 'Objectif (unités)', type: 'number', required: true, min: 1, admin: { width: '33%', description: 'Ex. : 100' } },
            {
              name: 'unitesFinancees',
              label: 'Unités financées',
              type: 'number',
              min: 0,
              defaultValue: 0,
              access: { create: financeFieldUpdate, update: financeFieldUpdate },
              admin: { width: '33%', description: 'Mis à jour par le rôle Finance.' },
            },
          ],
        },
      ],
    },
    {
      name: 'paliers',
      label: 'Montants proposés',
      type: 'array',
      maxRows: 3,
      admin: { description: 'Trois montants au plus. Le montant libre est toujours proposé en plus.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'montant', label: 'Montant (FCFA)', type: 'number', required: true, min: 0 },
            { name: 'libelle', label: 'Ce que ça finance', type: 'text', localized: true, maxLength: 40 },
          ],
        },
      ],
    },
    {
      name: 'contenuUnite',
      label: 'Contenu d’une unité',
      type: 'array',
      admin: { description: 'Ex. : riz, huile, savon, layette…' },
      fields: [{ name: 'libelle', type: 'text', localized: true, required: true }],
    },
    { name: 'contenu', type: 'richText', localized: true },
    { name: 'partenaires', type: 'relationship', relationTo: 'partenaires', hasMany: true },
    { name: 'albumApres', label: 'Album après l’événement', type: 'relationship', relationTo: 'albums' },
  ],
}
