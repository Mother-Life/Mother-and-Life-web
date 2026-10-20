export const locales = ['fr', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'fr'

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export const localeLabels: Record<Locale, string> = {
  fr: 'FR',
  en: 'EN',
}

export function getLocalizedPath(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path
  return `/en${path === '/' ? '' : path}`
}

export function stripLocaleFromPath(pathname: string): { locale: Locale; path: string } {
  if (pathname.startsWith('/en')) {
    const path = pathname.replace(/^\/en/, '') || '/'
    return { locale: 'en', path }
  }
  return { locale: 'fr', path: pathname || '/' }
}
