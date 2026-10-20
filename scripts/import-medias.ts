/**
 * Import medias from CSV (spec §4.4)
 * CSV columns: filename, altFr, altEn, type, pilier, album, consentement, datePrise
 * Run: npm run import:medias -- path/to/medias.csv
 */
import { readFileSync } from 'fs'
import { getPayload } from 'payload'
import config from '../src/payload.config'

type CsvRow = {
  filename: string
  altFr: string
  altEn: string
  type: string
  pilier: string
  album: string
  consentement: string
  datePrise: string
}

function parseCsv(content: string): CsvRow[] {
  const lines = content.trim().split('\n')
  const headers = lines[0].split(',').map((h) => h.trim())
  return lines.slice(1).map((line) => {
    const values = line.split(',').map((v) => v.trim())
    const row: Record<string, string> = {}
    headers.forEach((h, i) => { row[h] = values[i] || '' })
    return row as CsvRow
  })
}

async function importMedias() {
  const csvPath = process.argv[2]
  if (!csvPath) {
    console.error('Usage: npm run import:medias -- <path-to-csv>')
    process.exit(1)
  }

  const payload = await getPayload({ config })
  const rows = parseCsv(readFileSync(csvPath, 'utf-8'))

  for (const row of rows) {
    console.log(`Importing: ${row.filename}`)
    // Actual file upload would use payload.create with file path
    // This skeleton logs the mapping for manual verification
    await payload.create({
      collection: 'media',
      data: {
        alt: row.altFr,
        type: row.type as 'activite',
        consentement: row.consentement as 'absent',
        contientMineur: false,
        usageAutorise: ['web'],
        qualite: 'exploitable',
        datePrise: row.datePrise,
      },
      // file: row.filename  requires actual file on disk
    }).catch((err) => console.warn(`Skipped ${row.filename}:`, err.message))
  }

  console.log(`Processed ${rows.length} rows.`)
  process.exit(0)
}

importMedias().catch((err) => {
  console.error(err)
  process.exit(1)
})
