import type { Locale } from './config'

type Dict = {
  nav: {
    about: string
    services: string
    getInvolved: string
    news: string
    contact: string
    donate: string
    albums: string
    reports: string
  }
  common: {
    learnMore: string
    free: string
    allNews: string
    showMore: string
    resetFilters: string
    noResults: string
    processing: string
    thankYou: string
    errorField: string
  }
  footer: {
    newsletterTitle: string
    newsletterSubtitle: string
    subscribe: string
    association: string
    actions: string
    involve: string
    resources: string
  }
}

export const dictionaries: Record<Locale, Dict> = {
  fr: {
    nav: {
      about: '\u00c0 propos',
      services: 'Services',
      getInvolved: "S'impliquer",
      news: 'Actualit\u00e9s',
      contact: 'Contact',
      donate: 'Faire un don',
      albums: 'Galerie',
      reports: 'Rapports',
    },
    common: {
      learnMore: 'En savoir plus',
      free: 'Gratuit',
      allNews: 'Toutes les actualit\u00e9s',
      showMore: 'Afficher plus',
      resetFilters: 'R\u00e9initialiser les filtres',
      noResults: 'Aucun r\u00e9sultat ne correspond \u00e0 ces filtres.',
      processing: 'Traitement\u2026',
      thankYou: 'Merci ! Votre soutien devient d\u00e9j\u00e0 des soins.',
      errorField: 'Oups, v\u00e9rifiez ce champ.',
    },
    footer: {
      newsletterTitle: 'Restez proches du terrain.',
      newsletterSubtitle: 'Une nouvelle par mois, jamais plus.',
      subscribe: "S'abonner",
      association: 'Association',
      actions: 'Nos actions',
      involve: "S'impliquer",
      resources: 'Ressources',
    },
  },
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      getInvolved: 'Get involved',
      news: 'News',
      contact: 'Contact',
      donate: 'Donate',
      albums: 'Gallery',
      reports: 'Reports',
    },
    common: {
      learnMore: 'Learn more',
      free: 'Free',
      allNews: 'All news',
      showMore: 'Show more',
      resetFilters: 'Reset filters',
      noResults: 'No results match these filters.',
      processing: 'Processing\u2026',
      thankYou: 'Thank you! Your support is already becoming care.',
      errorField: 'Oops, please check this field.',
    },
    footer: {
      newsletterTitle: 'Stay close to the field.',
      newsletterSubtitle: 'One update per month, never more.',
      subscribe: 'Subscribe',
      association: 'Association',
      actions: 'Our work',
      involve: 'Get involved',
      resources: 'Resources',
    },
  },
}

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale]
}
