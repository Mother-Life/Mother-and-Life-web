'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import type { NavigationItem } from '@/lib/content/types'
import { cn } from '@/lib/cn'

/**
 * Navigation bureau. Les rubriques à sous-pages sont des boutons « disclosure »
 * (aria-expanded), pas des menus ARIA : on garde la tabulation naturelle.
 * Fermeture : Échap (le focus revient au bouton), clic extérieur, sortie du focus.
 */
export function NavigationPrincipale({ items, libelle }: { items: NavigationItem[]; libelle: string }) {
  const pathname = usePathname()
  // Le menu ouvert est lié à la page où il a été ouvert : changer de page le referme,
  // sans effet ni rendu en cascade.
  const [etat, setEtat] = useState<{ index: number; chemin: string } | null>(null)
  const ouvert = etat && etat.chemin === pathname ? etat.index : null
  const setOuvert = (index: number | null) => setEtat(index === null ? null : { index, chemin: pathname })
  const racine = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (ouvert === null) return
    const surClic = (e: PointerEvent) => {
      if (!racine.current?.contains(e.target as Node)) setEtat(null)
    }
    const surTouche = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      const bouton = racine.current?.querySelector<HTMLButtonElement>(`[data-index="${ouvert}"]`)
      setEtat(null)
      bouton?.focus()
    }
    document.addEventListener('pointerdown', surClic)
    document.addEventListener('keydown', surTouche)
    return () => {
      document.removeEventListener('pointerdown', surClic)
      document.removeEventListener('keydown', surTouche)
    }
  }, [ouvert])

  return (
    <nav aria-label={libelle}>
      <ul ref={racine} className="flex items-center gap-1">
        {items.map((item, i) =>
          item.enfants?.length ? (
            <Rubrique
              key={item.libelle}
              item={item}
              index={i}
              ouvert={ouvert === i}
              basculer={() => setOuvert(ouvert === i ? null : i)}
              fermer={() => setOuvert(null)}
              pathname={pathname}
            />
          ) : (
            <li key={item.libelle}>
              <Link href={item.href} aria-current={pathname === item.href ? 'page' : undefined} className={classeLien}>
                <span className="lien-encre__texte">{item.libelle}</span>
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  )
}

const classeLien =
  'lien-encre relative flex items-center gap-1 rounded-panneau px-2 py-1 text-[1.125rem] leading-7 font-medium text-texte transition-colors hover:text-accent aria-[current=page]:text-accent'

function Rubrique({
  item,
  index,
  ouvert,
  basculer,
  fermer,
  pathname,
}: {
  item: NavigationItem
  index: number
  ouvert: boolean
  basculer: () => void
  fermer: () => void
  pathname: string | null
}) {
  const id = useId()
  const liens = item.href ? [{ libelle: item.libelle, href: item.href }, ...(item.enfants ?? [])] : (item.enfants ?? [])
  const actif = liens.some((l) => l.href === pathname)

  return (
    <li
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) fermer()
      }}
    >
      <button
        type="button"
        data-index={index}
        aria-expanded={ouvert}
        aria-controls={id}
        onClick={basculer}
        className={cn(classeLien, actif && 'text-accent')}
      >
        <span className="lien-encre__texte">{item.libelle}</span>
        <span
          aria-hidden="true"
          className={cn('text-legende text-texte-doux transition-transform duration-200', ouvert && 'rotate-180')}
        >
          ▾
        </span>
      </button>
      <div
        id={id}
        hidden={!ouvert}
        className="absolute top-full left-0 z-50 pt-3 motion-safe:animate-[entree-monte_220ms_var(--ease-sortie)]"
      >
        <ul className="min-w-60 rounded-panneau border border-filet bg-craie p-2 shadow-flottant">
          {liens.map((lien) => (
            <li key={lien.href}>
              <Link
                href={lien.href}
                aria-current={pathname === lien.href ? 'page' : undefined}
                className="block rounded-carte px-3 py-2.5 text-petit text-texte transition-colors hover:bg-papier aria-[current=page]:font-semibold aria-[current=page]:text-accent"
              >
                {lien.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}
