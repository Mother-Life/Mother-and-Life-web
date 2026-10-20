import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const repoRoot = path.join(import.meta.dirname, '..', '..')
const landingRoot = path.join(import.meta.dirname, '..')
const outDir = path.join(landingRoot, 'public', 'assets')

type AssetJob = {
  fileName: string
  name: string
  width: number
  quality?: number
}

const jobs: AssetJob[] = [
  { fileName: 'photo_1_2026-09-08_22-25-39.jpg', name: 'hero-home', width: 2000 },
  { fileName: 'photo_14_2026-09-08_22-25-40.jpg', name: 'pillar-prevenir', width: 1200 },
  { fileName: 'photo_10_2026-09-08_22-25-40.jpg', name: 'pillar-accompagner', width: 1200 },
  { fileName: 'photo_20_2026-09-08_22-25-40.jpg', name: 'pillar-autonomie', width: 1200 },
  { fileName: 'photo_11_2026-09-08_22-25-40.jpg', name: 'news-journee-1000', width: 800 },
  { fileName: 'photo_17_2026-09-08_22-25-40.jpg', name: 'news-partenariat-gavi', width: 800 },
  { fileName: 'photo_18_2026-09-08_22-25-40.jpg', name: 'news-sensibilisation-cancers', width: 800 },
  { fileName: 'photo_12_2026-09-08_22-25-40.jpg', name: 'album-porte-a-porte', width: 800 },
  { fileName: 'photo_13_2026-09-08_22-25-40.jpg', name: 'album-permanence', width: 800 },
  { fileName: 'photo_15_2026-09-08_22-25-40.jpg', name: 'album-journee-dans-leau', width: 800 },
]

function findFile(fileName: string): string | null {
  const searchRoots = [
    path.join(repoRoot, 'Photos'),
    path.join(repoRoot, 'Landing', 'Images'),
  ]

  for (const root of searchRoots) {
    if (!fs.existsSync(root)) continue
    const stack = [root]
    while (stack.length > 0) {
      const current = stack.pop()!
      for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
        const fullPath = path.join(current, entry.name)
        if (entry.isDirectory()) {
          if (!entry.name.includes('accouchement')) stack.push(fullPath)
          continue
        }
        if (entry.name === fileName) return fullPath
      }
    }
  }

  return null
}

async function optimize(job: AssetJob) {
  const input = findFile(job.fileName)
  if (!input) {
    console.warn(`skip missing: ${job.fileName}`)
    return
  }

  const output = path.join(outDir, `${job.name}.webp`)
  await sharp(input)
    .rotate()
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality ?? 82 })
    .toFile(output)

  const stats = fs.statSync(output)
  console.log(`ok ${job.name}.webp (${Math.round(stats.size / 1024)} Ko)`)
}

async function copyLogo() {
  const svgSource = path.join(repoRoot, 'Logo/Assets/Logo_mother_and_life_vertical 1.svg')
  const svgDest = path.join(outDir, 'logo.svg')
  fs.copyFileSync(svgSource, svgDest)
  console.log('ok logo.svg')

  const favSource = path.join(repoRoot, 'Logo/Assets/mother_and_life_logo_fav 2.png')
  const iconDest = path.join(landingRoot, 'src', 'app', 'icon.png')
  const appleDest = path.join(landingRoot, 'src', 'app', 'apple-icon.png')
  const favPublic = path.join(landingRoot, 'public', 'favicon.ico')

  await sharp(favSource).resize(512, 512, { fit: 'contain', background: '#101828' }).png().toFile(iconDest)
  await sharp(favSource).resize(180, 180, { fit: 'contain', background: '#101828' }).png().toFile(appleDest)
  await sharp(favSource).resize(32, 32, { fit: 'contain', background: '#101828' }).toFile(favPublic)
  console.log('ok icon.png, apple-icon.png, favicon.ico')
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true })
  for (const job of jobs) {
    await optimize(job)
  }
  await copyLogo()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
