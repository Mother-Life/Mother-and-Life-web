# Charte du mouvement

Validée le 20 octobre 2026 (arbitrage délégué par Alain). Elle remplace le plan d'animation. **Toute nouvelle page applique ces règles avec les outils déjà en place** : pas d'animation inventée au cas par cas, pas de bibliothèque d'animation.

## 1. Trois gestes, rien d'autre

| Geste | Ce que l'œil voit | Outil |
|---|---|---|
| **L'encre qui se pose** | un pinceau, un trait ou un soulignement se peint dans son sens, avec un front de poils | `data-encre`, masques `--ml-masque-*`, `stroke-dashoffset` |
| **La feuille qui éclot** | un bloc monte doucement ; une photo s'ouvre par sa feuille | `data-revele`, `data-feuille` |
| **Le souffle** | respiration lente : bandeau, jauge, goutte le long du trait, dérive des motifs | `.defilement`, `.jauge-*`, `data-derive` |

## 2. Règles

1. **Une seule figure expressive animée par section.** Le reste du contenu reste calme (le texte courant ne s'anime jamais lettre par lettre).
2. **Durées et courbes : uniquement les jetons** (`tokens.css`) : `--ml-duree-courte` 160 ms (couleur), `--ml-duree` 320 ms (survol), `--ml-duree-longue` 720 ms (entrée), `--ml-duree-trace` 900 ms (trait) ; `--ease-encre` pour ce qui se peint, `--ease-sortie` pour ce qui arrive, `--ease-ressort` pour ce qui se pose.
3. **Rien de caché sans animation qui le révèle.** Sans support (Firefox pour les animations liées au défilement), le contenu est visible et immobile : amélioration progressive, aucun JavaScript de repli pour le décor.
4. **`prefers-reduced-motion`** : chaque règle est coupée à la source ; l'état final s'affiche (couleur de survol, décor posé).
5. **Survol = focus clavier.** Tout effet de survol se déclenche aussi au `:focus-visible`. Sur écran tactile, il joue à la pression.
6. **Performance** : on anime `transform` (et les propriétés `translate`, `rotate`, `scale`), `opacity`, `clip-path`, `mask-position`, `stroke-dashoffset`. Jamais la hauteur, la largeur ni les marges. Jamais d'opacité sur le candidat LCP.
7. **Pas de mouvement sans fin** : une boucle s'arrête d'elle-même (3 passages) ou se met en pause (bandeau : survol, focus, bouton).
8. **Couleurs** : un état de survol garde le contraste AA de son texte (le rose pigment s'éclaircit au lieu de foncer, car son texte est Nuit).

## 3. Catalogue (ce qui existe, à réutiliser)

### Boutons pinceau (`BoutonPinceau`, `composants/bouton-pinceau.css`)
| État | Effet |
|---|---|
| Apparition | le pinceau se peint de gauche à droite (`apparition="chargement"` ou `"defilement"`) |
| Survol / focus | une seconde couche d'encre (`--bp-peinture`) se peint de gauche à droite derrière un front de poils (460 ms) ; le pinceau s'étire, la flèche avance, une ombre d'encre légère se décale |
| Sortie | la seconde couche sèche (fondu 260 ms), sans repasser en arrière |
| Pression | le pinceau s'écrase, le bouton à 97 % |
| Tactile | le balayage joue à la pression (240 ms) |
| Envoi | le pinceau respire (`aria-busy`) |
| Désactivé | encre Limon, aucun effet |

Encre de la seconde couche par variante : Encre → Nuit ; Action, Vert → la même encre mêlée de Nuit ; Rose → rose éclairci ; Contour → Sable.

### Liens textuels (`.lien-encre` + `.lien-encre__texte`)
Le soulignement peint de la DA se peint sous le texte (380 ms), la flèche avance. Page courante : soulignement affiché. Utilisé par `LienFleche`, la navigation, le pied de page, les titres d'articles, le sélecteur de langue. **Plus de `hover:underline` dans le code.**

### Réseaux sociaux (`.pastille-sociale`, `.icone-sociale`)
Toutes identiques au repos. Survol : une tache d'encre rose se pose depuis le centre (rebond), l'icône passe en Craie. Barre du haut : l'icône monte de 2 px et passe en vert clair.

### Décors (`Illustration encre="…"`, `data-encre`)
`encre="gauche|droite|haut|bas"` : le décor se peint dans ce sens quand il arrive à l'écran ; `encreAuChargement` pour le premier écran. `derive` : motif de fond qui dérive de ±40 px au défilement (bureau). En place : pinceaux du hero (chargement), mains des portes, pinceau de la preuve, guillemets de l'histoire, mains de la campagne, bord peint de l'album, déchirure et pinceau du pied de page ; motifs de mains et vagues en dérive.

### Photos dans la feuille (`data-feuille`)
La photo s'ouvre par un cercle qui grandit et se pose (échelle 1,14 → 1). Utilisé par le collage de la preuve.

### En-tête et barre WhatsApp
L'en-tête se pose sur la page au défilement (fond plus dense, ombre, logo à 86 %). La barre WhatsApp entre une seule fois après l'entrée du hero (1,6 s).

### Hero
Contour rose qui se trace, mot souligné, annotation écrite derrière un front de pinceau, cœur qui se pose, goutte d'encre qui coule trois fois le long du trait « Faire défiler ».

### Partenaires
Logos en retrait (niveaux de gris) sur ordinateur, couleurs au survol ; en couleurs sur mobile.

## 4. Lottie

Réservé à 2 ou 3 vraies petites animations dessinées (par exemple les mains de la campagne qui tendent le cœur, la feuille du logo qui éclot, l'état « merci »), quand les fichiers existeront. Contraintes : lecteur `lottie-web` version « light » (la version complète utilise `eval`, interdit par la CSP), chargé seulement à l'arrivée à l'écran, image SVG fixe avant et en mouvement réduit, fichiers servis depuis `/public/animations/`, jamais dans le premier écran.

## 5. Contrôle avant de livrer une page

- Le rendu final (mouvement réduit) correspond à la maquette.
- Chaque survol fonctionne aussi au clavier, et au toucher.
- Aucune animation ne décale la mise en page (CLS 0).
- Une seule figure expressive animée par section.
