/**
 * Cree le premier utilisateur admin Payload.
 * Run: npm run create-admin
 */
import { getPayload } from 'payload'
import config from '../src/payload.config'

const email = process.env.ADMIN_EMAIL || 'admin@motherandlife.org'
const password = process.env.ADMIN_PASSWORD

if (!password || password.length < 12) {
  console.error('ADMIN_PASSWORD doit etre defini dans .env (12 caracteres minimum).')
  process.exit(1)
}

async function main() {
  const payload = await getPayload({ config })

  const existing = await payload.find({ collection: 'users', limit: 1 })
  if (existing.totalDocs > 0) {
    console.log('Un utilisateur existe deja. Connectez-vous sur /admin')
    process.exit(0)
  }

  await payload.create({
    collection: 'users',
    data: {
      email,
      password,
      prenom: 'Admin',
      nom: 'Mother & Life',
      role: 'admin',
      actif: true,
    },
  })

  console.log('Compte admin cree avec succes.')
  console.log(`  URL   : http://localhost:3000/admin`)
  console.log(`  Email : ${email}`)
  console.log(`  Mot de passe : (voir ADMIN_PASSWORD dans .env)`)
  process.exit(0)
}

main().catch((err) => {
  console.error('\nEchec :', err?.message || err)
  console.error('\nVerifiez que PostgreSQL tourne et que DATABASE_URI dans .env est correct.')
  process.exit(1)
})
