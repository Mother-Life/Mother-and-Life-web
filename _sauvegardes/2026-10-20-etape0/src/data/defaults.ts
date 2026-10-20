export const organisationDefaults = {
  denomination: 'Association Mother and Life',
  baseline: 'La maternit\u00e9 positive',
  numeroEnregistrement: 'N 460/2022/RDA/C19/SAAJP',
  siege: 'B\u00e9panda-Omnisports, Douala, Cameroun',
  telephones: ['+237 656 27 96 70', '+237 677 38 94 63'],
  email: 'motherandlife22@gmail.com',
  siteWeb: 'motherandlife.org',
  whatsapp: '237677389463',
  banque: 'CCA',
  dateAG: '21 ao\u00fbt 2026, certifi\u00e9e le 25 ao\u00fbt 2026',
}

export const homeStats = [
  { cle: 'femmesSuivies', valeur: '75', libelle: 'femmes suivies', pilier: 'accompagner' as const },
  { cle: 'naissances', valeur: '36', libelle: 'naissances accompagn\u00e9es', pilier: 'accompagner' as const },
  { cle: 'etablissementsScolaires', valeur: '40', libelle: '\u00e9tablissements scolaires touch\u00e9s', pilier: 'prevenir' as const },
  { cle: 'interventions', valeur: '12 000+', libelle: 'interventions communautaires', pilier: 'prevenir' as const },
]

export const pillars = [
  {
    slug: 'prevenir' as const,
    nom: 'Pr\u00e9venir',
    couleur: 'bleu' as const,
    accroche: "Informer sans tabou, prot\u00e9ger sans juger.",
    description:
      "Dans les \u00e9coles et les communaut\u00e9s, nos \u00e9quipes parlent aux jeunes de leur corps, de leurs droits et de la contraception.",
  },
  {
    slug: 'accompagner' as const,
    nom: 'Accompagner',
    couleur: 'rose' as const,
    accroche: 'Suivre chaque grossesse, gratuitement.',
    description:
      "Consultations pr\u00e9natales, \u00e9chographies, bilans, accouchement assist\u00e9, suivi postnatal : un accompagnement complet et sans frais.",
  },
  {
    slug: 'autonomie' as const,
    nom: "Renforcer l'autonomie",
    couleur: 'vert' as const,
    accroche: 'Un m\u00e9tier, une autonomie.',
    description:
      "Chaque jeune m\u00e8re accompagn\u00e9e peut se former \u00e0 un m\u00e9tier et construire son avenir \u2014 et celui de son enfant.",
  },
]

export const sampleNews = [
  {
    slug: 'journee-1000-premiers-jours',
    titre: 'Journ\u00e9e des 1000 premiers jours avec les parents',
    categorie: '\u00c9v\u00e9nement',
    date: 'Juin 2026',
    extrait:
      "\u00c9chographies gratuites, ateliers nutrition et kits b\u00e9b\u00e9 \u00e0 l'esplanade du Centre M\u00e9dical Hope and Blessing, B\u00e9panda.",
  },
  {
    slug: 'partenariat-gavi',
    titre: 'Mother & Life rejoint le programme de vaccination GAVI',
    categorie: 'Partenariat',
    date: 'Mars 2026',
    extrait:
      'Aux c\u00f4t\u00e9s de PROVARESSC, nos \u00e9quipes appuient la recherche active des enfants z\u00e9ro dose dans le district de Deido.',
  },
  {
    slug: 'sensibilisation-cancers',
    titre: '300 \u00e9l\u00e8ves sensibilis\u00e9es aux cancers du col et du sein',
    categorie: 'Nouvelle',
    date: 'Mai 2026',
    extrait:
      "Une campagne de pr\u00e9vention men\u00e9e avec l'Association des Femmes Bati\u00e9 d'Agip, en milieu scolaire.",
  },
]

export const sampleAlbums = [
  {
    slug: 'porte-a-porte-bepanda',
    titre: 'Aller vers les femmes, porte \u00e0 porte',
    resume: 'Visites \u00e0 domicile en quartier avec des agents de sant\u00e9 communautaire.',
    annee: 2026,
    nbPhotos: 5,
    pilier: 'prevenir',
    typeActivite: 'porte-a-porte',
  },
  {
    slug: 'permanence-bepanda',
    titre: 'La permanence de B\u00e9panda',
    resume: 'Accueil, inscription et entretien individuel au bureau de B\u00e9panda.',
    annee: 2026,
    nbPhotos: 12,
    pilier: 'accompagner',
    typeActivite: 'consultation',
  },
  {
    slug: 'journee-dans-leau',
    titre: "Une journ\u00e9e dans l'eau",
    resume: 'Atelier bien-\u00eatre aquatique pour femmes enceintes.',
    annee: 2026,
    nbPhotos: 30,
    pilier: 'accompagner',
    typeActivite: 'atelier-bien-etre',
  },
]

export const statistiquesExternes = [
  {
    valeur: '37,7 %',
    enonce: 'de la population camerounaise vivait sous le seuil de pauvret\u00e9',
    source: 'Institut National de la Statistique',
    annee: 2022,
  },
  {
    valeur: '40 %',
    enonce: "des femmes de 15 \u00e0 49 ans sont concern\u00e9es par l'an\u00e9mie",
    source: 'UNICEF',
    annee: null,
  },
]

export const chaineImpactEtapes = [
  { titre: 'Vuln\u00e9rabilit\u00e9', texte: 'Des femmes enceintes en situation de pr\u00e9carit\u00e9' },
  { titre: 'Mobilisation', texte: 'Partenaires et b\u00e9n\u00e9voles sur le terrain' },
  { titre: 'Action', texte: 'Pr\u00e9vention, soutien et orientation' },
  { titre: 'Accompagnement', texte: 'Famille accompagn\u00e9e de la grossesse aux 1000 premiers jours' },
  { titre: 'Impact', texte: 'Meilleures connaissances, m\u00e8re et enfant mieux prot\u00e9g\u00e9s' },
]

export const parcoursSanteMoments = [
  { titre: 'Avant la grossesse', prestations: 'Information, planification familiale' },
  { titre: 'Grossesse', prestations: 'CPN, bilan pr\u00e9natal, \u00e9chographie' },
  { titre: 'Accouchement', prestations: "Kit d'accouchement, m\u00e9dicaments, layette, hospitalisation" },
  { titre: 'Post-partum', prestations: 'Allaitement, soutien de la m\u00e8re' },
  { titre: 'Nouveau-n\u00e9', prestations: 'Suivi global, vaccination' },
  { titre: 'Les 1000 premiers jours', prestations: "De la naissance aux 2 ans de l'enfant" },
]

export const donPaliers = [
  { montant: 5000, libelle: '5 000 FCFA', equivalence: 'Contribuer aux activit\u00e9s de terrain' },
  { montant: 25000, libelle: '25 000 FCFA', equivalence: 'Soutenir une sensibilisation communautaire' },
  { montant: 100000, libelle: '100 000 FCFA', equivalence: 'Une grossesse enti\u00e8rement suivie' },
  { montant: null, libelle: 'Montant libre', equivalence: 'Choisissez votre contribution', libre: true },
]
