# AGENTS.md : notice pour Cursor (et tout agent de code)

Lis ce fichier en entier avant de toucher au code. Il dit ce qu'est le projet, comment il est construit, ce qui est fait, ce qui reste à faire et les règles à ne pas casser. Il complète `CLAUDE.md` (contexte métier et décisions) et `docs/ARCHITECTURE_FRONT.md` (conventions du front). En cas de doute, ces deux fichiers font foi, puis la maquette Figma.

Dernière mise à jour : 20 octobre 2026.

---

## 1. Le projet en bref

- **Mother & Life** : association de périnatalité sociale à Douala (Cameroun), pour les femmes enceintes vulnérables. Baseline : « La maternité positive ».
- **Le site** : bilingue FR/EN (FR sans préfixe, EN sous `/en`), avec un back-office Payload sur `/admin` pour les bénévoles. Ils n'ont pas de profil technique : tout ce qui est éditable doit l'être sans risque de casser la mise en page.
- **Porteur** : Alain (DarkSterX), designer produit, bénévole. Il valide le design. Ne prends aucune décision de contenu ou de DA à sa place : signale-la.
- **Dépôt** : `github.com/Mother-Life/Mother-and-Life-web`, branche `main`. Déployé sur Vercel. Base de production : Postgres (Neon).

## 2. Stack

| Couche | Choix |
|---|---|
| Framework | Next.js 16.4 (App Router, Turbopack), React 19.3, TypeScript strict |
| CMS | Payload 3.91 (dans la même app Next, routes `src/app/(payload)`). Tous les paquets `payload` et `@payloadcms/*` portent **exactement** la même version |
| Styles | Tailwind 4 (`@theme` dans `src/styles/tokens.css`), CSS du mouvement dans `src/styles/motion.css` |
| Base | SQLite en local (`motherandlife.db`), Postgres Neon en production |
| Médias | Cloudflare R2 via `@payloadcms/storage-s3` (`clientUploads: true`), optionnel en local |
| E-mails | Resend (optionnel en local) |
| Hébergement | Vercel, région conseillée `cdg1` (Paris, la plus proche de Douala) |

## 3. Commandes

```bash
npm run dev            # serveur local (port 3000), refuse de démarrer si le port est pris
npm run check          # encodage UTF-8 + types + lint : à lancer avant chaque commit
npm run build          # build de production
npm run format         # Prettier

npm run db:reset       # base SQLite locale cassée ? la met de côté (.local-backups/) et repart à neuf
npm run migrate:create <nom>   # nouvelle migration Postgres (voir §6)
npm run migrate:status
npm run generate:types # régénère src/payload-types.ts après tout changement de schéma
```

Après `db:reset` : `npm run dev`, ouvrir `http://localhost:3000/admin`, créer le premier compte (il devient admin automatiquement, hook dans `src/collections/Users.ts`).

## 4. Arborescence utile

```
src/
  app/
    (payload)/            admin et API Payload (fichiers générés, ne pas modifier à la main)
    [lang]/               pages publiques : accueil, mentions légales, confidentialité, 404, erreur, image OG
    api/contact|don|candidature/   anciennes routes de formulaire, à revoir (§8)
    actualites/rss.xml, sitemap.ts, robots.ts
  collections/ globals/   schéma Payload (Campagnes, Piliers, Articles, Albums, Médias…, global Accueil à 9 onglets)
  components/
    atoms/ molecules/ organisms/ templates/    atomic design, voir docs/ARCHITECTURE_FRONT.md
  lib/
    cms/                  lecture Payload → modèles de vue (cache étiqueté « cms »)
    content/types.ts      modèles de vue : les composants ne voient QUE ces types
    content/fallback.ts   contenu de la maquette, affiché tant que l'admin est vide
    i18n/                 langues et libellés d'interface (ui.ts)
    security/             CSP à nonce (csp.ts), limiteur de débit (debit.ts)
    actions/              actions serveur (lettre d'information)
  styles/tokens.css       design tokens (source : variables Figma)
  styles/motion.css       tout le mouvement
  assets/                 polices, décors SVG, photos et logos importés statiquement
  proxy.ts                langue (réécriture FR) + CSP par requête (ex-`middleware.ts`, renommé par Next 16)
  lib/security/formulaire.ts  garde des routes de formulaire : origine, taille, débit, pot de miel
  migrations/             migrations Postgres (à commiter)
docs/ARCHITECTURE_FRONT.md, CLAUDE.md, AGENTS.md
```

## 5. Règles à ne jamais casser

1. **Les composants ne connaissent pas Payload.** Ils reçoivent des modèles de vue (`lib/content/types.ts`). Toute lecture du CMS passe par `lib/cms/*`.
2. **Composants serveur par défaut.** `'use client'` uniquement pour une vraie interaction, et l'îlot reste petit.
3. **Tokens, jamais de valeurs en dur** pour couleurs, polices, rayons. Les rôles (`bg-fond`, `text-texte`, `border-filet`…) suivent `data-surface="papier|nuit"`. Une section Papier doit avoir `data-surface="papier"` **et** `bg-fond`.
4. **Le mouvement vit dans `motion.css`**, en amélioration progressive, coupé en `prefers-reduced-motion`. Jamais d'opacité animée sur le candidat LCP (photo du hero sur bureau, titre sur mobile).
5. **Sans JavaScript, tout reste lisible et utilisable.** Le don est un formulaire GET vers `/don`, la lettre une action serveur.
6. **Accessibilité** : un seul `h1` par page, sections reliées à leur titre (`aria-labelledby`), décors `aria-hidden`, cibles de 44 px, focus visible, contraste AA. Les pigments (`#FF0099`, `#00AAFF`, `#08C577`) ne servent jamais de couleur de texte sur fond clair.
7. **Sécurité** : la CSP à nonce (`proxy.ts`) interdit tout script en ligne ou tiers. N'ajoute pas de script externe, d'iframe ni de domaine sans mettre à jour `lib/security/csp.ts` et sans le signaler. Formulaires : zod côté serveur, pot de miel, limite de débit. Aucun secret dans le code : tout passe par les variables d'environnement.
8. **Chiffres et montants** : uniquement les chiffres sourcés (`CLAUDE.md`, spec §10). FCFA en principal ; l'équivalent euro est **calculé** (`lib/currency.ts`, 655,957 FCFA = 1 €), jamais tapé.
9. **Contenu** : témoignages réels avec consentement uniquement. Jamais de chiffre, de nom ou de citation inventés.
10. **Encodage** : tous les fichiers en UTF-8 (`npm run check:encoding`). Plusieurs anciens fichiers `docs/*.md` et `README.md` sont en Windows-1252 : à convertir si tu les modifies.

## 6. Base de données et migrations (cause de la panne du 20 octobre)

- **Local** : SQLite, schéma synchronisé automatiquement par Payload au démarrage (`push`). Sur une base déjà remplie, cette synchro peut échouer à mi-chemin (`index … already exists`, `Failed query … from "organisation"`). Remède : `npm run db:reset`.
- **Production** : Postgres. Payload n'y crée **jamais** les tables tout seul. Le schéma vient des fichiers de `src/migrations/`, exécutés au démarrage du serveur (`prodMigrations` dans `payload.config.ts`). La migration initiale `20261020_165822_initial` a été vérifiée sur un vrai Postgres 16 (217 tables, création du premier compte, connexion).
- **À chaque changement de schéma** (champ, collection, global, option de select, `localized`, `required`…) :
  1. `DATABASE_ADAPTER=postgres DATABASE_URI=postgres://… npm run migrate:create <nom-court>` (une base Postgres locale suffit : `docker compose up -d` lance celle de `docker-compose.yml`) ;
  2. `npm run generate:types` ;
  3. commiter le schéma, `src/migrations/*` et `src/payload-types.ts` **dans le même commit**.
  Sans migration, la production plante au déploiement suivant (`relation "…" does not exist`).
- Variables Vercel : `DATABASE_ADAPTER=postgres`, `DATABASE_URI`, `PAYLOAD_SECRET` (32 caractères minimum, obligatoire), `NEXT_PUBLIC_SERVER_URL`. Optionnelles : `S3_*`, `NEXT_PUBLIC_MEDIA_URL`, `RESEND_*`.

## 7. Design : où est la référence

- **Fichier Figma** : `l8gg2K9v3GMjde9mplNi16` (« Mother & Life · Site web »), page `10 · Accueil`.
- **Accueil validé** : cadre `Accueil · Bureau 1440` (`136:630`). Le mobile `78:2` est **périmé** : la version mobile du code est une adaptation, à faire valider par Alain.
- **Pages intérieures dessinées** (même page Figma, à intégrer) :

| Page | Nœud Figma | Notes de conception |
|---|---|---|
| Être accompagnée | `216:829` | `216:1322` |
| Notre impact | `216:1397` | `216:5394` |
| Faire un don | `216:5428` | `216:9502` |
| Nos actions | `216:9541` | `216:10016` |
| L'association | `216:10054` | `216:10421` |
| Histoires | `216:10460` | (à vérifier) |
| Actualités | `216:10762` | (à vérifier) |
| Article | `216:11077` | (à vérifier) |

  Chaque cadre a une carte « Notes de conception » à droite : lis-la avant d'intégrer la page (sources du contenu, choix à valider).
- **Récupérer un asset de Figma** : le domaine `figma.com` est bloqué pour les téléchargements dans l'environnement de Claude. La méthode qui marche : rendu du nœud (capture PNG 2x), puis vectorisation (potrace) et SVGO pour les décors unis, ou WebP pour les photos. Les décors de l'accueil sont dans `src/assets/decor/` (pinceaux, mains, motif de mains) et les photos dans `src/assets/photos/accueil-*.webp`.
- **Écarts volontaires avec la maquette** (validés ou à valider) : bouton don rose avec texte Nuit (contraste) ; disque d'icône des axes uni au lieu de texturé (63 Ko évités) ; séparateur du bandeau en feuille au lieu d'un point pinceau.

## 8. État d'avancement et tâches

### Fait
- Accueil complet FR/EN, branché sur le CMS (global Accueil : sections dans un ordre fixe, chacune avec une case « afficher »), contenu de secours issu de la maquette.
- Accueil aligné sur la maquette bureau section par section le 20 octobre (hauteurs identiques à ±12 px), avec les vraies photos, les pinceaux, les mains et les logos partenaires.
- Sécurité : CSP à nonce, en-têtes stricts, lettre d'information en action serveur (zod, pot de miel, limite de débit), création publique fermée sur les collections sensibles, `PAYLOAD_SECRET` obligatoire en production.
- Revalidation : hooks `afterChange`/`afterDelete` → `revalidateTag('cms')`.
- Migrations Postgres + premier compte admin automatique.
- Mesures Lighthouse mobile (local) : accessibilité 100, SEO 100, bonnes pratiques 96, performance 80 à 85, CLS 0.

### À faire, par priorité

**P0, avant d'ouvrir le site au public** (détail : `docs/PLAN_SECURITE.md`)
1. Créer **immédiatement** le premier compte admin en ligne (la page de création est ouverte au premier venu). Migrations et admin vérifiés en ligne le 20 octobre.
1 bis. Mettre à jour Payload (≥ 3.90 : injection SQL, hachage des mots de passe) et Next (dernière 15.5.x), puis `migrate:create` si le schéma bouge. Interdire le SVG dans la médiathèque.
2. Revoir `src/app/api/contact`, `api/don` et `api/candidature` : ajouter pot de miel, limite de débit (`lib/security/debit.ts`) et réponses neutres, comme `lib/actions/newsletter.ts`. Idéalement, les convertir en actions serveur. Le champ `donateurTéléphone` (accent dans un nom de champ) est à renommer.
3. Règle CORS sur le bucket R2 (`PUT`, en-tête `If-None-Match`) si les médias passent par R2.
4. Pages légales : contenu réel (mentions légales, confidentialité) à fournir par l'association.

**P1, pages intérieures** (chacune : route sous `src/app/[lang]/…`, gabarit, organismes réutilisés de l'accueil, entrée dans `sitemap.ts`, métadonnées FR/EN). Les liens du menu mènent pour l'instant à la page « en construction ». Ordre conseillé : Faire un don (`/don`, reçoit le GET du widget), Être accompagnée, Nos actions, L'association, Notre impact, Actualités + Article, Histoires, Albums, Campagnes, Contact, Nous rejoindre.

**P1 bis, animations** : suivre `docs/PLAN_ANIMATION.md` (boutons pinceau au survol, pastilles sociales uniformes, révélations, Lottie pour 2 ou 3 illustrations seulement), après validation d'Alain.

**P2, finitions**
- Version mobile de l'accueil à faire valider par Alain (pas de maquette mobile à jour).
- Live Preview Payload sur l'accueil.
- Seed de contenu réel (script `scripts/seed.ts` à mettre à jour sur le schéma actuel).
- Convertir `README.md`, `docs/CONTENU_CHIFFRES.md` et `docs/GUIDE_BACKOFFICE.md` en UTF-8 et les remettre à jour.
- Performance : viser 90+ sur mobile (alléger le JS de l'admin n'est pas un sujet, seul le site public compte).

### Questions ouvertes (à poser à Alain, ne pas trancher seul)
- Numéro WhatsApp affiché : +237 656 27 96 70 ou +237 677 38 94 63 ?
- Paliers de don 10 000 / 20 000 / 40 000 FCFA : à confirmer.
- Citation de l'accueil : à attribuer à une personne réelle (présidente Makoudoum Régine Flore ou vice-président Dr Towa Willy).
- Mot « démunies » dans le sous-titre du hero : à confirmer.

## 9. Façon de travailler

- Une branche par sujet, des commits petits et lisibles, `npm run check` et `npm run build` verts avant de pousser.
- Avant d'intégrer un écran : lire la carte « Notes de conception » du cadre Figma, comparer le rendu à la maquette à la même largeur (1440 px bureau, 375 px mobile), section par section.
- Toute nouvelle dépendance doit se justifier (poids, sécurité, maintenance). Préférer la plateforme (CSS moderne, `<dialog>`, actions serveur).
- Ne modifie pas les fichiers générés par Payload (`src/app/(payload)/*`, `src/payload-types.ts` à la main, `importMap.js`).
- Ne supprime jamais une base ou un fichier de l'association sans accord explicite : `db:reset` met de côté, il ne supprime pas.
