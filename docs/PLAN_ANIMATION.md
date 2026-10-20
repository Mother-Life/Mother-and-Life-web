# Plan d'animation : traits, textes, pinceaux et survols

Rédigé le 20 octobre 2026, à valider par Alain avant code. Complète `src/styles/motion.css` et `src/styles/composants/bouton-pinceau.css`, où vit déjà une partie du mouvement (traits qui se tracent, annotation qui s'écrit, cœur qui se pose, révélations au défilement, compteurs, jauge, bandeau).

## 1. Les trois gestes de la DA (ne pas en inventer d'autres)

| Geste | Sens | Où |
|---|---|---|
| **L'encre qui se pose** | un trait ou un aplat se peint de gauche à droite, avec une attaque rapide et une fin qui ralentit | pinceaux, soulignements, contours, mains en trait, boutons |
| **La feuille qui éclot** | montée douce et léger rebond, comme une pousse | cartes, photos dans la feuille, chiffres |
| **Le souffle** | respiration lente et continue | bandeau défilant, jauge, attente d'un envoi |

Règles : une seule figure expressive animée à la fois par section, aucune animation sur le texte courant, rien de plus long que 1,2 s à l'entrée, tout coupé en `prefers-reduced-motion`, aucune opacité animée sur le candidat LCP.

## 2. Lottie : oui, mais pas pour tout

**Recommandation : SVG et CSS natifs pour les traits et les textes, Lottie seulement pour 2 ou 3 illustrations dessinées image par image.**

| | SVG + CSS (déjà en place) | Lottie |
|---|---|---|
| Poids | 0 Ko de JS | lecteur `lottie-web` « light » : environ 40 Ko compressés ; `dotlottie-web` : fichier WASM en plus |
| Rendu au chargement | immédiat, rendu serveur | attend le JS, il faut une image de repli |
| CSP | rien à changer | `dotlottie-web` demande `'wasm-unsafe-eval'` et un WASM auto-hébergé ; `lottie-web` complet utilise `eval` (interdit par notre CSP), donc version « light » obligatoire |
| Qui produit | le code, à partir des SVG existants | un fichier `.json`/`.lottie` à animer dans After Effects ou LottieFiles |
| Bon pour | traits qui se tracent, aplats qui se peignent, textes qui s'écrivent, survols | morphing, personnages, gestes complexes (une main qui tend un cœur, une feuille qui pousse) |

Pour un public qui navigue souvent en 3G, chaque kilo-octet compte : un trait animé en SVG est plus léger, plus net et prêt dès le premier rendu. Lottie se justifie quand Alain veut une vraie petite animation dessinée.

**Candidats Lottie (au choix d'Alain, 3 maximum) :**
1. Les mains de la campagne qui se tendent et posent le cœur (bloc Nuit, coin haut gauche).
2. La feuille du logo qui éclot au-dessus du trait « Faire défiler » (remplace le cœur vert qui se pose).
3. L'état « merci » après un don ou l'inscription à la lettre (petite feuille qui pousse).

**Intégration Lottie prévue :** composant `AnimationLottie` (îlot client), chargé seulement quand il entre à l'écran (`IntersectionObserver` + import dynamique), image SVG fixe affichée avant et à la place si mouvement réduit, lecteur `lottie-web/build/player/lottie_light`, fichiers JSON servis depuis `/public/animations/` (même origine, rien à ouvrir dans la CSP), pause hors écran.

## 3. Boutons pinceau : l'effet « peinture » au survol

C'est faisable sans Lottie, en gardant le tracé du pinceau comme symbole SVG partagé.

**Principe :** une seconde couche d'encre (une nuance plus foncée de la même couleur) est révélée par un **masque fait de coups de pinceau** qui se peignent de gauche à droite (`stroke-dashoffset` sur 3 traits épais au bout irrégulier). Le bouton semble repeint d'un geste.

| État | Ce qui se passe | Durée |
|---|---|---|
| Repos | le pinceau posé | |
| Apparition (au chargement ou à l'écran) | le pinceau se peint de gauche à droite | 600 ms |
| **Survol** | la seconde couche se peint par-dessus de gauche à droite, le pinceau s'étire de 4 %, la flèche avance | 380 ms |
| Fin du survol | la seconde couche s'efface vers la droite (pas de retour en arrière, l'encre « sèche ») | 250 ms |
| Pression | le pinceau s'écrase (échelle 1.02 × 0.9), le bouton à 97 % | 120 ms |
| Focus clavier | anneau franc, même effet que le survol, sans dépendre de la souris | |
| Envoi en cours | le pinceau respire, libellé « Envoi… » annoncé aux lecteurs d'écran | en boucle |
| Désactivé | encre Limon, aucun effet | |
| Tactile | pas de survol : l'effet joue au toucher (pression), une seule fois | |

Variante « contour » (Faire un don) : au survol, l'intérieur se remplit de Craie depuis la gauche.

## 4. Réseaux sociaux : un seul style, plus d'« actif »

Dans la maquette, la première pastille (Facebook) est en rose : c'est un état survol ou actif figé dans le dessin, pas un style à garder. **Toutes les pastilles prennent le même style au repos** : fond Craie, icône Nuit (pied de page) ; icône Craie (barre du haut).

| État | Pied de page (pastilles 40 px) | Barre du haut (icônes) |
|---|---|---|
| Repos | fond Craie, icône Nuit | icône Craie |
| Survol / focus | une **tache d'encre rose** (forme pinceau, pas un cercle parfait) se pose depuis le centre, l'icône passe en Craie, léger rebond | l'icône passe en vert clair et monte de 2 px |
| Pression | la tache s'écrase | |

Même mécanique que les boutons : une forme SVG partagée, aucun JS.

## 5. Inventaire par section

| Section | Ce qui s'anime | Déclencheur | Technique | Statut |
|---|---|---|---|---|
| En-tête | se compacte au défilement (hauteur 76 → 60 px, ombre légère) ; soulignement pinceau sous l'entrée de menu survolée ; menus déroulants qui éclosent | défilement, survol | CSS (`animation-timeline: scroll()`) | à faire |
| Hero | pinceau Sable qui se peint derrière la photo ; contour rose qui se trace (fait) ; mot souligné (fait) ; annotation qui s'écrit (fait, à rendre plus naturelle : masque en forme de trait au lieu d'un balayage droit) ; flèche « Faire défiler » qui coule vers le bas en boucle douce | chargement | CSS, masque SVG | partiel |
| Trois portes | mains en trait qui se dessinent ; cartes qui éclosent l'une après l'autre (fait) ; pinceau vert qui s'allonge au survol (fait) ; picto redessiné au survol (fait) | à l'écran, survol | SVG en traits (voir §6) | partiel |
| Preuve | photos qui se révèlent dans la feuille (le masque grandit) ; badge « 6 sur 10 » qui se pose penché (fait) ; chiffres qui comptent (fait) ; pinceau Papier en haut qui se peint | à l'écran | CSS `clip-path`, masque | partiel |
| Bandeau | défilement continu avec pause (fait) ; contour des lettres qui se dessine à l'arrivée | à l'écran | SVG texte en contour | à faire |
| Trois axes | carte verte de fond qui pivote en place (fait) ; disque d'icône qui « s'imprime » (tache d'encre) | à l'écran, survol | CSS | partiel |
| Histoire | guillemets qui se peignent ; citation qui apparaît par lignes (pas par lettres, pour rester lisible) ; motif de mains qui dérive très lentement (parallaxe légère, bureau seulement) | à l'écran | CSS | à faire |
| Campagne | mains en trait qui se dessinent (ou Lottie, §2) ; feuilles de la jauge qui s'allument (fait) ; montant choisi : la tache rose glisse d'une carte à l'autre ; bouton « Je soutiens » (§3) | à l'écran, clic | CSS, View Transitions | partiel |
| Actualités | bord peint qui « déchire » la photo à l'arrivée ; zoom doux de la photo au survol (fait) ; vagues roses qui ondulent lentement | à l'écran, survol | CSS | partiel |
| Partenaires | logos en niveaux de gris qui reprennent leurs couleurs au survol | survol | CSS `filter` | à faire |
| Pied de page | déchirure Craie qui se peint ; pinceau rose qui se pose ; pastilles sociales (§4) | à l'écran, survol | CSS | à faire |
| Bouton WhatsApp flottant | entre après le premier écran, se pose une fois (pas de pulsation en boucle, c'est stressant) | défilement | CSS | à faire |
| Liens fléchés | la flèche avance, soulignement pinceau qui se peint | survol | CSS (fait en partie) | partiel |
| Changement de page | fondu enchaîné entre pages, le logo reste en place | navigation | View Transitions API (Next 15, expérimental), amélioration progressive | à faire, après les pages intérieures |

## 6. Préparer les dessins pour qu'ils se « tracent »

Les mains (portes, campagne) sont aujourd'hui des formes pleines vectorisées : on peut les révéler par un balayage, pas les tracer trait par trait. Pour l'effet « dessiné à la main », il faut des **tracés à ligne centrale** (un seul trait d'épaisseur fixe), deux options :
- Alain exporte depuis Figma les vecteurs d'origine en traits (sans « vectoriser le contour »), ou
- le code les recalcule (vectorisation en ligne centrale), avec un rendu un peu moins fidèle.

Même besoin pour l'annotation manuscrite : idéalement écrite à la main par l'équipe et vectorisée en un trait.

## 7. Budget et contrôles

- JS d'animation hors Lottie : 0 Ko ajouté (tout en CSS et SVG). Lottie : seulement sur les sections concernées, jamais dans le premier écran.
- Pas de bibliothèque d'animation générale (GSAP, Framer Motion) : non nécessaire et lourd pour ce site.
- Animer uniquement `transform`, `opacity`, `clip-path`, `stroke-dashoffset` (pas de propriétés qui recalculent la mise en page).
- Contrôle à chaque lot : Lighthouse mobile (CLS 0, TBT inchangé), essai clavier, essai avec mouvement réduit, essai sur un Android d'entrée de gamme si possible.

## 8. Ordre de réalisation proposé

1. Boutons pinceau (survol peinture, focus, tactile) et pastilles sociales uniformes : le plus visible, réutilisé partout.
2. Liens, en-tête compact, WhatsApp flottant.
3. Révélations des sections (pinceaux, photos dans la feuille, bord peint de l'album, pied de page).
4. Mains et annotation en tracés centraux (après export d'Alain).
5. Lottie (2 ou 3 animations, après production par Alain).
6. Transitions entre pages, une fois les pages intérieures livrées.

## 9. Décisions attendues d'Alain

- Valider l'approche : SVG/CSS pour les traits et les textes, Lottie pour 2 ou 3 illustrations seulement.
- Choisir les illustrations Lottie et qui les anime (toi dans After Effects / LottieFiles, ou je les produis à partir des SVG).
- Couleur de la seconde couche au survol des boutons : une nuance plus foncée de la même encre (proposé) ou une autre encre (par exemple encre Nuit → rose).
- Envoyer, si possible, les mains et l'annotation en traits (§6).
