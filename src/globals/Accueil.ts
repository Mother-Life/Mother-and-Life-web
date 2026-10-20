import type { Field, GlobalConfig, Tab } from 'payload'
import { isAdminOrEditor } from '@/access/roles'
import { mediaPubliable } from '@/access/media'
import { motPresentDansTitre } from '@/lib/validation'

/**
 * Accueil : sections dans un ordre fixe (celui de la maquette validée).
 * Chaque section a sa case « Afficher » ; les textes sont traduits champ par champ,
 * la structure (photos, liens, choix) est commune aux deux langues.
 * Les chiffres viennent de « Chiffres clés », la campagne de la collection Campagnes.
 */

const afficher: Field = {
  name: 'afficher',
  label: 'Afficher cette section',
  type: 'checkbox',
  defaultValue: true,
}

const texte = (name: string, label: string, maxLength?: number, description?: string): Field => ({
  name,
  label,
  type: 'text',
  localized: true,
  ...(maxLength ? { maxLength } : {}),
  ...(description ? { admin: { description } } : {}),
})

const zoneTexte = (name: string, label: string, maxLength?: number, description?: string): Field => ({
  name,
  label,
  type: 'textarea',
  localized: true,
  ...(maxLength ? { maxLength } : {}),
  ...(description ? { admin: { description } } : {}),
})

const lien = (name: string, label: string): Field => ({
  name,
  label,
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'libelle', label: 'Texte du bouton', type: 'text', localized: true, maxLength: 32, admin: { width: '50%' } },
        { name: 'url', label: 'Lien', type: 'text', admin: { width: '50%', description: 'Ex. : /faire-un-don' } },
      ],
    },
  ],
})

const photo = (name: string, label: string, description?: string): Field => ({
  name,
  label,
  type: 'upload',
  relationTo: 'media',
  filterOptions: mediaPubliable,
  ...(description ? { admin: { description } } : {}),
})

const onglet = (name: string, label: string, description: string, fields: Field[]): Tab => ({
  name,
  label,
  description,
  fields: [afficher, ...fields],
})

export const Accueil: GlobalConfig = {
  slug: 'home',
  label: 'Accueil',
  versions: { drafts: true },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        onglet('hero', '1 · Ouverture', 'Le grand visuel en haut de page.', [
          texte('surtitre', 'Surtitre', 40, 'Ex. : Association · Douala'),
          texte('titre', 'Titre', 60),
          {
            name: 'motSouligne',
            label: 'Mot souligné',
            type: 'text',
            localized: true,
            maxLength: 30,
            validate: motPresentDansTitre,
            admin: { description: 'Un mot ou groupe de mots du titre, souligné au pinceau.' },
          },
          zoneTexte('sousTitre', 'Sous-titre', 220),
          lien('boutonPrincipal', 'Bouton principal'),
          lien('lienSecondaire', 'Lien secondaire'),
          photo('image', 'Photo', 'Photo verticale de préférence. Placer le point focal sur les visages.'),
          texte('annotation', 'Annotation manuscrite', 60, 'Petit mot écrit à la main près de la photo (police Caveat).'),
        ]),
        onglet('troisPortes', '2 · Trois portes', 'Les trois façons d’entrer : être accompagnée, donner, rejoindre.', [
          {
            name: 'portes',
            type: 'array',
            minRows: 3,
            maxRows: 3,
            labels: { singular: 'Porte', plural: 'Portes' },
            fields: [
              {
                name: 'icone',
                label: 'Icône',
                type: 'select',
                required: true,
                options: [
                  { label: 'Être accompagnée (mains)', value: 'accompagnee' },
                  { label: 'Faire un don (cœur)', value: 'don' },
                  { label: 'Nous rejoindre (groupe)', value: 'rejoindre' },
                ],
              },
              texte('titre', 'Titre', 30),
              zoneTexte('texte', 'Texte', 140),
              lien('lien', 'Lien'),
            ],
          },
        ]),
        onglet('preuve', '3 · Preuve', 'Le bloc chiffres et photos. Les 4 chiffres se règlent dans « Chiffres clés ».', [
          texte('surtitre', 'Surtitre', 40),
          texte('titre', 'Titre', 80),
          zoneTexte('texte', 'Texte', 320),
          photo('photoPrincipale', 'Photo principale'),
          photo('photoSecondaire', 'Photo secondaire'),
          {
            name: 'badge',
            type: 'group',
            fields: [
              {
                type: 'row',
                fields: [
                  { name: 'valeur', label: 'Valeur', type: 'text', maxLength: 10, admin: { width: '30%', description: 'Ex. : 10 ans' } },
                  { name: 'libelle', label: 'Libellé', type: 'text', localized: true, maxLength: 40, admin: { width: '70%' } },
                ],
              },
            ],
          },
          lien('lien', 'Lien'),
        ]),
        onglet('bandeau', '4 · Bandeau défilant', 'Les mots défilants reprennent les axes d’action.', []),
        onglet('troisAxes', '5 · Trois axes', 'Les cartes viennent de la collection « Axes d’action ».', [
          texte('surtitre', 'Surtitre', 40),
          texte('titre', 'Titre', 80),
          zoneTexte('texte', 'Texte', 240),
          {
            name: 'axeMisEnAvant',
            label: 'Axe mis en avant',
            type: 'relationship',
            relationTo: 'piliers',
            admin: { description: 'Cette carte est affichée en grand.' },
          },
        ]),
        onglet('histoire', '6 · Une histoire', 'Une histoire réelle, avec consentement vérifié.', [
          texte('surtitre', 'Surtitre', 40),
          {
            name: 'temoignage',
            label: 'Histoire',
            type: 'relationship',
            relationTo: 'temoignages',
            filterOptions: { consentementVerifie: { equals: true } },
            admin: { description: 'Seules les histoires au consentement vérifié sont proposées.' },
          },
          photo('photo', 'Photo', 'Facultatif : remplace la photo de l’histoire.'),
          lien('lien', 'Lien'),
        ]),
        onglet('campagne', '7 · Campagne', 'Vide = la campagne « en cours » la plus proche s’affiche toute seule.', [
          texte('surtitre', 'Surtitre', 40, 'Ex. : Campagne en cours'),
          {
            name: 'campagne',
            type: 'relationship',
            relationTo: 'campagnes',
            filterOptions: { statut: { not_equals: 'preparation' } },
          },
        ]),
        onglet('actualites', '8 · Actualités', 'Les derniers articles et un album photo.', [
          texte('surtitre', 'Surtitre', 40),
          texte('titre', 'Titre', 80),
          {
            name: 'mode',
            type: 'select',
            defaultValue: 'auto',
            options: [
              { label: 'Automatique : les 3 derniers articles publiés', value: 'auto' },
              { label: 'Manuel : je choisis les articles', value: 'manuel' },
            ],
          },
          {
            name: 'articles',
            type: 'relationship',
            relationTo: 'articles',
            hasMany: true,
            maxRows: 3,
            admin: { condition: (_, s) => s?.mode === 'manuel' },
          },
          {
            name: 'albumPhare',
            label: 'Album phare',
            type: 'relationship',
            relationTo: 'albums',
            admin: { description: 'Vide = le dernier album publié.' },
          },
        ]),
        onglet('partenaires', '9 · Partenaires', 'Logos des partenaires cochés « Afficher sur l’accueil » et dont l’accord est signé.', [
          texte('surtitre', 'Surtitre', 40, 'Ex. : Ils nous accompagnent'),
        ]),
      ],
    },
  ],
}
