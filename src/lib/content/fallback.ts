import type { StaticImageData } from 'next/image'
import equipeTrio from '@/assets/photos/provisoire-equipe-trio.webp'
import groupeRollup from '@/assets/photos/provisoire-groupe-rollup.webp'
import heroMereBebe from '@/assets/photos/provisoire-hero-mere-bebe.webp'
import seance from '@/assets/photos/provisoire-seance.webp'
import trioPorte from '@/assets/photos/provisoire-trio-porte.webp'
import type { Locale } from '@/lib/i18n/config'
import type { HomeContent, Image, SiteContent } from './types'

/**
 * Contenus de secours, repris de la maquette validée (Figma, page 10).
 * Servent tant que la base est vide ou injoignable : le site ne s'affiche
 * jamais cassé. Dès qu'un champ est rempli dans l'admin, il prend le dessus.
 *
 * Les photos marquées « provisoire » attendent les originaux de la maquette.
 */

function photo(fichier: StaticImageData, alt: string, focal?: Image['focal']): Image {
  return {
    src: fichier.src,
    width: fichier.width,
    height: fichier.height,
    blurDataURL: fichier.blurDataURL,
    alt,
    focal,
  }
}

const lien = (libelle: string, href: string) => ({ libelle, href })

function chemin(locale: Locale, path: string) {
  return locale === 'fr' ? path : `/en${path === '/' ? '' : path}`
}

export function siteParDefaut(locale: Locale): SiteContent {
  const fr = locale === 'fr'
  const c = (p: string) => chemin(locale, p)
  return {
    denomination: 'Association Mother and Life',
    baseline: fr ? 'La maternité positive' : 'Positive motherhood',
    email: 'motherandlife22@gmail.com',
    telephones: ['+237 656 27 96 70', '+237 677 38 94 63'],
    adresse: 'Bépanda-Omnisports, Douala',
    siegeCourt: fr ? 'Siège Bépanda-Omnisports' : 'Head office, Bépanda-Omnisports',
    numeroEnregistrement: '460/2022/RDA/C19/SAAJP',
    whatsapp: {
      numero: '+237656279670',
      message: fr
        ? 'Bonjour Mother & Life, j’aimerais être accompagnée.'
        : 'Hello Mother & Life, I would like support.',
    },
    reseaux: [
      { plateforme: 'facebook', url: 'https://www.facebook.com/' },
      { plateforme: 'x', url: 'https://x.com/' },
      { plateforme: 'youtube', url: 'https://www.youtube.com/' },
      { plateforme: 'linkedin', url: 'https://www.linkedin.com/' },
    ],
    ligneTransparence: fr
      ? 'Transparence : compte bancaire au nom de l’association, deux signatures sur trois mandataires pour tout retrait, 71 % des dépenses vers les programmes.'
      : 'Transparency: a bank account in the association’s name, two of three signatories required for any withdrawal, 71% of spending goes to programmes.',
    navigation: fr
      ? [
          {
            libelle: 'Nos actions',
            href: c('/nos-actions'),
            enfants: [
              lien('Accompagner', c('/nos-actions#accompagner')),
              lien('Prévenir', c('/nos-actions#prevenir')),
              lien('Renforcer l’autonomie', c('/nos-actions#autonomie')),
              lien('Suivi psychosocial', c('/nos-actions#psychosocial')),
              lien('Orientation', c('/nos-actions#orientation')),
            ],
          },
          {
            libelle: 'Notre impact',
            href: c('/notre-impact'),
            enfants: [
              lien('Transparence', c('/notre-impact#transparence')),
              lien('Rapports', c('/notre-impact/rapports')),
            ],
          },
          {
            libelle: 'L’association',
            href: c('/l-association'),
            enfants: [
              lien('Raison d’être', c('/l-association/raison-d-etre')),
              lien('Périnatalité sociale', c('/l-association/perinatalite-sociale')),
              lien('Pourquoi agir', c('/l-association/pourquoi-agir')),
              lien('Équipe & partenaires', c('/l-association/equipe')),
            ],
          },
          {
            libelle: 'Actualités',
            href: c('/actualites'),
            enfants: [lien('Histoires', c('/histoires')), lien('Albums photo', c('/albums'))],
          },
          { libelle: 'Nous rejoindre', href: c('/nous-rejoindre') },
        ]
      : [
          {
            libelle: 'Our work',
            href: c('/nos-actions'),
            enfants: [
              lien('Support', c('/nos-actions#accompagner')),
              lien('Prevention', c('/nos-actions#prevenir')),
              lien('Self-reliance', c('/nos-actions#autonomie')),
              lien('Psychosocial care', c('/nos-actions#psychosocial')),
              lien('Referrals', c('/nos-actions#orientation')),
            ],
          },
          {
            libelle: 'Our impact',
            href: c('/notre-impact'),
            enfants: [
              lien('Transparency', c('/notre-impact#transparence')),
              lien('Reports', c('/notre-impact/rapports')),
            ],
          },
          {
            libelle: 'About us',
            href: c('/l-association'),
            enfants: [
              lien('Our purpose', c('/l-association/raison-d-etre')),
              lien('Social perinatal care', c('/l-association/perinatalite-sociale')),
              lien('Why we act', c('/l-association/pourquoi-agir')),
              lien('Team & partners', c('/l-association/equipe')),
            ],
          },
          {
            libelle: 'News',
            href: c('/actualites'),
            enfants: [lien('Stories', c('/histoires')), lien('Photo albums', c('/albums'))],
          },
          { libelle: 'Join us', href: c('/nous-rejoindre') },
        ],
    boutons: {
      accompagnee: lien(fr ? 'Être accompagnée' : 'Get support', c('/etre-accompagnee')),
      don: lien(fr ? 'Faire un don' : 'Donate', c('/don')),
    },
    piedDePage: fr
      ? [
          {
            titre: 'L’association',
            liens: [
              lien('Raison d’être', c('/l-association/raison-d-etre')),
              lien('Périnatalité sociale', c('/l-association/perinatalite-sociale')),
              lien('Pourquoi agir', c('/l-association/pourquoi-agir')),
              lien('Équipe & partenaires', c('/l-association/equipe')),
            ],
          },
          {
            titre: 'Nos actions',
            liens: [
              lien('Accompagner', c('/nos-actions#accompagner')),
              lien('Prévenir', c('/nos-actions#prevenir')),
              lien('Renforcer l’autonomie', c('/nos-actions#autonomie')),
              lien('Suivi psychosocial', c('/nos-actions#psychosocial')),
            ],
          },
          {
            titre: 'Nous rejoindre',
            liens: [
              lien('Faire un don', c('/don')),
              lien('Campagnes', c('/nous-rejoindre#campagnes')),
              lien('Bénévolat', c('/nous-rejoindre#benevolat')),
              lien('Partenariat', c('/nous-rejoindre#partenariat')),
            ],
          },
        ]
      : [
          {
            titre: 'About us',
            liens: [
              lien('Our purpose', c('/l-association/raison-d-etre')),
              lien('Social perinatal care', c('/l-association/perinatalite-sociale')),
              lien('Why we act', c('/l-association/pourquoi-agir')),
              lien('Team & partners', c('/l-association/equipe')),
            ],
          },
          {
            titre: 'Our work',
            liens: [
              lien('Support', c('/nos-actions#accompagner')),
              lien('Prevention', c('/nos-actions#prevenir')),
              lien('Self-reliance', c('/nos-actions#autonomie')),
              lien('Psychosocial care', c('/nos-actions#psychosocial')),
            ],
          },
          {
            titre: 'Join us',
            liens: [
              lien('Donate', c('/don')),
              lien('Campaigns', c('/nous-rejoindre#campagnes')),
              lien('Volunteer', c('/nous-rejoindre#benevolat')),
              lien('Partner with us', c('/nous-rejoindre#partenariat')),
            ],
          },
        ],
    legal: fr
      ? [lien('Mentions légales', c('/mentions-legales')), lien('Confidentialité', c('/politique-de-confidentialite'))]
      : [lien('Legal notice', c('/mentions-legales')), lien('Privacy', c('/politique-de-confidentialite'))],
  }
}

export function accueilParDefaut(locale: Locale): HomeContent {
  const fr = locale === 'fr'
  const c = (p: string) => chemin(locale, p)
  return {
    hero: {
      afficher: true,
      surtitre: fr ? 'Association de périnatalité sociale' : 'Social perinatal care association',
      titre: fr ? 'Un cocon de bienveillance' : 'A cocoon of kindness',
      motSouligne: fr ? 'bienveillance' : 'kindness',
      sousTitre: fr
        ? 'Nous accompagnons les futures mères vulnérables ou démunies vers une maternité épanouie et sécurisée, tout en renforçant leur indépendance sociale et économique pour un avenir durable.'
        : 'We support vulnerable expectant mothers towards a fulfilling, safe motherhood, while strengthening their social and economic independence for a lasting future.',
      boutonPrincipal: lien(fr ? 'Être accompagnée' : 'Get support', c('/etre-accompagnee')),
      lienSecondaire: lien(fr ? 'Découvrir nos actions' : 'See our work', c('/nos-actions')),
      image: photo(
        heroMereBebe,
        fr ? 'Une mère sourit en tenant son bébé contre elle.' : 'A mother smiles while holding her baby close.',
        { x: 62, y: 40 },
      ),
      annotation: fr ? 'Ici, on vous attend avec le sourire !' : 'We’re waiting for you with a smile!',
    },
    portes: {
      afficher: true,
      titre: fr ? 'Par où commencer ?' : 'Where to start?',
      items: [
        {
          icone: 'accompagnee',
          titre: fr ? 'Je suis enceinte' : 'I’m pregnant',
          texte: fr
            ? 'Un suivi à chaque étape, près de chez vous. Sans frais pour vous.'
            : 'Support at every step, close to home. Free of charge.',
          lien: lien(fr ? 'Être accompagnée' : 'Get support', c('/etre-accompagnee')),
        },
        {
          icone: 'don',
          titre: fr ? 'Je veux aider' : 'I want to help',
          texte: fr
            ? '100 000 FCFA financent le suivi complet d’une grossesse, 340 FCFA la sensibilisation d’un jeune.'
            : '100,000 FCFA funds full pregnancy follow-up; 340 FCFA reaches one young person.',
          lien: lien(fr ? 'Faire un don' : 'Donate', c('/don')),
        },
        {
          icone: 'rejoindre',
          titre: fr ? 'Je veux m’engager' : 'I want to get involved',
          texte: fr
            ? 'Bénévole ou partenaire : rejoignez une équipe de soignants engagés.'
            : 'Volunteer or partner: join a committed team of health workers.',
          lien: lien(fr ? 'Nous rejoindre' : 'Join us', c('/nous-rejoindre')),
        },
      ],
    },
    preuve: {
      afficher: true,
      surtitre: fr ? 'Qui nous sommes' : 'Who we are',
      titre: fr ? 'L’histoire d’une évidence' : 'A story that had to be told',
      texte: fr
        ? 'Fondée en 2022, Mother & Life est née d’une observation terrain directe. Face aux défis d’accès aux soins maternels de qualité, l’urgence de créer un pont entre expertise médicale et réalité sociale s’est imposée.'
        : 'Founded in 2022, Mother & Life grew out of first-hand fieldwork. Faced with poor access to quality maternal care, bridging medical expertise and social reality became urgent.',
      lien: lien(fr ? 'Découvrir l’association' : 'About the association', c('/l-association')),
      photoPrincipale: photo(
        equipeTrio,
        fr ? 'Trois membres de l’équipe en polo Mother & Life.' : 'Three team members in Mother & Life polo shirts.',
        { x: 55, y: 35 },
      ),
      photoSecondaire: photo(
        groupeRollup,
        fr
          ? 'L’équipe et ses partenaires réunis lors d’une séance de travail.'
          : 'The team and partners at a working session.',
        { x: 50, y: 40 },
      ),
      badge: {
        valeur: fr ? '6 sur 10' : '6 in 10',
        libelle: fr ? 'de nos membres sont des soignants' : 'of our members are health workers',
      },
      chiffres: [
        { valeur: '75', libelle: fr ? 'femmes suivies' : 'women supported', axe: 'autonomie' },
        { valeur: '36', libelle: fr ? 'naissances accompagnées' : 'births supported', axe: 'prevenir' },
        { valeur: '40', libelle: fr ? 'établissements scolaires touchés' : 'schools reached', axe: 'autonomie' },
        {
          valeur: fr ? '12 000+' : '12,000+',
          libelle: fr ? 'interventions communautaires' : 'community sessions',
          axe: 'prevenir',
        },
      ],
    },
    bandeau: {
      afficher: true,
      mots: [
        { libelle: fr ? 'Accompagner' : 'Support', axe: 'accompagner' },
        { libelle: fr ? 'Prévenir' : 'Prevent', axe: 'prevenir' },
        { libelle: fr ? 'Autonomie' : 'Self-reliance', axe: 'autonomie' },
      ],
    },
    axes: {
      afficher: true,
      surtitre: fr ? 'Nos actions' : 'Our work',
      titre: fr ? 'Trois axes pour une maternité positive' : 'Three ways to positive motherhood',
      texte: fr
        ? 'Prévenir, accompagner, renforcer l’autonomie : trois verbes qui guident chaque action, de l’école à la maternité.'
        : 'Prevent, support, build self-reliance: three verbs behind everything we do, from school to the maternity ward.',
      lien: lien(fr ? 'Voir toutes nos actions' : 'See all our work', c('/nos-actions')),
      axeMisEnAvant: 'accompagner',
      cartes: [
        {
          axe: 'accompagner',
          titre: fr ? 'Accompagner' : 'Support',
          description: fr
            ? 'Consultations prénatales, bilans, kits d’accouchement, soutien psychosocial et suivi du nouveau-né.'
            : 'Antenatal visits, check-ups, birth kits, psychosocial support and newborn follow-up.',
          lien: lien(fr ? 'En savoir plus' : 'Learn more', c('/nos-actions#accompagner')),
        },
        {
          axe: 'prevenir',
          titre: fr ? 'Prévenir' : 'Prevent',
          description: fr
            ? 'Causeries dans les écoles et les communautés : santé sexuelle, contraception, nutrition, vaccination.'
            : 'Talks in schools and communities: sexual health, contraception, nutrition, vaccination.',
          lien: lien(fr ? 'En savoir plus' : 'Learn more', c('/nos-actions#prevenir')),
        },
        {
          axe: 'autonomie',
          titre: fr ? 'Renforcer l’autonomie' : 'Build self-reliance',
          description: fr
            ? 'Accompagnement social, orientation vers les services adaptés, solidarité et réinsertion.'
            : 'Social support, referral to the right services, solidarity and reintegration.',
          lien: lien(fr ? 'En savoir plus' : 'Learn more', c('/nos-actions#autonomie')),
        },
      ],
    },
    histoire: {
      afficher: true,
      surtitre: fr ? 'Leur histoire' : 'Their story',
      histoire: {
        citation: fr
          ? 'Quand j’ai appris que j’étais enceinte, j’avais peur. Je n’avais pas les moyens pour les soins. L’équipe de Mother & Life m’a prise par la main. Ils m’ont soignée, rassurée […]'
          : 'When I found out I was pregnant, I was scared. I couldn’t afford care. The Mother & Life team took me by the hand. They treated me, reassured me […]',
        prenom: 'Chantal D.',
        role: fr ? 'Bénéficiaire du programme, 2023' : 'Programme beneficiary, 2023',
      },
      lien: lien(fr ? 'Lire d’autres histoires' : 'Read more stories', c('/histoires')),
    },
    campagne: {
      afficher: true,
      campagne: {
        surtitre: fr ? 'Campagne en cours' : 'Current campaign',
        titre: fr ? 'Panier de vie 2026' : 'Life Basket 2026',
        motColore: fr ? 'vie' : 'Life',
        resume: fr
          ? 'Le samedi 19 décembre 2026, à Douala, offrons un panier de vie à 50 à 100 femmes enceintes en situation de vulnérabilité.'
          : 'On Saturday 19 December 2026 in Douala, let’s give a life basket to 50 to 100 pregnant women in vulnerable situations.',
        unite: fr ? { singulier: 'panier', pluriel: 'paniers' } : { singulier: 'basket', pluriel: 'baskets' },
        coutUnitaire: 40_000,
        objectifUnites: 100,
        unitesFinancees: 0,
        paliers: [
          { montant: 10_000 },
          { montant: 20_000, libelle: fr ? '½ panier' : '½ basket' },
          { montant: 40_000, libelle: fr ? '1 panier' : '1 basket' },
        ],
        lien: lien(fr ? 'Voir la campagne' : 'See the campaign', c('/campagnes/panier-de-vie-2026')),
      },
      don: {
        action: c('/don'),
        bandeauTitre: fr ? 'Soutenez la maternité positive' : 'Support positive motherhood',
        bandeauTexte: fr
          ? 'Votre don devient un panier pour une future maman.'
          : 'Your gift becomes a basket for a mother-to-be.',
        libelleBouton: fr ? 'Je soutiens maintenant' : 'Give now',
        transparence: fr
          ? '71 % des dépenses vont directement aux programmes.'
          : '71% of spending goes straight to programmes.',
        moyens: fr
          ? 'Orange Money · MTN Mobile Money · virement · espèces dans nos antennes'
          : 'Orange Money · MTN Mobile Money · bank transfer · cash at our branches',
      },
    },
    actualites: {
      afficher: true,
      surtitre: fr ? 'La vie de l’association' : 'Life at the association',
      titre: fr ? 'Dernières nouvelles' : 'Latest news',
      lienTous: lien(fr ? 'Toutes les actualités' : 'All news', c('/actualites')),
      album: {
        titre: fr ? 'Une journée dans l’eau' : 'A day in the water',
        resume: fr
          ? 'Atelier bien-être aquatique pour les femmes enceintes : retour en images.'
          : 'Aquatic wellbeing workshop for pregnant women, in pictures.',
        href: c('/albums/une-journee-dans-leau'),
        image: photo(
          seance,
          fr
            ? 'Une animatrice s’adresse à un groupe de femmes enceintes.'
            : 'A facilitator speaks to a group of pregnant women.',
          { x: 50, y: 40 },
        ),
      },
      articles: [
        {
          categorie: fr ? 'Événement' : 'Event',
          titre: fr ? 'Mother & Life dans la rue' : 'Mother & Life on the streets',
          href: c('/actualites/mother-and-life-dans-la-rue'),
          image: photo(trioPorte, '', { x: 50, y: 35 }),
        },
        {
          categorie: fr ? 'Campagne' : 'Campaign',
          titre: fr ? 'Panier de vie 2026 : la collecte est ouverte' : 'Life Basket 2026: donations are open',
          href: c('/actualites/panier-de-vie-2026'),
          image: photo(groupeRollup, '', { x: 50, y: 40 }),
        },
        {
          categorie: fr ? 'Partenariat' : 'Partnership',
          titre: fr ? 'Réunion de travail avec Provaresc' : 'Working meeting with Provaresc',
          href: c('/actualites/reunion-provaresc'),
          image: photo(equipeTrio, '', { x: 50, y: 35 }),
        },
      ],
    },
    partenaires: {
      afficher: true,
      surtitre: fr ? 'Ils nous accompagnent' : 'They support us',
      logos: [],
    },
  }
}
