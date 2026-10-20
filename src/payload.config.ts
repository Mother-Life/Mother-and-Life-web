import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from '@/collections/Users'
import { Piliers } from '@/collections/Piliers'
import { Antennes } from '@/collections/Antennes'
import { Media } from '@/collections/Media'
import { Categories, Tags } from '@/collections/Taxonomies'
import { Pages } from '@/collections/Pages'
import { Articles } from '@/collections/Articles'
import { Albums } from '@/collections/Albums'
import {
  Services,
  Temoignages,
  Partenaires,
  Rapports,
  Dons,
  Messages,
  Candidatures,
  Abonnes,
  StatistiquesExternes,
} from '@/collections/Content'
import { Campagnes } from '@/collections/Campagnes'
import { globals } from '@/globals'
import {
  revalidateAfterChange,
  revalidateAfterDelete,
  revalidateGlobalAfterChange,
} from '@/lib/revalidate'
import { migrations } from './migrations'
import { originesAutorisees } from '@/lib/security/formulaire'
import type { CollectionConfig, GlobalConfig } from 'payload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const useS3 =
  Boolean(process.env.S3_BUCKET) &&
  Boolean(process.env.S3_ACCESS_KEY_ID) &&
  Boolean(process.env.S3_SECRET_ACCESS_KEY)

const usePostgres = process.env.DATABASE_ADAPTER === 'postgres'

// Bloquant 5 : pas de secret de repli en production.
const payloadSecret = process.env.PAYLOAD_SECRET
if (!payloadSecret && process.env.NODE_ENV === 'production') {
  throw new Error('PAYLOAD_SECRET manquant : définir la variable dans l’environnement de production.')
}

// Bloquant 1 : toute publication dans l'admin invalide le cache du site public.
// Les collections privées (comptes, dons, messages, candidatures, abonnés) n'ont pas d'effet sur le site.
const PRIVATE_COLLECTIONS = new Set(['users', 'dons', 'messages', 'candidatures', 'abonnes'])

function withRevalidation(collection: CollectionConfig): CollectionConfig {
  if (PRIVATE_COLLECTIONS.has(collection.slug)) return collection
  return {
    ...collection,
    hooks: {
      ...collection.hooks,
      afterChange: [...(collection.hooks?.afterChange ?? []), revalidateAfterChange],
      afterDelete: [...(collection.hooks?.afterDelete ?? []), revalidateAfterDelete],
    },
  }
}

// Menu de l'admin rangé par métier : chacun retrouve ce qui le concerne.
const GROUPES: Record<string, string> = {
  home: 'Site', navigation: 'Site', settings: 'Site', pages: 'Site',
  articles: 'Contenus', albums: 'Contenus', campagnes: 'Contenus', temoignages: 'Contenus',
  categories: 'Contenus', tags: 'Contenus',
  organisation: 'Association', piliers: 'Association', antennes: 'Association', services: 'Association',
  partenaires: 'Association', rapports: 'Association', chiffresCles: 'Association',
  chaineImpact: 'Association', 'statistiques-externes': 'Association',
  don: 'Dons et contacts', dons: 'Dons et contacts', messages: 'Dons et contacts',
  candidatures: 'Dons et contacts', abonnes: 'Dons et contacts',
  media: 'Médiathèque',
  users: 'Administration',
}

function withGroup<T extends CollectionConfig | GlobalConfig>(config: T): T {
  const group = GROUPES[config.slug]
  return group ? { ...config, admin: { ...config.admin, group } } : config
}

function withGlobalRevalidation(global: GlobalConfig): GlobalConfig {
  return {
    ...global,
    hooks: {
      ...global.hooks,
      afterChange: [...(global.hooks?.afterChange ?? []), revalidateGlobalAfterChange],
    },
  }
}

// Origines autorisées à appeler l'API avec un cookie de session (CSRF) et en CORS.
const origines = originesAutorisees()

export default buildConfig({
  // Durcissement : surface d'API réduite au strict nécessaire.
  graphQL: { disable: true },
  csrf: origines,
  cors: origines,
  // Profondeur maximale des relations peuplées par l'API (le site n'utilise que 0 à 2).
  maxDepth: 3,
  upload: {
    // Garde-fou serveur ; les gros fichiers passent directement par R2 (clientUploads).
    limits: { fileSize: 15_000_000 },
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' \u2014 Mother & Life',
    },
  },
  collections: [
    Users,
    Media,
    Piliers,
    Antennes,
    Categories,
    Tags,
    Pages,
    Articles,
    Albums,
    Campagnes,
    Services,
    Temoignages,
    Partenaires,
    Rapports,
    Dons,
    Messages,
    Candidatures,
    Abonnes,
    StatistiquesExternes,
  ]
    .map(withRevalidation)
    .map(withGroup),
  globals: globals.map(withGlobalRevalidation).map(withGroup),
  editor: lexicalEditor(),
  secret: payloadSecret || 'dev-secret-local-uniquement-jamais-en-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: usePostgres
    ? postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URI || '',
        },
        push: process.env.NODE_ENV !== 'production',
        // En production, le schéma est créé ici : Vercel n'a pas de dossier migrations lisible au runtime.
        prodMigrations: migrations,
      })
    : sqliteAdapter({
        client: {
          url: process.env.DATABASE_URI || 'file:./motherandlife.db',
        },
        wal: true,
      }),
  localization: {
    locales: [
      { label: 'Fran\u00e7ais', code: 'fr' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'fr',
    fallback: true,
  },
  plugins: useS3
    ? [
        s3Storage({
          // Bloquant 3 : envoi direct du navigateur vers R2, pour dépasser la limite de 4,5 Mo de Vercel.
          // Exige une règle CORS sur le bucket R2 (PUT, en-tête If-None-Match).
          clientUploads: true,
          collections: {
            media: {
              prefix: 'media',
              generateFileURL: ({ filename }) => {
                const base = process.env.NEXT_PUBLIC_MEDIA_URL || 'https://media.motherandlife.org'
                return `${base}/${filename}`
              },
            },
          },
          bucket: process.env.S3_BUCKET!,
          config: {
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID!,
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
            },
            region: process.env.S3_REGION || 'auto',
            endpoint: process.env.S3_ENDPOINT,
            forcePathStyle: true,
          },
        }),
      ]
    : [],
  sharp,
})
