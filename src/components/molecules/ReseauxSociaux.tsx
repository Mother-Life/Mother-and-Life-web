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
 * Liens vers les réseaux de l'association.
 * `pastilles` : ronds de 40 px du pied de page ; sinon icônes nues (barre du haut).
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
      {affichables.map(({ plateforme, url }, i) => (
        <li key={plateforme}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ui.reseau(noms[plateforme])}
            className={cn(
              'grid place-items-center transition-colors duration-200',
              pastilles
                ? cn(
                    'size-10 rounded-full',
                    i === 0 ? 'bg-axe-rose text-craie hover:bg-pigment-rose' : 'bg-craie text-nuit hover:bg-vert-clair',
                  )
                : cn('size-6', i === 0 ? 'text-vert-clair' : 'text-craie', 'hover:text-vert-clair'),
            )}
          >
            <Icone nom={icones[plateforme]!} className="h-3.5 w-auto" />
          </a>
        </li>
      ))}
    </ul>
  )
}
