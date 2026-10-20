# Plan sécurité : site, admin, infrastructure

Rédigé le 20 octobre 2026. Ordre = priorité. Chaque ligne dit **qui** agit : « code » (Claude ou Cursor), « Alain » (comptes et réglages en ligne), « bureau » (décision de l'association).

Contexte qui rend la sécurité sérieuse ici : l'association traite des données de femmes enceintes en situation de vulnérabilité (identité, téléphone, situation, parfois santé). Une fuite leur ferait un tort réel. Et depuis le 23 juin 2026, la loi camerounaise n° 2024/017 sur la protection des données personnelles s'applique : consentement explicite, minimisation, sécurité, droits d'accès et d'effacement, autorisation préalable pour les transferts hors du Cameroun (nos serveurs Vercel, Neon et R2 sont hors du Cameroun).

## Ce qui est déjà en place

- CSP stricte à nonce sur les pages publiques, en-têtes HSTS, nosniff, Referrer-Policy, Permissions-Policy, COOP, X-Frame-Options.
- Admin : 5 tentatives de connexion puis verrouillage 10 min, 5 rôles avec droits par collection, création publique fermée sur les collections sensibles.
- `PAYLOAD_SECRET` obligatoire en production, aucun secret dans le dépôt (historique Git vérifié le 20 octobre, y compris les anciennes archives `_sauvegardes/*.tgz`).
- Lettre d'information : zod, pot de miel, limite de débit, réponses neutres.

## P0 : cette semaine

1. **Mettre à jour Payload et Next (code).** `npm audit` du 20 octobre : 2 failles critiques et 14 élevées en production.
   - Payload ≤ 3.88 : injection SQL (SQLite et Postgres, corrigée en 3.90), hachage des mots de passe trop faible (PBKDF2, 3.90), déverrouillage de compte accessible à un utilisateur connecté, écrasement d'objets S3 par les envois directs du navigateur (3.90).
   - Next 15.4.11 : « request smuggling » dans les réécritures et déni de service via l'optimiseur d'images (corrigés dans la branche 15.5).
   - sharp < 0.35.5 : failles de libvips et libheif.
   - Méthode : monter tous les paquets `@payloadcms/*` et `payload` sur la même dernière 3.x, `next` sur la dernière 15.5.x, puis `npm run migrate:create maj-payload` (une nouvelle version peut ajouter des colonnes), `npm run check`, build, test de l'admin, commit des migrations.
2. **Créer le compte admin en ligne tout de suite (Alain).** Tant qu'aucun compte n'existe, `/admin/create-first-user` est ouvert au premier venu. Mot de passe long (gestionnaire de mots de passe), e-mail de l'association.
3. **Double authentification partout (Alain).** GitHub (et l'imposer à toute l'organisation Mother-Life : Settings › Authentication security), Vercel, Neon, Cloudflare, Resend, le bureau d'enregistrement du domaine, la boîte e-mail de l'association. C'est la mesure la plus rentable : la plupart des piratages de sites passent par un compte.
4. **Sécuriser les anciennes routes `/api/contact`, `/api/don`, `/api/candidature` (code).** Aujourd'hui : zod seulement. À ajouter : pot de miel, limite de débit (`lib/security/debit.ts`), vérification de l'origine (`Origin` = le site), réponses neutres, taille maximale du corps. Mieux : les convertir en actions serveur comme la lettre d'information.
5. **Interdire le SVG dans la médiathèque (code).** `Media` accepte `image/*`, donc `image/svg+xml`. Un SVG peut contenir du script : servi depuis notre domaine, c'est une faille XSS dans l'admin. Accepter seulement `image/jpeg`, `image/png`, `image/webp`, `image/avif`, `application/pdf`, `audio/*`, avec une taille maximale (par exemple 15 Mo).

## P1 : avant d'ouvrir le site au public

6. **Durcir Payload (code).**
   - Désactiver GraphQL (`graphQL: { disable: true }`) : le site ne s'en sert pas, c'est une surface d'attaque en moins.
   - Fixer `serverURL`, `csrf` et `cors` sur l'adresse du site (aujourd'hui implicites).
   - Cookies d'admin `Secure`, `SameSite=Lax`, durée de session courte (`tokenExpiration` 2 h) et sessions révocables.
   - `maxDepth` bas sur l'API REST (2) pour éviter les requêtes lourdes.
   - Champs `hash`, `salt`, jetons : jamais renvoyés (vérifier les réglages par défaut après la mise à jour).
7. **Pare-feu Vercel (Alain, 10 min, gratuit sur Hobby).** Vercel autorise sur Hobby 3 règles personnalisées, dont 1 de limitation de débit.
   - Règle 1 (limite de débit) : `POST` sur `/api/users/login` et `/api/*` → 20 requêtes par minute et par IP, sinon 429.
   - Règle 2 : bloquer les chemins de robots (`/wp-admin`, `/wp-login.php`, `/.env`, `/.git`).
   - Garder en tête le « mode défi » (Attack Challenge Mode) à activer en cas d'attaque.
8. **Protéger les déploiements de prévisualisation (Alain).** Vercel › Settings › Deployment Protection : « Standard Protection » pour que les URL de préversion ne soient pas publiques.
9. **Médias et vie privée (code + bureau).**
   - Supprimer les métadonnées EXIF (dont la position GPS) des photos envoyées : Payload garde l'original tel quel. Réencoder l'original à l'envoi.
   - Bucket R2 privé en écriture, CORS limité au domaine du site.
   - Rien de médical ni d'identifiant dans les formulaires publics. « Être accompagnée » doit demander le strict minimum (prénom, téléphone ou WhatsApp, quartier).
10. **Données personnelles, loi 2024/017 (bureau, avec le code en appui).**
    - Consentement explicite (case non cochée) sur chaque formulaire, lien vers la politique de confidentialité.
    - Durée de conservation : messages et candidatures supprimés automatiquement après 12 mois (tâche planifiée).
    - Droit d'accès et d'effacement : une adresse de contact et une procédure simple.
    - Transferts hors du Cameroun : vérifier auprès de l'autorité de protection des données la démarche pour héberger chez Vercel, Neon et Cloudflare.
    - Registre des traitements : une page qui liste ce qui est collecté, pourquoi, qui y accède et combien de temps.

## P2 : en continu

11. **Mises à jour automatiques (code).** Dependabot sur le dépôt (mises à jour de sécurité), et une GitHub Action qui lance `npm run check`, le build et `npm audit --omit=dev --audit-level=high` sur chaque push.
12. **Branche `main` protégée (Alain).** Push direct interdit, passage par une pull request quand la CI est verte. Quand plusieurs personnes (ou Cursor et Claude) travaillent en parallèle, cela évite qu'un commit cassé parte en production.
13. **Sauvegardes (Alain).** Neon garde un historique de restauration (vérifier la durée sur le plan gratuit). Ajouter un export mensuel chiffré de la base et du bucket R2, conservé hors de Vercel.
14. **Surveillance.** Alertes Vercel sur les erreurs 5xx, journal des connexions à l'admin (hook `afterLogin` qui enregistre date et IP), revue trimestrielle des comptes et des rôles.
15. **Rotation des secrets** si un secret a pu être exposé (copié dans une conversation, partagé par message) : `PAYLOAD_SECRET` (déconnecte tout le monde), clés R2, Resend, mot de passe Neon.

## Ce qu'on ne fera pas

- Cacher l'admin sous une adresse « secrète » : ça ne protège rien, le verrouillage, la double authentification et le pare-feu protègent.
- Ajouter un captcha visible sur les formulaires : le pot de miel et la limite de débit suffisent pour l'instant. Si le spam arrive, Cloudflare Turnstile (invisible) est la piste, avec mise à jour de la CSP.

Sources : [Loi 2024/017 en vigueur le 23 juin 2026](https://droitmediasfinance.com/index.php/actualites/droit-tech-fintech/1297-cameroun-la-loi-sur-la-protection-des-donnees-a-caractere-personnel-entre-en-vigueur-ce-23-juin-2026), [Vercel WAF Rate Limiting (limites Hobby)](https://vercel.com/docs/security/vercel-waf/rate-limiting), `npm audit --omit=dev` du 20 octobre 2026.
