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
import { globals } from '@/globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const useS3 =
  Boolean(process.env.S3_BUCKET) &&
  Boolean(process.env.S3_ACCESS_KEY_ID) &&
  Boolean(process.env.S3_SECRET_ACCESS_KEY)

const usePostgres = process.env.DATABASE_ADAPTER === 'postgres'

export default buildConfig({
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
    Services,
    Temoignages,
    Partenaires,
    Rapports,
    Dons,
    Messages,
    Candidatures,
    Abonnes,
    StatistiquesExternes,
  ],
  globals,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-in-production-min-32',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: usePostgres
    ? postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URI || '',
        },
        push: process.env.NODE_ENV !== 'production',
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
