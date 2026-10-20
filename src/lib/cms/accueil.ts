import 'server-only'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'
import type { Album as AlbumCms, Article as ArticleCms, Campagne as CampagneCms, Home, Pilier } from '@/payload-types'
import { accueilParDefaut } from '@/lib/content/fallback'
import type {
  Album,
  Article,
  Axe,
  Campagne,
  CarteAxe,
  Chiffre,
  HomeContent,
  Lien,
  Partenaire,
} from '@/lib/content/types'
import type { Locale } from '@/lib/i18n/config'
import { getPayloadClient } from '@/lib/payload'
import { CMS_REVALIDATE_SECONDS, CMS_TAG } from './cache'
import { peuple, texte, versImage, type Relation } from './media'

const AXE_PAR_COULEUR: Record<Pilier['couleur'], Axe> = { rose: 'accompagner', bleu: 'prevenir', vert: 'autonomie' }

function axeDe(pilier: Relation<Pilier>): Axe | null {
  const p = peuple(pilier)
  return p ? (p.picto ?? AXE_PAR_COULEUR[p.couleur]) : null
}

function chemin(locale: Locale, path: string) {
  return locale === 'fr' ? path : `/en${path === '/' ? '' : path}`
}

function lienDe(source: { libelle?: string | null; url?: string | null } | undefined, secours: Lien): Lien {
  return { libelle: texte(source?.libelle, secours.libelle), href: texte(source?.url, secours.href) }
}

function versCampagne(c: CampagneCms, surtitre: string, lienSecours: Lien, locale: Locale): Campagne {
  return {
    surtitre,
    titre: c.titre,
    motColore: c.motColore ?? undefined,
    resume: c.resume ?? '',
    unite: {
      singulier: texte(c.unite?.singulier, locale === 'fr' ? 'panier' : 'basket'),
      pluriel: texte(c.unite?.pluriel, locale === 'fr' ? 'paniers' : 'baskets'),
    },
    coutUnitaire: c.coutUnitaire,
    objectifUnites: c.objectifUnites,
    unitesFinancees: Math.min(c.unitesFinancees ?? 0, c.objectifUnites),
    paliers: (c.paliers ?? []).map((p) => ({ montant: p.montant, libelle: p.libelle ?? undefined })),
    lien: { libelle: lienSecours.libelle, href: chemin(locale, `/campagnes/${c.slug}`) },
  }
}

function versArticle(a: ArticleCms, locale: Locale): Article | null {
  const image = versImage(a.couverture)
  if (!image) return null
  const categorie = peuple(a.categorie as Relation<{ nom: string }>)
  return {
    categorie: categorie?.nom ?? '',
    titre: a.titre,
    href: chemin(locale, `/actualites/${a.slug}`),
    image: { ...image, alt: '' },
  }
}

function versAlbum(a: AlbumCms, locale: Locale): Album | null {
  const image = versImage(a.couverture, a.titre)
  return image ? { titre: a.titre, resume: a.resume ?? '', href: chemin(locale, `/albums/${a.slug}`), image } : null
}

async function chargerAccueil(locale: Locale): Promise<HomeContent> {
  const defaut = accueilParDefaut(locale)
  const payload = await getPayloadClient()
  const lecture = { locale, overrideAccess: false, depth: 2 } as const

  const home: Home = await payload.findGlobal({ slug: 'home', ...lecture })
  // Accueil jamais enregistré dans l'admin : on montre la maquette validée.
  if (!home.updatedAt) return defaut

  const [piliers, chiffres, campagnesEnCours, articlesRecents, albumsRecents, partenaires] = await Promise.all([
    payload.find({ collection: 'piliers', ...lecture, depth: 0, sort: 'ordre', limit: 3 }),
    payload.findGlobal({ slug: 'chiffresCles', ...lecture, depth: 1 }),
    home.campagne?.campagne
      ? null
      : payload.find({
          collection: 'campagnes',
          ...lecture,
          where: { statut: { equals: 'en-cours' } },
          sort: 'dateEvenement',
          limit: 1,
        }),
    home.actualites?.mode === 'manuel'
      ? null
      : payload.find({ collection: 'articles', ...lecture, sort: '-datePublication', limit: 3 }),
    home.actualites?.albumPhare
      ? null
      : payload.find({ collection: 'albums', ...lecture, sort: '-dateDebut', limit: 1 }),
    payload.find({
      collection: 'partenaires',
      ...lecture,
      depth: 1,
      sort: 'ordre',
      limit: 12,
      where: {
        and: [{ actif: { equals: true } }, { accordSigne: { equals: true } }, { afficherAccueil: { equals: true } }],
      },
    }),
  ])

  const { hero, troisPortes, preuve, bandeau, troisAxes, histoire, campagne, actualites } = home

  const cartes: CarteAxe[] = piliers.docs.length
    ? piliers.docs.map((p) => ({
        axe: axeDe(p) ?? 'accompagner',
        titre: p.nom,
        description: texte(p.descriptionCourte, p.accroche ?? ''),
        lien: {
          libelle: locale === 'fr' ? 'En savoir plus' : 'Learn more',
          href: texte(p.lienPage, chemin(locale, `/nos-actions#${p.slug}`)),
        },
      }))
    : defaut.axes.cartes

  const chiffresAccueil: Chiffre[] = (chiffres.chiffres ?? [])
    .filter((c) => c.afficherAccueil)
    .slice(0, 4)
    .map((c, i) => ({
      valeur: c.valeur,
      libelle: c.libelle,
      axe: axeDe(c.pilier) ?? (i % 2 ? 'prevenir' : 'autonomie'),
    }))

  const temoignage = peuple(histoire?.temoignage)
  const campagneCms = peuple(campagne?.campagne) ?? campagnesEnCours?.docs[0] ?? null
  const articles = (
    actualites?.mode === 'manuel' ? (actualites.articles ?? []).map((a) => peuple(a)) : (articlesRecents?.docs ?? [])
  )
    .flatMap((a) => (a ? [versArticle(a, locale)] : []))
    .filter((a): a is Article => a !== null)
    .slice(0, 3)
  const albumCms = peuple(actualites?.albumPhare) ?? albumsRecents?.docs[0] ?? null
  const logos: Partenaire[] = partenaires.docs.flatMap((p) => {
    const logo = versImage(p.logo, p.nom)
    return logo ? [{ nom: p.nom, logo, href: p.siteWeb ?? undefined }] : []
  })

  return {
    hero: {
      afficher: hero?.afficher ?? true,
      surtitre: texte(hero?.surtitre, defaut.hero.surtitre),
      titre: texte(hero?.titre, defaut.hero.titre),
      motSouligne: hero?.titre ? (hero.motSouligne ?? undefined) : defaut.hero.motSouligne,
      sousTitre: texte(hero?.sousTitre, defaut.hero.sousTitre),
      boutonPrincipal: lienDe(hero?.boutonPrincipal, defaut.hero.boutonPrincipal),
      lienSecondaire: lienDe(hero?.lienSecondaire, defaut.hero.lienSecondaire),
      image: versImage(hero?.image) ?? defaut.hero.image,
      annotation: hero?.annotation?.trim() || undefined,
    },
    portes: {
      afficher: troisPortes?.afficher ?? true,
      titre: defaut.portes.titre,
      items:
        troisPortes?.portes?.length === 3
          ? troisPortes.portes.map((p, i) => ({
              icone: p.icone,
              titre: texte(p.titre, defaut.portes.items[i].titre),
              texte: texte(p.texte, defaut.portes.items[i].texte),
              lien: lienDe(p.lien, defaut.portes.items[i].lien),
            }))
          : defaut.portes.items,
    },
    preuve: {
      afficher: preuve?.afficher ?? true,
      surtitre: texte(preuve?.surtitre, defaut.preuve.surtitre),
      titre: texte(preuve?.titre, defaut.preuve.titre),
      texte: texte(preuve?.texte, defaut.preuve.texte),
      lien: lienDe(preuve?.lien, defaut.preuve.lien),
      photoPrincipale: versImage(preuve?.photoPrincipale) ?? defaut.preuve.photoPrincipale,
      photoSecondaire: versImage(preuve?.photoSecondaire) ?? defaut.preuve.photoSecondaire,
      badge: preuve?.badge?.valeur?.trim()
        ? { valeur: preuve.badge.valeur.trim(), libelle: texte(preuve.badge.libelle, '') }
        : defaut.preuve.badge,
      chiffres: chiffresAccueil.length ? chiffresAccueil : defaut.preuve.chiffres,
    },
    bandeau: {
      afficher: bandeau?.afficher ?? true,
      mots: piliers.docs.length ? cartes.map((c) => ({ libelle: c.titre, axe: c.axe })) : defaut.bandeau.mots,
    },
    axes: {
      afficher: troisAxes?.afficher ?? true,
      surtitre: texte(troisAxes?.surtitre, defaut.axes.surtitre),
      titre: texte(troisAxes?.titre, defaut.axes.titre),
      texte: texte(troisAxes?.texte, defaut.axes.texte),
      lien: defaut.axes.lien,
      cartes,
      axeMisEnAvant: axeDe(troisAxes?.axeMisEnAvant) ?? defaut.axes.axeMisEnAvant,
    },
    histoire: {
      afficher: (histoire?.afficher ?? true) && Boolean(temoignage?.consentementVerifie),
      surtitre: texte(histoire?.surtitre, defaut.histoire.surtitre),
      histoire: temoignage?.consentementVerifie
        ? {
            citation: texte(temoignage.extrait, temoignage.citation),
            prenom: temoignage.auteurAffiche,
            role: [temoignage.roleAuteur, temoignage.annee].filter(Boolean).join(', '),
          }
        : null,
      lien: lienDe(histoire?.lien, defaut.histoire.lien),
    },
    campagne: {
      afficher: (campagne?.afficher ?? true) && Boolean(campagneCms),
      campagne: campagneCms
        ? versCampagne(
            campagneCms,
            texte(campagne?.surtitre, defaut.campagne.campagne?.surtitre ?? ''),
            defaut.campagne.campagne!.lien,
            locale,
          )
        : null,
      don: defaut.campagne.don,
    },
    actualites: {
      afficher: (actualites?.afficher ?? true) && (articles.length > 0 || Boolean(albumCms)),
      surtitre: texte(actualites?.surtitre, defaut.actualites.surtitre),
      titre: texte(actualites?.titre, defaut.actualites.titre),
      lienTous: defaut.actualites.lienTous,
      album: albumCms ? versAlbum(albumCms, locale) : null,
      articles,
    },
    partenaires: {
      afficher: (home.partenaires?.afficher ?? true) && logos.length > 0,
      surtitre: texte(home.partenaires?.surtitre, defaut.partenaires.surtitre),
      logos,
    },
  }
}

const chargerAccueilEnCache = unstable_cache(chargerAccueil, ['accueil'], {
  tags: [CMS_TAG],
  revalidate: CMS_REVALIDATE_SECONDS,
})

/** Contenu de l'accueil. Base injoignable : maquette validée, sans mise en cache. */
export const getAccueil = cache(async (locale: Locale): Promise<HomeContent> => {
  try {
    return await chargerAccueilEnCache(locale)
  } catch (erreur) {
    console.error('[cms] accueil illisible, contenu par défaut utilisé', erreur)
    return accueilParDefaut(locale)
  }
})
