import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_promotion_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_promotion_cta_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_promotion_variant" AS ENUM('info', 'success', 'warning', 'brand');
  CREATE TYPE "public"."enum_pages_pl_links_cta_primary_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_pl_links_cta_secondary_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_cl_links_cta_primary_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_cl_links_cta_secondary_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_li_links_cta_primary_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_li_links_cta_secondary_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_home_links_division_p_l_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_home_links_division_c_l_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_home_links_division_l_i_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_home_links_cta_primary_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_promotion_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_promotion_cta_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_promotion_variant" AS ENUM('info', 'success', 'warning', 'brand');
  CREATE TYPE "public"."enum__pages_v_version_pl_links_cta_primary_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_pl_links_cta_secondary_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_cl_links_cta_primary_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_cl_links_cta_secondary_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_li_links_cta_primary_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_li_links_cta_secondary_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_home_links_division_p_l_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_home_links_division_c_l_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_home_links_division_l_i_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_home_links_cta_primary_type" AS ENUM('reference', 'custom');
  ALTER TYPE "public"."enum_pages_template" ADD VALUE 'commercial-lines';
  ALTER TYPE "public"."enum_pages_template" ADD VALUE 'life-income';
  ALTER TYPE "public"."enum_pages_template" ADD VALUE 'home';
  ALTER TYPE "public"."enum__pages_v_version_template" ADD VALUE 'commercial-lines';
  ALTER TYPE "public"."enum__pages_v_version_template" ADD VALUE 'life-income';
  ALTER TYPE "public"."enum__pages_v_version_template" ADD VALUE 'home';
  CREATE TABLE "pages_blocks_promotion_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_promotion_cta_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_promotion_cta_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_promotion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_promotion_variant" DEFAULT 'info',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"dismissible" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_promotion_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_promotion_cta_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_promotion_cta_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_promotion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_promotion_variant" DEFAULT 'info',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"dismissible" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages" ADD COLUMN "pl_links_cta_primary_type" "enum_pages_pl_links_cta_primary_type" DEFAULT 'reference';
  ALTER TABLE "pages" ADD COLUMN "pl_links_cta_primary_new_tab" boolean;
  ALTER TABLE "pages" ADD COLUMN "pl_links_cta_primary_url" varchar;
  ALTER TABLE "pages" ADD COLUMN "pl_links_cta_primary_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "pl_links_cta_secondary_type" "enum_pages_pl_links_cta_secondary_type" DEFAULT 'reference';
  ALTER TABLE "pages" ADD COLUMN "pl_links_cta_secondary_new_tab" boolean;
  ALTER TABLE "pages" ADD COLUMN "pl_links_cta_secondary_url" varchar;
  ALTER TABLE "pages" ADD COLUMN "pl_links_cta_secondary_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "commercial_lines_hero_headline_top" varchar DEFAULT 'Protect Your Business.';
  ALTER TABLE "pages" ADD COLUMN "commercial_lines_hero_headline_bottom" varchar DEFAULT 'Secure Your Future.';
  ALTER TABLE "pages" ADD COLUMN "commercial_lines_hero_description" varchar DEFAULT 'Comprehensive commercial insurance solutions tailored for your industry. We help you manage risk and protect your bottom line.';
  ALTER TABLE "pages" ADD COLUMN "cl_links_cta_primary_type" "enum_pages_cl_links_cta_primary_type" DEFAULT 'reference';
  ALTER TABLE "pages" ADD COLUMN "cl_links_cta_primary_new_tab" boolean;
  ALTER TABLE "pages" ADD COLUMN "cl_links_cta_primary_url" varchar;
  ALTER TABLE "pages" ADD COLUMN "cl_links_cta_primary_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "cl_links_cta_secondary_type" "enum_pages_cl_links_cta_secondary_type" DEFAULT 'reference';
  ALTER TABLE "pages" ADD COLUMN "cl_links_cta_secondary_new_tab" boolean;
  ALTER TABLE "pages" ADD COLUMN "cl_links_cta_secondary_url" varchar;
  ALTER TABLE "pages" ADD COLUMN "cl_links_cta_secondary_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "life_income_hero_headline_top" varchar DEFAULT 'Protect What Matters.';
  ALTER TABLE "pages" ADD COLUMN "life_income_hero_headline_bottom" varchar DEFAULT 'Plan With Confidence.';
  ALTER TABLE "pages" ADD COLUMN "life_income_hero_description" varchar DEFAULT 'Life insurance, income protection, and health benefits tailored for individuals, families, and business owners. Quality guidance for the moments that matter most.';
  ALTER TABLE "pages" ADD COLUMN "li_links_cta_primary_type" "enum_pages_li_links_cta_primary_type" DEFAULT 'reference';
  ALTER TABLE "pages" ADD COLUMN "li_links_cta_primary_new_tab" boolean;
  ALTER TABLE "pages" ADD COLUMN "li_links_cta_primary_url" varchar;
  ALTER TABLE "pages" ADD COLUMN "li_links_cta_primary_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "li_links_cta_secondary_type" "enum_pages_li_links_cta_secondary_type" DEFAULT 'reference';
  ALTER TABLE "pages" ADD COLUMN "li_links_cta_secondary_new_tab" boolean;
  ALTER TABLE "pages" ADD COLUMN "li_links_cta_secondary_url" varchar;
  ALTER TABLE "pages" ADD COLUMN "li_links_cta_secondary_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_page_hero_headline_top" varchar DEFAULT 'Insurance That Works';
  ALTER TABLE "pages" ADD COLUMN "home_page_hero_headline_bottom" varchar DEFAULT 'For You.';
  ALTER TABLE "pages" ADD COLUMN "home_page_hero_description" varchar DEFAULT 'An independent brokerage protecting individuals, families, and businesses across personal, commercial, and life insurance — all under one roof.';
  ALTER TABLE "pages" ADD COLUMN "home_links_division_p_l_type" "enum_pages_home_links_division_p_l_type" DEFAULT 'reference';
  ALTER TABLE "pages" ADD COLUMN "home_links_division_p_l_new_tab" boolean;
  ALTER TABLE "pages" ADD COLUMN "home_links_division_p_l_url" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_links_division_p_l_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_links_division_c_l_type" "enum_pages_home_links_division_c_l_type" DEFAULT 'reference';
  ALTER TABLE "pages" ADD COLUMN "home_links_division_c_l_new_tab" boolean;
  ALTER TABLE "pages" ADD COLUMN "home_links_division_c_l_url" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_links_division_c_l_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_links_division_l_i_type" "enum_pages_home_links_division_l_i_type" DEFAULT 'reference';
  ALTER TABLE "pages" ADD COLUMN "home_links_division_l_i_new_tab" boolean;
  ALTER TABLE "pages" ADD COLUMN "home_links_division_l_i_url" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_links_division_l_i_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_links_cta_primary_type" "enum_pages_home_links_cta_primary_type" DEFAULT 'reference';
  ALTER TABLE "pages" ADD COLUMN "home_links_cta_primary_new_tab" boolean;
  ALTER TABLE "pages" ADD COLUMN "home_links_cta_primary_url" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_links_cta_primary_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_pl_links_cta_primary_type" "enum__pages_v_version_pl_links_cta_primary_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v" ADD COLUMN "version_pl_links_cta_primary_new_tab" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "version_pl_links_cta_primary_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_pl_links_cta_primary_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_pl_links_cta_secondary_type" "enum__pages_v_version_pl_links_cta_secondary_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v" ADD COLUMN "version_pl_links_cta_secondary_new_tab" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "version_pl_links_cta_secondary_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_pl_links_cta_secondary_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_commercial_lines_hero_headline_top" varchar DEFAULT 'Protect Your Business.';
  ALTER TABLE "_pages_v" ADD COLUMN "version_commercial_lines_hero_headline_bottom" varchar DEFAULT 'Secure Your Future.';
  ALTER TABLE "_pages_v" ADD COLUMN "version_commercial_lines_hero_description" varchar DEFAULT 'Comprehensive commercial insurance solutions tailored for your industry. We help you manage risk and protect your bottom line.';
  ALTER TABLE "_pages_v" ADD COLUMN "version_cl_links_cta_primary_type" "enum__pages_v_version_cl_links_cta_primary_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v" ADD COLUMN "version_cl_links_cta_primary_new_tab" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "version_cl_links_cta_primary_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_cl_links_cta_primary_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_cl_links_cta_secondary_type" "enum__pages_v_version_cl_links_cta_secondary_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v" ADD COLUMN "version_cl_links_cta_secondary_new_tab" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "version_cl_links_cta_secondary_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_cl_links_cta_secondary_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_life_income_hero_headline_top" varchar DEFAULT 'Protect What Matters.';
  ALTER TABLE "_pages_v" ADD COLUMN "version_life_income_hero_headline_bottom" varchar DEFAULT 'Plan With Confidence.';
  ALTER TABLE "_pages_v" ADD COLUMN "version_life_income_hero_description" varchar DEFAULT 'Life insurance, income protection, and health benefits tailored for individuals, families, and business owners. Quality guidance for the moments that matter most.';
  ALTER TABLE "_pages_v" ADD COLUMN "version_li_links_cta_primary_type" "enum__pages_v_version_li_links_cta_primary_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v" ADD COLUMN "version_li_links_cta_primary_new_tab" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "version_li_links_cta_primary_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_li_links_cta_primary_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_li_links_cta_secondary_type" "enum__pages_v_version_li_links_cta_secondary_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v" ADD COLUMN "version_li_links_cta_secondary_new_tab" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "version_li_links_cta_secondary_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_li_links_cta_secondary_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_page_hero_headline_top" varchar DEFAULT 'Insurance That Works';
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_page_hero_headline_bottom" varchar DEFAULT 'For You.';
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_page_hero_description" varchar DEFAULT 'An independent brokerage protecting individuals, families, and businesses across personal, commercial, and life insurance — all under one roof.';
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_links_division_p_l_type" "enum__pages_v_version_home_links_division_p_l_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_links_division_p_l_new_tab" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_links_division_p_l_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_links_division_p_l_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_links_division_c_l_type" "enum__pages_v_version_home_links_division_c_l_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_links_division_c_l_new_tab" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_links_division_c_l_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_links_division_c_l_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_links_division_l_i_type" "enum__pages_v_version_home_links_division_l_i_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_links_division_l_i_new_tab" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_links_division_l_i_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_links_division_l_i_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_links_cta_primary_type" "enum__pages_v_version_home_links_cta_primary_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_links_cta_primary_new_tab" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_links_cta_primary_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_links_cta_primary_label" varchar;
  ALTER TABLE "pages_blocks_promotion_cta" ADD CONSTRAINT "pages_blocks_promotion_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_promotion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_promotion" ADD CONSTRAINT "pages_blocks_promotion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_promotion_cta" ADD CONSTRAINT "_pages_v_blocks_promotion_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_promotion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_promotion" ADD CONSTRAINT "_pages_v_blocks_promotion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_promotion_cta_order_idx" ON "pages_blocks_promotion_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_promotion_cta_parent_id_idx" ON "pages_blocks_promotion_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_promotion_order_idx" ON "pages_blocks_promotion" USING btree ("_order");
  CREATE INDEX "pages_blocks_promotion_parent_id_idx" ON "pages_blocks_promotion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_promotion_path_idx" ON "pages_blocks_promotion" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_promotion_cta_order_idx" ON "_pages_v_blocks_promotion_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_promotion_cta_parent_id_idx" ON "_pages_v_blocks_promotion_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_promotion_order_idx" ON "_pages_v_blocks_promotion" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_promotion_parent_id_idx" ON "_pages_v_blocks_promotion" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_promotion_path_idx" ON "_pages_v_blocks_promotion" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_promotion_cta" CASCADE;
  DROP TABLE "pages_blocks_promotion" CASCADE;
  DROP TABLE "_pages_v_blocks_promotion_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_promotion" CASCADE;
  ALTER TABLE "pages" ALTER COLUMN "template" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "template" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_template";
  CREATE TYPE "public"."enum_pages_template" AS ENUM('default', 'personal-lines');
  ALTER TABLE "pages" ALTER COLUMN "template" SET DEFAULT 'default'::"public"."enum_pages_template";
  ALTER TABLE "pages" ALTER COLUMN "template" SET DATA TYPE "public"."enum_pages_template" USING "template"::"public"."enum_pages_template";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_template" SET DATA TYPE text;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_template" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum__pages_v_version_template";
  CREATE TYPE "public"."enum__pages_v_version_template" AS ENUM('default', 'personal-lines');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_template" SET DEFAULT 'default'::"public"."enum__pages_v_version_template";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_template" SET DATA TYPE "public"."enum__pages_v_version_template" USING "version_template"::"public"."enum__pages_v_version_template";
  ALTER TABLE "pages" DROP COLUMN "pl_links_cta_primary_type";
  ALTER TABLE "pages" DROP COLUMN "pl_links_cta_primary_new_tab";
  ALTER TABLE "pages" DROP COLUMN "pl_links_cta_primary_url";
  ALTER TABLE "pages" DROP COLUMN "pl_links_cta_primary_label";
  ALTER TABLE "pages" DROP COLUMN "pl_links_cta_secondary_type";
  ALTER TABLE "pages" DROP COLUMN "pl_links_cta_secondary_new_tab";
  ALTER TABLE "pages" DROP COLUMN "pl_links_cta_secondary_url";
  ALTER TABLE "pages" DROP COLUMN "pl_links_cta_secondary_label";
  ALTER TABLE "pages" DROP COLUMN "commercial_lines_hero_headline_top";
  ALTER TABLE "pages" DROP COLUMN "commercial_lines_hero_headline_bottom";
  ALTER TABLE "pages" DROP COLUMN "commercial_lines_hero_description";
  ALTER TABLE "pages" DROP COLUMN "cl_links_cta_primary_type";
  ALTER TABLE "pages" DROP COLUMN "cl_links_cta_primary_new_tab";
  ALTER TABLE "pages" DROP COLUMN "cl_links_cta_primary_url";
  ALTER TABLE "pages" DROP COLUMN "cl_links_cta_primary_label";
  ALTER TABLE "pages" DROP COLUMN "cl_links_cta_secondary_type";
  ALTER TABLE "pages" DROP COLUMN "cl_links_cta_secondary_new_tab";
  ALTER TABLE "pages" DROP COLUMN "cl_links_cta_secondary_url";
  ALTER TABLE "pages" DROP COLUMN "cl_links_cta_secondary_label";
  ALTER TABLE "pages" DROP COLUMN "life_income_hero_headline_top";
  ALTER TABLE "pages" DROP COLUMN "life_income_hero_headline_bottom";
  ALTER TABLE "pages" DROP COLUMN "life_income_hero_description";
  ALTER TABLE "pages" DROP COLUMN "li_links_cta_primary_type";
  ALTER TABLE "pages" DROP COLUMN "li_links_cta_primary_new_tab";
  ALTER TABLE "pages" DROP COLUMN "li_links_cta_primary_url";
  ALTER TABLE "pages" DROP COLUMN "li_links_cta_primary_label";
  ALTER TABLE "pages" DROP COLUMN "li_links_cta_secondary_type";
  ALTER TABLE "pages" DROP COLUMN "li_links_cta_secondary_new_tab";
  ALTER TABLE "pages" DROP COLUMN "li_links_cta_secondary_url";
  ALTER TABLE "pages" DROP COLUMN "li_links_cta_secondary_label";
  ALTER TABLE "pages" DROP COLUMN "home_page_hero_headline_top";
  ALTER TABLE "pages" DROP COLUMN "home_page_hero_headline_bottom";
  ALTER TABLE "pages" DROP COLUMN "home_page_hero_description";
  ALTER TABLE "pages" DROP COLUMN "home_links_division_p_l_type";
  ALTER TABLE "pages" DROP COLUMN "home_links_division_p_l_new_tab";
  ALTER TABLE "pages" DROP COLUMN "home_links_division_p_l_url";
  ALTER TABLE "pages" DROP COLUMN "home_links_division_p_l_label";
  ALTER TABLE "pages" DROP COLUMN "home_links_division_c_l_type";
  ALTER TABLE "pages" DROP COLUMN "home_links_division_c_l_new_tab";
  ALTER TABLE "pages" DROP COLUMN "home_links_division_c_l_url";
  ALTER TABLE "pages" DROP COLUMN "home_links_division_c_l_label";
  ALTER TABLE "pages" DROP COLUMN "home_links_division_l_i_type";
  ALTER TABLE "pages" DROP COLUMN "home_links_division_l_i_new_tab";
  ALTER TABLE "pages" DROP COLUMN "home_links_division_l_i_url";
  ALTER TABLE "pages" DROP COLUMN "home_links_division_l_i_label";
  ALTER TABLE "pages" DROP COLUMN "home_links_cta_primary_type";
  ALTER TABLE "pages" DROP COLUMN "home_links_cta_primary_new_tab";
  ALTER TABLE "pages" DROP COLUMN "home_links_cta_primary_url";
  ALTER TABLE "pages" DROP COLUMN "home_links_cta_primary_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_pl_links_cta_primary_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_pl_links_cta_primary_new_tab";
  ALTER TABLE "_pages_v" DROP COLUMN "version_pl_links_cta_primary_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_pl_links_cta_primary_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_pl_links_cta_secondary_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_pl_links_cta_secondary_new_tab";
  ALTER TABLE "_pages_v" DROP COLUMN "version_pl_links_cta_secondary_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_pl_links_cta_secondary_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_commercial_lines_hero_headline_top";
  ALTER TABLE "_pages_v" DROP COLUMN "version_commercial_lines_hero_headline_bottom";
  ALTER TABLE "_pages_v" DROP COLUMN "version_commercial_lines_hero_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_cl_links_cta_primary_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_cl_links_cta_primary_new_tab";
  ALTER TABLE "_pages_v" DROP COLUMN "version_cl_links_cta_primary_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_cl_links_cta_primary_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_cl_links_cta_secondary_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_cl_links_cta_secondary_new_tab";
  ALTER TABLE "_pages_v" DROP COLUMN "version_cl_links_cta_secondary_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_cl_links_cta_secondary_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_life_income_hero_headline_top";
  ALTER TABLE "_pages_v" DROP COLUMN "version_life_income_hero_headline_bottom";
  ALTER TABLE "_pages_v" DROP COLUMN "version_life_income_hero_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_li_links_cta_primary_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_li_links_cta_primary_new_tab";
  ALTER TABLE "_pages_v" DROP COLUMN "version_li_links_cta_primary_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_li_links_cta_primary_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_li_links_cta_secondary_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_li_links_cta_secondary_new_tab";
  ALTER TABLE "_pages_v" DROP COLUMN "version_li_links_cta_secondary_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_li_links_cta_secondary_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_page_hero_headline_top";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_page_hero_headline_bottom";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_page_hero_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_links_division_p_l_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_links_division_p_l_new_tab";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_links_division_p_l_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_links_division_p_l_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_links_division_c_l_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_links_division_c_l_new_tab";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_links_division_c_l_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_links_division_c_l_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_links_division_l_i_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_links_division_l_i_new_tab";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_links_division_l_i_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_links_division_l_i_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_links_cta_primary_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_links_cta_primary_new_tab";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_links_cta_primary_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_links_cta_primary_label";
  DROP TYPE "public"."enum_pages_blocks_promotion_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_promotion_cta_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_promotion_variant";
  DROP TYPE "public"."enum_pages_pl_links_cta_primary_type";
  DROP TYPE "public"."enum_pages_pl_links_cta_secondary_type";
  DROP TYPE "public"."enum_pages_cl_links_cta_primary_type";
  DROP TYPE "public"."enum_pages_cl_links_cta_secondary_type";
  DROP TYPE "public"."enum_pages_li_links_cta_primary_type";
  DROP TYPE "public"."enum_pages_li_links_cta_secondary_type";
  DROP TYPE "public"."enum_pages_home_links_division_p_l_type";
  DROP TYPE "public"."enum_pages_home_links_division_c_l_type";
  DROP TYPE "public"."enum_pages_home_links_division_l_i_type";
  DROP TYPE "public"."enum_pages_home_links_cta_primary_type";
  DROP TYPE "public"."enum__pages_v_blocks_promotion_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_promotion_cta_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_promotion_variant";
  DROP TYPE "public"."enum__pages_v_version_pl_links_cta_primary_type";
  DROP TYPE "public"."enum__pages_v_version_pl_links_cta_secondary_type";
  DROP TYPE "public"."enum__pages_v_version_cl_links_cta_primary_type";
  DROP TYPE "public"."enum__pages_v_version_cl_links_cta_secondary_type";
  DROP TYPE "public"."enum__pages_v_version_li_links_cta_primary_type";
  DROP TYPE "public"."enum__pages_v_version_li_links_cta_secondary_type";
  DROP TYPE "public"."enum__pages_v_version_home_links_division_p_l_type";
  DROP TYPE "public"."enum__pages_v_version_home_links_division_c_l_type";
  DROP TYPE "public"."enum__pages_v_version_home_links_division_l_i_type";
  DROP TYPE "public"."enum__pages_v_version_home_links_cta_primary_type";`)
}
