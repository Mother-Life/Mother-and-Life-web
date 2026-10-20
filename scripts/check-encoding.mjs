/**
 * Detecte les fichiers source qui ne sont pas de l'UTF-8 valide,
 * ceux qui contiennent du mojibake, et ceux qui contiennent des
 * caracteres de remplacement. A lancer avant chaque commit.
 */
import fs from 'node:fs'
import path from 'node:path'

const SKIP = new Set(['node_modules', '.next', '.next-dev', '.git', 'dist'])
const EXT = /\.(ts|tsx|js|mjs|css|md|json)$/

const files = []
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (EXT.test(entry.name)) files.push(full)
  }
}

walk('src')
walk('scripts')

const REPLACEMENT = String.fromCharCode(0xfffd)
const MOJIBAKE = /\u00c3[\u0080-\u00bf]|\u00c2[\u00a0-\u00bf]|\u00e2\u0080/

let failures = 0
for (const file of files) {
  const bytes = fs.readFileSync(file)
  const text = bytes.toString('utf8')
  const problems = []

  if (!Buffer.from(text, 'utf8').equals(bytes)) problems.push('octets non-UTF-8 (probablement Windows-1252)')
  if (text.includes(REPLACEMENT)) problems.push('caractere de remplacement U+FFFD')
  if (MOJIBAKE.test(text)) problems.push('mojibake')

  if (problems.length) {
    failures += 1
    console.error(`${file}\n  -> ${problems.join(', ')}`)
  }
}

if (failures) {
  console.error(`\n${failures} fichier(s) a corriger sur ${files.length} analyses.`)
  process.exit(1)
}
console.log(`Encodage OK : ${files.length} fichiers valides en UTF-8.`)
