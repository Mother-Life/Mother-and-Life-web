import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { RevealInit } from '@/components/ui/RevealInit'
import { isValidLocale, type Locale } from '@/lib/i18n/config'
import '@/styles/globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-fraunces',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mother & Life',
  description:
    'Association camerounaise de p\u00e9rinatalit\u00e9 sociale. Suivi gratuit de grossesse, \u00e9ducation \u00e0 la sexualit\u00e9, autonomisation.',
  icons: {
    icon: '/favicon.ico',
  },
}

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }]
}

/**
 * Layout racine du site public. Il porte `<html>` pour que l'attribut `lang`
 * suive la locale de la route : l'admin Payload fournit son propre layout
 * racine dans le groupe (payload).
 */
export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params
  if (!isValidLocale(lang)) notFound()

  return (
    <html lang={lang} className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <SiteLayout locale={lang as Locale}>{children}</SiteLayout>
        <RevealInit />
      </body>
    </html>
  )
}
