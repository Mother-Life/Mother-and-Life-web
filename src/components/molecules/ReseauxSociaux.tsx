import type { ReseauSocial } from '@/lib/content/types'
import type { Ui } from '@/lib/i18n/ui'
import { cn } from '@/lib/cn'
import { Icone, type NomIcone } from '../atoms/Icone'

const noms: Record<ReseauSocial, string> = {
  facebook: 'Facebook',
  x: 'X',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  tiktok: 'TikTok',
}

const icones: Partial<Record<ReseauSocial, NomIcone>> = {
  facebook: 'facebook',
  x: 'x',
  youtube: 'youtube',
  linkedin: 'linkedin',
}

/**
 * Liens vers les réseaux de l'association, tous au même style (aucune pastille
 * « active » : celle de la maquette était un état de survol figé).
 * `pastilles` : ronds de 40 px du pied de page, une tache d'encre se pose au
 * survol ; sinon icônes nues (barre du haut). Styles : composants/survols.css.
 */
export function ReseauxSociaux({
  reseaux,
  ui,
  pastilles = false,
  className,
}: {
  reseaux: { plateforme: ReseauSocial; url: string }[]
  ui: Ui
  pastilles?: boolean
  className?: string
}) {
  const affichables = reseaux.filter((r) => icones[r.plateforme])
  if (affichables.length === 0) return null
  return (
    <ul className={cn('flex items-center', pastilles ? 'gap-2.5' : 'gap-5', className)}>
      {affichables.map(({ plateforme, url }) => (
        <li key={plateforme}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ui.reseau(noms[plateforme])}
            className={pastilles ? 'pastille-sociale' : 'icone-sociale'}
          >
            <Icone nom={icones[plateforme]!} className="h-3.5 w-auto" />
          </a>
        </li>
      ))}
    </ul>
  )
}
