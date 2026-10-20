import type { SiteImageKey } from '@/lib/assets/images'
import type { PillarSlug } from '@/styles/tokens'

export type HeroSlide = {
  id: string
  imageKey: SiteImageKey
  pillar: PillarSlug
  kicker: { fr: string; en: string }
  title: { fr: string; en: string }
  description: { fr: string; en: string }
  cta?: {
    label: { fr: string; en: string }
    path: string
  }
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'mission',
    imageKey: 'hero-home',
    pillar: 'accompagner',
    kicker: {
      fr: 'P\u00e9rinatalit\u00e9 sociale \u00b7 Cameroun \u00b7 Douala',
      en: 'Social perinatality \u00b7 Cameroon \u00b7 Douala',
    },
    title: {
      fr: 'Saisir la grossesse comme une chance',
      en: 'Embrace pregnancy as an opportunity',
    },
    description: {
      fr: 'Suivi gratuit de la conception aux 1000 premiers jours de l\u2019enfant.',
      en: 'Free support from conception through the first 1,000 days.',
    },
    cta: {
      label: { fr: 'D\u00e9couvrir notre mission', en: 'Discover our mission' },
      path: '#mission',
    },
  },
  {
    id: 'journee-1000',
    imageKey: 'news-journee-1000',
    pillar: 'accompagner',
    kicker: { fr: '\u00c9v\u00e9nement \u00b7 Juin 2026', en: 'Event \u00b7 June 2026' },
    title: {
      fr: 'Journ\u00e9e des 1000 premiers jours',
      en: 'First 1,000 days awareness day',
    },
    description: {
      fr: '\u00c9chographies gratuites, ateliers nutrition et kits b\u00e9b\u00e9 \u00e0 B\u00e9panda.',
      en: 'Free ultrasounds, nutrition workshops and baby kits in B\u00e9panda.',
    },
    cta: {
      label: { fr: 'En savoir plus', en: 'Learn more' },
      path: '/actualites/journee-1000-premiers-jours',
    },
  },
  {
    id: 'gavi',
    imageKey: 'news-partenariat-gavi',
    pillar: 'prevenir',
    kicker: { fr: 'Partenariat \u00b7 Mars 2026', en: 'Partnership \u00b7 March 2026' },
    title: {
      fr: 'Vaccination GAVI \u00e0 Deido',
      en: 'GAVI vaccination in Deido',
    },
    description: {
      fr: 'Recherche active des enfants z\u00e9ro dose avec PROVARESSC.',
      en: 'Active search for zero-dose children with PROVARESSC.',
    },
    cta: {
      label: { fr: 'Lire l\u2019actualit\u00e9', en: 'Read the story' },
      path: '/actualites/partenariat-gavi',
    },
  },
  {
    id: 'cancers',
    imageKey: 'news-sensibilisation-cancers',
    pillar: 'prevenir',
    kicker: { fr: 'Sensibilisation \u00b7 Mai 2026', en: 'Outreach \u00b7 May 2026' },
    title: {
      fr: '300 \u00e9l\u00e8ves sensibilis\u00e9es',
      en: '300 students reached',
    },
    description: {
      fr: 'Pr\u00e9vention des cancers du col et du sein en milieu scolaire.',
      en: 'Cervical and breast cancer prevention in schools.',
    },
    cta: {
      label: { fr: 'Voir l\u2019article', en: 'View article' },
      path: '/actualites/sensibilisation-cancers',
    },
  },
  {
    id: 'atelier-eau',
    imageKey: 'album-journee-dans-leau',
    pillar: 'accompagner',
    kicker: { fr: 'Atelier \u00b7 Terrain', en: 'Workshop \u00b7 Field' },
    title: {
      fr: 'Une journ\u00e9e dans l\u2019eau',
      en: 'A day in the water',
    },
    description: {
      fr: 'Bien-\u00eatre aquatique pour femmes enceintes, en images.',
      en: 'Aquatic wellness for pregnant women, in pictures.',
    },
    cta: {
      label: { fr: 'Voir la galerie', en: 'View gallery' },
      path: '/albums/journee-dans-leau',
    },
  },
]

export type UpcomingEventBannerConfig = {
  enabled: boolean
  dismissible: boolean
  storageKey: string
  event: {
    date: string
    pillar: PillarSlug
    title: { fr: string; en: string }
    subtitle: { fr: string; en: string }
    cta: { label: { fr: string; en: string }; path: string }
  }
}

export const upcomingEventBanner: UpcomingEventBannerConfig = {
  enabled: true,
  dismissible: true,
  storageKey: 'mal-banner-journee-1000-2026',
  event: {
    date: '2026-06-15',
    pillar: 'accompagner',
    title: {
      fr: 'Journ\u00e9e des 1000 premiers jours',
      en: 'First 1,000 days event',
    },
    subtitle: {
      fr: '15 juin 2026 \u00b7 Esplanade Hope and Blessing, B\u00e9panda \u00b7 Entr\u00e9e gratuite',
      en: '15 June 2026 \u00b7 Hope and Blessing esplanade, B\u00e9panda \u00b7 Free entry',
    },
    cta: {
      label: { fr: 'Je m\u2019inscris', en: 'Register' },
      path: '/contact?sujet=evenement',
    },
  },
}

export const heroCarouselConfig = {
  autoplayMs: 6500,
  transitionMs: 900,
}
