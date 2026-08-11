import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "prova_fotos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"imagem_id" integer NOT NULL,
  	"legenda" varchar,
  	"ordem" numeric DEFAULT 0,
  	"publicado" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "prova_fotos_id" integer;
  ALTER TABLE "prova_fotos" ADD CONSTRAINT "prova_fotos_imagem_id_media_id_fk" FOREIGN KEY ("imagem_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "prova_fotos_imagem_idx" ON "prova_fotos" USING btree ("imagem_id");
  CREATE INDEX "prova_fotos_updated_at_idx" ON "prova_fotos" USING btree ("updated_at");
  CREATE INDEX "prova_fotos_created_at_idx" ON "prova_fotos" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_prova_fotos_fk" FOREIGN KEY ("prova_fotos_id") REFERENCES "public"."prova_fotos"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_prova_fotos_id_idx" ON "payload_locked_documents_rels" USING btree ("prova_fotos_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "prova_fotos" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "prova_fotos" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_prova_fotos_fk";
  
  DROP INDEX "payload_locked_documents_rels_prova_fotos_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "prova_fotos_id";`)
}
