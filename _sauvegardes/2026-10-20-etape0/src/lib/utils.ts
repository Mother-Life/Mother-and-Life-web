import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number, locale = 'fr-FR'): string {
  return value.toLocaleString(locale)
}

export function formatFCFA(amount: number, locale = 'fr-FR'): string {
  return `${formatNumber(amount, locale)} FCFA`
}
