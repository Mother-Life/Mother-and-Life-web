/**
 * Seed script  populates Payload with initial data (spec 3, 10.2)
 * Run: npm run seed (requires DATABASE_URI)
 */
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function seed() {
  const payload = await getPayload({ config })

  const piliers = [
    { nom: 'Prvenir', slug: 'prevenir', couleur: 'bleu' as const, accroche: 'Informer sans tabou' },
    { nom: 'Accompagner', slug: 'accompagner', couleur: 'rose' as const, accroche: 'Suivre chaque grossesse, gratuitement' },
    { nom: "Renforcer l'autonomie", slug: 'autonomie', couleur: 'vert' as const, accroche: 'Un mtier, une autonomie' },
  ]

  for (const pilier of piliers) {
    const existing = await payload.find({ collection: 'piliers', where: { slug: { equals: pilier.slug } } })
    if (existing.docs.length === 0) {
      await payload.create({ collection: 'piliers', data: pilier })
      console.log(`Created pilier: ${pilier.slug}`)
    }
  }

  const antennes = [
    { nom: 'Bpanda-Omnisports', ville: 'Douala', statut: 'active' as const, ordre: 1 },
    { nom: 'Bati', ville: 'Bati', statut: 'active' as const, ordre: 2 },
    { nom: 'Bafandji', ville: 'Bafandji', statut: 'active' as const, ordre: 3 },
  ]

  for (const antenne of antennes) {
    const existing = await payload.find({ collection: 'antennes', where: { nom: { equals: antenne.nom } } })
    if (existing.docs.length === 0) {
      await payload.create({ collection: 'antennes', data: antenne })
      console.log(`Created antenne: ${antenne.nom}`)
    }
  }

  await payload.updateGlobal({
    slug: 'organisation',
    data: {
      denomination: 'Association Mother and Life',
      baseline: 'La maternit positive',
      numeroEnregistrement: 'N 460/2022/RDA/C19/SAAJP',
      siege: 'Bpanda-Omnisports, Douala, Cameroun',
      telephones: [{ numero: '+237 656 27 96 70' }, { numero: '+237 677 38 94 63' }],
      email: 'motherandlife22@gmail.com',
      siteWeb: 'motherandlife.org',
      whatsapp: '237677389463',
      banque: 'CCA',
    },
  })

  await payload.updateGlobal({
    slug: 'chiffresCles',
    data: {
      chiffres: [
        { cle: 'femmesSuivies', valeur: '75', libelle: 'femmes suivies', source: 'Prsentation sept. 2026', dateMiseAJour: '2026-09-01', afficherAccueil: true },
        { cle: 'naissances', valeur: '36', libelle: 'naissances accompagnes', source: 'Prsentation sept. 2026', dateMiseAJour: '2026-09-01', afficherAccueil: true },
        { cle: 'etablissementsScolaires', valeur: '40', libelle: 'tablissements scolaires touchs', source: 'Prsentation sept. 2026', dateMiseAJour: '2026-09-01', afficherAccueil: true },
        { cle: 'interventions', valeur: '12 000+', libelle: 'interventions communautaires', source: 'Prsentation sept. 2026', dateMiseAJour: '2026-09-01', afficherAccueil: true },
      ],
    },
  })

  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
