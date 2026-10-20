'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { NavigationItem } from '@/lib/content/types'
import { Icone } from '../atoms/Icone'

/**
 * Menu mobile dans un <dialog> modal : piège du focus, Échap, fond inerte et
 * retour du focus au bouton sont gérés par le navigateur. Le panneau glisse
 * depuis la droite (@starting-style), sans mouvement en mode réduit.
 */
export function MenuMobile({
  items,
  libelleOuvrir,
  libelleFermer,
  libelleNavigation,
  pied,
}: {
  items: NavigationItem[]
  libelleOuvrir: string
  libelleFermer: string
  libelleNavigation: string
  /** Boutons d'action, langue et contact, rendus côté serveur. */
  pied: ReactNode
}) {
  const dialogue = useRef<HTMLDialogElement>(null)
  const pathname = usePathname()
  // Le contenu n'est monté qu'à la première ouverture : moins de DOM à hydrater.
  const [monte, setMonte] = useState(false)

  useEffect(() => {
    dialogue.current?.close()
  }, [pathname])

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setMonte(true)
          dialogue.current?.showModal()
        }}
        aria-haspopup="dialog"
        className="grid size-11 place-items-center rounded-full text-texte transition-colors hover:bg-papier"
      >
        <Icone nom="menu" taille={26} />
        <span className="lecteur-seul">{libelleOuvrir}</span>
      </button>

      <dialog
        ref={dialogue}
        aria-label={libelleNavigation}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close()
        }}
        className="menu-mobile m-0 ms-auto h-dvh max-h-none w-[min(24rem,88vw)] max-w-none bg-craie p-0 text-texte"
      >
        {monte && (
          <div className="flex h-full flex-col overflow-y-auto px-6 pt-4 pb-8">
            <form method="dialog" className="flex justify-end">
              <button
                type="submit"
                className="grid size-11 place-items-center rounded-full transition-colors hover:bg-papier"
                autoFocus
              >
                <Icone nom="fermer" taille={26} />
                <span className="lecteur-seul">{libelleFermer}</span>
              </button>
            </form>

            <nav aria-label={libelleNavigation} className="mt-2">
              <ul className="divide-y divide-filet">
                {items.map((item) =>
                  item.enfants?.length ? (
                    <li key={item.libelle}>
                      <details className="group py-1">
                        <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-h4 font-semibold [&::-webkit-details-marker]:hidden">
                          {item.libelle}
                          <Icone
                            nom="chevron"
                            taille={16}
                            className="transition-transform duration-200 group-open:rotate-180"
                          />
                        </summary>
                        <ul className="pb-3 ps-3">
                          {[...(item.href ? [{ libelle: item.libelle, href: item.href }] : []), ...item.enfants].map(
                            (lien) => (
                              <li key={lien.href}>
                                <Link
                                  href={lien.href}
                                  aria-current={pathname === lien.href ? 'page' : undefined}
                                  className="block py-2 text-normal text-texte-doux aria-[current=page]:font-semibold aria-[current=page]:text-accent"
                                >
                                  {lien.libelle}
                                </Link>
                              </li>
                            ),
                          )}
                        </ul>
                      </details>
                    </li>
                  ) : (
                    <li key={item.libelle}>
                      <Link
                        href={item.href}
                        aria-current={pathname === item.href ? 'page' : undefined}
                        className="block py-4 text-h4 font-semibold aria-[current=page]:text-accent"
                      >
                        {item.libelle}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="mt-auto pt-8">{pied}</div>
          </div>
        )}
      </dialog>
    </>
  )
}
