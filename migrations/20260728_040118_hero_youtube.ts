import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home" ADD COLUMN "hero_video_youtube" varchar;
  ALTER TABLE "_home_v" ADD COLUMN "version_hero_video_youtube" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home" DROP COLUMN "hero_video_youtube";
  ALTER TABLE "_home_v" DROP COLUMN "version_hero_video_youtube";`)
}
