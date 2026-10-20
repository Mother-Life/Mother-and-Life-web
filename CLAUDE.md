# Mother & Life : contexte de reprise

À lire en premier dans toute nouvelle session. Mis à jour le 14 octobre 2026.

## Le projet en une phrase

Site web bilingue FR/EN, avec un panneau d'administration, pour Mother & Life : association camerounaise de périnatalité sociale (Douala, antennes de Bépanda, Batié et Bafandji). Déploiement prévu sur Vercel. Baseline officielle : « La maternité positive ».

## Rôle et cadre

- Alain (DarkSterX), designer produit senior, est signataire et bénévole sur le projet. Il n'est pas rémunéré. Seules les ressources du projet sont payées.
- Conséquence pour Vercel : le plan Hobby convient. Demander des dons n'est pas un usage commercial, et personne n'est payé pour créer ou héberger le site. À revoir si un développeur rémunéré rejoint le projet.
- Le code de ce dossier est un **prototype non finalisé**. On l'améliore, on ne le jette pas.

## Où sont les sources de vérité

| Sujet | Emplacement |
|---|---|
| Spec fonctionnelle v1.4 (arborescence, collections, blocs P1 à P9, albums, dons, chiffres, déploiement) | Projet Claude « Mother&Life » : `claude/SPEC_FONCTIONNELLE_motherandlife.md` |
| Design tokens v2.0 (palette vérifiée, typo, espacements) | Projet Claude : `claude/TOKENS_design_v2.md`, fichiers `Brand/tokens/` du dossier Mother&Life |
| Prototype accueil mobile 375 px | Dossier Mother&Life : `Brand/prototypes/accueil-375.html` |
| Moodboard web annoté | Figma, fichier `AWdaRtrMSm0Y4BGKGV53Aq`, section `1280:1702`. Les notes d'Alain sont des annotations sur chaque image, lisibles via `get_design_context` (attribut `data-annotations`) |
| Maquettes Figma existantes | Même fichier, conteneur `1218:308` (correspondance écrans et routes : spec §13) |

Ne jamais refaire ce que la spec couvre déjà. La lire d'abord, en ciblant les sections utiles (§3 modèle, §3.11 blocs, §5 albums et actualités, §10 chiffres, §12 déploiement, §13 écrans).

## Décisions actées

**Direction artistique**

- Peau expressive sur squelette calme et ergonomique. Les éléments retenus : assets peinture, papier déchiré, photos dans des formes, illustration à main levée, feuille du logo, tags (kickers) avant les titres. Le ton est ludique, mais lisible et accessible.
- Règle validée : **une seule figure expressive par section**. Le hero a peinture + déchirure. Les services ont des pictos dessinés. La preuve a des photos dans la feuille. Jamais tout en même temps.
- La forme de masque photo signature est la feuille-goutte du logo, pas le cercle générique.
- Les assets sont faits main par l'équipe quand c'est possible : peinture sur papier scannée puis vectorisée, annotations écrites par les sages-femmes. Toujours en SVG légers, jamais en PNG lourds (cible 3G).
- Effet verre cannelé (moodboard image 14) : une utilisation maximum, bureau seulement, rendu pré-calculé dans l'image, désactivé en `prefers-reduced-motion`.
- Header intégré dans le hero sur bureau (image 11) : retenu comme piste.

**Notes d'Alain sur le moodboard (scores)**

- Board « image 20 » : hero 9/10.
- Board « image 22 » : hero 8/10 (un peu chargé), section Soutenir 10/10.
- Board « image 19 » : hero 5/10, boutons appréciés.
- Références aimées : virtus (photos dans des formes, sections qui respirent, à faire en couleur), CareNest (hero et section 2, « parle assez mais ergonomique »), Danfit (peinture), Kolypsia (photo dans une forme et surlignage peint), Master Creationz (testimonial distinctif).

**À ne pas reprendre des boards générés par IA**

- Les chiffres inventés (« +2 500 femmes », « 1 000+ », « 48 communautés »).
- Le faux témoignage « Aminata, bénéficiaire ».
- La paire Playfair + Inter.
- La palette Tailwind par défaut (`#0EA5E9`, `#22C55E`).
- Les cœurs décoratifs.
- La phrase « chaque naissance est une victoire », délicate pour une association de périnatalité.
- Le logo redessiné de ces boards est une bonne piste, mais c'est un rendu IA à revectoriser à la main.

**Tokens v2.0 (remplacent v1 dans le code)**

- Fraunces (`SOFT 30`, `WONK 0`) pour les titres, Source Sans 3 pour le texte.
- Pigments du logo exacts : `#FF0099`, `#00AAFF`, `#08C577`. Réservés aux aplats et au fond Nuit, jamais au texte sur fond clair.
- Variantes accessibles : Rose Action `#B00060`, Bleu Info `#006C8E`, Vert Autonomie `#08704D`.
- Neutres : Craie `#FFFCF7`, Papier `#F5F0E6`, Sable `#EBE4D6`, Nuit `#06202B`, Encre `#1B3C46`, Ardoise `#53636A`, Limon `#8C7F6B` (bordures), Argile `#D6CBBA` (filets seulement).
- Display mobile plafonné à 36 px. CTA WhatsApp avant le don. Une seule impulsion rose par écran.

**Contenu**

- Chiffres : uniquement ceux de la spec §10.2. Accueil : 75 femmes suivies, 36 naissances, 40 établissements, 71 % en impact direct. Dons : 100 000 FCFA une grossesse, 120 000 FCFA un accouchement, 340 FCFA un jeune sensibilisé.
- Montants en FCFA en principal, équivalent euro entre parenthèses.
- Témoignages réels uniquement, avec consentement. Piste à creuser : notes vocales WhatsApp, transcrites et sans visage.
- Campagne en cours : Panier de vie 2026. Événement le samedi 19 décembre 2026, 40 000 FCFA par panier, objectif 4 000 000 FCFA, 50 à 100 femmes enceintes vulnérables à Douala.

**Structure (validée)**

- Les éléments expressifs sont des **variantes de blocs** dans l'admin (« cadre : déchiré / feuille / cercle », « accent : rose / bleu / vert »), jamais une mise en forme libre laissée aux bénévoles.
- Nouvelle collection **Campagnes** (objectif, progression, dates, visuel), affichée en grille de cartes, sur le modèle de la section 2 de Childfund.
- Point focal obligatoire sur les médias, pour qu'un masque ne coupe jamais un visage.

## Front public (refonte du 20 octobre 2026)

L'accueil est intégré d'après la maquette Figma validée (`l8gg2K9v3GMjde9mplNi16`, page 10). Architecture, conventions, sécurité et mouvement : **`docs/ARCHITECTURE_FRONT.md`, à lire avant de toucher au front.** Points clés :

- Atomic design (`components/atoms|molecules|organisms|templates`), composants serveur par défaut, îlots client minimaux.
- Polices auto-hébergées : Nunito, Literata (citations), Caveat (surtitres et annotations). Elles remplacent Fraunces et Source Sans 3 citées plus bas.
- Données : `lib/cms/*` lit Payload et produit des modèles de vue ; `lib/content/fallback.ts` reprend la maquette tant que l'admin est vide.
- CSP à nonce par requête (middleware), en-têtes de sécurité dans `next.config.ts`.
- Les photos `provisoire-*` attendent les originaux de la maquette ; plusieurs décors lourds (pinceaux du hero, mains de la campagne) restent à récupérer et à optimiser.
- L'ancien front est sauvegardé dans `_sauvegardes/2026-10-20-avant-front/`.

## État du code (prototype)

Stack : Next.js 15, Payload CMS 3 (admin sur `/admin`), Postgres Neon en production et SQLite en local, Cloudflare R2 via `@payloadcms/storage-s3`, Resend, Tailwind 4. 18 collections, 7 globals, 5 rôles, FR/EN, formulaires zod + honeypot, modèle de consentement sur les médias.

**Six bloquants avant mise en ligne :**

1. **Aucune revalidation.** Les pages sont générées au build (`generateStaticParams`), sans `revalidate` ni hook. `REVALIDATE_SECRET` n'est pas utilisé. Correctif : hooks `afterChange` et `afterDelete` avec `revalidatePath` / `revalidateTag` sur chaque collection et global publics.
2. **Aucune migration.** `push` est désactivé en production et il n'existe pas de dossier `src/migrations`. Correctif : `payload migrate:create`, puis migration lancée au build Vercel.
3. **Limite d'upload de 4,5 Mo sur Vercel.** `clientUploads` est absent de `s3Storage` dans `src/payload.config.ts`. Correctif : `clientUploads: true`, plus CORS sur R2 (`PUT`, en-tête `If-None-Match`).
4. **Création publique ouverte.** Messages, Candidatures, Abonnés et Dons ont `create: () => true` dans `src/collections/Content.ts`, ce qui permet de contourner zod et le honeypot via l'API REST. Correctif : restreindre `create` aux admins. Les routes `app/api/*` passent par l'API locale et continuent de fonctionner.
5. **Secret de repli connu.** `PAYLOAD_SECRET || 'dev-secret-…'` dans `payload.config.ts`. Correctif : lever une erreur en production si la variable manque.
6. **Tokens v1 encore dans `src/styles/globals.css`** (Inter, `#1e1e1e`, `#101828`, `#c4007a`). Correctif : migrer vers les tokens v2.

Mineur : `README.md` est encodé en Windows-1252 (caractères cassés) et indique `cd Landing` alors que le dossier a été renommé.

## Questions ouvertes

- Qui publiera réellement dans l'admin, et depuis quel appareil ?
- Quel numéro afficher sur le bouton WhatsApp : +237 656 27 96 70 ou +237 677 38 94 63 ?
- Femmes « reçues » ou « suivies » : définir deux indicateurs distincts (spec §10.3).
- Taux de change affiché sur la page don : en dur ou non ?
- Citation de l'accueil : à attribuer à une personne réelle, la présidente Makoudoum Régine Flore ou le vice-président Dr Towa Willy (spec §14).
- Redessin vectoriel du symbole.

## Prochaine étape

**Spec v1.5 : le delta entre la v1.4 et la nouvelle direction.** Ne pas réécrire la spec, documenter uniquement ce qui change.

1. Plan de site : confirmer les 9 écrans de §13 et ajouter les écrans manquants qu'elle liste.
2. Bibliothèque de blocs : reprendre les blocs de §3.11 et définir pour chacun sa figure expressive autorisée et ses variantes administrables.
3. Modèle Payload : collection Campagnes, champ audio pour les témoignages, point focal obligatoire, champs de consentement exigés à la publication.
4. Plan de correction des six bloquants, dans l'ordre 1, 2, 3, 4, 5, 6.

Livrable : `claude/SPEC_DELTA_v1.5.md` dans le projet Claude. Ensuite viendront le code (bloquants et tokens v2), puis la maquette Figma de l'accueil, bureau et mobile, avec les photos réelles.
