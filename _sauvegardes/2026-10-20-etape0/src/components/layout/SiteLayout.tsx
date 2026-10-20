import type { Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { getLocalizedPath } from '@/lib/i18n/config'
import { Header } from './Header'
import { Footer } from './Footer'
import { WhatsAppFab } from './WhatsAppFab'

type SiteLayoutProps = {
  locale: Locale
  children: React.ReactNode
}

export function SiteLayout({ locale, children }: SiteLayoutProps) {
  const dict = getDictionary(locale)
  const prefix = locale === 'fr' ? '' : '/en'

  const navItems = [
    {
      label: dict.nav.about,
      href: `${prefix}/a-propos/raison-d-etre`,
      children: [
        { label: locale === 'fr' ? "Raison d'\u00eatre" : 'Our purpose', href: `${prefix}/a-propos/raison-d-etre` },
        { label: locale === 'fr' ? 'P\u00e9rinatalit\u00e9 sociale' : 'Social perinatality', href: `${prefix}/a-propos/perinatalite-sociale` },
        { label: locale === 'fr' ? 'Pourquoi agir' : 'Why act', href: `${prefix}/a-propos/pourquoi-agir` },
        { label: locale === 'fr' ? '\u00c9quipe' : 'Team', href: `${prefix}/a-propos/equipe` },
        { label: locale === 'fr' ? 'Impacts' : 'Impact', href: `${prefix}/a-propos/impacts` },
      ],
    },
    { label: dict.nav.services, href: `${prefix}/services` },
    { label: dict.nav.getInvolved, href: `${prefix}/s-impliquer` },
    { label: dict.nav.news, href: `${prefix}/actualites` },
    { label: dict.nav.contact, href: `${prefix}/contact` },
  ]

  return (
    <>
      <a href="#main" className="skip-link">
        {locale === 'fr' ? 'Aller au contenu principal' : 'Skip to main content'}
      </a>
      <Header
        locale={locale}
        navItems={navItems}
        donateLabel={dict.nav.donate}
        donateHref={getLocalizedPath('/don', locale)}
      />
      <main id="main">{children}</main>
      <Footer locale={locale} />
      <WhatsAppFab phone="237677389463" />
    </>
  )
}
