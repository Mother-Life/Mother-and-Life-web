import fs from 'node:fs'
import path from 'node:path'

const root = path.join(import.meta.dirname, '..', 'src')

function isValidUtf8(buf: Buffer): boolean {
  try {
    new TextDecoder('utf-8', { fatal: true }).decode(buf)
    return true
  } catch {
    return false
  }
}

let win1252Count = 0
let latin1Count = 0

function walk(dir: string) {
  for (const entry of fs.readdirSync(dir)) {
    const filePath = path.join(dir, entry)
    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath)
      continue
    }
    if (!/\.(ts|tsx|css|scss)$/.test(entry)) continue

    const buf = fs.readFileSync(filePath)

    if (buf.includes(0x97)) {
      const fixed = fs.readFileSync(filePath, 'latin1').replace(/\x97/g, ' \u2014 ')
      fs.writeFileSync(filePath, fixed, 'utf8')
      win1252Count += 1
      console.log('fixed win-1252 dash:', path.relative(root, filePath))
      continue
    }

    if (isValidUtf8(buf)) continue

    const fixed = fs.readFileSync(filePath, 'latin1')
    fs.writeFileSync(filePath, fixed, 'utf8')
    latin1Count += 1
    console.log('converted latin1:', path.relative(root, filePath))
  }
}

walk(root)
console.log(`win-1252 fixed: ${win1252Count}, latin1 converted: ${latin1Count}`)
