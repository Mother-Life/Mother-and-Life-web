import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * Fusion de classes Tailwind consciente du thème Mother & Life.
 * Sans cette extension, tailwind-merge confondrait `text-h1` (taille) et
 * `text-texte` (couleur) et supprimerait l'une des deux.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'legende',
        'surtitre',
        'bouton-s',
        'bouton-m',
        'bouton-l',
        'petit',
        'normal',
        'large',
        'h6',
        'h4',
        'main',
        'h2',
        'h1',
        'citation',
        'display',
        'marque',
        'defilement',
      ],
      color: [
        'pigment-rose',
        'pigment-bleu',
        'pigment-vert',
        'axe-rose',
        'axe-bleu',
        'axe-vert',
        'rose-050',
        'bleu-050',
        'bleu-clair',
        'vert-clair',
        'craie',
        'papier',
        'sable',
        'nuit',
        'encre',
        'ardoise',
        'limon',
        'argile',
        'fond',
        'fond-alt',
        'texte',
        'texte-doux',
        'filet',
        'bordure',
        'accent',
      ],
      radius: ['champ', 'carte', 'panneau', 'bandeau', 'porte'],
    },
  },
})

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
