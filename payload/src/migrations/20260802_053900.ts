import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_template" ADD VALUE 'landing-page';
  ALTER TYPE "public"."enum_pages_template" ADD VALUE 'landing-page-uk';
  ALTER TYPE "public"."enum__pages_v_version_template" ADD VALUE 'landing-page';
  ALTER TYPE "public"."enum__pages_v_version_template" ADD VALUE 'landing-page-uk';
  CREATE TABLE "pages_landing_page_giveaways_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"bullet" varchar
  );
  
  CREATE TABLE "pages_landing_page_giveaways" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_landing_page_lure_bullet_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"bullet" varchar
  );
  
  CREATE TABLE "_pages_v_version_landing_page_giveaways_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"bullet" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_landing_page_giveaways" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_landing_page_lure_bullet_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"bullet" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages" ADD COLUMN "landing_page_hero_heading" varchar DEFAULT 'Thank You';
  ALTER TABLE "pages" ADD COLUMN "landing_page_hero_subtitle" varchar DEFAULT 'We appreciate your interest! Review your 2 free giveaways below and submit your request for instant access.';
  ALTER TABLE "pages" ADD COLUMN "landing_page_lure_title" varchar DEFAULT 'Your 2 Free Giveaways';
  ALTER TABLE "pages" ADD COLUMN "landing_page_lure_description" jsonb;
  ALTER TABLE "pages" ADD COLUMN "landing_page_lure_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "landing_page_form_title" varchar DEFAULT 'Claim Your Free Resources';
  ALTER TABLE "pages" ADD COLUMN "landing_page_form_subtitle" varchar DEFAULT 'Fill out the form below for instant access and a personalized assessment.';
  ALTER TABLE "pages" ADD COLUMN "landing_page_form_id" integer;
  ALTER TABLE "pages" ADD COLUMN "landing_page_hide_header" boolean DEFAULT true;
  ALTER TABLE "pages" ADD COLUMN "landing_page_hide_footer" boolean DEFAULT true;
  ALTER TABLE "_pages_v" ADD COLUMN "version_landing_page_hero_heading" varchar DEFAULT 'Thank You';
  ALTER TABLE "_pages_v" ADD COLUMN "version_landing_page_hero_subtitle" varchar DEFAULT 'We appreciate your interest! Review your 2 free giveaways below and submit your request for instant access.';
  ALTER TABLE "_pages_v" ADD COLUMN "version_landing_page_lure_title" varchar DEFAULT 'Your 2 Free Giveaways';
  ALTER TABLE "_pages_v" ADD COLUMN "version_landing_page_lure_description" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_landing_page_lure_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_landing_page_form_title" varchar DEFAULT 'Claim Your Free Resources';
  ALTER TABLE "_pages_v" ADD COLUMN "version_landing_page_form_subtitle" varchar DEFAULT 'Fill out the form below for instant access and a personalized assessment.';
  ALTER TABLE "_pages_v" ADD COLUMN "version_landing_page_form_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_landing_page_hide_header" boolean DEFAULT true;
  ALTER TABLE "_pages_v" ADD COLUMN "version_landing_page_hide_footer" boolean DEFAULT true;
  ALTER TABLE "pages_landing_page_giveaways_bullets" ADD CONSTRAINT "pages_landing_page_giveaways_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_landing_page_giveaways"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_landing_page_giveaways" ADD CONSTRAINT "pages_landing_page_giveaways_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_landing_page_lure_bullet_points" ADD CONSTRAINT "pages_landing_page_lure_bullet_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_landing_page_giveaways_bullets" ADD CONSTRAINT "_pages_v_version_landing_page_giveaways_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_landing_page_giveaways"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_landing_page_giveaways" ADD CONSTRAINT "_pages_v_version_landing_page_giveaways_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_landing_page_lure_bullet_points" ADD CONSTRAINT "_pages_v_version_landing_page_lure_bullet_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_landing_page_giveaways_bullets_order_idx" ON "pages_landing_page_giveaways_bullets" USING btree ("_order");
  CREATE INDEX "pages_landing_page_giveaways_bullets_parent_id_idx" ON "pages_landing_page_giveaways_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_landing_page_giveaways_order_idx" ON "pages_landing_page_giveaways" USING btree ("_order");
  CREATE INDEX "pages_landing_page_giveaways_parent_id_idx" ON "pages_landing_page_giveaways" USING btree ("_parent_id");
  CREATE INDEX "pages_landing_page_lure_bullet_points_order_idx" ON "pages_landing_page_lure_bullet_points" USING btree ("_order");
  CREATE INDEX "pages_landing_page_lure_bullet_points_parent_id_idx" ON "pages_landing_page_lure_bullet_points" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_landing_page_giveaways_bullets_order_idx" ON "_pages_v_version_landing_page_giveaways_bullets" USING btree ("_order");
  CREATE INDEX "_pages_v_version_landing_page_giveaways_bullets_parent_id_idx" ON "_pages_v_version_landing_page_giveaways_bullets" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_landing_page_giveaways_order_idx" ON "_pages_v_version_landing_page_giveaways" USING btree ("_order");
  CREATE INDEX "_pages_v_version_landing_page_giveaways_parent_id_idx" ON "_pages_v_version_landing_page_giveaways" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_landing_page_lure_bullet_points_order_idx" ON "_pages_v_version_landing_page_lure_bullet_points" USING btree ("_order");
  CREATE INDEX "_pages_v_version_landing_page_lure_bullet_points_parent_id_idx" ON "_pages_v_version_landing_page_lure_bullet_points" USING btree ("_parent_id");
  ALTER TABLE "pages" ADD CONSTRAINT "pages_landing_page_lure_image_id_media_id_fk" FOREIGN KEY ("landing_page_lure_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_landing_page_form_id_forms_id_fk" FOREIGN KEY ("landing_page_form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_landing_page_lure_image_id_media_id_fk" FOREIGN KEY ("version_landing_page_lure_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_landing_page_form_id_forms_id_fk" FOREIGN KEY ("version_landing_page_form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_landing_page_landing_page_lure_image_idx" ON "pages" USING btree ("landing_page_lure_image_id");
  CREATE INDEX "pages_landing_page_landing_page_form_idx" ON "pages" USING btree ("landing_page_form_id");
  CREATE INDEX "_pages_v_version_landing_page_version_landing_page_lure__idx" ON "_pages_v" USING btree ("version_landing_page_lure_image_id");
  CREATE INDEX "_pages_v_version_landing_page_version_landing_page_form_idx" ON "_pages_v" USING btree ("version_landing_page_form_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_landing_page_giveaways_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_landing_page_giveaways" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_landing_page_lure_bullet_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_landing_page_giveaways_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_landing_page_giveaways" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_landing_page_lure_bullet_points" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_landing_page_giveaways_bullets" CASCADE;
  DROP TABLE "pages_landing_page_giveaways" CASCADE;
  DROP TABLE "pages_landing_page_lure_bullet_points" CASCADE;
  DROP TABLE "_pages_v_version_landing_page_giveaways_bullets" CASCADE;
  DROP TABLE "_pages_v_version_landing_page_giveaways" CASCADE;
  DROP TABLE "_pages_v_version_landing_page_lure_bullet_points" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_landing_page_lure_image_id_media_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_landing_page_form_id_forms_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_landing_page_lure_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_landing_page_form_id_forms_id_fk";
  
  ALTER TABLE "pages" ALTER COLUMN "template" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "template" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_template";
  CREATE TYPE "public"."enum_pages_template" AS ENUM('default', 'personal-lines', 'commercial-lines', 'life-income', 'home');
  ALTER TABLE "pages" ALTER COLUMN "template" SET DEFAULT 'default'::"public"."enum_pages_template";
  ALTER TABLE "pages" ALTER COLUMN "template" SET DATA TYPE "public"."enum_pages_template" USING "template"::"public"."enum_pages_template";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_template" SET DATA TYPE text;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_template" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum__pages_v_version_template";
  CREATE TYPE "public"."enum__pages_v_version_template" AS ENUM('default', 'personal-lines', 'commercial-lines', 'life-income', 'home');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_template" SET DEFAULT 'default'::"public"."enum__pages_v_version_template";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_template" SET DATA TYPE "public"."enum__pages_v_version_template" USING "version_template"::"public"."enum__pages_v_version_template";
  DROP INDEX "pages_landing_page_landing_page_lure_image_idx";
  DROP INDEX "pages_landing_page_landing_page_form_idx";
  DROP INDEX "_pages_v_version_landing_page_version_landing_page_lure__idx";
  DROP INDEX "_pages_v_version_landing_page_version_landing_page_form_idx";
  ALTER TABLE "pages" DROP COLUMN "landing_page_hero_heading";
  ALTER TABLE "pages" DROP COLUMN "landing_page_hero_subtitle";
  ALTER TABLE "pages" DROP COLUMN "landing_page_lure_title";
  ALTER TABLE "pages" DROP COLUMN "landing_page_lure_description";
  ALTER TABLE "pages" DROP COLUMN "landing_page_lure_image_id";
  ALTER TABLE "pages" DROP COLUMN "landing_page_form_title";
  ALTER TABLE "pages" DROP COLUMN "landing_page_form_subtitle";
  ALTER TABLE "pages" DROP COLUMN "landing_page_form_id";
  ALTER TABLE "pages" DROP COLUMN "landing_page_hide_header";
  ALTER TABLE "pages" DROP COLUMN "landing_page_hide_footer";
  ALTER TABLE "_pages_v" DROP COLUMN "version_landing_page_hero_heading";
  ALTER TABLE "_pages_v" DROP COLUMN "version_landing_page_hero_subtitle";
  ALTER TABLE "_pages_v" DROP COLUMN "version_landing_page_lure_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_landing_page_lure_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_landing_page_lure_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_landing_page_form_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_landing_page_form_subtitle";
  ALTER TABLE "_pages_v" DROP COLUMN "version_landing_page_form_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_landing_page_hide_header";
  ALTER TABLE "_pages_v" DROP COLUMN "version_landing_page_hide_footer";`)
}
