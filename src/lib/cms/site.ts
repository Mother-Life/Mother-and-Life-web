import 'server-only'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'
import { siteParDefaut } from '@/lib/content/fallback'
import type { Lien, ReseauSocial, SiteContent } from '@/lib/content/types'
import type { Locale } from '@/lib/i18n/config'
import { getPayloadClient } from '@/lib/payload'
import { CMS_REVALIDATE_SECONDS, CMS_TAG } from './cache'
import { texte } from './media'

type LienCms = { label?: string | null; href?: string | null } | null | undefined

function versLien(source: LienCms, secours: Lien): Lien {
  return { libelle: texte(source?.label, secours.libelle), href: texte(source?.href, secours.href) }
}

function liensValides(liens: LienCms[] | null | undefined): Lien[] {
  return (liens ?? []).flatMap((l) =>
    l?.label?.trim() && l.href?.trim() ? [{ libelle: l.label.trim(), href: l.href.trim() }] : [],
  )
}

async function chargerSite(locale: Locale): Promise<SiteContent> {
  const defaut = siteParDefaut(locale)
  const payload = await getPayloadClient()
  const [organisation, navigation, parametres] = await Promise.all([
    payload.findGlobal({ slug: 'organisation', locale, depth: 0 }),
    payload.findGlobal({ slug: 'navigation', locale, depth: 0 }),
    payload.findGlobal({ slug: 'settings', locale, depth: 0 }),
  ])

  const navigationCms = (navigation.header ?? []).flatMap((item) =>
    item.label?.trim() && item.href?.trim()
      ? [{ libelle: item.label.trim(), href: item.href.trim(), enfants: liensValides(item.enfants) }]
      : [],
  )
  const piedCms = (navigation.footer ?? []).flatMap((col) =>
    col.titre?.trim() ? [{ titre: col.titre.trim(), liens: liensValides(col.liens) }] : [],
  )
  const reseauxCms = (parametres.reseaux ?? []).flatMap((r) =>
    r.plateforme && r.url?.startsWith('https://') ? [{ plateforme: r.plateforme as ReseauSocial, url: r.url }] : [],
  )
  const telephones = (organisation.telephones ?? []).flatMap((t) => (t.numero?.trim() ? [t.numero.trim()] : []))

  return {
    denomination: texte(organisation.denomination, defaut.denomination),
    baseline: texte(organisation.baseline, defaut.baseline),
    email: texte(organisation.email, defaut.email),
    telephones: telephones.length ? telephones : defaut.telephones,
    adresse: texte(organisation.siege, defaut.adresse),
    siegeCourt: defaut.siegeCourt,
    numeroEnregistrement: texte(organisation.numeroEnregistrement, defaut.numeroEnregistrement),
    whatsapp: organisation.whatsapp?.trim()
      ? {
          numero: organisation.whatsapp.trim(),
          message: texte(organisation.messageWhatsapp, defaut.whatsapp?.message ?? ''),
        }
      : defaut.whatsapp,
    reseaux: reseauxCms.length ? reseauxCms : defaut.reseaux,
    ligneTransparence: texte(organisation.ligneTransparence, defaut.ligneTransparence),
    navigation: navigationCms.length ? navigationCms : defaut.navigation,
    boutons: {
      accompagnee: versLien(navigation.boutons?.accompagnee, defaut.boutons.accompagnee),
      don: versLien(navigation.boutons?.don, defaut.boutons.don),
    },
    piedDePage: piedCms.length ? piedCms : defaut.piedDePage,
    legal: liensValides(navigation.legal).length ? liensValides(navigation.legal) : defaut.legal,
  }
}

const chargerSiteEnCache = unstable_cache(chargerSite, ['site'], {
  tags: [CMS_TAG],
  revalidate: CMS_REVALIDATE_SECONDS,
})

/**
 * Réglages communs à toutes les pages (en-tête, pied de page), dédupliqués par
 * requête. Si la base est injoignable, le site s'affiche avec les valeurs par
 * défaut, qui ne sont pas mises en cache : il se rétablit dès le retour de la base.
 */
export const getSite = cache(async (locale: Locale): Promise<SiteContent> => {
  try {
    return await chargerSiteEnCache(locale)
  } catch (erreur) {
    console.error('[cms] réglages du site illisibles, valeurs par défaut utilisées', erreur)
    return siteParDefaut(locale)
  }
})
