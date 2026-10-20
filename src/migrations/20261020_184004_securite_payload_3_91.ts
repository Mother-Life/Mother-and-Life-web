import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "dim_perinat_dimensions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nom" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "dim_perinat" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"definition" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_dim_perinat_v_dimensions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"nom" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_dim_perinat_v" (
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
  
  ALTER TABLE "pages_blocks_dimensions_perinatalite_dimensions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_dimensions_perinatalite" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_dimensions_perinatalite_dimensions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_dimensions_perinatalite" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articles_blocks_dimensions_perinatalite_dimensions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articles_blocks_dimensions_perinatalite" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articles_v_blocks_dimensions_perinatalite_dimensions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articles_v_blocks_dimensions_perinatalite" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_dimensions_perinatalite_dimensions" CASCADE;
  DROP TABLE "pages_blocks_dimensions_perinatalite" CASCADE;
  DROP TABLE "_pages_v_blocks_dimensions_perinatalite_dimensions" CASCADE;
  DROP TABLE "_pages_v_blocks_dimensions_perinatalite" CASCADE;
  DROP TABLE "articles_blocks_dimensions_perinatalite_dimensions" CASCADE;
  DROP TABLE "articles_blocks_dimensions_perinatalite" CASCADE;
  DROP TABLE "_articles_v_blocks_dimensions_perinatalite_dimensions" CASCADE;
  DROP TABLE "_articles_v_blocks_dimensions_perinatalite" CASCADE;
  ALTER TABLE "users" ADD COLUMN "reset_password_requested_at" timestamp(3) with time zone;
  ALTER TABLE "dons" ADD COLUMN "donateur_telephone" varchar;
  ALTER TABLE "dim_perinat_dimensions" ADD CONSTRAINT "dim_perinat_dimensions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dim_perinat"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dim_perinat" ADD CONSTRAINT "dim_perinat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dim_perinat_v_dimensions" ADD CONSTRAINT "_dim_perinat_v_dimensions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dim_perinat_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dim_perinat_v" ADD CONSTRAINT "_dim_perinat_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "dim_perinat_dimensions_order_idx" ON "dim_perinat_dimensions" USING btree ("_order");
  CREATE INDEX "dim_perinat_dimensions_parent_id_idx" ON "dim_perinat_dimensions" USING btree ("_parent_id");
  CREATE INDEX "dim_perinat_dimensions_locale_idx" ON "dim_perinat_dimensions" USING btree ("_locale");
  CREATE INDEX "dim_perinat_order_idx" ON "dim_perinat" USING btree ("_order");
  CREATE INDEX "dim_perinat_parent_id_idx" ON "dim_perinat" USING btree ("_parent_id");
  CREATE INDEX "dim_perinat_path_idx" ON "dim_perinat" USING btree ("_path");
  CREATE INDEX "dim_perinat_locale_idx" ON "dim_perinat" USING btree ("_locale");
  CREATE INDEX "_dim_perinat_v_dimensions_order_idx" ON "_dim_perinat_v_dimensions" USING btree ("_order");
  CREATE INDEX "_dim_perinat_v_dimensions_parent_id_idx" ON "_dim_perinat_v_dimensions" USING btree ("_parent_id");
  CREATE INDEX "_dim_perinat_v_dimensions_locale_idx" ON "_dim_perinat_v_dimensions" USING btree ("_locale");
  CREATE INDEX "_dim_perinat_v_order_idx" ON "_dim_perinat_v" USING btree ("_order");
  CREATE INDEX "_dim_perinat_v_parent_id_idx" ON "_dim_perinat_v" USING btree ("_parent_id");
  CREATE INDEX "_dim_perinat_v_path_idx" ON "_dim_perinat_v" USING btree ("_path");
  CREATE INDEX "_dim_perinat_v_locale_idx" ON "_dim_perinat_v" USING btree ("_locale");
  CREATE INDEX "users_locales_parent_id_idx" ON "users_locales" USING btree ("_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE INDEX "piliers_sous_themes_locales_parent_id_idx" ON "piliers_sous_themes_locales" USING btree ("_parent_id");
  CREATE INDEX "piliers_locales_parent_id_idx" ON "piliers_locales" USING btree ("_parent_id");
  CREATE INDEX "antennes_locales_parent_id_idx" ON "antennes_locales" USING btree ("_parent_id");
  CREATE INDEX "categories_locales_parent_id_idx" ON "categories_locales" USING btree ("_parent_id");
  CREATE INDEX "tags_locales_parent_id_idx" ON "tags_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_locales_parent_id_idx" ON "pages_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_locales_parent_id_idx" ON "_pages_v_locales" USING btree ("_parent_id");
  CREATE INDEX "articles_locales_parent_id_idx" ON "articles_locales" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_locales_parent_id_idx" ON "_articles_v_locales" USING btree ("_parent_id");
  CREATE INDEX "albums_chiffres_cles_locales_parent_id_idx" ON "albums_chiffres_cles_locales" USING btree ("_parent_id");
  CREATE INDEX "albums_locales_parent_id_idx" ON "albums_locales" USING btree ("_parent_id");
  CREATE INDEX "_albums_v_version_chiffres_cles_locales_parent_id_idx" ON "_albums_v_version_chiffres_cles_locales" USING btree ("_parent_id");
  CREATE INDEX "_albums_v_locales_parent_id_idx" ON "_albums_v_locales" USING btree ("_parent_id");
  CREATE INDEX "campagnes_paliers_locales_parent_id_idx" ON "campagnes_paliers_locales" USING btree ("_parent_id");
  CREATE INDEX "campagnes_contenu_unite_locales_parent_id_idx" ON "campagnes_contenu_unite_locales" USING btree ("_parent_id");
  CREATE INDEX "campagnes_locales_parent_id_idx" ON "campagnes_locales" USING btree ("_parent_id");
  CREATE INDEX "_campagnes_v_version_paliers_locales_parent_id_idx" ON "_campagnes_v_version_paliers_locales" USING btree ("_parent_id");
  CREATE INDEX "_campagnes_v_version_contenu_unite_locales_parent_id_idx" ON "_campagnes_v_version_contenu_unite_locales" USING btree ("_parent_id");
  CREATE INDEX "_campagnes_v_locales_parent_id_idx" ON "_campagnes_v_locales" USING btree ("_parent_id");
  CREATE INDEX "services_prestations_locales_parent_id_idx" ON "services_prestations_locales" USING btree ("_parent_id");
  CREATE INDEX "services_etapes_parcours_locales_parent_id_idx" ON "services_etapes_parcours_locales" USING btree ("_parent_id");
  CREATE INDEX "services_locales_parent_id_idx" ON "services_locales" USING btree ("_parent_id");
  CREATE INDEX "temoignages_locales_parent_id_idx" ON "temoignages_locales" USING btree ("_parent_id");
  CREATE INDEX "partenaires_locales_parent_id_idx" ON "partenaires_locales" USING btree ("_parent_id");
  CREATE INDEX "rapports_locales_parent_id_idx" ON "rapports_locales" USING btree ("_parent_id");
  CREATE INDEX "statistiques_externes_locales_parent_id_idx" ON "statistiques_externes_locales" USING btree ("_parent_id");
  CREATE INDEX "organisation_locales_parent_id_idx" ON "organisation_locales" USING btree ("_parent_id");
  CREATE INDEX "settings_locales_parent_id_idx" ON "settings_locales" USING btree ("_parent_id");
  CREATE INDEX "navigation_header_enfants_locales_parent_id_idx" ON "navigation_header_enfants_locales" USING btree ("_parent_id");
  CREATE INDEX "navigation_header_locales_parent_id_idx" ON "navigation_header_locales" USING btree ("_parent_id");
  CREATE INDEX "navigation_footer_liens_locales_parent_id_idx" ON "navigation_footer_liens_locales" USING btree ("_parent_id");
  CREATE INDEX "navigation_footer_locales_parent_id_idx" ON "navigation_footer_locales" USING btree ("_parent_id");
  CREATE INDEX "navigation_legal_locales_parent_id_idx" ON "navigation_legal_locales" USING btree ("_parent_id");
  CREATE INDEX "navigation_locales_parent_id_idx" ON "navigation_locales" USING btree ("_parent_id");
  CREATE INDEX "home_trois_portes_portes_locales_parent_id_idx" ON "home_trois_portes_portes_locales" USING btree ("_parent_id");
  CREATE INDEX "home_locales_parent_id_idx" ON "home_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_trois_portes_portes_locales_parent_id_idx" ON "_home_v_version_trois_portes_portes_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_v_locales_parent_id_idx" ON "_home_v_locales" USING btree ("_parent_id");
  CREATE INDEX "chiffres_cles_chiffres_locales_parent_id_idx" ON "chiffres_cles_chiffres_locales" USING btree ("_parent_id");
  CREATE INDEX "don_paliers_locales_parent_id_idx" ON "don_paliers_locales" USING btree ("_parent_id");
  CREATE INDEX "don_locales_parent_id_idx" ON "don_locales" USING btree ("_parent_id");
  CREATE INDEX "chaine_impact_etapes_locales_parent_id_idx" ON "chaine_impact_etapes_locales" USING btree ("_parent_id");
  ALTER TABLE "dons" DROP COLUMN "donateur_t_l_phone";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
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
  
  ALTER TABLE "dim_perinat_dimensions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dim_perinat" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dim_perinat_v_dimensions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dim_perinat_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "dim_perinat_dimensions" CASCADE;
  DROP TABLE "dim_perinat" CASCADE;
  DROP TABLE "_dim_perinat_v_dimensions" CASCADE;
  DROP TABLE "_dim_perinat_v" CASCADE;
  DROP INDEX "users_locales_parent_id_idx";
  DROP INDEX "media_locales_parent_id_idx";
  DROP INDEX "piliers_sous_themes_locales_parent_id_idx";
  DROP INDEX "piliers_locales_parent_id_idx";
  DROP INDEX "antennes_locales_parent_id_idx";
  DROP INDEX "categories_locales_parent_id_idx";
  DROP INDEX "tags_locales_parent_id_idx";
  DROP INDEX "pages_locales_parent_id_idx";
  DROP INDEX "_pages_v_locales_parent_id_idx";
  DROP INDEX "articles_locales_parent_id_idx";
  DROP INDEX "_articles_v_locales_parent_id_idx";
  DROP INDEX "albums_chiffres_cles_locales_parent_id_idx";
  DROP INDEX "albums_locales_parent_id_idx";
  DROP INDEX "_albums_v_version_chiffres_cles_locales_parent_id_idx";
  DROP INDEX "_albums_v_locales_parent_id_idx";
  DROP INDEX "campagnes_paliers_locales_parent_id_idx";
  DROP INDEX "campagnes_contenu_unite_locales_parent_id_idx";
  DROP INDEX "campagnes_locales_parent_id_idx";
  DROP INDEX "_campagnes_v_version_paliers_locales_parent_id_idx";
  DROP INDEX "_campagnes_v_version_contenu_unite_locales_parent_id_idx";
  DROP INDEX "_campagnes_v_locales_parent_id_idx";
  DROP INDEX "services_prestations_locales_parent_id_idx";
  DROP INDEX "services_etapes_parcours_locales_parent_id_idx";
  DROP INDEX "services_locales_parent_id_idx";
  DROP INDEX "temoignages_locales_parent_id_idx";
  DROP INDEX "partenaires_locales_parent_id_idx";
  DROP INDEX "rapports_locales_parent_id_idx";
  DROP INDEX "statistiques_externes_locales_parent_id_idx";
  DROP INDEX "organisation_locales_parent_id_idx";
  DROP INDEX "settings_locales_parent_id_idx";
  DROP INDEX "navigation_header_enfants_locales_parent_id_idx";
  DROP INDEX "navigation_header_locales_parent_id_idx";
  DROP INDEX "navigation_footer_liens_locales_parent_id_idx";
  DROP INDEX "navigation_footer_locales_parent_id_idx";
  DROP INDEX "navigation_legal_locales_parent_id_idx";
  DROP INDEX "navigation_locales_parent_id_idx";
  DROP INDEX "home_trois_portes_portes_locales_parent_id_idx";
  DROP INDEX "home_locales_parent_id_idx";
  DROP INDEX "_home_v_version_trois_portes_portes_locales_parent_id_idx";
  DROP INDEX "_home_v_locales_parent_id_idx";
  DROP INDEX "chiffres_cles_chiffres_locales_parent_id_idx";
  DROP INDEX "don_paliers_locales_parent_id_idx";
  DROP INDEX "don_locales_parent_id_idx";
  DROP INDEX "chaine_impact_etapes_locales_parent_id_idx";
  ALTER TABLE "dons" ADD COLUMN "donateur_t_l_phone" varchar;
  ALTER TABLE "pages_blocks_dimensions_perinatalite_dimensions" ADD CONSTRAINT "pages_blocks_dimensions_perinatalite_dimensions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_dimensions_perinatalite"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_dimensions_perinatalite" ADD CONSTRAINT "pages_blocks_dimensions_perinatalite_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_dimensions_perinatalite_dimensions" ADD CONSTRAINT "_pages_v_blocks_dimensions_perinatalite_dimensions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_dimensions_perinatalite"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_dimensions_perinatalite" ADD CONSTRAINT "_pages_v_blocks_dimensions_perinatalite_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_dimensions_perinatalite_dimensions" ADD CONSTRAINT "articles_blocks_dimensions_perinatalite_dimensions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_dimensions_perinatalite"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_dimensions_perinatalite" ADD CONSTRAINT "articles_blocks_dimensions_perinatalite_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_dimensions_perinatalite_dimensions" ADD CONSTRAINT "_articles_v_blocks_dimensions_perinatalite_dimensions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_dimensions_perinatalite"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_dimensions_perinatalite" ADD CONSTRAINT "_articles_v_blocks_dimensions_perinatalite_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_dimensions_perinatalite_dimensions_order_idx" ON "pages_blocks_dimensions_perinatalite_dimensions" USING btree ("_order");
  CREATE INDEX "pages_blocks_dimensions_perinatalite_dimensions_parent_id_idx" ON "pages_blocks_dimensions_perinatalite_dimensions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_dimensions_perinatalite_dimensions_locale_idx" ON "pages_blocks_dimensions_perinatalite_dimensions" USING btree ("_locale");
  CREATE INDEX "pages_blocks_dimensions_perinatalite_order_idx" ON "pages_blocks_dimensions_perinatalite" USING btree ("_order");
  CREATE INDEX "pages_blocks_dimensions_perinatalite_parent_id_idx" ON "pages_blocks_dimensions_perinatalite" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_dimensions_perinatalite_path_idx" ON "pages_blocks_dimensions_perinatalite" USING btree ("_path");
  CREATE INDEX "pages_blocks_dimensions_perinatalite_locale_idx" ON "pages_blocks_dimensions_perinatalite" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_dimensions_perinatalite_dimensions_order_idx" ON "_pages_v_blocks_dimensions_perinatalite_dimensions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_dimensions_perinatalite_dimensions_parent_id_idx" ON "_pages_v_blocks_dimensions_perinatalite_dimensions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_dimensions_perinatalite_dimensions_locale_idx" ON "_pages_v_blocks_dimensions_perinatalite_dimensions" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_dimensions_perinatalite_order_idx" ON "_pages_v_blocks_dimensions_perinatalite" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_dimensions_perinatalite_parent_id_idx" ON "_pages_v_blocks_dimensions_perinatalite" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_dimensions_perinatalite_path_idx" ON "_pages_v_blocks_dimensions_perinatalite" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_dimensions_perinatalite_locale_idx" ON "_pages_v_blocks_dimensions_perinatalite" USING btree ("_locale");
  CREATE INDEX "articles_blocks_dimensions_perinatalite_dimensions_order_idx" ON "articles_blocks_dimensions_perinatalite_dimensions" USING btree ("_order");
  CREATE INDEX "articles_blocks_dimensions_perinatalite_dimensions_parent_id_idx" ON "articles_blocks_dimensions_perinatalite_dimensions" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_dimensions_perinatalite_dimensions_locale_idx" ON "articles_blocks_dimensions_perinatalite_dimensions" USING btree ("_locale");
  CREATE INDEX "articles_blocks_dimensions_perinatalite_order_idx" ON "articles_blocks_dimensions_perinatalite" USING btree ("_order");
  CREATE INDEX "articles_blocks_dimensions_perinatalite_parent_id_idx" ON "articles_blocks_dimensions_perinatalite" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_dimensions_perinatalite_path_idx" ON "articles_blocks_dimensions_perinatalite" USING btree ("_path");
  CREATE INDEX "articles_blocks_dimensions_perinatalite_locale_idx" ON "articles_blocks_dimensions_perinatalite" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_dimensions_perinatalite_dimensions_order_idx" ON "_articles_v_blocks_dimensions_perinatalite_dimensions" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_dimensions_perinatalite_dimensions_parent_id_idx" ON "_articles_v_blocks_dimensions_perinatalite_dimensions" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_dimensions_perinatalite_dimensions_locale_idx" ON "_articles_v_blocks_dimensions_perinatalite_dimensions" USING btree ("_locale");
  CREATE INDEX "_articles_v_blocks_dimensions_perinatalite_order_idx" ON "_articles_v_blocks_dimensions_perinatalite" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_dimensions_perinatalite_parent_id_idx" ON "_articles_v_blocks_dimensions_perinatalite" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_dimensions_perinatalite_path_idx" ON "_articles_v_blocks_dimensions_perinatalite" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_dimensions_perinatalite_locale_idx" ON "_articles_v_blocks_dimensions_perinatalite" USING btree ("_locale");
  ALTER TABLE "users" DROP COLUMN "reset_password_requested_at";
  ALTER TABLE "dons" DROP COLUMN "donateur_telephone";`)
}
