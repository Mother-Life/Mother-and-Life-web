import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { BoutonWhatsApp } from '@/components/molecules/BoutonWhatsApp'
import { EnTete } from '@/components/organisms/EnTete'
import { PiedDePage } from '@/components/organisms/PiedDePage'
import { getSite } from '@/lib/cms/site'
import { caveat, literata, nunito } from '@/lib/fonts'
import { getLocalizedPath, isValidLocale, type Locale } from '@/lib/i18n/config'
import { getUi } from '@/lib/i18n/ui'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://motherandlife.org'),
  title: { default: 'Mother & Life', template: '%s | Mother & Life' },
  icons: { icon: '/favicon.ico' },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: '#fffcf7',
  colorScheme: 'light',
}

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

/**
 * Layout racine du site public. Il porte <html> pour que `lang` suive la
 * locale de la route (l'admin Payload a son propre layout racine).
 */
export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) notFound()
  const locale = lang as Locale
  const [site, entetes] = await Promise.all([getSite(locale), headers()])
  const ui = getUi(locale)
  const accueil = getLocalizedPath('/', locale)
  const nonce = entetes.get('x-nonce') ?? undefined

  return (
    <html lang={locale} className={`${nunito.variable} ${caveat.variable} ${literata.variable}`}>
      <body>
        <a href="#contenu" className="evitement">
          {ui.allerAuContenu}
        </a>
        <EnTete site={site} locale={locale} ui={ui} accueil={accueil} />
        <main id="contenu" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <PiedDePage site={site} locale={locale} ui={ui} accueil={accueil} />
        {site.whatsapp && (
          <BoutonWhatsApp
            numero={site.whatsapp.numero}
            message={site.whatsapp.message}
            libelle={ui.whatsapp}
            libelleAccessible={ui.whatsappLibelle}
            don={site.boutons.don}
          />
        )}
        <script
          nonce={nonce}
          type="application/ld+json"
          // Données structurées : sérialisées par JSON.stringify, « < » échappé.
          dangerouslySetInnerHTML={{ __html: jsonLd(site, locale) }}
        />
      </body>
    </html>
  )
}

function jsonLd(site: Awaited<ReturnType<typeof getSite>>, locale: Locale) {
  const url = process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://motherandlife.org'
  const donnees = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'Mother & Life',
    alternateName: site.denomination,
    url,
    logo: `${url}/icon.png`,
    slogan: site.baseline,
    email: site.email,
    telephone: site.telephones.map((t) => t.replace(/\s/g, '')),
    address: { '@type': 'PostalAddress', streetAddress: site.adresse, addressLocality: 'Douala', addressCountry: 'CM' },
    areaServed: 'Cameroun',
    inLanguage: locale,
    sameAs: site.reseaux.map((r) => r.url),
  }
  return JSON.stringify(donnees).replace(/</g, '\\u003c')
}
