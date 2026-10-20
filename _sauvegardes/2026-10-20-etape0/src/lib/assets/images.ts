export type SiteImageKey =
  | 'hero-home'
  | 'pillar-prevenir'
  | 'pillar-accompagner'
  | 'pillar-autonomie'
  | 'news-journee-1000'
  | 'news-partenariat-gavi'
  | 'news-sensibilisation-cancers'
  | 'album-porte-a-porte'
  | 'album-permanence'
  | 'album-journee-dans-leau'

type SiteImage = {
  src: string
  alt: { fr: string; en: string }
  width: number
  height: number
}

/**
 * `width` et `height` doivent correspondre aux dimensions reelles des fichiers.
 * Next s'en sert pour reserver le ratio et eviter les sauts de mise en page.
 * Verification : `node scripts/check-image-dimensions.mjs`
 */
export const siteImages: Record<SiteImageKey, SiteImage> = {
  'hero-home': {
    src: '/assets/hero-home.webp',
    alt: {
      fr: 'M\u00e8re et nouveau-n\u00e9 accompagn\u00e9s par Mother & Life \u00e0 Douala',
      en: 'Mother and newborn supported by Mother & Life in Douala',
    },
    width: 810,
    height: 1080,
  },
  'pillar-prevenir': {
    src: '/assets/pillar-prevenir.webp',
    alt: {
      fr: 'S\u00e9ance de sensibilisation en milieu scolaire',
      en: 'Awareness session in a school setting',
    },
    width: 721,
    height: 1280,
  },
  'pillar-accompagner': {
    src: '/assets/pillar-accompagner.webp',
    alt: {
      fr: 'Consultation pr\u00e9natale \u00e0 la permanence de B\u00e9panda',
      en: 'Prenatal consultation at the B\u00e9panda clinic',
    },
    width: 721,
    height: 1280,
  },
  'pillar-autonomie': {
    src: '/assets/pillar-autonomie.webp',
    alt: {
      fr: 'Atelier de formation pour jeunes m\u00e8res',
      en: 'Training workshop for young mothers',
    },
    width: 1200,
    height: 675,
  },
  'news-journee-1000': {
    src: '/assets/news-journee-1000.webp',
    alt: {
      fr: 'Journ\u00e9e des 1000 premiers jours avec les parents',
      en: 'First 1,000 days event with parents',
    },
    width: 563,
    height: 1000,
  },
  'news-partenariat-gavi': {
    src: '/assets/news-partenariat-gavi.webp',
    alt: {
      fr: 'Action de vaccination communautaire',
      en: 'Community vaccination outreach',
    },
    width: 721,
    height: 1280,
  },
  'news-sensibilisation-cancers': {
    src: '/assets/news-sensibilisation-cancers.webp',
    alt: {
      fr: 'Sensibilisation aux cancers du col et du sein en milieu scolaire',
      en: 'Cervical and breast cancer awareness in schools',
    },
    width: 720,
    height: 1280,
  },
  'album-porte-a-porte': {
    src: '/assets/album-porte-a-porte.webp',
    alt: {
      fr: 'Visite porte \u00e0 porte en quartier',
      en: 'Door-to-door visit in the neighbourhood',
    },
    width: 721,
    height: 1280,
  },
  'album-permanence': {
    src: '/assets/album-permanence.webp',
    alt: {
      fr: 'Accueil \u00e0 la permanence de B\u00e9panda',
      en: 'Welcome desk at the B\u00e9panda clinic',
    },
    width: 563,
    height: 1000,
  },
  'album-journee-dans-leau': {
    src: '/assets/album-journee-dans-leau.webp',
    alt: {
      fr: 'Atelier bien-\u00eatre aquatique pour femmes enceintes',
      en: 'Aquatic wellness workshop for pregnant women',
    },
    width: 721,
    height: 1280,
  },
}

const newsImageBySlug: Record<string, SiteImageKey> = {
  'journee-1000-premiers-jours': 'news-journee-1000',
  'partenariat-gavi': 'news-partenariat-gavi',
  'sensibilisation-cancers': 'news-sensibilisation-cancers',
}

const albumImageBySlug: Record<string, SiteImageKey> = {
  'porte-a-porte-bepanda': 'album-porte-a-porte',
  'permanence-bepanda': 'album-permanence',
  'journee-dans-leau': 'album-journee-dans-leau',
}

const pillarImageBySlug: Record<string, SiteImageKey> = {
  prevenir: 'pillar-prevenir',
  accompagner: 'pillar-accompagner',
  autonomie: 'pillar-autonomie',
}

export function getNewsImage(slug: string) {
  const key = newsImageBySlug[slug]
  return key ? siteImages[key] : siteImages['news-journee-1000']
}

export function getAlbumImage(slug: string) {
  const key = albumImageBySlug[slug]
  return key ? siteImages[key] : siteImages['album-porte-a-porte']
}

export function getPillarImage(slug: string) {
  const key = pillarImageBySlug[slug]
  return key ? siteImages[key] : siteImages['pillar-prevenir']
}
