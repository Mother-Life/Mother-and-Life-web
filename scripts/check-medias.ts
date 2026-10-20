/**
 * Audit medias collection (spec §4.4 step 5)
 * Run: npm run check:medias
 */
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function checkMedias() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: 'media', limit: 1000 })

  const issues: string[] = []

  for (const doc of docs) {
    const id = doc.id
    if (!doc.alt) issues.push(`[${id}] Missing alt text`)
    if (!doc.consentement || doc.consentement === 'absent') {
      if (['activite', 'portrait', 'evenement'].includes(doc.type as string)) {
        issues.push(`[${id}] Missing consentement for type ${doc.type}`)
      }
    }
    if (doc.contientMineur && doc.consentement !== 'ecrit') {
      issues.push(`[${id}] Minor without written consent`)
    }
    if (doc.filesize && doc.filesize > 400 * 1024) {
      issues.push(`[${id}] File exceeds 400KB (${Math.round(doc.filesize / 1024)}KB)`)
    }
  }

  if (issues.length === 0) {
    console.log(`All ${docs.length} media items passed audit.`)
  } else {
    console.log(`Found ${issues.length} issues:`)
    issues.forEach((i) => console.log(`  - ${i}`))
  }

  process.exit(issues.length > 0 ? 1 : 0)
}

checkMedias().catch((err) => {
  console.error(err)
  process.exit(1)
})
