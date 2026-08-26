import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "menu_experiencia" varchar DEFAULT 'Experiência';
  ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "menu_eventos" varchar DEFAULT 'Eventos';
  ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "menu_como_funciona" varchar DEFAULT 'Como funciona';
  ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "menu_formatos" varchar DEFAULT 'Formatos';
  ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "menu_artista" varchar DEFAULT 'João Vitor';
  ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "menu_agenda" varchar DEFAULT 'Agenda';
  ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "menu_contato" varchar DEFAULT 'Contato';`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "settings" DROP COLUMN IF EXISTS "menu_experiencia";
  ALTER TABLE "settings" DROP COLUMN IF EXISTS "menu_eventos";
  ALTER TABLE "settings" DROP COLUMN IF EXISTS "menu_como_funciona";
  ALTER TABLE "settings" DROP COLUMN IF EXISTS "menu_formatos";
  ALTER TABLE "settings" DROP COLUMN IF EXISTS "menu_artista";
  ALTER TABLE "settings" DROP COLUMN IF EXISTS "menu_agenda";
  ALTER TABLE "settings" DROP COLUMN IF EXISTS "menu_contato";`)
}
