/**
 * Remet à zéro la base SQLite LOCALE (jamais la production).
 *
 * Quand le schéma du CMS change, Payload tente de mettre à jour la base locale
 * au démarrage ; sur une base déjà remplie, SQLite peut échouer à mi-chemin
 * (« index ... already exists ») et /admin répond 500. Une base neuve, elle,
 * est toujours créée proprement. L'ancienne base est mise de côté, pas supprimée.
 *
 * Usage : npm run db:reset   puis   npm run dev   puis ouvrir /admin
 * et créer le premier compte (il devient automatiquement administrateur).
 */
import fs from 'node:fs'
import path from 'node:path'

const adapter = process.env.DATABASE_ADAPTER || 'sqlite'
if (adapter !== 'sqlite') {
  console.error(`DATABASE_ADAPTER=${adapter} : ce script ne concerne que la base SQLite locale.`)
  process.exit(1)
}

const dossier = process.cwd()
const fichiers = ['motherandlife.db', 'motherandlife.db-wal', 'motherandlife.db-shm'].filter((f) =>
  fs.existsSync(path.join(dossier, f)),
)

if (fichiers.length === 0) {
  console.log('Aucune base locale trouvée : rien à faire.')
  process.exit(0)
}

const horodatage = new Date().toISOString().replace(/[:.]/g, '-')
const sauvegarde = path.join(dossier, '.local-backups', horodatage)
fs.mkdirSync(sauvegarde, { recursive: true })
for (const f of fichiers) fs.renameSync(path.join(dossier, f), path.join(sauvegarde, f))

console.log(`Ancienne base mise de côté dans .local-backups/${horodatage}/`)
console.log('Lancez maintenant : npm run dev  puis ouvrez http://localhost:3000/admin')
