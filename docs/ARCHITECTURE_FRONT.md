# Front public : architecture et conventions

Refonte du 20 octobre 2026. Seule la stack est conservée (Next.js 15, Payload 3, Tailwind 4). L'ancien front est sauvegardé dans `_sauvegardes/2026-10-20-avant-front/`.

## Arborescence

```
src/
  app/[lang]/            routes publiques (FR sans préfixe, EN sous /en)
  components/
    atoms/               briques sans logique métier : Icone, Picto, Pinceau, BoutonPinceau,
                         Surtitre, LienFleche, Photo, Logo, Illustration, Feuille, Soulignement, Dechirure
    molecules/           assemblages d'atomes : CartePorte, CarteAxe, CompteurChiffre, JaugeFeuilles,
                         WidgetDon, LigneArticle, NavigationPrincipale, MenuMobile, FormulaireLettre…
    organisms/           sections complètes : EnTete, PiedDePage, HeroAccueil, SectionPortes,
                         SectionPreuve, BandeauAxes, SectionAxes, SectionHistoire, SectionCampagne…
    templates/           gabarits de page : GabaritAccueil, GabaritTexte
  lib/
    cms/                 lecture de Payload → modèles de vue (cache étiqueté « cms »)
    content/             modèles de vue (types.ts) et contenus de secours (fallback.ts)
    i18n/                langues et libellés d'interface (ui.ts)
    security/            CSP à nonce, limiteur de débit
    actions/             actions serveur (lettre d'information)
  styles/
    tokens.css           design tokens (source : variables Figma)
    motion.css           tout le mouvement du site
    composants/          CSS des atomes à états complexes (bouton pinceau, menu mobile)
  assets/                polices, décors SVG, photos importées statiquement (URL hachées)
```

## Règles

1. **Les composants ne connaissent pas Payload.** Ils reçoivent des modèles de vue (`lib/content/types.ts`). Toute lecture du CMS passe par `lib/cms/*`, qui traduit et applique les filets (consentement des médias, textes vides).
2. **Composants serveur par défaut.** `'use client'` seulement pour une interaction réelle : menu, bandeau en pause, compteur, choix du montant, lettre. Ces îlots restent petits.
3. **Tokens, jamais de valeurs en dur.** Couleurs, tailles et rayons viennent de `tokens.css`. Les rôles (`bg-fond`, `text-texte`, `border-filet`…) suivent la surface (`data-surface="papier|nuit"`).
4. **Le mouvement vit dans `motion.css`.** Trois gestes de la DA : l'encre qui se pose (tracés de gauche à droite), la feuille qui éclot (montée douce), le souffle (bandeau, jauge). Animations liées à la vue (`animation-timeline: view()`) en amélioration progressive, désactivées une à une en `prefers-reduced-motion`. Jamais d'opacité animée sur le candidat LCP.
5. **Sans JavaScript, tout reste lisible et utilisable** : contenu visible, formulaires fonctionnels (le don est un GET vers `/don`, la lettre une action serveur).
6. **Accessibilité** : un `h1` par page, sections reliées à leur titre, décors `aria-hidden`, cibles de 44 px, focus visible, mouvement > 5 s pausable.
7. **Images** : `next/image` (AVIF/WebP, tailles adaptées), point focal du CMS respecté, `prioritaire` uniquement sur la photo du hero. Décors en SVG optimisés (SVGO), le pinceau des boutons est un symbole unique partagé.

## Sécurité

- CSP stricte par requête (`script-src 'nonce-…' 'strict-dynamic'`), posée par le proxy (`src/proxy.ts`, ex-middleware) sur les pages publiques. L'admin a son propre régime.
- En-têtes communs dans `next.config.ts` : HSTS, nosniff, Referrer-Policy, Permissions-Policy, COOP, X-Frame-Options.
- Formulaires : validation zod côté serveur, pot de miel, limite de débit, réponses qui ne révèlent rien.
- Contenu du CMS rendu par React (échappé). Le JSON-LD est sérialisé et `<` échappé.
- Les pages sont rendues à la demande (le nonce l'impose) ; les lectures du CMS sont en cache et invalidées à chaque publication (`revalidateTag('cms')`). Région Vercel conseillée : `cdg1` (Paris), la plus proche de Douala.

## Contrôles

`npm run check` (encodage, types, lint) avant chaque envoi. `npm run format` pour Prettier.
