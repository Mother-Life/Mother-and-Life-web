'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Chiffre qui monte jusqu'à sa valeur quand il entre à l'écran, une seule fois.
 * Le serveur rend la valeur finale (lisible sans JavaScript, par les moteurs et
 * les lecteurs d'écran) ; l'animation ne démarre que si le chiffre n'est pas
 * déjà visible au chargement et si l'utilisateur n'a pas demandé moins de mouvement.
 * La largeur est réservée par la valeur finale : aucun décalage de mise en page.
 */
export function CompteurChiffre({ valeur, locale }: { valeur: string; locale: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [affiche, setAffiche] = useState(valeur)

  useEffect(() => {
    const el = ref.current
    const correspondance = valeur.match(/^(\D*)([\d\s.,  ]+)(.*)$/)
    if (!el || !correspondance || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const [, prefixe, nombreTexte, suffixe] = correspondance
    const cible = Number(nombreTexte.replace(/[^\d]/g, ''))
    if (!Number.isFinite(cible) || cible === 0) return

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) return // déjà visible : on n'anime pas

    const format = new Intl.NumberFormat(locale)
    const ecrire = (n: number) => setAffiche(`${prefixe}${format.format(n)}${suffixe}`)
    ecrire(0)

    let image = 0
    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (!entree?.isIntersecting) return
        observateur.disconnect()
        const debut = performance.now()
        const duree = 1400
        const pas = (t: number) => {
          const p = Math.min((t - debut) / duree, 1)
          const adouci = 1 - Math.pow(1 - p, 3)
          if (p < 1) {
            ecrire(Math.round(cible * adouci))
            image = requestAnimationFrame(pas)
          } else {
            setAffiche(valeur)
          }
        }
        image = requestAnimationFrame(pas)
      },
      { threshold: 0.6 },
    )
    observateur.observe(el)
    return () => {
      observateur.disconnect()
      cancelAnimationFrame(image)
    }
  }, [valeur, locale])

  return (
    <span ref={ref} className="inline-grid tabular-nums">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {valeur}
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {affiche}
      </span>
      <span className="lecteur-seul">{valeur}</span>
    </span>
  )
}
