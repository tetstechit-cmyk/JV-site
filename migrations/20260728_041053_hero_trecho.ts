import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home" ADD COLUMN "hero_video_inicio" numeric;
  ALTER TABLE "home" ADD COLUMN "hero_video_fim" numeric;
  ALTER TABLE "_home_v" ADD COLUMN "version_hero_video_inicio" numeric;
  ALTER TABLE "_home_v" ADD COLUMN "version_hero_video_fim" numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home" DROP COLUMN "hero_video_inicio";
  ALTER TABLE "home" DROP COLUMN "hero_video_fim";
  ALTER TABLE "_home_v" DROP COLUMN "version_hero_video_inicio";
  ALTER TABLE "_home_v" DROP COLUMN "version_hero_video_fim";`)
}
