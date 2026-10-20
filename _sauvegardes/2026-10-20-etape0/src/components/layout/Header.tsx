'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { LangSwitcher } from './LangSwitcher'
import type { Locale } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'

type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

type HeaderProps = {
  locale: Locale
  navItems: NavItem[]
  donateLabel: string
  donateHref: string
}

export function Header({ locale, navItems, donateLabel, donateHref }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const mobileMenuRef = useRef<HTMLElement>(null)

  // Empeche le defilement de l'arriere-plan quand le menu mobile est ouvert.
  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen && !openDropdown) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpenDropdown(null)
      setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen, openDropdown])

  useEffect(() => {
    if (menuOpen) mobileMenuRef.current?.focus()
  }, [menuOpen])

  return (
    <>
      <header className="sticky top-0 z-[100] border-b border-hairline bg-white">
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6 md:px-12">
          <Logo href={locale === 'fr' ? '/' : '/en'} />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
            {navItems.map((item) =>
              item.children ? (
                <NavDropdown
                  key={item.href}
                  item={item}
                  open={openDropdown === item.href}
                  onOpenChange={(open) => setOpenDropdown(open ? item.href : null)}
                />
              ) : (
                <Link key={item.href} href={item.href} className="text-[15px] font-medium text-encre hover:text-rose-700">
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <LangSwitcher locale={locale} />
            <Button href={donateHref} className="px-4 py-2.5 text-[14px] sm:px-[26px] sm:py-[13px] sm:text-[15px]">
              {donateLabel}
            </Button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-hairline text-encre lg:hidden"
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <span className="text-xl leading-none" aria-hidden="true">
                &#9776;
              </span>
            </button>
          </div>
        </div>
      </header>

      <nav
        ref={mobileMenuRef}
        tabIndex={-1}
        className={cn(
          'fixed inset-0 z-[200] flex-col gap-2 overflow-y-auto bg-white p-6 lg:hidden',
          menuOpen ? 'flex' : 'hidden',
        )}
        aria-label="Menu mobile"
      >
        <button
          type="button"
          className="self-end text-[30px] leading-none text-encre"
          aria-label="Fermer le menu"
          onClick={() => setMenuOpen(false)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        {navItems.flatMap((item) =>
          item.children
            ? item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="border-b border-hairline py-3 font-display text-[28px] text-encre"
                  onClick={() => setMenuOpen(false)}
                >
                  {child.label}
                </Link>
              ))
            : [
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-hairline py-3 font-display text-[28px] text-encre"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>,
              ],
        )}
        <Button href={donateHref} className="mt-4">
          {donateLabel}
        </Button>
      </nav>
    </>
  )
}

/**
 * Menu deroulant utilisable a la souris comme au clavier : le bouton ouvre au
 * clic, Echap referme, et le panneau se ferme quand le focus quitte le groupe.
 */
function NavDropdown({
  item,
  open,
  onOpenChange,
}: {
  item: NavItem
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const panelId = useId()

  return (
    <div
      className="relative"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onOpenChange(false)
      }}
    >
      <button
        type="button"
        className="text-[15px] font-medium text-encre hover:text-rose-700"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        onClick={() => onOpenChange(!open)}
      >
        {item.label}
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute left-0 top-full z-50 min-w-[220px] rounded-[8px] border border-hairline bg-white py-2 shadow-[var(--shadow-card)]"
      >
        {item.children?.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            className="block px-4 py-2 text-[14px] text-encre hover:bg-gris-100"
            onClick={() => onOpenChange(false)}
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
