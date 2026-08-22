import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ALTER COLUMN "landing_page_business_card_title" DROP DEFAULT;
  ALTER TABLE "pages" ALTER COLUMN "landing_page_business_card_subtitle" DROP DEFAULT;
  ALTER TABLE "pages" ALTER COLUMN "landing_page_business_card_phone" DROP DEFAULT;
  ALTER TABLE "pages" ALTER COLUMN "landing_page_business_card_email" DROP DEFAULT;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_landing_page_business_card_title" DROP DEFAULT;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_landing_page_business_card_subtitle" DROP DEFAULT;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_landing_page_business_card_phone" DROP DEFAULT;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_landing_page_business_card_email" DROP DEFAULT;
  ALTER TABLE "pages" ADD COLUMN "landing_page_business_card_name" varchar;
  ALTER TABLE "pages" ADD COLUMN "landing_page_business_card_role" varchar;
  ALTER TABLE "pages" ADD COLUMN "landing_page_business_card_tagline" varchar;
  ALTER TABLE "pages" ADD COLUMN "landing_page_business_card_license" varchar;
  ALTER TABLE "pages" ADD COLUMN "landing_page_business_card_share_btn_text" varchar;
  ALTER TABLE "pages" ADD COLUMN "landing_page_business_card_download_btn_text" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_landing_page_business_card_name" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_landing_page_business_card_role" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_landing_page_business_card_tagline" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_landing_page_business_card_license" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_landing_page_business_card_share_btn_text" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_landing_page_business_card_download_btn_text" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ALTER COLUMN "landing_page_business_card_title" SET DEFAULT 'Цифрова візитка брокера';
  ALTER TABLE "pages" ALTER COLUMN "landing_page_business_card_subtitle" SET DEFAULT 'Олег Бабінський — Ліцензований страховий брокер в Онтаріо';
  ALTER TABLE "pages" ALTER COLUMN "landing_page_business_card_phone" SET DEFAULT '+1 (416) 555-0199';
  ALTER TABLE "pages" ALTER COLUMN "landing_page_business_card_email" SET DEFAULT 'oleh@example.com';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_landing_page_business_card_title" SET DEFAULT 'Цифрова візитка брокера';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_landing_page_business_card_subtitle" SET DEFAULT 'Олег Бабінський — Ліцензований страховий брокер в Онтаріо';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_landing_page_business_card_phone" SET DEFAULT '+1 (416) 555-0199';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_landing_page_business_card_email" SET DEFAULT 'oleh@example.com';
  ALTER TABLE "pages" DROP COLUMN "landing_page_business_card_name";
  ALTER TABLE "pages" DROP COLUMN "landing_page_business_card_role";
  ALTER TABLE "pages" DROP COLUMN "landing_page_business_card_tagline";
  ALTER TABLE "pages" DROP COLUMN "landing_page_business_card_license";
  ALTER TABLE "pages" DROP COLUMN "landing_page_business_card_share_btn_text";
  ALTER TABLE "pages" DROP COLUMN "landing_page_business_card_download_btn_text";
  ALTER TABLE "_pages_v" DROP COLUMN "version_landing_page_business_card_name";
  ALTER TABLE "_pages_v" DROP COLUMN "version_landing_page_business_card_role";
  ALTER TABLE "_pages_v" DROP COLUMN "version_landing_page_business_card_tagline";
  ALTER TABLE "_pages_v" DROP COLUMN "version_landing_page_business_card_license";
  ALTER TABLE "_pages_v" DROP COLUMN "version_landing_page_business_card_share_btn_text";
  ALTER TABLE "_pages_v" DROP COLUMN "version_landing_page_business_card_download_btn_text";`)
}
