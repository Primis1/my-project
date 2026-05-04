import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cta_layout" AS ENUM('centered', 'detailed');
  CREATE TYPE "public"."enum_pages_blocks_feature_cards_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_feature_cards_cards_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_faq_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_faq_cta_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_card_link_cards_icon" AS ENUM('shield', 'building', 'trending-up', 'lock', 'users', 'star', 'bar-chart', 'check-circle', 'scale', 'briefcase', 'heart', 'home', 'car');
  CREATE TYPE "public"."enum_pages_blocks_card_link_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_card_link_cards_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_events_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_events_type" AS ENUM('promo', 'giveaway', 'new-service', 'announcement');
  CREATE TYPE "public"."enum_pages_blocks_contact_contact_info_icon" AS ENUM('MapPin', 'Phone', 'Mail', 'Clock');
  CREATE TYPE "public"."part_cat_icon" AS ENUM('Building2', 'Handshake', 'Shield');
  CREATE TYPE "public"."enum_pages_template" AS ENUM('default', 'personal-lines');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_layout" AS ENUM('centered', 'detailed');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_cards_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_cards_cards_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_cta_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_card_link_cards_icon" AS ENUM('shield', 'building', 'trending-up', 'lock', 'users', 'star', 'bar-chart', 'check-circle', 'scale', 'briefcase', 'heart', 'home', 'car');
  CREATE TYPE "public"."enum__pages_v_blocks_card_link_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_card_link_cards_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_events_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_events_type" AS ENUM('promo', 'giveaway', 'new-service', 'announcement');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_contact_info_icon" AS ENUM('MapPin', 'Phone', 'Mail', 'Clock');
  CREATE TYPE "public"."enum__pages_v_version_template" AS ENUM('default', 'personal-lines');
  ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'impact';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'impact';
  CREATE TABLE "pages_blocks_cta_detailed_content_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"benefit" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_cards_cards_bulletins" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "pages_blocks_news_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'From Our Desk',
  	"heading" varchar DEFAULT 'Latest Updates & News',
  	"heading_accent" varchar DEFAULT 'Updates',
  	"view_all_label" varchar DEFAULT 'View All Articles',
  	"view_all_link" varchar DEFAULT '/posts',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_faq_cta_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_faq_cta_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'FAQs',
  	"title" varchar DEFAULT 'Frequently Asked Questions',
  	"title_accent" varchar DEFAULT 'Questions',
  	"description" varchar DEFAULT 'Find answers to common questions about our services, coverage options, and processes.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_card_link_cards_needs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "pages_blocks_card_link_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon" "enum_pages_blocks_card_link_cards_icon" DEFAULT 'shield',
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"link_type" "enum_pages_blocks_card_link_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_card_link_cards_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_card_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Who We Serve',
  	"title" varchar DEFAULT 'Solutions for Every Stage of Life',
  	"title_accent" varchar DEFAULT 'Every',
  	"description" varchar DEFAULT 'We understand that insurance needs vary based on your life situation. That is why we offer specialized solutions for entrepreneurs, families, and individuals alike.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_events_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_events_cta_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "pages_blocks_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_events_type" DEFAULT 'promo',
  	"badge" varchar DEFAULT 'Limited Offer',
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"expires" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_contact_info_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_contact_contact_info_icon" DEFAULT 'MapPin',
  	"title" varchar
  );
  
  CREATE TABLE "pages_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Get In Touch',
  	"title" varchar DEFAULT 'Let''s Start the',
  	"title_highlight" varchar DEFAULT 'Conversation',
  	"description" varchar DEFAULT 'Ready to protect what matters most? Reach out today for a free consultation with one of our experienced advisors.',
  	"block_name" varchar
  );
  
  CREATE TABLE "part_cats_block_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "part_cats_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "part_cat_icon" DEFAULT 'Building2',
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_partner_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Our Partners',
  	"title" varchar DEFAULT 'Backed by Industry Leaders',
  	"title_accent" varchar DEFAULT 'Industry',
  	"description" varchar DEFAULT 'As an independent agency, we partner with the best carriers in the industry to bring you choice, value, and peace of mind.',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_detailed_content_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"benefit" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_cards_cards_bulletins" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_news_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'From Our Desk',
  	"heading" varchar DEFAULT 'Latest Updates & News',
  	"heading_accent" varchar DEFAULT 'Updates',
  	"view_all_label" varchar DEFAULT 'View All Articles',
  	"view_all_link" varchar DEFAULT '/posts',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_faq_cta_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_faq_cta_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'FAQs',
  	"title" varchar DEFAULT 'Frequently Asked Questions',
  	"title_accent" varchar DEFAULT 'Questions',
  	"description" varchar DEFAULT 'Find answers to common questions about our services, coverage options, and processes.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_link_cards_needs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_link_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon" "enum__pages_v_blocks_card_link_cards_icon" DEFAULT 'shield',
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"link_type" "enum__pages_v_blocks_card_link_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_card_link_cards_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Who We Serve',
  	"title" varchar DEFAULT 'Solutions for Every Stage of Life',
  	"title_accent" varchar DEFAULT 'Every',
  	"description" varchar DEFAULT 'We understand that insurance needs vary based on your life situation. That is why we offer specialized solutions for entrepreneurs, families, and individuals alike.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_events_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_events_cta_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_events_type" DEFAULT 'promo',
  	"badge" varchar DEFAULT 'Limited Offer',
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"expires" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_contact_info_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_contact_contact_info_icon" DEFAULT 'MapPin',
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Get In Touch',
  	"title" varchar DEFAULT 'Let''s Start the',
  	"title_highlight" varchar DEFAULT 'Conversation',
  	"description" varchar DEFAULT 'Ready to protect what matters most? Reach out today for a free consultation with one of our experienced advisors.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_part_cats_block_v_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_part_cats_block_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "part_cat_icon" DEFAULT 'Building2',
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_partner_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Our Partners',
  	"title" varchar DEFAULT 'Backed by Industry Leaders',
  	"title_accent" varchar DEFAULT 'Industry',
  	"description" varchar DEFAULT 'As an independent agency, we partner with the best carriers in the industry to bring you choice, value, and peace of mind.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "layout" "enum_pages_blocks_cta_layout" DEFAULT 'centered';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "detailed_content_benefits_title" varchar DEFAULT 'The Independent Advantage';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "detailed_content_benefits_description" varchar DEFAULT 'Unlike captive agents who represent a single carrier, we work for you. Our independent status means we can shop the market to find the best coverage at the best price — every time.';
  ALTER TABLE "pages_blocks_feature_cards_cards" ADD COLUMN "badge" varchar;
  ALTER TABLE "pages_blocks_feature_cards_cards" ADD COLUMN "enable_link" boolean;
  ALTER TABLE "pages_blocks_feature_cards_cards" ADD COLUMN "link_type" "enum_pages_blocks_feature_cards_cards_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_feature_cards_cards" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_feature_cards_cards" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_feature_cards_cards" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_feature_cards_cards" ADD COLUMN "link_appearance" "enum_pages_blocks_feature_cards_cards_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages" ADD COLUMN "template" "enum_pages_template" DEFAULT 'default';
  ALTER TABLE "pages" ADD COLUMN "hero_media2_id" integer;
  ALTER TABLE "pages" ADD COLUMN "personal_lines_hero_headline_top" varchar DEFAULT 'Compare. Save.';
  ALTER TABLE "pages" ADD COLUMN "personal_lines_hero_headline_bottom" varchar DEFAULT 'Get Protected.';
  ALTER TABLE "pages" ADD COLUMN "personal_lines_hero_description" varchar DEFAULT 'We shop 20+ insurance companies to find you the best coverage at the lowest price. No sales pressure, just expert guidance tailored to your needs.';
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "layout" "enum__pages_v_blocks_cta_layout" DEFAULT 'centered';
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "detailed_content_benefits_title" varchar DEFAULT 'The Independent Advantage';
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "detailed_content_benefits_description" varchar DEFAULT 'Unlike captive agents who represent a single carrier, we work for you. Our independent status means we can shop the market to find the best coverage at the best price — every time.';
  ALTER TABLE "_pages_v_blocks_feature_cards_cards" ADD COLUMN "badge" varchar;
  ALTER TABLE "_pages_v_blocks_feature_cards_cards" ADD COLUMN "enable_link" boolean;
  ALTER TABLE "_pages_v_blocks_feature_cards_cards" ADD COLUMN "link_type" "enum__pages_v_blocks_feature_cards_cards_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_feature_cards_cards" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_feature_cards_cards" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_feature_cards_cards" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_feature_cards_cards" ADD COLUMN "link_appearance" "enum__pages_v_blocks_feature_cards_cards_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v" ADD COLUMN "version_template" "enum__pages_v_version_template" DEFAULT 'default';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media2_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_personal_lines_hero_headline_top" varchar DEFAULT 'Compare. Save.';
  ALTER TABLE "_pages_v" ADD COLUMN "version_personal_lines_hero_headline_bottom" varchar DEFAULT 'Get Protected.';
  ALTER TABLE "_pages_v" ADD COLUMN "version_personal_lines_hero_description" varchar DEFAULT 'We shop 20+ insurance companies to find you the best coverage at the lowest price. No sales pressure, just expert guidance tailored to your needs.';
  ALTER TABLE "pages_blocks_cta_detailed_content_benefits" ADD CONSTRAINT "pages_blocks_cta_detailed_content_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards_cards_bulletins" ADD CONSTRAINT "pages_blocks_feature_cards_cards_bulletins_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_grid" ADD CONSTRAINT "pages_blocks_news_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_faqs" ADD CONSTRAINT "pages_blocks_faq_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_cta" ADD CONSTRAINT "pages_blocks_faq_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_link_cards_needs" ADD CONSTRAINT "pages_blocks_card_link_cards_needs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_link_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_link_cards" ADD CONSTRAINT "pages_blocks_card_link_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_link_cards" ADD CONSTRAINT "pages_blocks_card_link_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_link" ADD CONSTRAINT "pages_blocks_card_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_events_cta" ADD CONSTRAINT "pages_blocks_events_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_events" ADD CONSTRAINT "pages_blocks_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_events" ADD CONSTRAINT "pages_blocks_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_contact_info_details" ADD CONSTRAINT "pages_blocks_contact_contact_info_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_contact_info" ADD CONSTRAINT "pages_blocks_contact_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "part_cats_block_partners" ADD CONSTRAINT "part_cats_block_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."part_cats_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "part_cats_block" ADD CONSTRAINT "part_cats_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_partner_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partner_cards" ADD CONSTRAINT "pages_blocks_partner_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_detailed_content_benefits" ADD CONSTRAINT "_pages_v_blocks_cta_detailed_content_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_cards_cards_bulletins" ADD CONSTRAINT "_pages_v_blocks_feature_cards_cards_bulletins_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_news_grid" ADD CONSTRAINT "_pages_v_blocks_news_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_faqs" ADD CONSTRAINT "_pages_v_blocks_faq_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_cta" ADD CONSTRAINT "_pages_v_blocks_faq_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_link_cards_needs" ADD CONSTRAINT "_pages_v_blocks_card_link_cards_needs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_link_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_link_cards" ADD CONSTRAINT "_pages_v_blocks_card_link_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_link_cards" ADD CONSTRAINT "_pages_v_blocks_card_link_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_link" ADD CONSTRAINT "_pages_v_blocks_card_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_events_cta" ADD CONSTRAINT "_pages_v_blocks_events_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_events" ADD CONSTRAINT "_pages_v_blocks_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_events" ADD CONSTRAINT "_pages_v_blocks_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_contact_info_details" ADD CONSTRAINT "_pages_v_blocks_contact_contact_info_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_contact_info" ADD CONSTRAINT "_pages_v_blocks_contact_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_part_cats_block_v_partners" ADD CONSTRAINT "_part_cats_block_v_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_part_cats_block_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_part_cats_block_v" ADD CONSTRAINT "_part_cats_block_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_partner_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partner_cards" ADD CONSTRAINT "_pages_v_blocks_partner_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_cta_detailed_content_benefits_order_idx" ON "pages_blocks_cta_detailed_content_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_detailed_content_benefits_parent_id_idx" ON "pages_blocks_cta_detailed_content_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_cards_cards_bulletins_order_idx" ON "pages_blocks_feature_cards_cards_bulletins" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_cards_cards_bulletins_parent_id_idx" ON "pages_blocks_feature_cards_cards_bulletins" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_news_grid_order_idx" ON "pages_blocks_news_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_news_grid_parent_id_idx" ON "pages_blocks_news_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_news_grid_path_idx" ON "pages_blocks_news_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_faqs_order_idx" ON "pages_blocks_faq_faqs" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_faqs_parent_id_idx" ON "pages_blocks_faq_faqs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_cta_order_idx" ON "pages_blocks_faq_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_cta_parent_id_idx" ON "pages_blocks_faq_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_card_link_cards_needs_order_idx" ON "pages_blocks_card_link_cards_needs" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_link_cards_needs_parent_id_idx" ON "pages_blocks_card_link_cards_needs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_link_cards_order_idx" ON "pages_blocks_card_link_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_link_cards_parent_id_idx" ON "pages_blocks_card_link_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_link_cards_image_idx" ON "pages_blocks_card_link_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_card_link_order_idx" ON "pages_blocks_card_link" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_link_parent_id_idx" ON "pages_blocks_card_link" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_link_path_idx" ON "pages_blocks_card_link" USING btree ("_path");
  CREATE INDEX "pages_blocks_events_cta_order_idx" ON "pages_blocks_events_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_events_cta_parent_id_idx" ON "pages_blocks_events_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_events_order_idx" ON "pages_blocks_events" USING btree ("_order");
  CREATE INDEX "pages_blocks_events_parent_id_idx" ON "pages_blocks_events" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_events_path_idx" ON "pages_blocks_events" USING btree ("_path");
  CREATE INDEX "pages_blocks_events_image_idx" ON "pages_blocks_events" USING btree ("image_id");
  CREATE INDEX "pages_blocks_contact_contact_info_details_order_idx" ON "pages_blocks_contact_contact_info_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_contact_info_details_parent_id_idx" ON "pages_blocks_contact_contact_info_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_contact_info_order_idx" ON "pages_blocks_contact_contact_info" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_contact_info_parent_id_idx" ON "pages_blocks_contact_contact_info" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_order_idx" ON "pages_blocks_contact" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_parent_id_idx" ON "pages_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_path_idx" ON "pages_blocks_contact" USING btree ("_path");
  CREATE INDEX "part_cats_block_partners_order_idx" ON "part_cats_block_partners" USING btree ("_order");
  CREATE INDEX "part_cats_block_partners_parent_id_idx" ON "part_cats_block_partners" USING btree ("_parent_id");
  CREATE INDEX "part_cats_block_order_idx" ON "part_cats_block" USING btree ("_order");
  CREATE INDEX "part_cats_block_parent_id_idx" ON "part_cats_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partner_cards_order_idx" ON "pages_blocks_partner_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_partner_cards_parent_id_idx" ON "pages_blocks_partner_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partner_cards_path_idx" ON "pages_blocks_partner_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_detailed_content_benefits_order_idx" ON "_pages_v_blocks_cta_detailed_content_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_detailed_content_benefits_parent_id_idx" ON "_pages_v_blocks_cta_detailed_content_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_cards_cards_bulletins_order_idx" ON "_pages_v_blocks_feature_cards_cards_bulletins" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_cards_cards_bulletins_parent_id_idx" ON "_pages_v_blocks_feature_cards_cards_bulletins" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_news_grid_order_idx" ON "_pages_v_blocks_news_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_news_grid_parent_id_idx" ON "_pages_v_blocks_news_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_news_grid_path_idx" ON "_pages_v_blocks_news_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_faqs_order_idx" ON "_pages_v_blocks_faq_faqs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_faqs_parent_id_idx" ON "_pages_v_blocks_faq_faqs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_cta_order_idx" ON "_pages_v_blocks_faq_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_cta_parent_id_idx" ON "_pages_v_blocks_faq_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_card_link_cards_needs_order_idx" ON "_pages_v_blocks_card_link_cards_needs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_link_cards_needs_parent_id_idx" ON "_pages_v_blocks_card_link_cards_needs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_link_cards_order_idx" ON "_pages_v_blocks_card_link_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_link_cards_parent_id_idx" ON "_pages_v_blocks_card_link_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_link_cards_image_idx" ON "_pages_v_blocks_card_link_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_card_link_order_idx" ON "_pages_v_blocks_card_link" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_link_parent_id_idx" ON "_pages_v_blocks_card_link" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_link_path_idx" ON "_pages_v_blocks_card_link" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_events_cta_order_idx" ON "_pages_v_blocks_events_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_events_cta_parent_id_idx" ON "_pages_v_blocks_events_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_events_order_idx" ON "_pages_v_blocks_events" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_events_parent_id_idx" ON "_pages_v_blocks_events" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_events_path_idx" ON "_pages_v_blocks_events" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_events_image_idx" ON "_pages_v_blocks_events" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_contact_contact_info_details_order_idx" ON "_pages_v_blocks_contact_contact_info_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_contact_info_details_parent_id_idx" ON "_pages_v_blocks_contact_contact_info_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_contact_info_order_idx" ON "_pages_v_blocks_contact_contact_info" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_contact_info_parent_id_idx" ON "_pages_v_blocks_contact_contact_info" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_order_idx" ON "_pages_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_parent_id_idx" ON "_pages_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_path_idx" ON "_pages_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_part_cats_block_v_partners_order_idx" ON "_part_cats_block_v_partners" USING btree ("_order");
  CREATE INDEX "_part_cats_block_v_partners_parent_id_idx" ON "_part_cats_block_v_partners" USING btree ("_parent_id");
  CREATE INDEX "_part_cats_block_v_order_idx" ON "_part_cats_block_v" USING btree ("_order");
  CREATE INDEX "_part_cats_block_v_parent_id_idx" ON "_part_cats_block_v" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_partner_cards_order_idx" ON "_pages_v_blocks_partner_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_partner_cards_parent_id_idx" ON "_pages_v_blocks_partner_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_partner_cards_path_idx" ON "_pages_v_blocks_partner_cards" USING btree ("_path");
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_media2_id_media_id_fk" FOREIGN KEY ("hero_media2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media2_id_media_id_fk" FOREIGN KEY ("version_hero_media2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_hero_hero_media2_idx" ON "pages" USING btree ("hero_media2_id");
  CREATE INDEX "_pages_v_version_hero_version_hero_media2_idx" ON "_pages_v" USING btree ("version_hero_media2_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cta_detailed_content_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_cards_cards_bulletins" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_news_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_card_link_cards_needs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_card_link_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_card_link" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_events_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_contact_info_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_contact_info" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "part_cats_block_partners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "part_cats_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_partner_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_detailed_content_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_cards_cards_bulletins" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_news_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_card_link_cards_needs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_card_link_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_card_link" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_events_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_contact_info_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_contact_info" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_part_cats_block_v_partners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_part_cats_block_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_partner_cards" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_cta_detailed_content_benefits" CASCADE;
  DROP TABLE "pages_blocks_feature_cards_cards_bulletins" CASCADE;
  DROP TABLE "pages_blocks_news_grid" CASCADE;
  DROP TABLE "pages_blocks_faq_faqs" CASCADE;
  DROP TABLE "pages_blocks_faq_cta" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_card_link_cards_needs" CASCADE;
  DROP TABLE "pages_blocks_card_link_cards" CASCADE;
  DROP TABLE "pages_blocks_card_link" CASCADE;
  DROP TABLE "pages_blocks_events_cta" CASCADE;
  DROP TABLE "pages_blocks_events" CASCADE;
  DROP TABLE "pages_blocks_contact_contact_info_details" CASCADE;
  DROP TABLE "pages_blocks_contact_contact_info" CASCADE;
  DROP TABLE "pages_blocks_contact" CASCADE;
  DROP TABLE "part_cats_block_partners" CASCADE;
  DROP TABLE "part_cats_block" CASCADE;
  DROP TABLE "pages_blocks_partner_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_detailed_content_benefits" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_cards_cards_bulletins" CASCADE;
  DROP TABLE "_pages_v_blocks_news_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_faqs" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_card_link_cards_needs" CASCADE;
  DROP TABLE "_pages_v_blocks_card_link_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_card_link" CASCADE;
  DROP TABLE "_pages_v_blocks_events_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_events" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_contact_info_details" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_contact_info" CASCADE;
  DROP TABLE "_pages_v_blocks_contact" CASCADE;
  DROP TABLE "_part_cats_block_v_partners" CASCADE;
  DROP TABLE "_part_cats_block_v" CASCADE;
  DROP TABLE "_pages_v_blocks_partner_cards" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_hero_media2_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_hero_media2_id_media_id_fk";
  
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::text;
  DROP TYPE "public"."enum_pages_hero_type";
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::"public"."enum_pages_hero_type";
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DATA TYPE "public"."enum_pages_hero_type" USING "hero_type"::"public"."enum_pages_hero_type";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE text;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::text;
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::"public"."enum__pages_v_version_hero_type";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE "public"."enum__pages_v_version_hero_type" USING "version_hero_type"::"public"."enum__pages_v_version_hero_type";
  DROP INDEX "pages_hero_hero_media2_idx";
  DROP INDEX "_pages_v_version_hero_version_hero_media2_idx";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "layout";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "detailed_content_benefits_title";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "detailed_content_benefits_description";
  ALTER TABLE "pages_blocks_feature_cards_cards" DROP COLUMN "badge";
  ALTER TABLE "pages_blocks_feature_cards_cards" DROP COLUMN "enable_link";
  ALTER TABLE "pages_blocks_feature_cards_cards" DROP COLUMN "link_type";
  ALTER TABLE "pages_blocks_feature_cards_cards" DROP COLUMN "link_new_tab";
  ALTER TABLE "pages_blocks_feature_cards_cards" DROP COLUMN "link_url";
  ALTER TABLE "pages_blocks_feature_cards_cards" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_feature_cards_cards" DROP COLUMN "link_appearance";
  ALTER TABLE "pages" DROP COLUMN "template";
  ALTER TABLE "pages" DROP COLUMN "hero_media2_id";
  ALTER TABLE "pages" DROP COLUMN "personal_lines_hero_headline_top";
  ALTER TABLE "pages" DROP COLUMN "personal_lines_hero_headline_bottom";
  ALTER TABLE "pages" DROP COLUMN "personal_lines_hero_description";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "layout";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "detailed_content_benefits_title";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "detailed_content_benefits_description";
  ALTER TABLE "_pages_v_blocks_feature_cards_cards" DROP COLUMN "badge";
  ALTER TABLE "_pages_v_blocks_feature_cards_cards" DROP COLUMN "enable_link";
  ALTER TABLE "_pages_v_blocks_feature_cards_cards" DROP COLUMN "link_type";
  ALTER TABLE "_pages_v_blocks_feature_cards_cards" DROP COLUMN "link_new_tab";
  ALTER TABLE "_pages_v_blocks_feature_cards_cards" DROP COLUMN "link_url";
  ALTER TABLE "_pages_v_blocks_feature_cards_cards" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_feature_cards_cards" DROP COLUMN "link_appearance";
  ALTER TABLE "_pages_v" DROP COLUMN "version_template";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media2_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_personal_lines_hero_headline_top";
  ALTER TABLE "_pages_v" DROP COLUMN "version_personal_lines_hero_headline_bottom";
  ALTER TABLE "_pages_v" DROP COLUMN "version_personal_lines_hero_description";
  DROP TYPE "public"."enum_pages_blocks_cta_layout";
  DROP TYPE "public"."enum_pages_blocks_feature_cards_cards_link_type";
  DROP TYPE "public"."enum_pages_blocks_feature_cards_cards_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_faq_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_faq_cta_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_card_link_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_card_link_cards_link_type";
  DROP TYPE "public"."enum_pages_blocks_card_link_cards_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_events_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_events_type";
  DROP TYPE "public"."enum_pages_blocks_contact_contact_info_icon";
  DROP TYPE "public"."part_cat_icon";
  DROP TYPE "public"."enum_pages_template";
  DROP TYPE "public"."enum__pages_v_blocks_cta_layout";
  DROP TYPE "public"."enum__pages_v_blocks_feature_cards_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_feature_cards_cards_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_faq_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_faq_cta_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_card_link_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_card_link_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_card_link_cards_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_events_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_events_type";
  DROP TYPE "public"."enum__pages_v_blocks_contact_contact_info_icon";
  DROP TYPE "public"."enum__pages_v_version_template";`)
}
