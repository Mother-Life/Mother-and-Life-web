import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { getLocalizedPath } from '@/lib/i18n/config'
import type { Locale } from '@/lib/i18n/config'
import { organisationDefaults } from '@/data/defaults'

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const prefix = locale === 'fr' ? '' : '/en'
  const org = organisationDefaults

  const columns = [
    {
      title: dict.footer.association,
      links: [
        { label: locale === 'fr' ? "Raison d'\u00eatre" : 'Our purpose', href: `${prefix}/a-propos/raison-d-etre` },
        { label: locale === 'fr' ? 'P\u00e9rinatalit\u00e9 sociale' : 'Social perinatality', href: `${prefix}/a-propos/perinatalite-sociale` },
        { label: locale === 'fr' ? 'Impacts' : 'Impact', href: `${prefix}/a-propos/impacts` },
        { label: locale === 'fr' ? '\u00c9quipe' : 'Team', href: `${prefix}/a-propos/equipe` },
      ],
    },
    {
      title: dict.footer.actions,
      links: [
        { label: locale === 'fr' ? 'Pr\u00e9venir' : 'Prevent', href: `${prefix}/services#prevenir` },
        { label: locale === 'fr' ? 'Accompagner' : 'Accompany', href: `${prefix}/services#accompagner` },
        { label: locale === 'fr' ? 'Autonomie' : 'Autonomy', href: `${prefix}/services#autonomie` },
        { label: dict.nav.albums, href: `${prefix}/albums` },
      ],
    },
    {
      title: dict.footer.involve,
      links: [
        { label: dict.nav.donate, href: getLocalizedPath('/don', locale) },
        { label: locale === 'fr' ? 'Devenir b\u00e9n\u00e9vole' : 'Volunteer', href: `${prefix}/s-impliquer#benevolat` },
        { label: locale === 'fr' ? 'Devenir partenaire' : 'Partner', href: `${prefix}/s-impliquer#partenaire` },
      ],
    },
    {
      title: dict.footer.resources,
      links: [
        { label: dict.nav.reports, href: `${prefix}/rapports` },
        { label: dict.nav.news, href: `${prefix}/actualites` },
        { label: locale === 'fr' ? 'Mentions l\u00e9gales' : 'Legal notice', href: `${prefix}/mentions-legales` },
        { label: locale === 'fr' ? 'Confidentialit\u00e9' : 'Privacy', href: `${prefix}/politique-de-confidentialite` },
      ],
    },
  ]

  return (
    <footer id="footer" className="bg-nuit text-white/70">
      <Container className="border-b border-white/10 py-14">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl text-white">{dict.footer.newsletterTitle}</h3>
            <p className="mt-1.5 text-[15px]">{dict.footer.newsletterSubtitle}</p>
          </div>
          <form action="/api/newsletter" method="post" className="flex flex-wrap gap-2.5">
            <input
              type="email"
              name="email"
              required
              placeholder={locale === 'fr' ? 'Votre adresse email' : 'Your email address'}
              aria-label="Email"
              className="min-w-[260px] rounded-[8px] border border-white/20 bg-white/10 px-4 py-3 text-[15px] text-white placeholder:text-white/45"
            />
            <Button type="submit">{dict.footer.subscribe}</Button>
          </form>
        </div>
      </Container>

      <Container className="grid gap-9 py-14 md:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => (
          <div key={col.title}>
            <b className="mb-3.5 block font-semibold text-white">{col.title}</b>
            {col.links.map((link) => (
              <Link key={link.href} href={link.href} className="mb-2 block text-[14px] hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </Container>

      <Container className="border-t border-white/10 py-5">
        <div className="flex flex-wrap justify-between gap-3 text-[12.5px] text-white/45">
          <span>
            {'\u00a9 '}{new Date().getFullYear()} {org.denomination} {' \u2014 '}{org.numeroEnregistrement}
          </span>
          <span>
            {org.siege} {' \u00b7 '}{org.telephones.join(' \u00b7 ')} {' \u00b7 '}{org.email}
          </span>
          <span className="italic text-white/60">{org.baseline}</span>
        </div>
      </Container>
    </footer>
  )
}
