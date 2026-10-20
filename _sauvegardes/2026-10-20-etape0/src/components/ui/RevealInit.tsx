'use client'

import { useEffect } from 'react'

export function RevealInit() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.rv').forEach((el) => el.classList.add('in'))
      return
    }

    const timers = new Set<ReturnType<typeof setTimeout>>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const parent = entry.target.parentElement
          const siblings = parent ? Array.from(parent.querySelectorAll(':scope > .rv')) : [entry.target]
          const index = Math.max(siblings.indexOf(entry.target as Element), 0)
          const timer = setTimeout(() => {
            entry.target.classList.add('in')
            timers.delete(timer)
          }, index * 80)
          timers.add(timer)
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.15 },
    )

    const observeRevealElements = (root: ParentNode | Element) => {
      const elements: Element[] = []

      if (root instanceof Element && root.matches('.rv:not(.in):not(.reveal-pending)')) {
        elements.push(root)
      }

      elements.push(
        ...Array.from(root.querySelectorAll('.rv:not(.in):not(.reveal-pending)')),
      )

      elements.forEach((element) => {
        element.classList.add('reveal-pending')
        io.observe(element)
      })
    }

    // La mise en page persiste pendant que Next diffuse la page suivante.
    // On surveille donc le DOM pour enregistrer le contenu qui arrive apres le
    // changement d'URL. La surveillance est limitee a <main> : l'en-tete, le
    // pied de page et les portails n'ont pas d'elements a reveler.
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) observeRevealElements(node)
        })
      })
    })

    const watched = document.getElementById('main') ?? document.body
    mutations.observe(watched, { childList: true, subtree: true })
    const frame = requestAnimationFrame(() => observeRevealElements(document))

    return () => {
      cancelAnimationFrame(frame)
      timers.forEach(clearTimeout)
      mutations.disconnect()
      io.disconnect()
    }
  }, [])

  return null
}
