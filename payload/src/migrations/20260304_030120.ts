import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_split_section_right_stats_icon" AS ENUM('shield', 'building', 'trending-up', 'lock', 'users', 'star', 'bar-chart', 'check-circle');
  CREATE TYPE "public"."enum_pages_blocks_split_section_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_split_section_cta_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_split_section_right_column_type" AS ENUM('image', 'stats', 'steps');
  CREATE TYPE "public"."enum_pages_blocks_split_section_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_split_section_right_stats_icon" AS ENUM('shield', 'building', 'trending-up', 'lock', 'users', 'star', 'bar-chart', 'check-circle');
  CREATE TYPE "public"."enum__pages_v_blocks_split_section_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_split_section_cta_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_split_section_right_column_type" AS ENUM('image', 'stats', 'steps');
  CREATE TYPE "public"."enum__pages_v_blocks_split_section_image_position" AS ENUM('right', 'left');
  CREATE TABLE "pages_blocks_split_section_right_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_split_section_right_stats_icon" DEFAULT 'shield',
  	"stat_value" varchar,
  	"stat_label" varchar,
  	"stat_description" varchar
  );
  
  CREATE TABLE "pages_blocks_split_section_right_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"highlight" boolean DEFAULT false,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_split_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"body" jsonb,
  	"enable_cta" boolean DEFAULT false,
  	"cta_type" "enum_pages_blocks_split_section_cta_type" DEFAULT 'reference',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"cta_label" varchar,
  	"cta_appearance" "enum_pages_blocks_split_section_cta_appearance" DEFAULT 'default',
  	"right_column_type" "enum_pages_blocks_split_section_right_column_type" DEFAULT 'image',
  	"image_position" "enum_pages_blocks_split_section_image_position" DEFAULT 'right',
  	"right_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split_section_right_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_split_section_right_stats_icon" DEFAULT 'shield',
  	"stat_value" varchar,
  	"stat_label" varchar,
  	"stat_description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split_section_right_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"highlight" boolean DEFAULT false,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"body" jsonb,
  	"enable_cta" boolean DEFAULT false,
  	"cta_type" "enum__pages_v_blocks_split_section_cta_type" DEFAULT 'reference',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"cta_label" varchar,
  	"cta_appearance" "enum__pages_v_blocks_split_section_cta_appearance" DEFAULT 'default',
  	"right_column_type" "enum__pages_v_blocks_split_section_right_column_type" DEFAULT 'image',
  	"image_position" "enum__pages_v_blocks_split_section_image_position" DEFAULT 'right',
  	"right_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_split_section_right_stats" ADD CONSTRAINT "pages_blocks_split_section_right_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_split_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_section_right_steps" ADD CONSTRAINT "pages_blocks_split_section_right_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_split_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_section" ADD CONSTRAINT "pages_blocks_split_section_right_image_id_media_id_fk" FOREIGN KEY ("right_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_section" ADD CONSTRAINT "pages_blocks_split_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_section_right_stats" ADD CONSTRAINT "_pages_v_blocks_split_section_right_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_split_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_section_right_steps" ADD CONSTRAINT "_pages_v_blocks_split_section_right_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_split_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_section" ADD CONSTRAINT "_pages_v_blocks_split_section_right_image_id_media_id_fk" FOREIGN KEY ("right_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_section" ADD CONSTRAINT "_pages_v_blocks_split_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_split_section_right_stats_order_idx" ON "pages_blocks_split_section_right_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_section_right_stats_parent_id_idx" ON "pages_blocks_split_section_right_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_section_right_steps_order_idx" ON "pages_blocks_split_section_right_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_section_right_steps_parent_id_idx" ON "pages_blocks_split_section_right_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_section_order_idx" ON "pages_blocks_split_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_section_parent_id_idx" ON "pages_blocks_split_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_section_path_idx" ON "pages_blocks_split_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_split_section_right_image_idx" ON "pages_blocks_split_section" USING btree ("right_image_id");
  CREATE INDEX "_pages_v_blocks_split_section_right_stats_order_idx" ON "_pages_v_blocks_split_section_right_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_section_right_stats_parent_id_idx" ON "_pages_v_blocks_split_section_right_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_section_right_steps_order_idx" ON "_pages_v_blocks_split_section_right_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_section_right_steps_parent_id_idx" ON "_pages_v_blocks_split_section_right_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_section_order_idx" ON "_pages_v_blocks_split_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_section_parent_id_idx" ON "_pages_v_blocks_split_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_section_path_idx" ON "_pages_v_blocks_split_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_split_section_right_image_idx" ON "_pages_v_blocks_split_section" USING btree ("right_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_split_section_right_stats" CASCADE;
  DROP TABLE "pages_blocks_split_section_right_steps" CASCADE;
  DROP TABLE "pages_blocks_split_section" CASCADE;
  DROP TABLE "_pages_v_blocks_split_section_right_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_split_section_right_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_split_section" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_split_section_right_stats_icon";
  DROP TYPE "public"."enum_pages_blocks_split_section_cta_type";
  DROP TYPE "public"."enum_pages_blocks_split_section_cta_appearance";
  DROP TYPE "public"."enum_pages_blocks_split_section_right_column_type";
  DROP TYPE "public"."enum_pages_blocks_split_section_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_split_section_right_stats_icon";
  DROP TYPE "public"."enum__pages_v_blocks_split_section_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_split_section_cta_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_split_section_right_column_type";
  DROP TYPE "public"."enum__pages_v_blocks_split_section_image_position";`)
}
