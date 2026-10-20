# Mother & Life — Plateforme web

Site vitrine bilingue FR/EN pour l'association Mother & Life (périnatalité sociale, Cameroun).

**Stack** : Next.js 15 · Payload CMS 3 · Postgres (Neon) · Cloudflare R2 · Tailwind CSS 4

**Spec de référence** : [`../SPEC_FONCTIONNELLE_motherandlife.md`](../SPEC_FONCTIONNELLE_motherandlife.md) v1.4

## Démarrage rapide

```bash
cd Landing
cp .env.example .env
# Configurer DATABASE_URI et PAYLOAD_SECRET
npm install
npm run dev
```

- Site : http://localhost:3000 (FR sans préfixe)
- Anglais : http://localhost:3000/en
- Admin : http://localhost:3000/admin

## Structure

```
src/
??? app/[lang]/          # Pages publiques (FR via rewrite middleware)
??? app/(payload)/       # Admin Payload + API
??? collections/         # Modèle de contenu Payload
??? globals/             # Organisation, don, chiffres clés…
??? blocks/              # Blocs CMS (P1–P9 + nouveaux)
??? components/
?   ??? ui/              # Atoms (Button, Kicker, Logo…)
?   ??? layout/          # Header, Footer, WhatsAppFab
?   ??? sections/        # Organisms (Hero, Zigzag, Stats…)
?   ??? forms/           # Formulaires
?   ??? filters/         # Actualités, albums
?   ??? media/           # Visionneuse albums
??? data/defaults.ts     # Données fallback (sans DB)
??? scripts/             # seed, import-medias, check-medias
```

## Lots de livraison

| Lot | Statut | Description |
|-----|--------|-------------|
| L0 Socle | ? | Next.js + Payload + Tailwind + tokens + UI atoms |
| L1 Modèle | ? | Collections, globals, rôles, seed |
| L2 Médias | ? | Scripts import/audit (R2 à configurer) |
| L3 Pages | ? | 9 écrans + blocs + layout |
| L4 Dynamique | ? | Actualités, albums, filtres, RSS |
| L5 Don/Forms | ? | Parcours don + 5 formulaires API |
| L6 Recette | ? | SEO, sitemap, robots, hreflang |

## Lacunes assets (Phase 0)

| Ressource | État |
|-----------|------|
| Logo horizontal header | Manquant — 2 SVG verticaux dans `../Logo/Assets/` |
| Favicon fond nuit | À générer |
| Photos terrain | ~90–100 publiables — tri L2 requis |
| Rapports PDF | À importer dans `/rapports` via CMS |
| Coordonnées Mobile Money | Structure prête, valeurs vides |
| Consentements Telegram | Bloquant pour album « Une journée dans l'eau » |

## Commandes

```bash
npm run dev              # Développement
npm run build            # Build production
npm run seed             # Peupler la base
npm run import:medias    # Import CSV médias
npm run check:medias     # Audit alt/consentement/poids
npm run generate:types   # Regénérer payload-types.ts
```

## Déploiement

1. Créer projet Vercel + repo GitHub
2. Configurer Neon Postgres (branches main/preview/dev)
3. Configurer Cloudflare R2 + `media.motherandlife.org`
4. Variables d'environnement (voir `.env.example`)
5. DNS `motherandlife.org` ? Vercel (A `76.76.21.21`)

## Conventions

- FR sans préfixe URL, EN sous `/en/`
- Couleurs via tokens CSS — jamais en dur
- Un seul CTA rose par écran
- Images R2 servies avec `unoptimized` (pas d'optimiseur Vercel)
