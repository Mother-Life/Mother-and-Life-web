import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editeur', 'redacteur', 'finance', 'lecteur');
  CREATE TYPE "public"."enum_media_usage_autorise" AS ENUM('web', 'print', 'reseaux', 'bailleurs');
  CREATE TYPE "public"."enum_media_type" AS ENUM('activite', 'portrait', 'evenement', 'institutionnel', 'document', 'logo', 'illustration');
  CREATE TYPE "public"."enum_media_consentement" AS ENUM('ecrit', 'oral', 'non-requis', 'absent');
  CREATE TYPE "public"."enum_media_qualite" AS ENUM('exploitable', 'retouche-requise', 'archive');
  CREATE TYPE "public"."enum_piliers_couleur" AS ENUM('bleu', 'rose', 'vert');
  CREATE TYPE "public"."enum_piliers_picto" AS ENUM('accompagner', 'prevenir', 'autonomie');
  CREATE TYPE "public"."enum_antennes_statut" AS ENUM('active', 'projetee');
  CREATE TYPE "public"."enum_pages_blocks_zigzag_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_pages_blocks_grille_articles_mode" AS ENUM('auto', 'manuel');
  CREATE TYPE "public"."enum_pages_blocks_formulaire_type" AS ENUM('contact', 'benevolat', 'partenaire', 'newsletter');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_zigzag_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_grille_articles_mode" AS ENUM('auto', 'manuel');
  CREATE TYPE "public"."enum__pages_v_blocks_formulaire_type" AS ENUM('contact', 'benevolat', 'partenaire', 'newsletter');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_articles_blocks_zigzag_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_articles_blocks_grille_articles_mode" AS ENUM('auto', 'manuel');
  CREATE TYPE "public"."enum_articles_blocks_formulaire_type" AS ENUM('contact', 'benevolat', 'partenaire', 'newsletter');
  CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_blocks_zigzag_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__articles_v_blocks_grille_articles_mode" AS ENUM('auto', 'manuel');
  CREATE TYPE "public"."enum__articles_v_blocks_formulaire_type" AS ENUM('contact', 'benevolat', 'partenaire', 'newsletter');
  CREATE TYPE "public"."enum__articles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_albums_type_activite" AS ENUM('sensibilisation', 'consultation', 'formation', 'distribution', 'ceremonie', 'partenariat', 'evenement', 'porte-a-porte', 'atelier-bien-etre');
  CREATE TYPE "public"."enum_albums_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__albums_v_version_type_activite" AS ENUM('sensibilisation', 'consultation', 'formation', 'distribution', 'ceremonie', 'partenariat', 'evenement', 'porte-a-porte', 'atelier-bien-etre');
  CREATE TYPE "public"."enum__albums_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__albums_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_campagnes_statut" AS ENUM('preparation', 'en-cours', 'terminee');
  CREATE TYPE "public"."enum_campagnes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__campagnes_v_version_statut" AS ENUM('preparation', 'en-cours', 'terminee');
  CREATE TYPE "public"."enum__campagnes_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__campagnes_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_temoignages_voix" AS ENUM('mere', 'soignant', 'benevole', 'partenaire');
  CREATE TYPE "public"."enum_partenaires_type" AS ENUM('institutionnel', 'financier', 'technique', 'media', 'orientation');
  CREATE TYPE "public"."enum_rapports_type" AS ENUM('annuel', 'financier', 'activite', 'fiche-technique');
  CREATE TYPE "public"."enum_dons_devise" AS ENUM('XAF', 'EUR', 'USD');
  CREATE TYPE "public"."enum_dons_canal" AS ENUM('momo', 'om', 'virement', 'especes', 'international');
  CREATE TYPE "public"."enum_dons_affectation" AS ENUM('general', 'grossesse', 'education', 'autonomie');
  CREATE TYPE "public"."enum_dons_statut" AS ENUM('declare', 'confirme', 'annule');
  CREATE TYPE "public"."enum_messages_sujet" AS ENUM('info', 'benevolat', 'partenariat', 'don', 'autre');
  CREATE TYPE "public"."enum_candidatures_type" AS ENUM('benevolat', 'partenaire');
  CREATE TYPE "public"."enum_abonnes_langue" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_statistiques_externes_theme" AS ENUM('pauvrete', 'information', 'nutrition', 'accompagnement', 'sante');
  CREATE TYPE "public"."enum_settings_reseaux_plateforme" AS ENUM('facebook', 'instagram', 'tiktok', 'linkedin', 'youtube', 'x');
  CREATE TYPE "public"."enum_home_trois_portes_portes_icone" AS ENUM('accompagnee', 'don', 'rejoindre');
  CREATE TYPE "public"."enum_home_actualites_mode" AS ENUM('auto', 'manuel');
  CREATE TYPE "public"."enum_home_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_version_trois_portes_portes_icone" AS ENUM('accompagnee', 'don', 'rejoindre');
  CREATE TYPE "public"."enum__home_v_version_actualites_mode" AS ENUM('auto', 'manuel');
  CREATE TYPE "public"."enum__home_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_published_locale" AS ENUM('fr', 'en');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"prenom" varchar NOT NULL,
  	"nom" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'lecteur' NOT NULL,
  	"photo_id" integer,
  	"public_profile" boolean DEFAULT false,
  	"antenne_id" integer,
  	"actif" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "users_locales" (
  	"fonction" varchar,
  	"profession_affichee" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media_usage_autorise" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_media_usage_autorise",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_media_type" NOT NULL,
  	"album_id" integer,
  	"date_prise" timestamp(3) with time zone NOT NULL,
  	"annee" numeric,
  	"antenne_id" integer,
  	"credit" varchar,
  	"consentement" "enum_media_consentement" DEFAULT 'absent' NOT NULL,
  	"consentement_doc_id" integer,
  	"contient_mineur" boolean DEFAULT false NOT NULL,
  	"qualite" "enum_media_qualite" DEFAULT 'exploitable' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumb_url" varchar,
  	"sizes_thumb_width" numeric,
  	"sizes_thumb_height" numeric,
  	"sizes_thumb_mime_type" varchar,
  	"sizes_thumb_filesize" numeric,
  	"sizes_thumb_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_content_url" varchar,
  	"sizes_content_width" numeric,
  	"sizes_content_height" numeric,
  	"sizes_content_mime_type" varchar,
  	"sizes_content_filesize" numeric,
  	"sizes_content_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar,
  	"sizes_full_url" varchar,
  	"sizes_full_width" numeric,
  	"sizes_full_height" numeric,
  	"sizes_full_mime_type" varchar,
  	"sizes_full_filesize" numeric,
  	"sizes_full_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"legende" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"piliers_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "piliers_sous_themes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "piliers_sous_themes_locales" (
  	"libelle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "piliers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"couleur" "enum_piliers_couleur" NOT NULL,
  	"picto" "enum_piliers_picto",
  	"lien_page" varchar,
  	"ordre" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "piliers_locales" (
  	"nom" varchar NOT NULL,
  	"accroche" varchar,
  	"description" varchar,
  	"description_courte" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "antennes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nom" varchar NOT NULL,
  	"ville" varchar NOT NULL,
  	"telephone" varchar,
  	"whatsapp" varchar,
  	"coordonn_es_latitude" numeric,
  	"coordonn_es_longitude" numeric,
  	"photo_id" integer,
  	"ordre" numeric DEFAULT 0,
  	"statut" "enum_antennes_statut" DEFAULT 'active',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "antennes_locales" (
  	"adresse" varchar,
  	"horaires" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"nom" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tags_locales" (
  	"nom" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_declaration" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"titre" varchar,
  	"sous_titre" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"lien_secondaire" varchar,
  	"image_id" integer,
  	"afficher_badge_gratuit" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_trio_mission_entrees" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pilier_id" integer,
  	"titre" varchar,
  	"texte" varchar,
  	"lien" varchar,
  	"lien_label" varchar
  );
  
  CREATE TABLE "pages_blocks_trio_mission" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_zigzag_puces" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_zigzag" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"numero" varchar,
  	"titre" varchar,
  	"texte" varchar,
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_zigzag_image_position" DEFAULT 'right',
  	"pilier_id" integer,
  	"lien" varchar,
  	"lien_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_bande_chiffres_chiffres" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cle" varchar,
  	"valeur" varchar,
  	"libelle" varchar,
  	"pilier_id" integer,
  	"source" varchar
  );
  
  CREATE TABLE "pages_blocks_bande_chiffres" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_citation_signee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"citation" varchar,
  	"auteur" varchar,
  	"fonction" varchar,
  	"photo_id" integer,
  	"variante_rose" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_bande_campagne" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"objectif" varchar,
  	"texte" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"cta_secondaire" varchar,
  	"cta_secondaire_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_grille_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"kicker" varchar,
  	"mode" "enum_pages_blocks_grille_articles_mode" DEFAULT 'auto',
  	"categorie_id" integer,
  	"nombre" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_formulaire" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_formulaire_type",
  	"reassurance" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_texte_riche" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"contenu" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_galerie" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"album_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pourquoi_agir_entrees" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"texte" varchar,
  	"statistique_id" integer
  );
  
  CREATE TABLE "pages_blocks_pourquoi_agir" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_chaine_impact_etapes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"texte" varchar
  );
  
  CREATE TABLE "pages_blocks_chaine_impact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_parcours_sante_moments" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"prestations" varchar
  );
  
  CREATE TABLE "pages_blocks_parcours_sante" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"introduction" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_dimensions_perinatalite_dimensions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nom" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_dimensions_perinatalite" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"definition" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_transparence_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar
  );
  
  CREATE TABLE "pages_blocks_transparence" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_projections_chantiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_projections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"titre" varchar,
  	"slug" varchar,
  	"chapo" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"articles_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_declaration" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"titre" varchar,
  	"sous_titre" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"lien_secondaire" varchar,
  	"image_id" integer,
  	"afficher_badge_gratuit" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trio_mission_entrees" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"pilier_id" integer,
  	"titre" varchar,
  	"texte" varchar,
  	"lien" varchar,
  	"lien_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trio_mission" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_zigzag_puces" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_zigzag" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"numero" varchar,
  	"titre" varchar,
  	"texte" varchar,
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_zigzag_image_position" DEFAULT 'right',
  	"pilier_id" integer,
  	"lien" varchar,
  	"lien_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_bande_chiffres_chiffres" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cle" varchar,
  	"valeur" varchar,
  	"libelle" varchar,
  	"pilier_id" integer,
  	"source" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_bande_chiffres" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_citation_signee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"citation" varchar,
  	"auteur" varchar,
  	"fonction" varchar,
  	"photo_id" integer,
  	"variante_rose" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_bande_campagne" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"objectif" varchar,
  	"texte" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"cta_secondaire" varchar,
  	"cta_secondaire_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_grille_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"kicker" varchar,
  	"mode" "enum__pages_v_blocks_grille_articles_mode" DEFAULT 'auto',
  	"categorie_id" integer,
  	"nombre" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_formulaire" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_formulaire_type",
  	"reassurance" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_texte_riche" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"contenu" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_galerie" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"album_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pourquoi_agir_entrees" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"texte" varchar,
  	"statistique_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pourquoi_agir" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_chaine_impact_etapes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"texte" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_chaine_impact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_parcours_sante_moments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"prestations" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_parcours_sante" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"introduction" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_dimensions_perinatalite_dimensions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"nom" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_dimensions_perinatalite" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"definition" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_transparence_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"texte" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_transparence" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_projections_chantiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_projections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_titre" varchar,
  	"version_slug" varchar,
  	"version_chapo" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"articles_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "articles_blocks_hero_declaration" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"titre" varchar,
  	"sous_titre" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"lien_secondaire" varchar,
  	"image_id" integer,
  	"afficher_badge_gratuit" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_trio_mission_entrees" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pilier_id" integer,
  	"titre" varchar,
  	"texte" varchar,
  	"lien" varchar,
  	"lien_label" varchar
  );
  
  CREATE TABLE "articles_blocks_trio_mission" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_zigzag_puces" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "articles_blocks_zigzag" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"numero" varchar,
  	"titre" varchar,
  	"texte" varchar,
  	"image_id" integer,
  	"image_position" "enum_articles_blocks_zigzag_image_position" DEFAULT 'right',
  	"pilier_id" integer,
  	"lien" varchar,
  	"lien_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_bande_chiffres_chiffres" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cle" varchar,
  	"valeur" varchar,
  	"libelle" varchar,
  	"pilier_id" integer,
  	"source" varchar
  );
  
  CREATE TABLE "articles_blocks_bande_chiffres" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_citation_signee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"citation" varchar,
  	"auteur" varchar,
  	"fonction" varchar,
  	"photo_id" integer,
  	"variante_rose" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_bande_campagne" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"objectif" varchar,
  	"texte" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"cta_secondaire" varchar,
  	"cta_secondaire_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_grille_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"kicker" varchar,
  	"mode" "enum_articles_blocks_grille_articles_mode" DEFAULT 'auto',
  	"categorie_id" integer,
  	"nombre" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_formulaire" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_articles_blocks_formulaire_type",
  	"reassurance" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_texte_riche" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"contenu" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_galerie" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"album_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_pourquoi_agir_entrees" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"texte" varchar,
  	"statistique_id" integer
  );
  
  CREATE TABLE "articles_blocks_pourquoi_agir" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_chaine_impact_etapes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"texte" varchar
  );
  
  CREATE TABLE "articles_blocks_chaine_impact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_parcours_sante_moments" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"prestations" varchar
  );
  
  CREATE TABLE "articles_blocks_parcours_sante" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"introduction" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_dimensions_perinatalite_dimensions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nom" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "articles_blocks_dimensions_perinatalite" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"definition" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_transparence_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar
  );
  
  CREATE TABLE "articles_blocks_transparence" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_projections_chantiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "articles_blocks_projections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"categorie_id" integer,
  	"couverture_id" integer,
  	"auteur_id" integer,
  	"date_publication" timestamp(3) with time zone,
  	"temps_lecture" numeric,
  	"album_lie_id" integer,
  	"mise_en_avant" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_articles_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "articles_locales" (
  	"titre" varchar,
  	"slug" varchar,
  	"chapo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"tags_id" integer,
  	"piliers_id" integer,
  	"articles_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "_articles_v_blocks_hero_declaration" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"titre" varchar,
  	"sous_titre" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"lien_secondaire" varchar,
  	"image_id" integer,
  	"afficher_badge_gratuit" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_trio_mission_entrees" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"pilier_id" integer,
  	"titre" varchar,
  	"texte" varchar,
  	"lien" varchar,
  	"lien_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_trio_mission" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_zigzag_puces" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_zigzag" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"numero" varchar,
  	"titre" varchar,
  	"texte" varchar,
  	"image_id" integer,
  	"image_position" "enum__articles_v_blocks_zigzag_image_position" DEFAULT 'right',
  	"pilier_id" integer,
  	"lien" varchar,
  	"lien_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_bande_chiffres_chiffres" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cle" varchar,
  	"valeur" varchar,
  	"libelle" varchar,
  	"pilier_id" integer,
  	"source" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_bande_chiffres" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_citation_signee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"citation" varchar,
  	"auteur" varchar,
  	"fonction" varchar,
  	"photo_id" integer,
  	"variante_rose" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_bande_campagne" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"objectif" varchar,
  	"texte" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"cta_secondaire" varchar,
  	"cta_secondaire_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_grille_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"kicker" varchar,
  	"mode" "enum__articles_v_blocks_grille_articles_mode" DEFAULT 'auto',
  	"categorie_id" integer,
  	"nombre" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_formulaire" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__articles_v_blocks_formulaire_type",
  	"reassurance" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_texte_riche" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"contenu" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_galerie" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"album_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_pourquoi_agir_entrees" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"texte" varchar,
  	"statistique_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_pourquoi_agir" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_chaine_impact_etapes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"texte" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_chaine_impact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_parcours_sante_moments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"prestations" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_parcours_sante" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"introduction" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_dimensions_perinatalite_dimensions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"nom" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_dimensions_perinatalite" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"definition" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_transparence_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"texte" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_transparence" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_projections_chantiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_projections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_categorie_id" integer,
  	"version_couverture_id" integer,
  	"version_auteur_id" integer,
  	"version_date_publication" timestamp(3) with time zone,
  	"version_temps_lecture" numeric,
  	"version_album_lie_id" integer,
  	"version_mise_en_avant" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__articles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__articles_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_articles_v_locales" (
  	"version_titre" varchar,
  	"version_slug" varchar,
  	"version_chapo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"tags_id" integer,
  	"piliers_id" integer,
  	"articles_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "albums_chiffres_cles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valeur" varchar
  );
  
  CREATE TABLE "albums_chiffres_cles_locales" (
  	"libelle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "albums" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"couverture_id" integer,
  	"date_debut" timestamp(3) with time zone,
  	"date_fin" timestamp(3) with time zone,
  	"annee" numeric,
  	"antenne_id" integer,
  	"type_activite" "enum_albums_type_activite",
  	"article_lie_id" integer,
  	"mise_en_avant" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_albums_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "albums_locales" (
  	"titre" varchar,
  	"slug" varchar,
  	"resume" varchar,
  	"recit" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "albums_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"piliers_id" integer
  );
  
  CREATE TABLE "_albums_v_version_chiffres_cles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"valeur" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_albums_v_version_chiffres_cles_locales" (
  	"libelle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_albums_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_couverture_id" integer,
  	"version_date_debut" timestamp(3) with time zone,
  	"version_date_fin" timestamp(3) with time zone,
  	"version_annee" numeric,
  	"version_antenne_id" integer,
  	"version_type_activite" "enum__albums_v_version_type_activite",
  	"version_article_lie_id" integer,
  	"version_mise_en_avant" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__albums_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__albums_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_albums_v_locales" (
  	"version_titre" varchar,
  	"version_slug" varchar,
  	"version_resume" varchar,
  	"version_recit" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_albums_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"piliers_id" integer
  );
  
  CREATE TABLE "campagnes_paliers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"montant" numeric
  );
  
  CREATE TABLE "campagnes_paliers_locales" (
  	"libelle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "campagnes_contenu_unite" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "campagnes_contenu_unite_locales" (
  	"libelle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "campagnes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"statut" "enum_campagnes_statut" DEFAULT 'preparation',
  	"date_evenement" timestamp(3) with time zone,
  	"image_id" integer,
  	"cout_unitaire" numeric,
  	"objectif_unites" numeric,
  	"unites_financees" numeric DEFAULT 0,
  	"album_apres_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_campagnes_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "campagnes_locales" (
  	"titre" varchar,
  	"mot_colore" varchar,
  	"lieu" varchar,
  	"resume" varchar,
  	"unite_singulier" varchar DEFAULT 'panier',
  	"unite_pluriel" varchar DEFAULT 'paniers',
  	"contenu" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "campagnes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"partenaires_id" integer
  );
  
  CREATE TABLE "_campagnes_v_version_paliers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"montant" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_campagnes_v_version_paliers_locales" (
  	"libelle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_campagnes_v_version_contenu_unite" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_campagnes_v_version_contenu_unite_locales" (
  	"libelle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_campagnes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_statut" "enum__campagnes_v_version_statut" DEFAULT 'preparation',
  	"version_date_evenement" timestamp(3) with time zone,
  	"version_image_id" integer,
  	"version_cout_unitaire" numeric,
  	"version_objectif_unites" numeric,
  	"version_unites_financees" numeric DEFAULT 0,
  	"version_album_apres_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__campagnes_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__campagnes_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_campagnes_v_locales" (
  	"version_titre" varchar,
  	"version_mot_colore" varchar,
  	"version_lieu" varchar,
  	"version_resume" varchar,
  	"version_unite_singulier" varchar DEFAULT 'panier',
  	"version_unite_pluriel" varchar DEFAULT 'paniers',
  	"version_contenu" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_campagnes_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"partenaires_id" integer
  );
  
  CREATE TABLE "services_prestations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"gratuit" boolean DEFAULT true
  );
  
  CREATE TABLE "services_prestations_locales" (
  	"libelle" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_etapes_parcours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"numero" numeric NOT NULL
  );
  
  CREATE TABLE "services_etapes_parcours_locales" (
  	"titre" varchar NOT NULL,
  	"texte" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"pilier_id" integer NOT NULL,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_locales" (
  	"titre" varchar NOT NULL,
  	"accroche" varchar,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"partenaires_id" integer
  );
  
  CREATE TABLE "temoignages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"auteur_affiche" varchar NOT NULL,
  	"annee" numeric,
  	"voix" "enum_temoignages_voix",
  	"note_vocale_id" integer,
  	"photo_id" integer,
  	"consentement_verifie" boolean DEFAULT false NOT NULL,
  	"pilier_id" integer,
  	"mise_en_avant" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "temoignages_locales" (
  	"citation" varchar NOT NULL,
  	"extrait" varchar,
  	"role_auteur" varchar,
  	"transcription" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "partenaires" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nom" varchar NOT NULL,
  	"logo_id" integer,
  	"type" "enum_partenaires_type",
  	"site_web" varchar,
  	"ordre" numeric DEFAULT 0,
  	"actif" boolean DEFAULT true,
  	"accord_signe" boolean DEFAULT false,
  	"afficher_accueil" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partenaires_locales" (
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "rapports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_rapports_type" NOT NULL,
  	"exercice" varchar NOT NULL,
  	"fichier_fr_id" integer,
  	"fichier_en_id" integer,
  	"couverture_id" integer,
  	"publie" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "rapports_locales" (
  	"titre" varchar NOT NULL,
  	"resume" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "dons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"reference" varchar,
  	"montant" numeric NOT NULL,
  	"devise" "enum_dons_devise" DEFAULT 'XAF',
  	"canal" "enum_dons_canal" NOT NULL,
  	"donateur_nom" varchar,
  	"donateur_email" varchar,
  	"donateur_t_l_phone" varchar,
  	"anonyme" boolean DEFAULT false,
  	"message" varchar,
  	"affectation" "enum_dons_affectation",
  	"statut" "enum_dons_statut" DEFAULT 'declare',
  	"confirme_par_id" integer,
  	"date_confirmation" timestamp(3) with time zone,
  	"notes_internes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "messages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nom" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"telephone" varchar,
  	"sujet" "enum_messages_sujet" NOT NULL,
  	"message" varchar NOT NULL,
  	"consentement" boolean DEFAULT false NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "candidatures" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_candidatures_type" NOT NULL,
  	"nom" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"telephone" varchar,
  	"ville" varchar,
  	"organisation" varchar,
  	"disponibilite" varchar,
  	"competences" varchar,
  	"motivation" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "abonnes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"langue" "enum_abonnes_langue" DEFAULT 'fr',
  	"confirme" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "statistiques_externes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"valeur" varchar NOT NULL,
  	"source" varchar NOT NULL,
  	"annee" numeric,
  	"lien_source" varchar,
  	"theme" "enum_statistiques_externes_theme",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "statistiques_externes_locales" (
  	"enonce" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"piliers_id" integer,
  	"antennes_id" integer,
  	"categories_id" integer,
  	"tags_id" integer,
  	"pages_id" integer,
  	"articles_id" integer,
  	"albums_id" integer,
  	"campagnes_id" integer,
  	"services_id" integer,
  	"temoignages_id" integer,
  	"partenaires_id" integer,
  	"rapports_id" integer,
  	"dons_id" integer,
  	"messages_id" integer,
  	"candidatures_id" integer,
  	"abonnes_id" integer,
  	"statistiques_externes_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "organisation_telephones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"numero" varchar
  );
  
  CREATE TABLE "organisation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"denomination" varchar NOT NULL,
  	"numero_enregistrement" varchar NOT NULL,
  	"siege" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"site_web" varchar,
  	"whatsapp" varchar,
  	"banque" varchar,
  	"date_a_g" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "organisation_locales" (
  	"baseline" varchar,
  	"message_whatsapp" varchar,
  	"ligne_transparence" varchar,
  	"regle_signature" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "settings_reseaux" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"plateforme" "enum_settings_reseaux_plateforme",
  	"url" varchar
  );
  
  CREATE TABLE "settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "settings_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "navigation_header_enfants" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "navigation_header_enfants_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "navigation_header_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_footer_liens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "navigation_footer_liens_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "navigation_footer_locales" (
  	"titre" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_legal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "navigation_legal_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"boutons_accompagnee_href" varchar,
  	"boutons_don_href" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_locales" (
  	"boutons_accompagnee_label" varchar,
  	"boutons_don_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_trois_portes_portes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icone" "enum_home_trois_portes_portes_icone",
  	"lien_url" varchar
  );
  
  CREATE TABLE "home_trois_portes_portes_locales" (
  	"titre" varchar,
  	"texte" varchar,
  	"lien_libelle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_afficher" boolean DEFAULT true,
  	"hero_bouton_principal_url" varchar,
  	"hero_lien_secondaire_url" varchar,
  	"hero_image_id" integer,
  	"trois_portes_afficher" boolean DEFAULT true,
  	"preuve_afficher" boolean DEFAULT true,
  	"preuve_photo_principale_id" integer,
  	"preuve_photo_secondaire_id" integer,
  	"preuve_badge_valeur" varchar,
  	"preuve_lien_url" varchar,
  	"bandeau_afficher" boolean DEFAULT true,
  	"trois_axes_afficher" boolean DEFAULT true,
  	"trois_axes_axe_mis_en_avant_id" integer,
  	"histoire_afficher" boolean DEFAULT true,
  	"histoire_temoignage_id" integer,
  	"histoire_photo_id" integer,
  	"histoire_lien_url" varchar,
  	"campagne_afficher" boolean DEFAULT true,
  	"campagne_campagne_id" integer,
  	"actualites_afficher" boolean DEFAULT true,
  	"actualites_mode" "enum_home_actualites_mode" DEFAULT 'auto',
  	"actualites_album_phare_id" integer,
  	"partenaires_afficher" boolean DEFAULT true,
  	"_status" "enum_home_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_locales" (
  	"hero_surtitre" varchar,
  	"hero_titre" varchar,
  	"hero_mot_souligne" varchar,
  	"hero_sous_titre" varchar,
  	"hero_bouton_principal_libelle" varchar,
  	"hero_lien_secondaire_libelle" varchar,
  	"hero_annotation" varchar,
  	"preuve_surtitre" varchar,
  	"preuve_titre" varchar,
  	"preuve_texte" varchar,
  	"preuve_badge_libelle" varchar,
  	"preuve_lien_libelle" varchar,
  	"trois_axes_surtitre" varchar,
  	"trois_axes_titre" varchar,
  	"trois_axes_texte" varchar,
  	"histoire_surtitre" varchar,
  	"histoire_lien_libelle" varchar,
  	"campagne_surtitre" varchar,
  	"actualites_surtitre" varchar,
  	"actualites_titre" varchar,
  	"partenaires_surtitre" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"articles_id" integer
  );
  
  CREATE TABLE "_home_v_version_trois_portes_portes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icone" "enum__home_v_version_trois_portes_portes_icone",
  	"lien_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_trois_portes_portes_locales" (
  	"titre" varchar,
  	"texte" varchar,
  	"lien_libelle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_afficher" boolean DEFAULT true,
  	"version_hero_bouton_principal_url" varchar,
  	"version_hero_lien_secondaire_url" varchar,
  	"version_hero_image_id" integer,
  	"version_trois_portes_afficher" boolean DEFAULT true,
  	"version_preuve_afficher" boolean DEFAULT true,
  	"version_preuve_photo_principale_id" integer,
  	"version_preuve_photo_secondaire_id" integer,
  	"version_preuve_badge_valeur" varchar,
  	"version_preuve_lien_url" varchar,
  	"version_bandeau_afficher" boolean DEFAULT true,
  	"version_trois_axes_afficher" boolean DEFAULT true,
  	"version_trois_axes_axe_mis_en_avant_id" integer,
  	"version_histoire_afficher" boolean DEFAULT true,
  	"version_histoire_temoignage_id" integer,
  	"version_histoire_photo_id" integer,
  	"version_histoire_lien_url" varchar,
  	"version_campagne_afficher" boolean DEFAULT true,
  	"version_campagne_campagne_id" integer,
  	"version_actualites_afficher" boolean DEFAULT true,
  	"version_actualites_mode" "enum__home_v_version_actualites_mode" DEFAULT 'auto',
  	"version_actualites_album_phare_id" integer,
  	"version_partenaires_afficher" boolean DEFAULT true,
  	"version__status" "enum__home_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__home_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_home_v_locales" (
  	"version_hero_surtitre" varchar,
  	"version_hero_titre" varchar,
  	"version_hero_mot_souligne" varchar,
  	"version_hero_sous_titre" varchar,
  	"version_hero_bouton_principal_libelle" varchar,
  	"version_hero_lien_secondaire_libelle" varchar,
  	"version_hero_annotation" varchar,
  	"version_preuve_surtitre" varchar,
  	"version_preuve_titre" varchar,
  	"version_preuve_texte" varchar,
  	"version_preuve_badge_libelle" varchar,
  	"version_preuve_lien_libelle" varchar,
  	"version_trois_axes_surtitre" varchar,
  	"version_trois_axes_titre" varchar,
  	"version_trois_axes_texte" varchar,
  	"version_histoire_surtitre" varchar,
  	"version_histoire_lien_libelle" varchar,
  	"version_campagne_surtitre" varchar,
  	"version_actualites_surtitre" varchar,
  	"version_actualites_titre" varchar,
  	"version_partenaires_surtitre" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"articles_id" integer
  );
  
  CREATE TABLE "chiffres_cles_chiffres" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cle" varchar NOT NULL,
  	"valeur" varchar NOT NULL,
  	"source" varchar NOT NULL,
  	"date_mise_a_jour" timestamp(3) with time zone NOT NULL,
  	"pilier_id" integer,
  	"afficher_accueil" boolean DEFAULT false
  );
  
  CREATE TABLE "chiffres_cles_chiffres_locales" (
  	"libelle" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "chiffres_cles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "don_paliers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"montant" numeric,
  	"libre" boolean DEFAULT false
  );
  
  CREATE TABLE "don_paliers_locales" (
  	"libelle" varchar,
  	"equivalence" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "don_canaux_mobile_money" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"operateur" varchar,
  	"numero" varchar,
  	"titulaire" varchar,
  	"code" varchar,
  	"actif" boolean DEFAULT false,
  	"ordre" numeric
  );
  
  CREATE TABLE "don" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"actif" boolean DEFAULT true,
  	"devise_principale" varchar DEFAULT 'XAF',
  	"canaux_virement_actif" boolean DEFAULT false,
  	"canaux_virement_titulaire" varchar,
  	"canaux_virement_banque" varchar,
  	"canaux_virement_rib" varchar,
  	"canaux_virement_iban" varchar,
  	"canaux_virement_bic" varchar,
  	"canaux_especes_actif" boolean DEFAULT true,
  	"canaux_international_actif" boolean DEFAULT false,
  	"canaux_international_plateforme" varchar,
  	"canaux_international_lien" varchar,
  	"canaux_international_contact" varchar,
  	"objectif_campagne_compteur_manuel" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "don_locales" (
  	"canaux_especes_instructions" varchar,
  	"objectif_campagne_libelle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "chaine_impact_etapes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "chaine_impact_etapes_locales" (
  	"titre" varchar,
  	"texte" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "chaine_impact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_antenne_id_antennes_id_fk" FOREIGN KEY ("antenne_id") REFERENCES "public"."antennes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_locales" ADD CONSTRAINT "users_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_usage_autorise" ADD CONSTRAINT "media_usage_autorise_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_antenne_id_antennes_id_fk" FOREIGN KEY ("antenne_id") REFERENCES "public"."antennes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_consentement_doc_id_media_id_fk" FOREIGN KEY ("consentement_doc_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_piliers_fk" FOREIGN KEY ("piliers_id") REFERENCES "public"."piliers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "piliers_sous_themes" ADD CONSTRAINT "piliers_sous_themes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."piliers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "piliers_sous_themes_locales" ADD CONSTRAINT "piliers_sous_themes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."piliers_sous_themes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "piliers_locales" ADD CONSTRAINT "piliers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."piliers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "antennes" ADD CONSTRAINT "antennes_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "antennes_locales" ADD CONSTRAINT "antennes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."antennes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tags_locales" ADD CONSTRAINT "tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_declaration" ADD CONSTRAINT "pages_blocks_hero_declaration_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_declaration" ADD CONSTRAINT "pages_blocks_hero_declaration_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trio_mission_entrees" ADD CONSTRAINT "pages_blocks_trio_mission_entrees_pilier_id_piliers_id_fk" FOREIGN KEY ("pilier_id") REFERENCES "public"."piliers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_trio_mission_entrees" ADD CONSTRAINT "pages_blocks_trio_mission_entrees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_trio_mission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trio_mission" ADD CONSTRAINT "pages_blocks_trio_mission_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_zigzag_puces" ADD CONSTRAINT "pages_blocks_zigzag_puces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_zigzag"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_zigzag" ADD CONSTRAINT "pages_blocks_zigzag_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_zigzag" ADD CONSTRAINT "pages_blocks_zigzag_pilier_id_piliers_id_fk" FOREIGN KEY ("pilier_id") REFERENCES "public"."piliers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_zigzag" ADD CONSTRAINT "pages_blocks_zigzag_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_bande_chiffres_chiffres" ADD CONSTRAINT "pages_blocks_bande_chiffres_chiffres_pilier_id_piliers_id_fk" FOREIGN KEY ("pilier_id") REFERENCES "public"."piliers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_bande_chiffres_chiffres" ADD CONSTRAINT "pages_blocks_bande_chiffres_chiffres_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_bande_chiffres"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_bande_chiffres" ADD CONSTRAINT "pages_blocks_bande_chiffres_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_citation_signee" ADD CONSTRAINT "pages_blocks_citation_signee_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_citation_signee" ADD CONSTRAINT "pages_blocks_citation_signee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_bande_campagne" ADD CONSTRAINT "pages_blocks_bande_campagne_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_grille_articles" ADD CONSTRAINT "pages_blocks_grille_articles_categorie_id_categories_id_fk" FOREIGN KEY ("categorie_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_grille_articles" ADD CONSTRAINT "pages_blocks_grille_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_formulaire" ADD CONSTRAINT "pages_blocks_formulaire_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_texte_riche" ADD CONSTRAINT "pages_blocks_texte_riche_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_galerie" ADD CONSTRAINT "pages_blocks_galerie_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_galerie" ADD CONSTRAINT "pages_blocks_galerie_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pourquoi_agir_entrees" ADD CONSTRAINT "pages_blocks_pourquoi_agir_entrees_statistique_id_statistiques_externes_id_fk" FOREIGN KEY ("statistique_id") REFERENCES "public"."statistiques_externes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pourquoi_agir_entrees" ADD CONSTRAINT "pages_blocks_pourquoi_agir_entrees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pourquoi_agir"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pourquoi_agir" ADD CONSTRAINT "pages_blocks_pourquoi_agir_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_chaine_impact_etapes" ADD CONSTRAINT "pages_blocks_chaine_impact_etapes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_chaine_impact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_chaine_impact" ADD CONSTRAINT "pages_blocks_chaine_impact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_parcours_sante_moments" ADD CONSTRAINT "pages_blocks_parcours_sante_moments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_parcours_sante"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_parcours_sante" ADD CONSTRAINT "pages_blocks_parcours_sante_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_dimensions_perinatalite_dimensions" ADD CONSTRAINT "pages_blocks_dimensions_perinatalite_dimensions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_dimensions_perinatalite"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_dimensions_perinatalite" ADD CONSTRAINT "pages_blocks_dimensions_perinatalite_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_transparence_points" ADD CONSTRAINT "pages_blocks_transparence_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_transparence"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_transparence" ADD CONSTRAINT "pages_blocks_transparence_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projections_chantiers" ADD CONSTRAINT "pages_blocks_projections_chantiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_projections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projections" ADD CONSTRAINT "pages_blocks_projections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_declaration" ADD CONSTRAINT "_pages_v_blocks_hero_declaration_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_declaration" ADD CONSTRAINT "_pages_v_blocks_hero_declaration_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trio_mission_entrees" ADD CONSTRAINT "_pages_v_blocks_trio_mission_entrees_pilier_id_piliers_id_fk" FOREIGN KEY ("pilier_id") REFERENCES "public"."piliers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trio_mission_entrees" ADD CONSTRAINT "_pages_v_blocks_trio_mission_entrees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_trio_mission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trio_mission" ADD CONSTRAINT "_pages_v_blocks_trio_mission_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_zigzag_puces" ADD CONSTRAINT "_pages_v_blocks_zigzag_puces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_zigzag"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_zigzag" ADD CONSTRAINT "_pages_v_blocks_zigzag_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_zigzag" ADD CONSTRAINT "_pages_v_blocks_zigzag_pilier_id_piliers_id_fk" FOREIGN KEY ("pilier_id") REFERENCES "public"."piliers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_zigzag" ADD CONSTRAINT "_pages_v_blocks_zigzag_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_bande_chiffres_chiffres" ADD CONSTRAINT "_pages_v_blocks_bande_chiffres_chiffres_pilier_id_piliers_id_fk" FOREIGN KEY ("pilier_id") REFERENCES "public"."piliers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_bande_chiffres_chiffres" ADD CONSTRAINT "_pages_v_blocks_bande_chiffres_chiffres_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_bande_chiffres"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_bande_chiffres" ADD CONSTRAINT "_pages_v_blocks_bande_chiffres_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_citation_signee" ADD CONSTRAINT "_pages_v_blocks_citation_signee_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_citation_signee" ADD CONSTRAINT "_pages_v_blocks_citation_signee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_bande_campagne" ADD CONSTRAINT "_pages_v_blocks_bande_campagne_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_grille_articles" ADD CONSTRAINT "_pages_v_blocks_grille_articles_categorie_id_categories_id_fk" FOREIGN KEY ("categorie_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_grille_articles" ADD CONSTRAINT "_pages_v_blocks_grille_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_formulaire" ADD CONSTRAINT "_pages_v_blocks_formulaire_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_texte_riche" ADD CONSTRAINT "_pages_v_blocks_texte_riche_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_galerie" ADD CONSTRAINT "_pages_v_blocks_galerie_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_galerie" ADD CONSTRAINT "_pages_v_blocks_galerie_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pourquoi_agir_entrees" ADD CONSTRAINT "_pages_v_blocks_pourquoi_agir_entrees_statistique_id_statistiques_externes_id_fk" FOREIGN KEY ("statistique_id") REFERENCES "public"."statistiques_externes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pourquoi_agir_entrees" ADD CONSTRAINT "_pages_v_blocks_pourquoi_agir_entrees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pourquoi_agir"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pourquoi_agir" ADD CONSTRAINT "_pages_v_blocks_pourquoi_agir_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_chaine_impact_etapes" ADD CONSTRAINT "_pages_v_blocks_chaine_impact_etapes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_chaine_impact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_chaine_impact" ADD CONSTRAINT "_pages_v_blocks_chaine_impact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_parcours_sante_moments" ADD CONSTRAINT "_pages_v_blocks_parcours_sante_moments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_parcours_sante"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_parcours_sante" ADD CONSTRAINT "_pages_v_blocks_parcours_sante_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_dimensions_perinatalite_dimensions" ADD CONSTRAINT "_pages_v_blocks_dimensions_perinatalite_dimensions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_dimensions_perinatalite"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_dimensions_perinatalite" ADD CONSTRAINT "_pages_v_blocks_dimensions_perinatalite_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_transparence_points" ADD CONSTRAINT "_pages_v_blocks_transparence_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_transparence"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_transparence" ADD CONSTRAINT "_pages_v_blocks_transparence_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projections_chantiers" ADD CONSTRAINT "_pages_v_blocks_projections_chantiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_projections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projections" ADD CONSTRAINT "_pages_v_blocks_projections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_hero_declaration" ADD CONSTRAINT "articles_blocks_hero_declaration_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_hero_declaration" ADD CONSTRAINT "articles_blocks_hero_declaration_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_trio_mission_entrees" ADD CONSTRAINT "articles_blocks_trio_mission_entrees_pilier_id_piliers_id_fk" FOREIGN KEY ("pilier_id") REFERENCES "public"."piliers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_trio_mission_entrees" ADD CONSTRAINT "articles_blocks_trio_mission_entrees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_trio_mission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_trio_mission" ADD CONSTRAINT "articles_blocks_trio_mission_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_zigzag_puces" ADD CONSTRAINT "articles_blocks_zigzag_puces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_zigzag"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_zigzag" ADD CONSTRAINT "articles_blocks_zigzag_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_zigzag" ADD CONSTRAINT "articles_blocks_zigzag_pilier_id_piliers_id_fk" FOREIGN KEY ("pilier_id") REFERENCES "public"."piliers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_zigzag" ADD CONSTRAINT "articles_blocks_zigzag_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_bande_chiffres_chiffres" ADD CONSTRAINT "articles_blocks_bande_chiffres_chiffres_pilier_id_piliers_id_fk" FOREIGN KEY ("pilier_id") REFERENCES "public"."piliers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_bande_chiffres_chiffres" ADD CONSTRAINT "articles_blocks_bande_chiffres_chiffres_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_bande_chiffres"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_bande_chiffres" ADD CONSTRAINT "articles_blocks_bande_chiffres_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_citation_signee" ADD CONSTRAINT "articles_blocks_citation_signee_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_citation_signee" ADD CONSTRAINT "articles_blocks_citation_signee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_bande_campagne" ADD CONSTRAINT "articles_blocks_bande_campagne_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_grille_articles" ADD CONSTRAINT "articles_blocks_grille_articles_categorie_id_categories_id_fk" FOREIGN KEY ("categorie_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_grille_articles" ADD CONSTRAINT "articles_blocks_grille_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_formulaire" ADD CONSTRAINT "articles_blocks_formulaire_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_texte_riche" ADD CONSTRAINT "articles_blocks_texte_riche_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_galerie" ADD CONSTRAINT "articles_blocks_galerie_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_galerie" ADD CONSTRAINT "articles_blocks_galerie_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_pourquoi_agir_entrees" ADD CONSTRAINT "articles_blocks_pourquoi_agir_entrees_statistique_id_statistiques_externes_id_fk" FOREIGN KEY ("statistique_id") REFERENCES "public"."statistiques_externes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_pourquoi_agir_entrees" ADD CONSTRAINT "articles_blocks_pourquoi_agir_entrees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_pourquoi_agir"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_pourquoi_agir" ADD CONSTRAINT "articles_blocks_pourquoi_agir_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_chaine_impact_etapes" ADD CONSTRAINT "articles_blocks_chaine_impact_etapes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_chaine_impact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_chaine_impact" ADD CONSTRAINT "articles_blocks_chaine_impact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_parcours_sante_moments" ADD CONSTRAINT "articles_blocks_parcours_sante_moments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_parcours_sante"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_parcours_sante" ADD CONSTRAINT "articles_blocks_parcours_sante_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_dimensions_perinatalite_dimensions" ADD CONSTRAINT "articles_blocks_dimensions_perinatalite_dimensions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_dimensions_perinatalite"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_dimensions_perinatalite" ADD CONSTRAINT "articles_blocks_dimensions_perinatalite_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_transparence_points" ADD CONSTRAINT "articles_blocks_transparence_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_transparence"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_transparence" ADD CONSTRAINT "articles_blocks_transparence_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_projections_chantiers" ADD CONSTRAINT "articles_blocks_projections_chantiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_projections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_projections" ADD CONSTRAINT "articles_blocks_projections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_categorie_id_categories_id_fk" FOREIGN KEY ("categorie_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_couverture_id_media_id_fk" FOREIGN KEY ("couverture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_auteur_id_users_id_fk" FOREIGN KEY ("auteur_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_album_lie_id_albums_id_fk" FOREIGN KEY ("album_lie_id") REFERENCES "public"."albums"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_locales" ADD CONSTRAINT "articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_piliers_fk" FOREIGN KEY ("piliers_id") REFERENCES "public"."piliers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_hero_declaration" ADD CONSTRAINT "_articles_v_blocks_hero_declaration_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_hero_declaration" ADD CONSTRAINT "_articles_v_blocks_hero_declaration_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_trio_mission_entrees" ADD CONSTRAINT "_articles_v_blocks_trio_mission_entrees_pilier_id_piliers_id_fk" FOREIGN KEY ("pilier_id") REFERENCES "public"."piliers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_trio_mission_entrees" ADD CONSTRAINT "_articles_v_blocks_trio_mission_entrees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_trio_mission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_trio_mission" ADD CONSTRAINT "_articles_v_blocks_trio_mission_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_zigzag_puces" ADD CONSTRAINT "_articles_v_blocks_zigzag_puces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_zigzag"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_zigzag" ADD CONSTRAINT "_articles_v_blocks_zigzag_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_zigzag" ADD CONSTRAINT "_articles_v_blocks_zigzag_pilier_id_piliers_id_fk" FOREIGN KEY ("pilier_id") REFERENCES "public"."piliers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_zigzag" ADD CONSTRAINT "_articles_v_blocks_zigzag_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_bande_chiffres_chiffres" ADD CONSTRAINT "_articles_v_blocks_bande_chiffres_chiffres_pilier_id_piliers_id_fk" FOREIGN KEY ("pilier_id") REFERENCES "public"."piliers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_bande_chiffres_chiffres" ADD CONSTRAINT "_articles_v_blocks_bande_chiffres_chiffres_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_bande_chiffres"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_bande_chiffres" ADD CONSTRAINT "_articles_v_blocks_bande_chiffres_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_citation_signee" ADD CONSTRAINT "_articles_v_blocks_citation_signee_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_citation_signee" ADD CONSTRAINT "_articles_v_blocks_citation_signee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_bande_campagne" ADD CONSTRAINT "_articles_v_blocks_bande_campagne_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_grille_articles" ADD CONSTRAINT "_articles_v_blocks_grille_articles_categorie_id_categories_id_fk" FOREIGN KEY ("categorie_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_grille_articles" ADD CONSTRAINT "_articles_v_blocks_grille_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_formulaire" ADD CONSTRAINT "_articles_v_blocks_formulaire_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_texte_riche" ADD CONSTRAINT "_articles_v_blocks_texte_riche_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_galerie" ADD CONSTRAINT "_articles_v_blocks_galerie_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_galerie" ADD CONSTRAINT "_articles_v_blocks_galerie_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_pourquoi_agir_entrees" ADD CONSTRAINT "_articles_v_blocks_pourquoi_agir_entrees_statistique_id_statistiques_externes_id_fk" FOREIGN KEY ("statistique_id") REFERENCES "public"."statistiques_externes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_pourquoi_agir_entrees" ADD CONSTRAINT "_articles_v_blocks_pourquoi_agir_entrees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_pourquoi_agir"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_pourquoi_agir" ADD CONSTRAINT "_articles_v_blocks_pourquoi_agir_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_chaine_impact_etapes" ADD CONSTRAINT "_articles_v_blocks_chaine_impact_etapes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_chaine_impact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_chaine_impact" ADD CONSTRAINT "_articles_v_blocks_chaine_impact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_parcours_sante_moments" ADD CONSTRAINT "_articles_v_blocks_parcours_sante_moments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_parcours_sante"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_parcours_sante" ADD CONSTRAINT "_articles_v_blocks_parcours_sante_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_dimensions_perinatalite_dimensions" ADD CONSTRAINT "_articles_v_blocks_dimensions_perinatalite_dimensions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_dimensions_perinatalite"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_dimensions_perinatalite" ADD CONSTRAINT "_articles_v_blocks_dimensions_perinatalite_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_transparence_points" ADD CONSTRAINT "_articles_v_blocks_transparence_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_transparence"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_transparence" ADD CONSTRAINT "_articles_v_blocks_transparence_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_projections_chantiers" ADD CONSTRAINT "_articles_v_blocks_projections_chantiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_projections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_projections" ADD CONSTRAINT "_articles_v_blocks_projections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_parent_id_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_categorie_id_categories_id_fk" FOREIGN KEY ("version_categorie_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_couverture_id_media_id_fk" FOREIGN KEY ("version_couverture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_auteur_id_users_id_fk" FOREIGN KEY ("version_auteur_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_album_lie_id_albums_id_fk" FOREIGN KEY ("version_album_lie_id") REFERENCES "public"."albums"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_locales" ADD CONSTRAINT "_articles_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_piliers_fk" FOREIGN KEY ("piliers_id") REFERENCES "public"."piliers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "albums_chiffres_cles" ADD CONSTRAINT "albums_chiffres_cles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."albums"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "albums_chiffres_cles_locales" ADD CONSTRAINT "albums_chiffres_cles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."albums_chiffres_cles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "albums" ADD CONSTRAINT "albums_couverture_id_media_id_fk" FOREIGN KEY ("couverture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "albums" ADD CONSTRAINT "albums_antenne_id_antennes_id_fk" FOREIGN KEY ("antenne_id") REFERENCES "public"."antennes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "albums" ADD CONSTRAINT "albums_article_lie_id_articles_id_fk" FOREIGN KEY ("article_lie_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "albums_locales" ADD CONSTRAINT "albums_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."albums"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "albums_rels" ADD CONSTRAINT "albums_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."albums"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "albums_rels" ADD CONSTRAINT "albums_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "albums_rels" ADD CONSTRAINT "albums_rels_piliers_fk" FOREIGN KEY ("piliers_id") REFERENCES "public"."piliers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_albums_v_version_chiffres_cles" ADD CONSTRAINT "_albums_v_version_chiffres_cles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_albums_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_albums_v_version_chiffres_cles_locales" ADD CONSTRAINT "_albums_v_version_chiffres_cles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_albums_v_version_chiffres_cles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_albums_v" ADD CONSTRAINT "_albums_v_parent_id_albums_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."albums"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_albums_v" ADD CONSTRAINT "_albums_v_version_couverture_id_media_id_fk" FOREIGN KEY ("version_couverture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_albums_v" ADD CONSTRAINT "_albums_v_version_antenne_id_antennes_id_fk" FOREIGN KEY ("version_antenne_id") REFERENCES "public"."antennes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_albums_v" ADD CONSTRAINT "_albums_v_version_article_lie_id_articles_id_fk" FOREIGN KEY ("version_article_lie_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_albums_v_locales" ADD CONSTRAINT "_albums_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_albums_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_albums_v_rels" ADD CONSTRAINT "_albums_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_albums_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_albums_v_rels" ADD CONSTRAINT "_albums_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_albums_v_rels" ADD CONSTRAINT "_albums_v_rels_piliers_fk" FOREIGN KEY ("piliers_id") REFERENCES "public"."piliers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campagnes_paliers" ADD CONSTRAINT "campagnes_paliers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campagnes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campagnes_paliers_locales" ADD CONSTRAINT "campagnes_paliers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campagnes_paliers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campagnes_contenu_unite" ADD CONSTRAINT "campagnes_contenu_unite_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campagnes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campagnes_contenu_unite_locales" ADD CONSTRAINT "campagnes_contenu_unite_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campagnes_contenu_unite"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campagnes" ADD CONSTRAINT "campagnes_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "campagnes" ADD CONSTRAINT "campagnes_album_apres_id_albums_id_fk" FOREIGN KEY ("album_apres_id") REFERENCES "public"."albums"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "campagnes_locales" ADD CONSTRAINT "campagnes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campagnes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campagnes_rels" ADD CONSTRAINT "campagnes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."campagnes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campagnes_rels" ADD CONSTRAINT "campagnes_rels_partenaires_fk" FOREIGN KEY ("partenaires_id") REFERENCES "public"."partenaires"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campagnes_v_version_paliers" ADD CONSTRAINT "_campagnes_v_version_paliers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_campagnes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campagnes_v_version_paliers_locales" ADD CONSTRAINT "_campagnes_v_version_paliers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_campagnes_v_version_paliers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campagnes_v_version_contenu_unite" ADD CONSTRAINT "_campagnes_v_version_contenu_unite_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_campagnes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campagnes_v_version_contenu_unite_locales" ADD CONSTRAINT "_campagnes_v_version_contenu_unite_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_campagnes_v_version_contenu_unite"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campagnes_v" ADD CONSTRAINT "_campagnes_v_parent_id_campagnes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."campagnes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_campagnes_v" ADD CONSTRAINT "_campagnes_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_campagnes_v" ADD CONSTRAINT "_campagnes_v_version_album_apres_id_albums_id_fk" FOREIGN KEY ("version_album_apres_id") REFERENCES "public"."albums"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_campagnes_v_locales" ADD CONSTRAINT "_campagnes_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_campagnes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campagnes_v_rels" ADD CONSTRAINT "_campagnes_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_campagnes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campagnes_v_rels" ADD CONSTRAINT "_campagnes_v_rels_partenaires_fk" FOREIGN KEY ("partenaires_id") REFERENCES "public"."partenaires"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_prestations" ADD CONSTRAINT "services_prestations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_prestations_locales" ADD CONSTRAINT "services_prestations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_prestations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_etapes_parcours" ADD CONSTRAINT "services_etapes_parcours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_etapes_parcours_locales" ADD CONSTRAINT "services_etapes_parcours_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_etapes_parcours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_pilier_id_piliers_id_fk" FOREIGN KEY ("pilier_id") REFERENCES "public"."piliers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_partenaires_fk" FOREIGN KEY ("partenaires_id") REFERENCES "public"."partenaires"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "temoignages" ADD CONSTRAINT "temoignages_note_vocale_id_media_id_fk" FOREIGN KEY ("note_vocale_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "temoignages" ADD CONSTRAINT "temoignages_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "temoignages" ADD CONSTRAINT "temoignages_pilier_id_piliers_id_fk" FOREIGN KEY ("pilier_id") REFERENCES "public"."piliers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "temoignages_locales" ADD CONSTRAINT "temoignages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."temoignages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partenaires" ADD CONSTRAINT "partenaires_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partenaires_locales" ADD CONSTRAINT "partenaires_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partenaires"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rapports" ADD CONSTRAINT "rapports_fichier_fr_id_media_id_fk" FOREIGN KEY ("fichier_fr_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rapports" ADD CONSTRAINT "rapports_fichier_en_id_media_id_fk" FOREIGN KEY ("fichier_en_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rapports" ADD CONSTRAINT "rapports_couverture_id_media_id_fk" FOREIGN KEY ("couverture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rapports_locales" ADD CONSTRAINT "rapports_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rapports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dons" ADD CONSTRAINT "dons_confirme_par_id_users_id_fk" FOREIGN KEY ("confirme_par_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "statistiques_externes_locales" ADD CONSTRAINT "statistiques_externes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."statistiques_externes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_piliers_fk" FOREIGN KEY ("piliers_id") REFERENCES "public"."piliers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_antennes_fk" FOREIGN KEY ("antennes_id") REFERENCES "public"."antennes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_albums_fk" FOREIGN KEY ("albums_id") REFERENCES "public"."albums"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_campagnes_fk" FOREIGN KEY ("campagnes_id") REFERENCES "public"."campagnes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_temoignages_fk" FOREIGN KEY ("temoignages_id") REFERENCES "public"."temoignages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partenaires_fk" FOREIGN KEY ("partenaires_id") REFERENCES "public"."partenaires"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rapports_fk" FOREIGN KEY ("rapports_id") REFERENCES "public"."rapports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dons_fk" FOREIGN KEY ("dons_id") REFERENCES "public"."dons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_messages_fk" FOREIGN KEY ("messages_id") REFERENCES "public"."messages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_candidatures_fk" FOREIGN KEY ("candidatures_id") REFERENCES "public"."candidatures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_abonnes_fk" FOREIGN KEY ("abonnes_id") REFERENCES "public"."abonnes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_statistiques_externes_fk" FOREIGN KEY ("statistiques_externes_id") REFERENCES "public"."statistiques_externes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organisation_telephones" ADD CONSTRAINT "organisation_telephones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."organisation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organisation_locales" ADD CONSTRAINT "organisation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."organisation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_reseaux" ADD CONSTRAINT "settings_reseaux_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_locales" ADD CONSTRAINT "settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_header_enfants" ADD CONSTRAINT "navigation_header_enfants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_header_enfants_locales" ADD CONSTRAINT "navigation_header_enfants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_header_enfants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_header" ADD CONSTRAINT "navigation_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_header_locales" ADD CONSTRAINT "navigation_header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_liens" ADD CONSTRAINT "navigation_footer_liens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_liens_locales" ADD CONSTRAINT "navigation_footer_liens_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_footer_liens"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer" ADD CONSTRAINT "navigation_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_locales" ADD CONSTRAINT "navigation_footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_legal" ADD CONSTRAINT "navigation_legal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_legal_locales" ADD CONSTRAINT "navigation_legal_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_legal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_locales" ADD CONSTRAINT "navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_trois_portes_portes" ADD CONSTRAINT "home_trois_portes_portes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_trois_portes_portes_locales" ADD CONSTRAINT "home_trois_portes_portes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_trois_portes_portes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_preuve_photo_principale_id_media_id_fk" FOREIGN KEY ("preuve_photo_principale_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_preuve_photo_secondaire_id_media_id_fk" FOREIGN KEY ("preuve_photo_secondaire_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_trois_axes_axe_mis_en_avant_id_piliers_id_fk" FOREIGN KEY ("trois_axes_axe_mis_en_avant_id") REFERENCES "public"."piliers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_histoire_temoignage_id_temoignages_id_fk" FOREIGN KEY ("histoire_temoignage_id") REFERENCES "public"."temoignages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_histoire_photo_id_media_id_fk" FOREIGN KEY ("histoire_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_campagne_campagne_id_campagnes_id_fk" FOREIGN KEY ("campagne_campagne_id") REFERENCES "public"."campagnes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_actualites_album_phare_id_albums_id_fk" FOREIGN KEY ("actualites_album_phare_id") REFERENCES "public"."albums"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_locales" ADD CONSTRAINT "home_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_trois_portes_portes" ADD CONSTRAINT "_home_v_version_trois_portes_portes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_trois_portes_portes_locales" ADD CONSTRAINT "_home_v_version_trois_portes_portes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_trois_portes_portes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_preuve_photo_principale_id_media_id_fk" FOREIGN KEY ("version_preuve_photo_principale_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_preuve_photo_secondaire_id_media_id_fk" FOREIGN KEY ("version_preuve_photo_secondaire_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_trois_axes_axe_mis_en_avant_id_piliers_id_fk" FOREIGN KEY ("version_trois_axes_axe_mis_en_avant_id") REFERENCES "public"."piliers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_histoire_temoignage_id_temoignages_id_fk" FOREIGN KEY ("version_histoire_temoignage_id") REFERENCES "public"."temoignages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_histoire_photo_id_media_id_fk" FOREIGN KEY ("version_histoire_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_campagne_campagne_id_campagnes_id_fk" FOREIGN KEY ("version_campagne_campagne_id") REFERENCES "public"."campagnes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_actualites_album_phare_id_albums_id_fk" FOREIGN KEY ("version_actualites_album_phare_id") REFERENCES "public"."albums"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_locales" ADD CONSTRAINT "_home_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_rels" ADD CONSTRAINT "_home_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_rels" ADD CONSTRAINT "_home_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "chiffres_cles_chiffres" ADD CONSTRAINT "chiffres_cles_chiffres_pilier_id_piliers_id_fk" FOREIGN KEY ("pilier_id") REFERENCES "public"."piliers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "chiffres_cles_chiffres" ADD CONSTRAINT "chiffres_cles_chiffres_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."chiffres_cles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "chiffres_cles_chiffres_locales" ADD CONSTRAINT "chiffres_cles_chiffres_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."chiffres_cles_chiffres"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "don_paliers" ADD CONSTRAINT "don_paliers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."don"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "don_paliers_locales" ADD CONSTRAINT "don_paliers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."don_paliers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "don_canaux_mobile_money" ADD CONSTRAINT "don_canaux_mobile_money_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."don"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "don_locales" ADD CONSTRAINT "don_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."don"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "chaine_impact_etapes" ADD CONSTRAINT "chaine_impact_etapes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."chaine_impact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "chaine_impact_etapes_locales" ADD CONSTRAINT "chaine_impact_etapes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."chaine_impact_etapes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_photo_idx" ON "users" USING btree ("photo_id");
  CREATE INDEX "users_antenne_idx" ON "users" USING btree ("antenne_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "users_locales_locale_parent_id_unique" ON "users_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_usage_autorise_order_idx" ON "media_usage_autorise" USING btree ("order");
  CREATE INDEX "media_usage_autorise_parent_idx" ON "media_usage_autorise" USING btree ("parent_id");
  CREATE INDEX "media_album_idx" ON "media" USING btree ("album_id");
  CREATE INDEX "media_annee_idx" ON "media" USING btree ("annee");
  CREATE INDEX "media_antenne_idx" ON "media" USING btree ("antenne_id");
  CREATE INDEX "media_consentement_doc_idx" ON "media" USING btree ("consentement_doc_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumb_sizes_thumb_filename_idx" ON "media" USING btree ("sizes_thumb_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_content_sizes_content_filename_idx" ON "media" USING btree ("sizes_content_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "media_sizes_full_sizes_full_filename_idx" ON "media" USING btree ("sizes_full_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_rels_order_idx" ON "media_rels" USING btree ("order");
  CREATE INDEX "media_rels_parent_idx" ON "media_rels" USING btree ("parent_id");
  CREATE INDEX "media_rels_path_idx" ON "media_rels" USING btree ("path");
  CREATE INDEX "media_rels_piliers_id_idx" ON "media_rels" USING btree ("piliers_id");
  CREATE INDEX "media_rels_tags_id_idx" ON "media_rels" USING btree ("tags_id");
  CREATE INDEX "piliers_sous_themes_order_idx" ON "piliers_sous_themes" USING btree ("_order");
  CREATE INDEX "piliers_sous_themes_parent_id_idx" ON "piliers_sous_themes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "piliers_sous_themes_locales_locale_parent_id_unique" ON "piliers_sous_themes_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "piliers_slug_idx" ON "piliers" USING btree ("slug");
  CREATE INDEX "piliers_updated_at_idx" ON "piliers" USING btree ("updated_at");
  CREATE INDEX "piliers_created_at_idx" ON "piliers" USING btree ("created_at");
  CREATE UNIQUE INDEX "piliers_locales_locale_parent_id_unique" ON "piliers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "antennes_photo_idx" ON "antennes" USING btree ("photo_id");
  CREATE INDEX "antennes_updated_at_idx" ON "antennes" USING btree ("updated_at");
  CREATE INDEX "antennes_created_at_idx" ON "antennes" USING btree ("created_at");
  CREATE UNIQUE INDEX "antennes_locales_locale_parent_id_unique" ON "antennes_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE UNIQUE INDEX "tags_locales_locale_parent_id_unique" ON "tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_declaration_order_idx" ON "pages_blocks_hero_declaration" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_declaration_parent_id_idx" ON "pages_blocks_hero_declaration" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_declaration_path_idx" ON "pages_blocks_hero_declaration" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_declaration_locale_idx" ON "pages_blocks_hero_declaration" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_declaration_image_idx" ON "pages_blocks_hero_declaration" USING btree ("image_id");
  CREATE INDEX "pages_blocks_trio_mission_entrees_order_idx" ON "pages_blocks_trio_mission_entrees" USING btree ("_order");
  CREATE INDEX "pages_blocks_trio_mission_entrees_parent_id_idx" ON "pages_blocks_trio_mission_entrees" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trio_mission_entrees_locale_idx" ON "pages_blocks_trio_mission_entrees" USING btree ("_locale");
  CREATE INDEX "pages_blocks_trio_mission_entrees_pilier_idx" ON "pages_blocks_trio_mission_entrees" USING btree ("pilier_id");
  CREATE INDEX "pages_blocks_trio_mission_order_idx" ON "pages_blocks_trio_mission" USING btree ("_order");
  CREATE INDEX "pages_blocks_trio_mission_parent_id_idx" ON "pages_blocks_trio_mission" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trio_mission_path_idx" ON "pages_blocks_trio_mission" USING btree ("_path");
  CREATE INDEX "pages_blocks_trio_mission_locale_idx" ON "pages_blocks_trio_mission" USING btree ("_locale");
  CREATE INDEX "pages_blocks_zigzag_puces_order_idx" ON "pages_blocks_zigzag_puces" USING btree ("_order");
  CREATE INDEX "pages_blocks_zigzag_puces_parent_id_idx" ON "pages_blocks_zigzag_puces" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_zigzag_puces_locale_idx" ON "pages_blocks_zigzag_puces" USING btree ("_locale");
  CREATE INDEX "pages_blocks_zigzag_order_idx" ON "pages_blocks_zigzag" USING btree ("_order");
  CREATE INDEX "pages_blocks_zigzag_parent_id_idx" ON "pages_blocks_zigzag" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_zigzag_path_idx" ON "pages_blocks_zigzag" USING btree ("_path");
  CREATE INDEX "pages_blocks_zigzag_locale_idx" ON "pages_blocks_zigzag" USING btree ("_locale");
  CREATE INDEX "pages_blocks_zigzag_image_idx" ON "pages_blocks_zigzag" USING btree ("image_id");
  CREATE INDEX "pages_blocks_zigzag_pilier_idx" ON "pages_blocks_zigzag" USING btree ("pilier_id");
  CREATE INDEX "pages_blocks_bande_chiffres_chiffres_order_idx" ON "pages_blocks_bande_chiffres_chiffres" USING btree ("_order");
  CREATE INDEX "pages_blocks_bande_chiffres_chiffres_parent_id_idx" ON "pages_blocks_bande_chiffres_chiffres" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_bande_chiffres_chiffres_locale_idx" ON "pages_blocks_bande_chiffres_chiffres" USING btree ("_locale");
  CREATE INDEX "pages_blocks_bande_chiffres_chiffres_pilier_idx" ON "pages_blocks_bande_chiffres_chiffres" USING btree ("pilier_id");
  CREATE INDEX "pages_blocks_bande_chiffres_order_idx" ON "pages_blocks_bande_chiffres" USING btree ("_order");
  CREATE INDEX "pages_blocks_bande_chiffres_parent_id_idx" ON "pages_blocks_bande_chiffres" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_bande_chiffres_path_idx" ON "pages_blocks_bande_chiffres" USING btree ("_path");
  CREATE INDEX "pages_blocks_bande_chiffres_locale_idx" ON "pages_blocks_bande_chiffres" USING btree ("_locale");
  CREATE INDEX "pages_blocks_citation_signee_order_idx" ON "pages_blocks_citation_signee" USING btree ("_order");
  CREATE INDEX "pages_blocks_citation_signee_parent_id_idx" ON "pages_blocks_citation_signee" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_citation_signee_path_idx" ON "pages_blocks_citation_signee" USING btree ("_path");
  CREATE INDEX "pages_blocks_citation_signee_locale_idx" ON "pages_blocks_citation_signee" USING btree ("_locale");
  CREATE INDEX "pages_blocks_citation_signee_photo_idx" ON "pages_blocks_citation_signee" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_bande_campagne_order_idx" ON "pages_blocks_bande_campagne" USING btree ("_order");
  CREATE INDEX "pages_blocks_bande_campagne_parent_id_idx" ON "pages_blocks_bande_campagne" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_bande_campagne_path_idx" ON "pages_blocks_bande_campagne" USING btree ("_path");
  CREATE INDEX "pages_blocks_bande_campagne_locale_idx" ON "pages_blocks_bande_campagne" USING btree ("_locale");
  CREATE INDEX "pages_blocks_grille_articles_order_idx" ON "pages_blocks_grille_articles" USING btree ("_order");
  CREATE INDEX "pages_blocks_grille_articles_parent_id_idx" ON "pages_blocks_grille_articles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_grille_articles_path_idx" ON "pages_blocks_grille_articles" USING btree ("_path");
  CREATE INDEX "pages_blocks_grille_articles_locale_idx" ON "pages_blocks_grille_articles" USING btree ("_locale");
  CREATE INDEX "pages_blocks_grille_articles_categorie_idx" ON "pages_blocks_grille_articles" USING btree ("categorie_id");
  CREATE INDEX "pages_blocks_formulaire_order_idx" ON "pages_blocks_formulaire" USING btree ("_order");
  CREATE INDEX "pages_blocks_formulaire_parent_id_idx" ON "pages_blocks_formulaire" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_formulaire_path_idx" ON "pages_blocks_formulaire" USING btree ("_path");
  CREATE INDEX "pages_blocks_formulaire_locale_idx" ON "pages_blocks_formulaire" USING btree ("_locale");
  CREATE INDEX "pages_blocks_texte_riche_order_idx" ON "pages_blocks_texte_riche" USING btree ("_order");
  CREATE INDEX "pages_blocks_texte_riche_parent_id_idx" ON "pages_blocks_texte_riche" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_texte_riche_path_idx" ON "pages_blocks_texte_riche" USING btree ("_path");
  CREATE INDEX "pages_blocks_texte_riche_locale_idx" ON "pages_blocks_texte_riche" USING btree ("_locale");
  CREATE INDEX "pages_blocks_galerie_order_idx" ON "pages_blocks_galerie" USING btree ("_order");
  CREATE INDEX "pages_blocks_galerie_parent_id_idx" ON "pages_blocks_galerie" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_galerie_path_idx" ON "pages_blocks_galerie" USING btree ("_path");
  CREATE INDEX "pages_blocks_galerie_locale_idx" ON "pages_blocks_galerie" USING btree ("_locale");
  CREATE INDEX "pages_blocks_galerie_album_idx" ON "pages_blocks_galerie" USING btree ("album_id");
  CREATE INDEX "pages_blocks_pourquoi_agir_entrees_order_idx" ON "pages_blocks_pourquoi_agir_entrees" USING btree ("_order");
  CREATE INDEX "pages_blocks_pourquoi_agir_entrees_parent_id_idx" ON "pages_blocks_pourquoi_agir_entrees" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pourquoi_agir_entrees_locale_idx" ON "pages_blocks_pourquoi_agir_entrees" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pourquoi_agir_entrees_statistique_idx" ON "pages_blocks_pourquoi_agir_entrees" USING btree ("statistique_id");
  CREATE INDEX "pages_blocks_pourquoi_agir_order_idx" ON "pages_blocks_pourquoi_agir" USING btree ("_order");
  CREATE INDEX "pages_blocks_pourquoi_agir_parent_id_idx" ON "pages_blocks_pourquoi_agir" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pourquoi_agir_path_idx" ON "pages_blocks_pourquoi_agir" USING btree ("_path");
  CREATE INDEX "pages_blocks_pourquoi_agir_locale_idx" ON "pages_blocks_pourquoi_agir" USING btree ("_locale");
  CREATE INDEX "pages_blocks_chaine_impact_etapes_order_idx" ON "pages_blocks_chaine_impact_etapes" USING btree ("_order");
  CREATE INDEX "pages_blocks_chaine_impact_etapes_parent_id_idx" ON "pages_blocks_chaine_impact_etapes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_chaine_impact_etapes_locale_idx" ON "pages_blocks_chaine_impact_etapes" USING btree ("_locale");
  CREATE INDEX "pages_blocks_chaine_impact_order_idx" ON "pages_blocks_chaine_impact" USING btree ("_order");
  CREATE INDEX "pages_blocks_chaine_impact_parent_id_idx" ON "pages_blocks_chaine_impact" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_chaine_impact_path_idx" ON "pages_blocks_chaine_impact" USING btree ("_path");
  CREATE INDEX "pages_blocks_chaine_impact_locale_idx" ON "pages_blocks_chaine_impact" USING btree ("_locale");
  CREATE INDEX "pages_blocks_parcours_sante_moments_order_idx" ON "pages_blocks_parcours_sante_moments" USING btree ("_order");
  CREATE INDEX "pages_blocks_parcours_sante_moments_parent_id_idx" ON "pages_blocks_parcours_sante_moments" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_parcours_sante_moments_locale_idx" ON "pages_blocks_parcours_sante_moments" USING btree ("_locale");
  CREATE INDEX "pages_blocks_parcours_sante_order_idx" ON "pages_blocks_parcours_sante" USING btree ("_order");
  CREATE INDEX "pages_blocks_parcours_sante_parent_id_idx" ON "pages_blocks_parcours_sante" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_parcours_sante_path_idx" ON "pages_blocks_parcours_sante" USING btree ("_path");
  CREATE INDEX "pages_blocks_parcours_sante_locale_idx" ON "pages_blocks_parcours_sante" USING btree ("_locale");
  CREATE INDEX "pages_blocks_dimensions_perinatalite_dimensions_order_idx" ON "pages_blocks_dimensions_perinatalite_dimensions" USING btree ("_order");
  CREATE INDEX "pages_blocks_dimensions_perinatalite_dimensions_parent_id_idx" ON "pages_blocks_dimensions_perinatalite_dimensions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_dimensions_perinatalite_dimensions_locale_idx" ON "pages_blocks_dimensions_perinatalite_dimensions" USING btree ("_locale");
  CREATE INDEX "pages_blocks_dimensions_perinatalite_order_idx" ON "pages_blocks_dimensions_perinatalite" USING btree ("_order");
  CREATE INDEX "pages_blocks_dimensions_perinatalite_parent_id_idx" ON "pages_blocks_dimensions_perinatalite" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_dimensions_perinatalite_path_idx" ON "pages_blocks_dimensions_perinatalite" USING btree ("_path");
  CREATE INDEX "pages_blocks_dimensions_perinatalite_locale_idx" ON "pages_blocks_dimensions_perinatalite" USING btree ("_locale");
  CREATE INDEX "pages_blocks_transparence_points_order_idx" ON "pages_blocks_transparence_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_transparence_points_parent_id_idx" ON "pages_blocks_transparence_points" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_transparence_points_locale_idx" ON "pages_blocks_transparence_points" USING btree ("_locale");
  CREATE INDEX "pages_blocks_transparence_order_idx" ON "pages_blocks_transparence" USING btree ("_order");
  CREATE INDEX "pages_blocks_transparence_parent_id_idx" ON "pages_blocks_transparence" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_transparence_path_idx" ON "pages_blocks_transparence" USING btree ("_path");
  CREATE INDEX "pages_blocks_transparence_locale_idx" ON "pages_blocks_transparence" USING btree ("_locale");
  CREATE INDEX "pages_blocks_projections_chantiers_order_idx" ON "pages_blocks_projections_chantiers" USING btree ("_order");
  CREATE INDEX "pages_blocks_projections_chantiers_parent_id_idx" ON "pages_blocks_projections_chantiers" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projections_chantiers_locale_idx" ON "pages_blocks_projections_chantiers" USING btree ("_locale");
  CREATE INDEX "pages_blocks_projections_order_idx" ON "pages_blocks_projections" USING btree ("_order");
  CREATE INDEX "pages_blocks_projections_parent_id_idx" ON "pages_blocks_projections" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projections_path_idx" ON "pages_blocks_projections" USING btree ("_path");
  CREATE INDEX "pages_blocks_projections_locale_idx" ON "pages_blocks_projections" USING btree ("_locale");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_locale_idx" ON "pages_rels" USING btree ("locale");
  CREATE INDEX "pages_rels_articles_id_idx" ON "pages_rels" USING btree ("articles_id","locale");
  CREATE INDEX "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id","locale");
  CREATE INDEX "_pages_v_blocks_hero_declaration_order_idx" ON "_pages_v_blocks_hero_declaration" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_declaration_parent_id_idx" ON "_pages_v_blocks_hero_declaration" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_declaration_path_idx" ON "_pages_v_blocks_hero_declaration" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_declaration_locale_idx" ON "_pages_v_blocks_hero_declaration" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_declaration_image_idx" ON "_pages_v_blocks_hero_declaration" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_trio_mission_entrees_order_idx" ON "_pages_v_blocks_trio_mission_entrees" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trio_mission_entrees_parent_id_idx" ON "_pages_v_blocks_trio_mission_entrees" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trio_mission_entrees_locale_idx" ON "_pages_v_blocks_trio_mission_entrees" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_trio_mission_entrees_pilier_idx" ON "_pages_v_blocks_trio_mission_entrees" USING btree ("pilier_id");
  CREATE INDEX "_pages_v_blocks_trio_mission_order_idx" ON "_pages_v_blocks_trio_mission" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trio_mission_parent_id_idx" ON "_pages_v_blocks_trio_mission" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trio_mission_path_idx" ON "_pages_v_blocks_trio_mission" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_trio_mission_locale_idx" ON "_pages_v_blocks_trio_mission" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_zigzag_puces_order_idx" ON "_pages_v_blocks_zigzag_puces" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_zigzag_puces_parent_id_idx" ON "_pages_v_blocks_zigzag_puces" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_zigzag_puces_locale_idx" ON "_pages_v_blocks_zigzag_puces" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_zigzag_order_idx" ON "_pages_v_blocks_zigzag" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_zigzag_parent_id_idx" ON "_pages_v_blocks_zigzag" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_zigzag_path_idx" ON "_pages_v_blocks_zigzag" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_zigzag_locale_idx" ON "_pages_v_blocks_zigzag" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_zigzag_image_idx" ON "_pages_v_blocks_zigzag" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_zigzag_pilier_idx" ON "_pages_v_blocks_zigzag" USING btree ("pilier_id");
  CREATE INDEX "_pages_v_blocks_bande_chiffres_chiffres_order_idx" ON "_pages_v_blocks_bande_chiffres_chiffres" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_bande_chiffres_chiffres_parent_id_idx" ON "_pages_v_blocks_bande_chiffres_chiffres" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_bande_chiffres_chiffres_locale_idx" ON "_pages_v_blocks_bande_chiffres_chiffres" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_bande_chiffres_chiffres_pilier_idx" ON "_pages_v_blocks_bande_chiffres_chiffres" USING btree ("pilier_id");
  CREATE INDEX "_pages_v_blocks_bande_chiffres_order_idx" ON "_pages_v_blocks_bande_chiffres" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_bande_chiffres_parent_id_idx" ON "_pages_v_blocks_bande_chiffres" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_bande_chiffres_path_idx" ON "_pages_v_blocks_bande_chiffres" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_bande_chiffres_locale_idx" ON "_pages_v_blocks_bande_chiffres" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_citation_signee_order_idx" ON "_pages_v_blocks_citation_signee" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_citation_signee_parent_id_idx" ON "_pages_v_blocks_citation_signee" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_citation_signee_path_idx" ON "_pages_v_blocks_citation_signee" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_citation_signee_locale_idx" ON "_pages_v_blocks_citation_signee" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_citation_signee_photo_idx" ON "_pages_v_blocks_citation_signee" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_bande_campagne_order_idx" ON "_pages_v_blocks_bande_campagne" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_bande_campagne_parent_id_idx" ON "_pages_v_blocks_bande_campagne" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_bande_campagne_path_idx" ON "_pages_v_blocks_bande_campagne" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_bande_campagne_locale_idx" ON "_pages_v_blocks_bande_campagne" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_grille_articles_order_idx" ON "_pages_v_blocks_grille_articles" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_grille_articles_parent_id_idx" ON "_pages_v_blocks_grille_articles" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_grille_articles_path_idx" ON "_pages_v_blocks_grille_articles" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_grille_articles_locale_idx" ON "_pages_v_blocks_grille_articles" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_grille_articles_categorie_idx" ON "_pages_v_blocks_grille_articles" USING btree ("categorie_id");
  CREATE INDEX "_pages_v_blocks_formulaire_order_idx" ON "_pages_v_blocks_formulaire" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_formulaire_parent_id_idx" ON "_pages_v_blocks_formulaire" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_formulaire_path_idx" ON "_pages_v_blocks_formulaire" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_formulaire_locale_idx" ON "_pages_v_blocks_formulaire" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_texte_riche_order_idx" ON "_pages_v_blocks_texte_riche" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_texte_riche_parent_id_idx" ON "_pages_v_blocks_texte_riche" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_texte_riche_path_idx" ON "_pages_v_blocks_texte_riche" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_texte_riche_locale_idx" ON "_pages_v_blocks_texte_riche" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_galerie_order_idx" ON "_pages_v_blocks_galerie" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_galerie_parent_id_idx" ON "_pages_v_blocks_galerie" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_galerie_path_idx" ON "_pages_v_blocks_galerie" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_galerie_locale_idx" ON "_pages_v_blocks_galerie" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_galerie_album_idx" ON "_pages_v_blocks_galerie" USING btree ("album_id");
  CREATE INDEX "_pages_v_blocks_pourquoi_agir_entrees_order_idx" ON "_pages_v_blocks_pourquoi_agir_entrees" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pourquoi_agir_entrees_parent_id_idx" ON "_pages_v_blocks_pourquoi_agir_entrees" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pourquoi_agir_entrees_locale_idx" ON "_pages_v_blocks_pourquoi_agir_entrees" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_pourquoi_agir_entrees_statistique_idx" ON "_pages_v_blocks_pourquoi_agir_entrees" USING btree ("statistique_id");
  CREATE INDEX "_pages_v_blocks_pourquoi_agir_order_idx" ON "_pages_v_blocks_pourquoi_agir" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pourquoi_agir_parent_id_idx" ON "_pages_v_blocks_pourquoi_agir" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pourquoi_agir_path_idx" ON "_pages_v_blocks_pourquoi_agir" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pourquoi_agir_locale_idx" ON "_pages_v_blocks_pourquoi_agir" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_chaine_impact_etapes_order_idx" ON "_pages_v_blocks_chaine_impact_etapes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_chaine_impact_etapes_parent_id_idx" ON "_pages_v_blocks_chaine_impact_etapes" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_chaine_impact_etapes_locale_idx" ON "_pages_v_blocks_chaine_impact_etapes" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_chaine_impact_order_idx" ON "_pages_v_blocks_chaine_impact" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_chaine_impact_parent_id_idx" ON "_pages_v_blocks_chaine_impact" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_chaine_impact_path_idx" ON "_pages_v_blocks_chaine_impact" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_chaine_impact_locale_idx" ON "_pages_v_blocks_chaine_impact" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_parcours_sante_moments_order_idx" ON "_pages_v_blocks_parcours_sante_moments" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_parcours_sante_moments_parent_id_idx" ON "_pages_v_blocks_parcours_sante_moments" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_parcours_sante_moments_locale_idx" ON "_pages_v_blocks_parcours_sante_moments" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_parcours_sante_order_idx" ON "_pages_v_blocks_parcours_sante" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_parcours_sante_parent_id_idx" ON "_pages_v_blocks_parcours_sante" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_parcours_sante_path_idx" ON "_pages_v_blocks_parcours_sante" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_parcours_sante_locale_idx" ON "_pages_v_blocks_parcours_sante" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_dimensions_perinatalite_dimensions_order_idx" ON "_pages_v_blocks_dimensions_perinatalite_dimensions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_dimensions_perinatalite_dimensions_parent_id_idx" ON "_pages_v_blocks_dimensions_perinatalite_dimensions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_dimensions_perinatalite_dimensions_locale_idx" ON "_pages_v_blocks_dimensions_perinatalite_dimensions" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_dimensions_perinatalite_order_idx" ON "_pages_v_blocks_dimensions_perinatalite" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_dimensions_perinatalite_parent_id_idx" ON "_pages_v_blocks_dimensions_perinatalite" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_dimensions_perinatalite_path_idx" ON "_pages_v_blocks_dimensions_perinatalite" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_dimensions_perinatalite_locale_idx" ON "_pages_v_blocks_dimensions_perinatalite" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_transparence_points_order_idx" ON "_pages_v_blocks_transparence_points" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_transparence_points_parent_id_idx" ON "_pages_v_blocks_transparence_points" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_transparence_points_locale_idx" ON "_pages_v_blocks_transparence_points" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_transparence_order_idx" ON "_pages_v_blocks_transparence" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_transparence_parent_id_idx" ON "_pages_v_blocks_transparence" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_transparence_path_idx" ON "_pages_v_blocks_transparence" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_transparence_locale_idx" ON "_pages_v_blocks_transparence" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_projections_chantiers_order_idx" ON "_pages_v_blocks_projections_chantiers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_projections_chantiers_parent_id_idx" ON "_pages_v_blocks_projections_chantiers" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projections_chantiers_locale_idx" ON "_pages_v_blocks_projections_chantiers" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_projections_order_idx" ON "_pages_v_blocks_projections" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_projections_parent_id_idx" ON "_pages_v_blocks_projections" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projections_path_idx" ON "_pages_v_blocks_projections" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_projections_locale_idx" ON "_pages_v_blocks_projections" USING btree ("_locale");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_locale_idx" ON "_pages_v_rels" USING btree ("locale");
  CREATE INDEX "_pages_v_rels_articles_id_idx" ON "_pages_v_rels" USING btree ("articles_id","locale");
  CREATE INDEX "_pages_v_rels_media_id_idx" ON "_pages_v_rels" USING btree ("media_id","locale");
  CREATE INDEX "articles_blocks_hero_declaration_order_idx" ON "articles_blocks_hero_declaration" USING btree ("_order");
  CREATE INDEX "articles_blocks_hero_declaration_parent_id_idx" ON "articles_blocks_hero_declaration" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_hero_declaration_path_idx" ON "articles_blocks_hero_declaration" USING btree ("_path");
  CREATE INDEX "articles_blocks_hero_declaration_locale_idx" ON "articles_blocks_hero_declaration" USING btree ("_locale");
  CREATE INDEX "articles_blocks_hero_declaration_image_idx" ON "articles_blocks_hero_declaration" USING btree ("image_id");
  CREATE INDEX "articles_blocks_trio_mission_entrees_order_idx" ON "articles_blocks_trio_mission_entrees" USING btree ("_order");
  CREATE INDEX "articles_blocks_trio_mission_entrees_parent_id_idx" ON "articles_blocks_trio_mission_entrees" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_trio_mission_entrees_locale_idx" ON "articles_blocks_trio_mission_entrees" USING btree ("_locale");
  CREATE INDEX "articles_blocks_trio_mission_entrees_pilier_idx" ON "articles_blocks_trio_mission_entrees" USING btree ("pilier_id");
  CREATE INDEX "articles_blocks_trio_mission_order_idx" ON "articles_blocks_trio_mission" USING btree ("_order");
  CREATE INDEX "articles_blocks_trio_mission_parent_id_idx" ON "articles_blocks_trio_mission" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_trio_mission_path_idx" ON "articles_blocks_trio_mission" USING btree ("_path");
  CREATE INDEX "articles_blocks_trio_mission_locale_idx" ON "articles_blocks_trio_mission" USING btree ("_locale");
  CREATE INDEX "articles_blocks_zigzag_puces_order_idx" ON "articles_blocks_zigzag_puces" USING btree ("_order");
  CREATE INDEX "articles_blocks_zigzag_puces_parent_id_idx" ON "articles_blocks_zigzag_puces" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_zigzag_puces_locale_idx" ON "articles_blocks_zigzag_puces" USING btree ("_locale");
  CREATE INDEX "articles_blocks_zigzag_order_idx" ON "articles_blocks_zigzag" USING btree ("_order");
  CREATE INDEX "articles_blocks_zigzag_parent_id_idx" ON "articles_blocks_zigzag" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_zigzag_path_idx" ON "articles_blocks_zigzag" USING btree ("_path");
  CREATE INDEX "articles_blocks_zigzag_locale_idx" ON "articles_blocks_zigzag" USING btree ("_locale");
  CREATE INDEX "articles_blocks_zigzag_image_idx" ON "articles_blocks_zigzag" USING btree ("image_id");
  CREATE INDEX "articles_blocks_zigzag_pilier_idx" ON "articles_blocks_zigzag" USING btree ("pilier_id");
  CREATE INDEX "articles_blocks_bande_chiffres_chiffres_order_idx" ON "articles_blocks_bande_chiffres_chiffres" USING btree ("_order");
  CREATE INDEX "articles_blocks_bande_chiffres_chiffres_parent_id_idx" ON "articles_blocks_bande_chiffres_chiffres" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_bande_chiffres_chiffres_locale_idx" ON "articles_blocks_bande_chiffres_chiffres" USING btree ("_locale");
  CREATE INDEX "articles_blocks_bande_chiffres_chiffres_pilier_idx" ON "articles_blocks_bande_chiffres_chiffres" USING btree ("pilier_id");
  CREATE INDEX "articles_blocks_bande_chiffres_order_idx" ON "articles_blocks_bande_chiffres" USING btree ("_order");
  CREATE INDEX "articles_blocks_bande_chiffres_parent_id_idx" ON "articles_blocks_bande_chiffres" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_bande_chiffres_path_idx" ON "articles_blocks_bande_chiffres" USING btree ("_path");
  CREATE INDEX "articles_blocks_bande_chiffres_locale_idx" ON "articles_blocks_bande_chiffres" USING btree ("_locale");
  CREATE INDEX "articles_blocks_citation_signee_order_idx" ON "articles_blocks_citation_signee" USING btree ("_order");
  CREATE INDEX "articles_blocks_citation_signee_parent_id_idx" ON "articles_blocks_citation_signee" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_citation_signee_path_idx" ON "articles_blocks_citation_signee" USING btree ("_path");
  CREATE INDEX "articles_blocks_citation_signee_locale_idx" ON "articles_blocks_citation_signee" USING btree ("_locale");
  CREATE INDEX "articles_blocks_citation_signee_photo_idx" ON "articles_blocks_citation_signee" USING btree ("photo_id");
  CREATE INDEX "articles_blocks_bande_campagne_order_idx" ON "articles_blocks_bande_campagne" USING btree ("_order");
  CREATE INDEX "articles_blocks_bande_campagne_parent_id_idx" ON "articles_blocks_bande_campagne" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_bande_campagne_path_idx" ON "articles_blocks_bande_campagne" USING btree ("_path");
  CREATE INDEX "articles_blocks_bande_campagne_locale_idx" ON "articles_blocks_bande_campagne" USING btree ("_locale");
  CREATE INDEX "articles_blocks_grille_articles_order_idx" ON "articles_blocks_grille_articles" USING btree ("_order");
  CREATE INDEX "articles_blocks_grille_articles_parent_id_idx" ON "articles_blocks_grille_articles" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_grille_articles_path_idx" ON "articles_blocks_grille_articles" USING btree ("_path");
  CREATE INDEX "articles_blocks_grille_articles_locale_idx" ON "articles_blocks_grille_articles" USING btree ("_locale");
  CREATE INDEX "articles_blocks_grille_articles_categorie_idx" ON "articles_blocks_grille_articles" USING btree ("categorie_id");
  CREATE INDEX "articles_blocks_formulaire_order_idx" ON "articles_blocks_formulaire" USING btree ("_order");
  CREATE INDEX "articles_blocks_formulaire_parent_id_idx" ON "articles_blocks_formulaire" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_formulaire_path_idx" ON "articles_blocks_formulaire" USING btree ("_path");
  CREATE INDEX "articles_blocks_formulaire_locale_idx" ON "articles_blocks_formulaire" USING btree ("_locale");
  CREATE INDEX "articles_blocks_texte_riche_order_idx" ON "articles_blocks_texte_riche" USING btree ("_order");
  CREATE INDEX "articles_blocks_texte_riche_parent_id_idx" ON "articles_blocks_texte_riche" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_texte_riche_path_idx" ON "articles_blocks_texte_riche" USING btree ("_path");
  CREATE INDEX "articles_blocks_texte_riche_locale_idx" ON "articles_blocks_texte_riche" USING btree ("_locale");
  CREATE INDEX "articles_blocks_galerie_order_idx" ON "articles_blocks_galerie" USING btree ("_order");
  CREATE INDEX "articles_blocks_galerie_parent_id_idx" ON "articles_blocks_galerie" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_galerie_path_idx" ON "articles_blocks_galerie" USING btree ("_path");
  CREATE INDEX "articles_blocks_galerie_locale_idx" ON "articles_blocks_galerie" USING btree ("_locale");
  CREATE INDEX "articles_blocks_galerie_album_idx" ON "articles_blocks_galerie" USING btree ("album_id");
  CREATE INDEX "articles_blocks_pourquoi_agir_entrees_order_idx" ON "articles_blocks_pourquoi_agir_entrees" USING btree ("_order");
  CREATE INDEX "articles_blocks_pourquoi_agir_entrees_parent_id_idx" ON "articles_blocks_pourquoi_agir_entrees" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_pourquoi_agir_entrees_locale_idx" ON "articles_blocks_pourquoi_agir_entrees" USING btree ("_locale");
  CREATE INDEX "articles_blocks_pourquoi_agir_entrees_statistique_idx" ON "articles_blocks_pourquoi_agir_entrees" USING btree ("statistique_id");
  CREATE INDEX "articles_blocks_pourquoi_agir_order_idx" ON "articles_blocks_pourquoi_agir" USING btree ("_order");
  CREATE INDEX "articles_blocks_pourquoi_agir_parent_id_idx" ON "articles_blocks_pourquoi_agir" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_pourquoi_agir_path_idx" ON "articles_blocks_pourquoi_agir" USING btree ("_path");
  CREATE INDEX "articles_blocks_pourquoi_agir_locale_idx" ON "articles_blocks_pourquoi_agir" USING btree ("_locale");
  CREATE INDEX "articles_blocks_chaine_impact_etapes_order_idx" ON "articles_blocks_chaine_impact_etapes" USING btree ("_order");
  CREATE INDEX "articles_blocks_chaine_impact_etapes_parent_id_idx" ON "articles_blocks_chaine_impact_etapes" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_chaine_impact_etapes_locale_idx" ON "articles_blocks_chaine_impact_etapes" USING btree ("_locale");
  CREATE INDEX "articles_blocks_chaine_impact_order_idx" ON "articles_blocks_chaine_impact" USING btree ("_order");
  CREATE INDEX "articles_blocks_chaine_impact_parent_id_idx" ON "articles_blocks_chaine_impact" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_chaine_impact_path_idx" ON "articles_blocks_chaine_impact" USING btree ("_path");
  CREATE INDEX "articles_blocks_chaine_impact_locale_idx" ON "articles_blocks_chaine_impact" USING btree ("_locale");
  CREATE INDEX "articles_blocks_parcours_sante_moments_order_idx" ON "articles_blocks_parcours_sante_moments" USING btree ("_order");
  CREATE INDEX "articles_blocks_parcours_sante_moments_parent_id_idx" ON "articles_blocks_parcours_sante_moments" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_parcours_sante_moments_locale_idx" ON "articles_blocks_parcours_sante_moments" USING btree ("_locale");
  CREATE INDEX "articles_blocks_parcours_sante_order_idx" ON "articles_blocks_parcours_sante" USING btree ("_order");
  CREATE INDEX "articles_blocks_parcours_sante_parent_id_idx" ON "articles_blocks_parcours_sante" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_parcours_sante_path_idx" ON "articles_blocks_parcours_sante" USING btree ("_path");
  CREATE INDEX "articles_blocks_parcours_sante_locale_idx" ON "articles_blocks_parcours_sante" USING btree ("_locale");
  CREATE INDEX "articles_blocks_dimensions_perinatalite_dimensions_order_idx" ON "articles_blocks_dimensions_perinatalite_dimensions" USING btree ("_order");
  CREATE INDEX "articles_blocks_dimensions_perinatalite_dimensions_parent_id_idx" ON "articles_blocks_dimensions_perinatalite_dimensions" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_dimensions_perinatalite_dimensions_locale_idx" ON "articles_blocks_dimensions_perinatalite_dimensions" USING btree ("_locale");
  CREATE INDEX "articles_blocks_dimensions_perinatalite_order_idx" ON "articles_blocks_dimensions_perinatalite" USING btree ("_order");
  CREATE INDEX "articles_blocks_dimensions_perinatalite_parent_id_idx" ON "articles_blocks_dimensions_perinatalite" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_dimensions_perinatalite_path_idx" ON "articles_blocks_dimensions_perinatalite" USING btree ("_path");
  CREATE INDEX "articles_blocks_dimensions_perinatalite_locale_idx" ON "articles_blocks_dimensions_perinatalite" USING btree ("_locale");
  CREATE INDEX "articles_blocks_transparence_points_order_idx" ON "articles_blocks_transparence_points" USING btree ("_order");
  CREATE INDEX "articles_blocks_transparence_points_parent_id_idx" ON "articles_blocks_transparence_points" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_transparence_points_locale_idx" ON "articles_blocks_transparence_points" USING btree ("_locale");
  CREATE INDEX "articles_blocks_transparence_order_idx" ON "articles_blocks_transparence" USING btree ("_order");
  CREATE INDEX "articles_blocks_transparence_parent_id_idx" ON "articles_blocks_transparence" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_transparence_path_idx" ON "articles_blocks_transparence" USING btree ("_path");
  CREATE INDEX "articles_blocks_transparence_locale_idx" ON "articles_blocks_transparence" USING btree ("_locale");
  CREATE INDEX "articles_blocks_projections_chantiers_order_idx" ON "articles_blocks_projections_chantiers" USING btree ("_order");
  CREATE INDEX "articles_blocks_projections_chantiers_parent_id_idx" ON "articles_blocks_projections_chantiers" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_projections_chantiers_locale_idx" ON "articles_blocks_projections_chantiers" USING btree ("_locale");
  CREATE INDEX "articles_blocks_projections_order_idx" ON "articles_blocks_projections" USING btree ("_order");
  CREATE INDEX "articles_blocks_projections_parent_id_idx" ON "articles_blocks_projections" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_projections_path_idx" ON "articles_blocks_projections" USING btree ("_path");
  CREATE INDEX "articles_blocks_projections_locale_idx" ON "articles_blocks_projections" USING btree ("_locale");
  CREATE INDEX "articles_categorie_idx" ON "articles" USING btree ("categorie_id");
  CREATE INDEX "articles_couverture_idx" ON "articles" USING btree ("couverture_id");
  CREATE INDEX "articles_auteur_idx" ON "articles" USING btree ("auteur_id");
  CREATE INDEX "articles_album_lie_idx" ON "articles" USING btree ("album_lie_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles__status_idx" ON "articles" USING btree ("_status");
  CREATE UNIQUE INDEX "articles_locales_locale_parent_id_unique" ON "articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_locale_idx" ON "articles_rels" USING btree ("locale");
  CREATE INDEX "articles_rels_tags_id_idx" ON "articles_rels" USING btree ("tags_id","locale");
  CREATE INDEX "articles_rels_piliers_id_idx" ON "articles_rels" USING btree ("piliers_id","locale");
  CREATE INDEX "articles_rels_articles_id_idx" ON "articles_rels" USING btree ("articles_id","locale");
  CREATE INDEX "articles_rels_media_id_idx" ON "articles_rels" USING btree ("media_id","locale");
  CREATE INDEX "_articles_v_blocks_hero_declaration_order_idx" ON "_articles_v_blocks_hero_declaration" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_hero_declaration_parent_id_idx" ON "_articles_v_blocks_hero_declaration" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_hero_declaration_path_idx" ON "_articles_v_blocks_hero_declaration" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_hero_declaration_locale_idx" ON "_articles_v_blocks_hero_declaration" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_hero_declaration_image_idx" ON "_articles_v_blocks_hero_declaration" USING btree ("image_id");
  CREATE INDEX "_articles_v_blocks_trio_mission_entrees_order_idx" ON "_articles_v_blocks_trio_mission_entrees" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_trio_mission_entrees_parent_id_idx" ON "_articles_v_blocks_trio_mission_entrees" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_trio_mission_entrees_locale_idx" ON "_articles_v_blocks_trio_mission_entrees" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_trio_mission_entrees_pilier_idx" ON "_articles_v_blocks_trio_mission_entrees" USING btree ("pilier_id");
  CREATE INDEX "_articles_v_blocks_trio_mission_order_idx" ON "_articles_v_blocks_trio_mission" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_trio_mission_parent_id_idx" ON "_articles_v_blocks_trio_mission" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_trio_mission_path_idx" ON "_articles_v_blocks_trio_mission" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_trio_mission_locale_idx" ON "_articles_v_blocks_trio_mission" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_zigzag_puces_order_idx" ON "_articles_v_blocks_zigzag_puces" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_zigzag_puces_parent_id_idx" ON "_articles_v_blocks_zigzag_puces" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_zigzag_puces_locale_idx" ON "_articles_v_blocks_zigzag_puces" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_zigzag_order_idx" ON "_articles_v_blocks_zigzag" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_zigzag_parent_id_idx" ON "_articles_v_blocks_zigzag" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_zigzag_path_idx" ON "_articles_v_blocks_zigzag" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_zigzag_locale_idx" ON "_articles_v_blocks_zigzag" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_zigzag_image_idx" ON "_articles_v_blocks_zigzag" USING btree ("image_id");
  CREATE INDEX "_articles_v_blocks_zigzag_pilier_idx" ON "_articles_v_blocks_zigzag" USING btree ("pilier_id");
  CREATE INDEX "_articles_v_blocks_bande_chiffres_chiffres_order_idx" ON "_articles_v_blocks_bande_chiffres_chiffres" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_bande_chiffres_chiffres_parent_id_idx" ON "_articles_v_blocks_bande_chiffres_chiffres" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_bande_chiffres_chiffres_locale_idx" ON "_articles_v_blocks_bande_chiffres_chiffres" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_bande_chiffres_chiffres_pilier_idx" ON "_articles_v_blocks_bande_chiffres_chiffres" USING btree ("pilier_id");
  CREATE INDEX "_articles_v_blocks_bande_chiffres_order_idx" ON "_articles_v_blocks_bande_chiffres" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_bande_chiffres_parent_id_idx" ON "_articles_v_blocks_bande_chiffres" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_bande_chiffres_path_idx" ON "_articles_v_blocks_bande_chiffres" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_bande_chiffres_locale_idx" ON "_articles_v_blocks_bande_chiffres" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_citation_signee_order_idx" ON "_articles_v_blocks_citation_signee" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_citation_signee_parent_id_idx" ON "_articles_v_blocks_citation_signee" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_citation_signee_path_idx" ON "_articles_v_blocks_citation_signee" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_citation_signee_locale_idx" ON "_articles_v_blocks_citation_signee" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_citation_signee_photo_idx" ON "_articles_v_blocks_citation_signee" USING btree ("photo_id");
  CREATE INDEX "_articles_v_blocks_bande_campagne_order_idx" ON "_articles_v_blocks_bande_campagne" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_bande_campagne_parent_id_idx" ON "_articles_v_blocks_bande_campagne" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_bande_campagne_path_idx" ON "_articles_v_blocks_bande_campagne" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_bande_campagne_locale_idx" ON "_articles_v_blocks_bande_campagne" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_grille_articles_order_idx" ON "_articles_v_blocks_grille_articles" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_grille_articles_parent_id_idx" ON "_articles_v_blocks_grille_articles" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_grille_articles_path_idx" ON "_articles_v_blocks_grille_articles" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_grille_articles_locale_idx" ON "_articles_v_blocks_grille_articles" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_grille_articles_categorie_idx" ON "_articles_v_blocks_grille_articles" USING btree ("categorie_id");
  CREATE INDEX "_articles_v_blocks_formulaire_order_idx" ON "_articles_v_blocks_formulaire" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_formulaire_parent_id_idx" ON "_articles_v_blocks_formulaire" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_formulaire_path_idx" ON "_articles_v_blocks_formulaire" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_formulaire_locale_idx" ON "_articles_v_blocks_formulaire" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_texte_riche_order_idx" ON "_articles_v_blocks_texte_riche" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_texte_riche_parent_id_idx" ON "_articles_v_blocks_texte_riche" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_texte_riche_path_idx" ON "_articles_v_blocks_texte_riche" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_texte_riche_locale_idx" ON "_articles_v_blocks_texte_riche" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_galerie_order_idx" ON "_articles_v_blocks_galerie" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_galerie_parent_id_idx" ON "_articles_v_blocks_galerie" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_galerie_path_idx" ON "_articles_v_blocks_galerie" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_galerie_locale_idx" ON "_articles_v_blocks_galerie" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_galerie_album_idx" ON "_articles_v_blocks_galerie" USING btree ("album_id");
  CREATE INDEX "_articles_v_blocks_pourquoi_agir_entrees_order_idx" ON "_articles_v_blocks_pourquoi_agir_entrees" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_pourquoi_agir_entrees_parent_id_idx" ON "_articles_v_blocks_pourquoi_agir_entrees" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_pourquoi_agir_entrees_locale_idx" ON "_articles_v_blocks_pourquoi_agir_entrees" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_pourquoi_agir_entrees_statistique_idx" ON "_articles_v_blocks_pourquoi_agir_entrees" USING btree ("statistique_id");
  CREATE INDEX "_articles_v_blocks_pourquoi_agir_order_idx" ON "_articles_v_blocks_pourquoi_agir" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_pourquoi_agir_parent_id_idx" ON "_articles_v_blocks_pourquoi_agir" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_pourquoi_agir_path_idx" ON "_articles_v_blocks_pourquoi_agir" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_pourquoi_agir_locale_idx" ON "_articles_v_blocks_pourquoi_agir" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_chaine_impact_etapes_order_idx" ON "_articles_v_blocks_chaine_impact_etapes" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_chaine_impact_etapes_parent_id_idx" ON "_articles_v_blocks_chaine_impact_etapes" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_chaine_impact_etapes_locale_idx" ON "_articles_v_blocks_chaine_impact_etapes" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_chaine_impact_order_idx" ON "_articles_v_blocks_chaine_impact" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_chaine_impact_parent_id_idx" ON "_articles_v_blocks_chaine_impact" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_chaine_impact_path_idx" ON "_articles_v_blocks_chaine_impact" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_chaine_impact_locale_idx" ON "_articles_v_blocks_chaine_impact" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_parcours_sante_moments_order_idx" ON "_articles_v_blocks_parcours_sante_moments" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_parcours_sante_moments_parent_id_idx" ON "_articles_v_blocks_parcours_sante_moments" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_parcours_sante_moments_locale_idx" ON "_articles_v_blocks_parcours_sante_moments" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_parcours_sante_order_idx" ON "_articles_v_blocks_parcours_sante" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_parcours_sante_parent_id_idx" ON "_articles_v_blocks_parcours_sante" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_parcours_sante_path_idx" ON "_articles_v_blocks_parcours_sante" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_parcours_sante_locale_idx" ON "_articles_v_blocks_parcours_sante" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_dimensions_perinatalite_dimensions_order_idx" ON "_articles_v_blocks_dimensions_perinatalite_dimensions" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_dimensions_perinatalite_dimensions_parent_id_idx" ON "_articles_v_blocks_dimensions_perinatalite_dimensions" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_dimensions_perinatalite_dimensions_locale_idx" ON "_articles_v_blocks_dimensions_perinatalite_dimensions" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_dimensions_perinatalite_order_idx" ON "_articles_v_blocks_dimensions_perinatalite" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_dimensions_perinatalite_parent_id_idx" ON "_articles_v_blocks_dimensions_perinatalite" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_dimensions_perinatalite_path_idx" ON "_articles_v_blocks_dimensions_perinatalite" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_dimensions_perinatalite_locale_idx" ON "_articles_v_blocks_dimensions_perinatalite" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_transparence_points_order_idx" ON "_articles_v_blocks_transparence_points" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_transparence_points_parent_id_idx" ON "_articles_v_blocks_transparence_points" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_transparence_points_locale_idx" ON "_articles_v_blocks_transparence_points" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_transparence_order_idx" ON "_articles_v_blocks_transparence" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_transparence_parent_id_idx" ON "_articles_v_blocks_transparence" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_transparence_path_idx" ON "_articles_v_blocks_transparence" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_transparence_locale_idx" ON "_articles_v_blocks_transparence" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_projections_chantiers_order_idx" ON "_articles_v_blocks_projections_chantiers" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_projections_chantiers_parent_id_idx" ON "_articles_v_blocks_projections_chantiers" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_projections_chantiers_locale_idx" ON "_articles_v_blocks_projections_chantiers" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_projections_order_idx" ON "_articles_v_blocks_projections" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_projections_parent_id_idx" ON "_articles_v_blocks_projections" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_projections_path_idx" ON "_articles_v_blocks_projections" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_projections_locale_idx" ON "_articles_v_blocks_projections" USING btree ("_locale");
  CREATE INDEX "_articles_v_parent_idx" ON "_articles_v" USING btree ("parent_id");
  CREATE INDEX "_articles_v_version_version_categorie_idx" ON "_articles_v" USING btree ("version_categorie_id");
  CREATE INDEX "_articles_v_version_version_couverture_idx" ON "_articles_v" USING btree ("version_couverture_id");
  CREATE INDEX "_articles_v_version_version_auteur_idx" ON "_articles_v" USING btree ("version_auteur_id");
  CREATE INDEX "_articles_v_version_version_album_lie_idx" ON "_articles_v" USING btree ("version_album_lie_id");
  CREATE INDEX "_articles_v_version_version_updated_at_idx" ON "_articles_v" USING btree ("version_updated_at");
  CREATE INDEX "_articles_v_version_version_created_at_idx" ON "_articles_v" USING btree ("version_created_at");
  CREATE INDEX "_articles_v_version_version__status_idx" ON "_articles_v" USING btree ("version__status");
  CREATE INDEX "_articles_v_created_at_idx" ON "_articles_v" USING btree ("created_at");
  CREATE INDEX "_articles_v_updated_at_idx" ON "_articles_v" USING btree ("updated_at");
  CREATE INDEX "_articles_v_snapshot_idx" ON "_articles_v" USING btree ("snapshot");
  CREATE INDEX "_articles_v_published_locale_idx" ON "_articles_v" USING btree ("published_locale");
  CREATE INDEX "_articles_v_latest_idx" ON "_articles_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_articles_v_locales_locale_parent_id_unique" ON "_articles_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_rels_order_idx" ON "_articles_v_rels" USING btree ("order");
  CREATE INDEX "_articles_v_rels_parent_idx" ON "_articles_v_rels" USING btree ("parent_id");
  CREATE INDEX "_articles_v_rels_path_idx" ON "_articles_v_rels" USING btree ("path");
  CREATE INDEX "_articles_v_rels_locale_idx" ON "_articles_v_rels" USING btree ("locale");
  CREATE INDEX "_articles_v_rels_tags_id_idx" ON "_articles_v_rels" USING btree ("tags_id","locale");
  CREATE INDEX "_articles_v_rels_piliers_id_idx" ON "_articles_v_rels" USING btree ("piliers_id","locale");
  CREATE INDEX "_articles_v_rels_articles_id_idx" ON "_articles_v_rels" USING btree ("articles_id","locale");
  CREATE INDEX "_articles_v_rels_media_id_idx" ON "_articles_v_rels" USING btree ("media_id","locale");
  CREATE INDEX "albums_chiffres_cles_order_idx" ON "albums_chiffres_cles" USING btree ("_order");
  CREATE INDEX "albums_chiffres_cles_parent_id_idx" ON "albums_chiffres_cles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "albums_chiffres_cles_locales_locale_parent_id_unique" ON "albums_chiffres_cles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "albums_couverture_idx" ON "albums" USING btree ("couverture_id");
  CREATE INDEX "albums_annee_idx" ON "albums" USING btree ("annee");
  CREATE INDEX "albums_antenne_idx" ON "albums" USING btree ("antenne_id");
  CREATE INDEX "albums_article_lie_idx" ON "albums" USING btree ("article_lie_id");
  CREATE INDEX "albums_updated_at_idx" ON "albums" USING btree ("updated_at");
  CREATE INDEX "albums_created_at_idx" ON "albums" USING btree ("created_at");
  CREATE INDEX "albums__status_idx" ON "albums" USING btree ("_status");
  CREATE UNIQUE INDEX "albums_locales_locale_parent_id_unique" ON "albums_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "albums_rels_order_idx" ON "albums_rels" USING btree ("order");
  CREATE INDEX "albums_rels_parent_idx" ON "albums_rels" USING btree ("parent_id");
  CREATE INDEX "albums_rels_path_idx" ON "albums_rels" USING btree ("path");
  CREATE INDEX "albums_rels_media_id_idx" ON "albums_rels" USING btree ("media_id");
  CREATE INDEX "albums_rels_piliers_id_idx" ON "albums_rels" USING btree ("piliers_id");
  CREATE INDEX "_albums_v_version_chiffres_cles_order_idx" ON "_albums_v_version_chiffres_cles" USING btree ("_order");
  CREATE INDEX "_albums_v_version_chiffres_cles_parent_id_idx" ON "_albums_v_version_chiffres_cles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_albums_v_version_chiffres_cles_locales_locale_parent_id_uni" ON "_albums_v_version_chiffres_cles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_albums_v_parent_idx" ON "_albums_v" USING btree ("parent_id");
  CREATE INDEX "_albums_v_version_version_couverture_idx" ON "_albums_v" USING btree ("version_couverture_id");
  CREATE INDEX "_albums_v_version_version_annee_idx" ON "_albums_v" USING btree ("version_annee");
  CREATE INDEX "_albums_v_version_version_antenne_idx" ON "_albums_v" USING btree ("version_antenne_id");
  CREATE INDEX "_albums_v_version_version_article_lie_idx" ON "_albums_v" USING btree ("version_article_lie_id");
  CREATE INDEX "_albums_v_version_version_updated_at_idx" ON "_albums_v" USING btree ("version_updated_at");
  CREATE INDEX "_albums_v_version_version_created_at_idx" ON "_albums_v" USING btree ("version_created_at");
  CREATE INDEX "_albums_v_version_version__status_idx" ON "_albums_v" USING btree ("version__status");
  CREATE INDEX "_albums_v_created_at_idx" ON "_albums_v" USING btree ("created_at");
  CREATE INDEX "_albums_v_updated_at_idx" ON "_albums_v" USING btree ("updated_at");
  CREATE INDEX "_albums_v_snapshot_idx" ON "_albums_v" USING btree ("snapshot");
  CREATE INDEX "_albums_v_published_locale_idx" ON "_albums_v" USING btree ("published_locale");
  CREATE INDEX "_albums_v_latest_idx" ON "_albums_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_albums_v_locales_locale_parent_id_unique" ON "_albums_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_albums_v_rels_order_idx" ON "_albums_v_rels" USING btree ("order");
  CREATE INDEX "_albums_v_rels_parent_idx" ON "_albums_v_rels" USING btree ("parent_id");
  CREATE INDEX "_albums_v_rels_path_idx" ON "_albums_v_rels" USING btree ("path");
  CREATE INDEX "_albums_v_rels_media_id_idx" ON "_albums_v_rels" USING btree ("media_id");
  CREATE INDEX "_albums_v_rels_piliers_id_idx" ON "_albums_v_rels" USING btree ("piliers_id");
  CREATE INDEX "campagnes_paliers_order_idx" ON "campagnes_paliers" USING btree ("_order");
  CREATE INDEX "campagnes_paliers_parent_id_idx" ON "campagnes_paliers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "campagnes_paliers_locales_locale_parent_id_unique" ON "campagnes_paliers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "campagnes_contenu_unite_order_idx" ON "campagnes_contenu_unite" USING btree ("_order");
  CREATE INDEX "campagnes_contenu_unite_parent_id_idx" ON "campagnes_contenu_unite" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "campagnes_contenu_unite_locales_locale_parent_id_unique" ON "campagnes_contenu_unite_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "campagnes_slug_idx" ON "campagnes" USING btree ("slug");
  CREATE INDEX "campagnes_image_idx" ON "campagnes" USING btree ("image_id");
  CREATE INDEX "campagnes_album_apres_idx" ON "campagnes" USING btree ("album_apres_id");
  CREATE INDEX "campagnes_updated_at_idx" ON "campagnes" USING btree ("updated_at");
  CREATE INDEX "campagnes_created_at_idx" ON "campagnes" USING btree ("created_at");
  CREATE INDEX "campagnes__status_idx" ON "campagnes" USING btree ("_status");
  CREATE UNIQUE INDEX "campagnes_locales_locale_parent_id_unique" ON "campagnes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "campagnes_rels_order_idx" ON "campagnes_rels" USING btree ("order");
  CREATE INDEX "campagnes_rels_parent_idx" ON "campagnes_rels" USING btree ("parent_id");
  CREATE INDEX "campagnes_rels_path_idx" ON "campagnes_rels" USING btree ("path");
  CREATE INDEX "campagnes_rels_partenaires_id_idx" ON "campagnes_rels" USING btree ("partenaires_id");
  CREATE INDEX "_campagnes_v_version_paliers_order_idx" ON "_campagnes_v_version_paliers" USING btree ("_order");
  CREATE INDEX "_campagnes_v_version_paliers_parent_id_idx" ON "_campagnes_v_version_paliers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_campagnes_v_version_paliers_locales_locale_parent_id_unique" ON "_campagnes_v_version_paliers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_campagnes_v_version_contenu_unite_order_idx" ON "_campagnes_v_version_contenu_unite" USING btree ("_order");
  CREATE INDEX "_campagnes_v_version_contenu_unite_parent_id_idx" ON "_campagnes_v_version_contenu_unite" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_campagnes_v_version_contenu_unite_locales_locale_parent_id_" ON "_campagnes_v_version_contenu_unite_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_campagnes_v_parent_idx" ON "_campagnes_v" USING btree ("parent_id");
  CREATE INDEX "_campagnes_v_version_version_slug_idx" ON "_campagnes_v" USING btree ("version_slug");
  CREATE INDEX "_campagnes_v_version_version_image_idx" ON "_campagnes_v" USING btree ("version_image_id");
  CREATE INDEX "_campagnes_v_version_version_album_apres_idx" ON "_campagnes_v" USING btree ("version_album_apres_id");
  CREATE INDEX "_campagnes_v_version_version_updated_at_idx" ON "_campagnes_v" USING btree ("version_updated_at");
  CREATE INDEX "_campagnes_v_version_version_created_at_idx" ON "_campagnes_v" USING btree ("version_created_at");
  CREATE INDEX "_campagnes_v_version_version__status_idx" ON "_campagnes_v" USING btree ("version__status");
  CREATE INDEX "_campagnes_v_created_at_idx" ON "_campagnes_v" USING btree ("created_at");
  CREATE INDEX "_campagnes_v_updated_at_idx" ON "_campagnes_v" USING btree ("updated_at");
  CREATE INDEX "_campagnes_v_snapshot_idx" ON "_campagnes_v" USING btree ("snapshot");
  CREATE INDEX "_campagnes_v_published_locale_idx" ON "_campagnes_v" USING btree ("published_locale");
  CREATE INDEX "_campagnes_v_latest_idx" ON "_campagnes_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_campagnes_v_locales_locale_parent_id_unique" ON "_campagnes_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_campagnes_v_rels_order_idx" ON "_campagnes_v_rels" USING btree ("order");
  CREATE INDEX "_campagnes_v_rels_parent_idx" ON "_campagnes_v_rels" USING btree ("parent_id");
  CREATE INDEX "_campagnes_v_rels_path_idx" ON "_campagnes_v_rels" USING btree ("path");
  CREATE INDEX "_campagnes_v_rels_partenaires_id_idx" ON "_campagnes_v_rels" USING btree ("partenaires_id");
  CREATE INDEX "services_prestations_order_idx" ON "services_prestations" USING btree ("_order");
  CREATE INDEX "services_prestations_parent_id_idx" ON "services_prestations" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_prestations_locales_locale_parent_id_unique" ON "services_prestations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_etapes_parcours_order_idx" ON "services_etapes_parcours" USING btree ("_order");
  CREATE INDEX "services_etapes_parcours_parent_id_idx" ON "services_etapes_parcours" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_etapes_parcours_locales_locale_parent_id_unique" ON "services_etapes_parcours_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "services_pilier_idx" ON "services" USING btree ("pilier_id");
  CREATE INDEX "services_image_idx" ON "services" USING btree ("image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_partenaires_id_idx" ON "services_rels" USING btree ("partenaires_id");
  CREATE INDEX "temoignages_note_vocale_idx" ON "temoignages" USING btree ("note_vocale_id");
  CREATE INDEX "temoignages_photo_idx" ON "temoignages" USING btree ("photo_id");
  CREATE INDEX "temoignages_pilier_idx" ON "temoignages" USING btree ("pilier_id");
  CREATE INDEX "temoignages_updated_at_idx" ON "temoignages" USING btree ("updated_at");
  CREATE INDEX "temoignages_created_at_idx" ON "temoignages" USING btree ("created_at");
  CREATE UNIQUE INDEX "temoignages_locales_locale_parent_id_unique" ON "temoignages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "partenaires_logo_idx" ON "partenaires" USING btree ("logo_id");
  CREATE INDEX "partenaires_updated_at_idx" ON "partenaires" USING btree ("updated_at");
  CREATE INDEX "partenaires_created_at_idx" ON "partenaires" USING btree ("created_at");
  CREATE UNIQUE INDEX "partenaires_locales_locale_parent_id_unique" ON "partenaires_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "rapports_fichier_fr_idx" ON "rapports" USING btree ("fichier_fr_id");
  CREATE INDEX "rapports_fichier_en_idx" ON "rapports" USING btree ("fichier_en_id");
  CREATE INDEX "rapports_couverture_idx" ON "rapports" USING btree ("couverture_id");
  CREATE INDEX "rapports_updated_at_idx" ON "rapports" USING btree ("updated_at");
  CREATE INDEX "rapports_created_at_idx" ON "rapports" USING btree ("created_at");
  CREATE UNIQUE INDEX "rapports_locales_locale_parent_id_unique" ON "rapports_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "dons_reference_idx" ON "dons" USING btree ("reference");
  CREATE INDEX "dons_confirme_par_idx" ON "dons" USING btree ("confirme_par_id");
  CREATE INDEX "dons_updated_at_idx" ON "dons" USING btree ("updated_at");
  CREATE INDEX "dons_created_at_idx" ON "dons" USING btree ("created_at");
  CREATE INDEX "messages_updated_at_idx" ON "messages" USING btree ("updated_at");
  CREATE INDEX "messages_created_at_idx" ON "messages" USING btree ("created_at");
  CREATE INDEX "candidatures_updated_at_idx" ON "candidatures" USING btree ("updated_at");
  CREATE INDEX "candidatures_created_at_idx" ON "candidatures" USING btree ("created_at");
  CREATE UNIQUE INDEX "abonnes_email_idx" ON "abonnes" USING btree ("email");
  CREATE INDEX "abonnes_updated_at_idx" ON "abonnes" USING btree ("updated_at");
  CREATE INDEX "abonnes_created_at_idx" ON "abonnes" USING btree ("created_at");
  CREATE INDEX "statistiques_externes_updated_at_idx" ON "statistiques_externes" USING btree ("updated_at");
  CREATE INDEX "statistiques_externes_created_at_idx" ON "statistiques_externes" USING btree ("created_at");
  CREATE UNIQUE INDEX "statistiques_externes_locales_locale_parent_id_unique" ON "statistiques_externes_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_piliers_id_idx" ON "payload_locked_documents_rels" USING btree ("piliers_id");
  CREATE INDEX "payload_locked_documents_rels_antennes_id_idx" ON "payload_locked_documents_rels" USING btree ("antennes_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_albums_id_idx" ON "payload_locked_documents_rels" USING btree ("albums_id");
  CREATE INDEX "payload_locked_documents_rels_campagnes_id_idx" ON "payload_locked_documents_rels" USING btree ("campagnes_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_temoignages_id_idx" ON "payload_locked_documents_rels" USING btree ("temoignages_id");
  CREATE INDEX "payload_locked_documents_rels_partenaires_id_idx" ON "payload_locked_documents_rels" USING btree ("partenaires_id");
  CREATE INDEX "payload_locked_documents_rels_rapports_id_idx" ON "payload_locked_documents_rels" USING btree ("rapports_id");
  CREATE INDEX "payload_locked_documents_rels_dons_id_idx" ON "payload_locked_documents_rels" USING btree ("dons_id");
  CREATE INDEX "payload_locked_documents_rels_messages_id_idx" ON "payload_locked_documents_rels" USING btree ("messages_id");
  CREATE INDEX "payload_locked_documents_rels_candidatures_id_idx" ON "payload_locked_documents_rels" USING btree ("candidatures_id");
  CREATE INDEX "payload_locked_documents_rels_abonnes_id_idx" ON "payload_locked_documents_rels" USING btree ("abonnes_id");
  CREATE INDEX "payload_locked_documents_rels_statistiques_externes_id_idx" ON "payload_locked_documents_rels" USING btree ("statistiques_externes_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "organisation_telephones_order_idx" ON "organisation_telephones" USING btree ("_order");
  CREATE INDEX "organisation_telephones_parent_id_idx" ON "organisation_telephones" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "organisation_locales_locale_parent_id_unique" ON "organisation_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "settings_reseaux_order_idx" ON "settings_reseaux" USING btree ("_order");
  CREATE INDEX "settings_reseaux_parent_id_idx" ON "settings_reseaux" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "settings_locales_locale_parent_id_unique" ON "settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_header_enfants_order_idx" ON "navigation_header_enfants" USING btree ("_order");
  CREATE INDEX "navigation_header_enfants_parent_id_idx" ON "navigation_header_enfants" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_header_enfants_locales_locale_parent_id_unique" ON "navigation_header_enfants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_header_order_idx" ON "navigation_header" USING btree ("_order");
  CREATE INDEX "navigation_header_parent_id_idx" ON "navigation_header" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_header_locales_locale_parent_id_unique" ON "navigation_header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_footer_liens_order_idx" ON "navigation_footer_liens" USING btree ("_order");
  CREATE INDEX "navigation_footer_liens_parent_id_idx" ON "navigation_footer_liens" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_footer_liens_locales_locale_parent_id_unique" ON "navigation_footer_liens_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_footer_order_idx" ON "navigation_footer" USING btree ("_order");
  CREATE INDEX "navigation_footer_parent_id_idx" ON "navigation_footer" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_footer_locales_locale_parent_id_unique" ON "navigation_footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_legal_order_idx" ON "navigation_legal" USING btree ("_order");
  CREATE INDEX "navigation_legal_parent_id_idx" ON "navigation_legal" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_legal_locales_locale_parent_id_unique" ON "navigation_legal_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "navigation_locales_locale_parent_id_unique" ON "navigation_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_trois_portes_portes_order_idx" ON "home_trois_portes_portes" USING btree ("_order");
  CREATE INDEX "home_trois_portes_portes_parent_id_idx" ON "home_trois_portes_portes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_trois_portes_portes_locales_locale_parent_id_unique" ON "home_trois_portes_portes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_hero_hero_image_idx" ON "home" USING btree ("hero_image_id");
  CREATE INDEX "home_preuve_preuve_photo_principale_idx" ON "home" USING btree ("preuve_photo_principale_id");
  CREATE INDEX "home_preuve_preuve_photo_secondaire_idx" ON "home" USING btree ("preuve_photo_secondaire_id");
  CREATE INDEX "home_trois_axes_trois_axes_axe_mis_en_avant_idx" ON "home" USING btree ("trois_axes_axe_mis_en_avant_id");
  CREATE INDEX "home_histoire_histoire_temoignage_idx" ON "home" USING btree ("histoire_temoignage_id");
  CREATE INDEX "home_histoire_histoire_photo_idx" ON "home" USING btree ("histoire_photo_id");
  CREATE INDEX "home_campagne_campagne_campagne_idx" ON "home" USING btree ("campagne_campagne_id");
  CREATE INDEX "home_actualites_actualites_album_phare_idx" ON "home" USING btree ("actualites_album_phare_id");
  CREATE INDEX "home__status_idx" ON "home" USING btree ("_status");
  CREATE UNIQUE INDEX "home_locales_locale_parent_id_unique" ON "home_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_rels_order_idx" ON "home_rels" USING btree ("order");
  CREATE INDEX "home_rels_parent_idx" ON "home_rels" USING btree ("parent_id");
  CREATE INDEX "home_rels_path_idx" ON "home_rels" USING btree ("path");
  CREATE INDEX "home_rels_articles_id_idx" ON "home_rels" USING btree ("articles_id");
  CREATE INDEX "_home_v_version_trois_portes_portes_order_idx" ON "_home_v_version_trois_portes_portes" USING btree ("_order");
  CREATE INDEX "_home_v_version_trois_portes_portes_parent_id_idx" ON "_home_v_version_trois_portes_portes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_v_version_trois_portes_portes_locales_locale_parent_id" ON "_home_v_version_trois_portes_portes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_hero_version_hero_image_idx" ON "_home_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_home_v_version_preuve_version_preuve_photo_principale_idx" ON "_home_v" USING btree ("version_preuve_photo_principale_id");
  CREATE INDEX "_home_v_version_preuve_version_preuve_photo_secondaire_idx" ON "_home_v" USING btree ("version_preuve_photo_secondaire_id");
  CREATE INDEX "_home_v_version_trois_axes_version_trois_axes_axe_mis_en_idx" ON "_home_v" USING btree ("version_trois_axes_axe_mis_en_avant_id");
  CREATE INDEX "_home_v_version_histoire_version_histoire_temoignage_idx" ON "_home_v" USING btree ("version_histoire_temoignage_id");
  CREATE INDEX "_home_v_version_histoire_version_histoire_photo_idx" ON "_home_v" USING btree ("version_histoire_photo_id");
  CREATE INDEX "_home_v_version_campagne_version_campagne_campagne_idx" ON "_home_v" USING btree ("version_campagne_campagne_id");
  CREATE INDEX "_home_v_version_actualites_version_actualites_album_phar_idx" ON "_home_v" USING btree ("version_actualites_album_phare_id");
  CREATE INDEX "_home_v_version_version__status_idx" ON "_home_v" USING btree ("version__status");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE INDEX "_home_v_snapshot_idx" ON "_home_v" USING btree ("snapshot");
  CREATE INDEX "_home_v_published_locale_idx" ON "_home_v" USING btree ("published_locale");
  CREATE INDEX "_home_v_latest_idx" ON "_home_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_home_v_locales_locale_parent_id_unique" ON "_home_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_rels_order_idx" ON "_home_v_rels" USING btree ("order");
  CREATE INDEX "_home_v_rels_parent_idx" ON "_home_v_rels" USING btree ("parent_id");
  CREATE INDEX "_home_v_rels_path_idx" ON "_home_v_rels" USING btree ("path");
  CREATE INDEX "_home_v_rels_articles_id_idx" ON "_home_v_rels" USING btree ("articles_id");
  CREATE INDEX "chiffres_cles_chiffres_order_idx" ON "chiffres_cles_chiffres" USING btree ("_order");
  CREATE INDEX "chiffres_cles_chiffres_parent_id_idx" ON "chiffres_cles_chiffres" USING btree ("_parent_id");
  CREATE INDEX "chiffres_cles_chiffres_pilier_idx" ON "chiffres_cles_chiffres" USING btree ("pilier_id");
  CREATE UNIQUE INDEX "chiffres_cles_chiffres_locales_locale_parent_id_unique" ON "chiffres_cles_chiffres_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "don_paliers_order_idx" ON "don_paliers" USING btree ("_order");
  CREATE INDEX "don_paliers_parent_id_idx" ON "don_paliers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "don_paliers_locales_locale_parent_id_unique" ON "don_paliers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "don_canaux_mobile_money_order_idx" ON "don_canaux_mobile_money" USING btree ("_order");
  CREATE INDEX "don_canaux_mobile_money_parent_id_idx" ON "don_canaux_mobile_money" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "don_locales_locale_parent_id_unique" ON "don_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "chaine_impact_etapes_order_idx" ON "chaine_impact_etapes" USING btree ("_order");
  CREATE INDEX "chaine_impact_etapes_parent_id_idx" ON "chaine_impact_etapes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "chaine_impact_etapes_locales_locale_parent_id_unique" ON "chaine_impact_etapes_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "users_locales" CASCADE;
  DROP TABLE "media_usage_autorise" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "media_rels" CASCADE;
  DROP TABLE "piliers_sous_themes" CASCADE;
  DROP TABLE "piliers_sous_themes_locales" CASCADE;
  DROP TABLE "piliers" CASCADE;
  DROP TABLE "piliers_locales" CASCADE;
  DROP TABLE "antennes" CASCADE;
  DROP TABLE "antennes_locales" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "tags_locales" CASCADE;
  DROP TABLE "pages_blocks_hero_declaration" CASCADE;
  DROP TABLE "pages_blocks_trio_mission_entrees" CASCADE;
  DROP TABLE "pages_blocks_trio_mission" CASCADE;
  DROP TABLE "pages_blocks_zigzag_puces" CASCADE;
  DROP TABLE "pages_blocks_zigzag" CASCADE;
  DROP TABLE "pages_blocks_bande_chiffres_chiffres" CASCADE;
  DROP TABLE "pages_blocks_bande_chiffres" CASCADE;
  DROP TABLE "pages_blocks_citation_signee" CASCADE;
  DROP TABLE "pages_blocks_bande_campagne" CASCADE;
  DROP TABLE "pages_blocks_grille_articles" CASCADE;
  DROP TABLE "pages_blocks_formulaire" CASCADE;
  DROP TABLE "pages_blocks_texte_riche" CASCADE;
  DROP TABLE "pages_blocks_galerie" CASCADE;
  DROP TABLE "pages_blocks_pourquoi_agir_entrees" CASCADE;
  DROP TABLE "pages_blocks_pourquoi_agir" CASCADE;
  DROP TABLE "pages_blocks_chaine_impact_etapes" CASCADE;
  DROP TABLE "pages_blocks_chaine_impact" CASCADE;
  DROP TABLE "pages_blocks_parcours_sante_moments" CASCADE;
  DROP TABLE "pages_blocks_parcours_sante" CASCADE;
  DROP TABLE "pages_blocks_dimensions_perinatalite_dimensions" CASCADE;
  DROP TABLE "pages_blocks_dimensions_perinatalite" CASCADE;
  DROP TABLE "pages_blocks_transparence_points" CASCADE;
  DROP TABLE "pages_blocks_transparence" CASCADE;
  DROP TABLE "pages_blocks_projections_chantiers" CASCADE;
  DROP TABLE "pages_blocks_projections" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_declaration" CASCADE;
  DROP TABLE "_pages_v_blocks_trio_mission_entrees" CASCADE;
  DROP TABLE "_pages_v_blocks_trio_mission" CASCADE;
  DROP TABLE "_pages_v_blocks_zigzag_puces" CASCADE;
  DROP TABLE "_pages_v_blocks_zigzag" CASCADE;
  DROP TABLE "_pages_v_blocks_bande_chiffres_chiffres" CASCADE;
  DROP TABLE "_pages_v_blocks_bande_chiffres" CASCADE;
  DROP TABLE "_pages_v_blocks_citation_signee" CASCADE;
  DROP TABLE "_pages_v_blocks_bande_campagne" CASCADE;
  DROP TABLE "_pages_v_blocks_grille_articles" CASCADE;
  DROP TABLE "_pages_v_blocks_formulaire" CASCADE;
  DROP TABLE "_pages_v_blocks_texte_riche" CASCADE;
  DROP TABLE "_pages_v_blocks_galerie" CASCADE;
  DROP TABLE "_pages_v_blocks_pourquoi_agir_entrees" CASCADE;
  DROP TABLE "_pages_v_blocks_pourquoi_agir" CASCADE;
  DROP TABLE "_pages_v_blocks_chaine_impact_etapes" CASCADE;
  DROP TABLE "_pages_v_blocks_chaine_impact" CASCADE;
  DROP TABLE "_pages_v_blocks_parcours_sante_moments" CASCADE;
  DROP TABLE "_pages_v_blocks_parcours_sante" CASCADE;
  DROP TABLE "_pages_v_blocks_dimensions_perinatalite_dimensions" CASCADE;
  DROP TABLE "_pages_v_blocks_dimensions_perinatalite" CASCADE;
  DROP TABLE "_pages_v_blocks_transparence_points" CASCADE;
  DROP TABLE "_pages_v_blocks_transparence" CASCADE;
  DROP TABLE "_pages_v_blocks_projections_chantiers" CASCADE;
  DROP TABLE "_pages_v_blocks_projections" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "articles_blocks_hero_declaration" CASCADE;
  DROP TABLE "articles_blocks_trio_mission_entrees" CASCADE;
  DROP TABLE "articles_blocks_trio_mission" CASCADE;
  DROP TABLE "articles_blocks_zigzag_puces" CASCADE;
  DROP TABLE "articles_blocks_zigzag" CASCADE;
  DROP TABLE "articles_blocks_bande_chiffres_chiffres" CASCADE;
  DROP TABLE "articles_blocks_bande_chiffres" CASCADE;
  DROP TABLE "articles_blocks_citation_signee" CASCADE;
  DROP TABLE "articles_blocks_bande_campagne" CASCADE;
  DROP TABLE "articles_blocks_grille_articles" CASCADE;
  DROP TABLE "articles_blocks_formulaire" CASCADE;
  DROP TABLE "articles_blocks_texte_riche" CASCADE;
  DROP TABLE "articles_blocks_galerie" CASCADE;
  DROP TABLE "articles_blocks_pourquoi_agir_entrees" CASCADE;
  DROP TABLE "articles_blocks_pourquoi_agir" CASCADE;
  DROP TABLE "articles_blocks_chaine_impact_etapes" CASCADE;
  DROP TABLE "articles_blocks_chaine_impact" CASCADE;
  DROP TABLE "articles_blocks_parcours_sante_moments" CASCADE;
  DROP TABLE "articles_blocks_parcours_sante" CASCADE;
  DROP TABLE "articles_blocks_dimensions_perinatalite_dimensions" CASCADE;
  DROP TABLE "articles_blocks_dimensions_perinatalite" CASCADE;
  DROP TABLE "articles_blocks_transparence_points" CASCADE;
  DROP TABLE "articles_blocks_transparence" CASCADE;
  DROP TABLE "articles_blocks_projections_chantiers" CASCADE;
  DROP TABLE "articles_blocks_projections" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_locales" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "_articles_v_blocks_hero_declaration" CASCADE;
  DROP TABLE "_articles_v_blocks_trio_mission_entrees" CASCADE;
  DROP TABLE "_articles_v_blocks_trio_mission" CASCADE;
  DROP TABLE "_articles_v_blocks_zigzag_puces" CASCADE;
  DROP TABLE "_articles_v_blocks_zigzag" CASCADE;
  DROP TABLE "_articles_v_blocks_bande_chiffres_chiffres" CASCADE;
  DROP TABLE "_articles_v_blocks_bande_chiffres" CASCADE;
  DROP TABLE "_articles_v_blocks_citation_signee" CASCADE;
  DROP TABLE "_articles_v_blocks_bande_campagne" CASCADE;
  DROP TABLE "_articles_v_blocks_grille_articles" CASCADE;
  DROP TABLE "_articles_v_blocks_formulaire" CASCADE;
  DROP TABLE "_articles_v_blocks_texte_riche" CASCADE;
  DROP TABLE "_articles_v_blocks_galerie" CASCADE;
  DROP TABLE "_articles_v_blocks_pourquoi_agir_entrees" CASCADE;
  DROP TABLE "_articles_v_blocks_pourquoi_agir" CASCADE;
  DROP TABLE "_articles_v_blocks_chaine_impact_etapes" CASCADE;
  DROP TABLE "_articles_v_blocks_chaine_impact" CASCADE;
  DROP TABLE "_articles_v_blocks_parcours_sante_moments" CASCADE;
  DROP TABLE "_articles_v_blocks_parcours_sante" CASCADE;
  DROP TABLE "_articles_v_blocks_dimensions_perinatalite_dimensions" CASCADE;
  DROP TABLE "_articles_v_blocks_dimensions_perinatalite" CASCADE;
  DROP TABLE "_articles_v_blocks_transparence_points" CASCADE;
  DROP TABLE "_articles_v_blocks_transparence" CASCADE;
  DROP TABLE "_articles_v_blocks_projections_chantiers" CASCADE;
  DROP TABLE "_articles_v_blocks_projections" CASCADE;
  DROP TABLE "_articles_v" CASCADE;
  DROP TABLE "_articles_v_locales" CASCADE;
  DROP TABLE "_articles_v_rels" CASCADE;
  DROP TABLE "albums_chiffres_cles" CASCADE;
  DROP TABLE "albums_chiffres_cles_locales" CASCADE;
  DROP TABLE "albums" CASCADE;
  DROP TABLE "albums_locales" CASCADE;
  DROP TABLE "albums_rels" CASCADE;
  DROP TABLE "_albums_v_version_chiffres_cles" CASCADE;
  DROP TABLE "_albums_v_version_chiffres_cles_locales" CASCADE;
  DROP TABLE "_albums_v" CASCADE;
  DROP TABLE "_albums_v_locales" CASCADE;
  DROP TABLE "_albums_v_rels" CASCADE;
  DROP TABLE "campagnes_paliers" CASCADE;
  DROP TABLE "campagnes_paliers_locales" CASCADE;
  DROP TABLE "campagnes_contenu_unite" CASCADE;
  DROP TABLE "campagnes_contenu_unite_locales" CASCADE;
  DROP TABLE "campagnes" CASCADE;
  DROP TABLE "campagnes_locales" CASCADE;
  DROP TABLE "campagnes_rels" CASCADE;
  DROP TABLE "_campagnes_v_version_paliers" CASCADE;
  DROP TABLE "_campagnes_v_version_paliers_locales" CASCADE;
  DROP TABLE "_campagnes_v_version_contenu_unite" CASCADE;
  DROP TABLE "_campagnes_v_version_contenu_unite_locales" CASCADE;
  DROP TABLE "_campagnes_v" CASCADE;
  DROP TABLE "_campagnes_v_locales" CASCADE;
  DROP TABLE "_campagnes_v_rels" CASCADE;
  DROP TABLE "services_prestations" CASCADE;
  DROP TABLE "services_prestations_locales" CASCADE;
  DROP TABLE "services_etapes_parcours" CASCADE;
  DROP TABLE "services_etapes_parcours_locales" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "temoignages" CASCADE;
  DROP TABLE "temoignages_locales" CASCADE;
  DROP TABLE "partenaires" CASCADE;
  DROP TABLE "partenaires_locales" CASCADE;
  DROP TABLE "rapports" CASCADE;
  DROP TABLE "rapports_locales" CASCADE;
  DROP TABLE "dons" CASCADE;
  DROP TABLE "messages" CASCADE;
  DROP TABLE "candidatures" CASCADE;
  DROP TABLE "abonnes" CASCADE;
  DROP TABLE "statistiques_externes" CASCADE;
  DROP TABLE "statistiques_externes_locales" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "organisation_telephones" CASCADE;
  DROP TABLE "organisation" CASCADE;
  DROP TABLE "organisation_locales" CASCADE;
  DROP TABLE "settings_reseaux" CASCADE;
  DROP TABLE "settings" CASCADE;
  DROP TABLE "settings_locales" CASCADE;
  DROP TABLE "navigation_header_enfants" CASCADE;
  DROP TABLE "navigation_header_enfants_locales" CASCADE;
  DROP TABLE "navigation_header" CASCADE;
  DROP TABLE "navigation_header_locales" CASCADE;
  DROP TABLE "navigation_footer_liens" CASCADE;
  DROP TABLE "navigation_footer_liens_locales" CASCADE;
  DROP TABLE "navigation_footer" CASCADE;
  DROP TABLE "navigation_footer_locales" CASCADE;
  DROP TABLE "navigation_legal" CASCADE;
  DROP TABLE "navigation_legal_locales" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "navigation_locales" CASCADE;
  DROP TABLE "home_trois_portes_portes" CASCADE;
  DROP TABLE "home_trois_portes_portes_locales" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "home_locales" CASCADE;
  DROP TABLE "home_rels" CASCADE;
  DROP TABLE "_home_v_version_trois_portes_portes" CASCADE;
  DROP TABLE "_home_v_version_trois_portes_portes_locales" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TABLE "_home_v_locales" CASCADE;
  DROP TABLE "_home_v_rels" CASCADE;
  DROP TABLE "chiffres_cles_chiffres" CASCADE;
  DROP TABLE "chiffres_cles_chiffres_locales" CASCADE;
  DROP TABLE "chiffres_cles" CASCADE;
  DROP TABLE "don_paliers" CASCADE;
  DROP TABLE "don_paliers_locales" CASCADE;
  DROP TABLE "don_canaux_mobile_money" CASCADE;
  DROP TABLE "don" CASCADE;
  DROP TABLE "don_locales" CASCADE;
  DROP TABLE "chaine_impact_etapes" CASCADE;
  DROP TABLE "chaine_impact_etapes_locales" CASCADE;
  DROP TABLE "chaine_impact" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_media_usage_autorise";
  DROP TYPE "public"."enum_media_type";
  DROP TYPE "public"."enum_media_consentement";
  DROP TYPE "public"."enum_media_qualite";
  DROP TYPE "public"."enum_piliers_couleur";
  DROP TYPE "public"."enum_piliers_picto";
  DROP TYPE "public"."enum_antennes_statut";
  DROP TYPE "public"."enum_pages_blocks_zigzag_image_position";
  DROP TYPE "public"."enum_pages_blocks_grille_articles_mode";
  DROP TYPE "public"."enum_pages_blocks_formulaire_type";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_zigzag_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_grille_articles_mode";
  DROP TYPE "public"."enum__pages_v_blocks_formulaire_type";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_articles_blocks_zigzag_image_position";
  DROP TYPE "public"."enum_articles_blocks_grille_articles_mode";
  DROP TYPE "public"."enum_articles_blocks_formulaire_type";
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum__articles_v_blocks_zigzag_image_position";
  DROP TYPE "public"."enum__articles_v_blocks_grille_articles_mode";
  DROP TYPE "public"."enum__articles_v_blocks_formulaire_type";
  DROP TYPE "public"."enum__articles_v_version_status";
  DROP TYPE "public"."enum__articles_v_published_locale";
  DROP TYPE "public"."enum_albums_type_activite";
  DROP TYPE "public"."enum_albums_status";
  DROP TYPE "public"."enum__albums_v_version_type_activite";
  DROP TYPE "public"."enum__albums_v_version_status";
  DROP TYPE "public"."enum__albums_v_published_locale";
  DROP TYPE "public"."enum_campagnes_statut";
  DROP TYPE "public"."enum_campagnes_status";
  DROP TYPE "public"."enum__campagnes_v_version_statut";
  DROP TYPE "public"."enum__campagnes_v_version_status";
  DROP TYPE "public"."enum__campagnes_v_published_locale";
  DROP TYPE "public"."enum_temoignages_voix";
  DROP TYPE "public"."enum_partenaires_type";
  DROP TYPE "public"."enum_rapports_type";
  DROP TYPE "public"."enum_dons_devise";
  DROP TYPE "public"."enum_dons_canal";
  DROP TYPE "public"."enum_dons_affectation";
  DROP TYPE "public"."enum_dons_statut";
  DROP TYPE "public"."enum_messages_sujet";
  DROP TYPE "public"."enum_candidatures_type";
  DROP TYPE "public"."enum_abonnes_langue";
  DROP TYPE "public"."enum_statistiques_externes_theme";
  DROP TYPE "public"."enum_settings_reseaux_plateforme";
  DROP TYPE "public"."enum_home_trois_portes_portes_icone";
  DROP TYPE "public"."enum_home_actualites_mode";
  DROP TYPE "public"."enum_home_status";
  DROP TYPE "public"."enum__home_v_version_trois_portes_portes_icone";
  DROP TYPE "public"."enum__home_v_version_actualites_mode";
  DROP TYPE "public"."enum__home_v_version_status";
  DROP TYPE "public"."enum__home_v_published_locale";`)
}
