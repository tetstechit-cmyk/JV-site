import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "artista_video_youtube" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "artista_canal_youtube" varchar;
  ALTER TABLE "_home_v" ADD COLUMN IF NOT EXISTS "version_artista_video_youtube" varchar;
  ALTER TABLE "_home_v" ADD COLUMN IF NOT EXISTS "version_artista_canal_youtube" varchar;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home" DROP COLUMN IF EXISTS "artista_video_youtube";
  ALTER TABLE "home" DROP COLUMN IF EXISTS "artista_canal_youtube";
  ALTER TABLE "_home_v" DROP COLUMN IF EXISTS "version_artista_video_youtube";
  ALTER TABLE "_home_v" DROP COLUMN IF EXISTS "version_artista_canal_youtube";`)
}
