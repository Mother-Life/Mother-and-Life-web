import type { Lien } from '@/lib/content/types'
import { BoutonPinceau } from '../atoms/BoutonPinceau'

/**
 * Actions toujours à portée de pouce : WhatsApp, le canal préféré des
 * bénéficiaires, et le don sur mobile (où l'en-tête n'a pas la place de
 * l'afficher). Respecte les zones sûres des écrans à encoche.
 */
export function BoutonWhatsApp({
  numero,
  message,
  libelle,
  libelleAccessible,
  don,
}: {
  numero: string
  message: string
  libelle: string
  libelleAccessible: string
  don: Lien
}) {
  const href = `https://wa.me/${numero.replace(/\D/g, '')}${message ? `?text=${encodeURIComponent(message)}` : ''}`
  return (
    <div className="barre-pose pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-end gap-2 px-[max(1rem,env(safe-area-inset-right))] pb-[max(1rem,env(safe-area-inset-bottom))] max-sm:justify-between">
      <BoutonPinceau href={don.href} variante="contour" className="pointer-events-auto sm:hidden">
        {don.libelle}
      </BoutonPinceau>
      <BoutonPinceau
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={libelleAccessible}
        variante="vert"
        iconeAvant="whatsapp"
        className="pointer-events-auto"
      >
        {libelle}
      </BoutonPinceau>
    </div>
  )
}
