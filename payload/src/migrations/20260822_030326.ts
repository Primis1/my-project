import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ADD COLUMN "landing_page_business_card_pdf_id" integer;
  ALTER TABLE "pages" ADD COLUMN "landing_page_business_card_title" varchar DEFAULT 'Цифрова візитка брокера';
  ALTER TABLE "pages" ADD COLUMN "landing_page_business_card_subtitle" varchar DEFAULT 'Олег Бабінський — Ліцензований страховий брокер в Онтаріо';
  ALTER TABLE "pages" ADD COLUMN "landing_page_business_card_phone" varchar DEFAULT '+1 (416) 555-0199';
  ALTER TABLE "pages" ADD COLUMN "landing_page_business_card_email" varchar DEFAULT 'oleh@example.com';
  ALTER TABLE "_pages_v" ADD COLUMN "version_landing_page_business_card_pdf_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_landing_page_business_card_title" varchar DEFAULT 'Цифрова візитка брокера';
  ALTER TABLE "_pages_v" ADD COLUMN "version_landing_page_business_card_subtitle" varchar DEFAULT 'Олег Бабінський — Ліцензований страховий брокер в Онтаріо';
  ALTER TABLE "_pages_v" ADD COLUMN "version_landing_page_business_card_phone" varchar DEFAULT '+1 (416) 555-0199';
  ALTER TABLE "_pages_v" ADD COLUMN "version_landing_page_business_card_email" varchar DEFAULT 'oleh@example.com';
  ALTER TABLE "pages" ADD CONSTRAINT "pages_landing_page_business_card_pdf_id_media_id_fk" FOREIGN KEY ("landing_page_business_card_pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_landing_page_business_card_pdf_id_media_id_fk" FOREIGN KEY ("version_landing_page_business_card_pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_landing_page_landing_page_business_card_pdf_idx" ON "pages" USING btree ("landing_page_business_card_pdf_id");
  CREATE INDEX "_pages_v_version_landing_page_version_landing_page_busin_idx" ON "_pages_v" USING btree ("version_landing_page_business_card_pdf_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP CONSTRAINT "pages_landing_page_business_card_pdf_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_landing_page_business_card_pdf_id_media_id_fk";
  
  DROP INDEX "pages_landing_page_landing_page_business_card_pdf_idx";
  DROP INDEX "_pages_v_version_landing_page_version_landing_page_busin_idx";
  ALTER TABLE "pages" DROP COLUMN "landing_page_business_card_pdf_id";
  ALTER TABLE "pages" DROP COLUMN "landing_page_business_card_title";
  ALTER TABLE "pages" DROP COLUMN "landing_page_business_card_subtitle";
  ALTER TABLE "pages" DROP COLUMN "landing_page_business_card_phone";
  ALTER TABLE "pages" DROP COLUMN "landing_page_business_card_email";
  ALTER TABLE "_pages_v" DROP COLUMN "version_landing_page_business_card_pdf_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_landing_page_business_card_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_landing_page_business_card_subtitle";
  ALTER TABLE "_pages_v" DROP COLUMN "version_landing_page_business_card_phone";
  ALTER TABLE "_pages_v" DROP COLUMN "version_landing_page_business_card_email";`)
}
