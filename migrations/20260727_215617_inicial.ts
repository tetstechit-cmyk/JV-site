import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_leads_status" AS ENUM('novo', 'conversando', 'fechado', 'perdido');
  CREATE TYPE "public"."enum_home_spotify_tipo" AS ENUM('artist', 'playlist', 'album');
  CREATE TYPE "public"."enum_home_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_version_spotify_tipo" AS ENUM('artist', 'playlist', 'album');
  CREATE TYPE "public"."enum__home_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "momentos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"imagem_id" integer NOT NULL,
  	"legenda" varchar,
  	"destaque" boolean DEFAULT false,
  	"ordem" numeric DEFAULT 0,
  	"publicado" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "publicos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"frase" varchar,
  	"descricao" varchar NOT NULL,
  	"imagem_id" integer,
  	"ordem" numeric DEFAULT 0,
  	"publicado" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "etapas" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"descricao" varchar NOT NULL,
  	"ordem" numeric DEFAULT 0,
  	"publicado" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "formatos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"descricao" varchar NOT NULL,
  	"melhor_para" varchar,
  	"ordem" numeric DEFAULT 0,
  	"publicado" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "numeros" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"valor" varchar NOT NULL,
  	"rotulo" varchar NOT NULL,
  	"ordem" numeric DEFAULT 0,
  	"publicado" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "empresas" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nome" varchar NOT NULL,
  	"logo_id" integer,
  	"ordem" numeric DEFAULT 0,
  	"publicado" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "depoimentos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"autor" varchar NOT NULL,
  	"cargo" varchar,
  	"citacao" varchar NOT NULL,
  	"ordem" numeric DEFAULT 0,
  	"publicado" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "frases" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL,
  	"ordem" numeric DEFAULT 0,
  	"publicado" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "shows" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"data" timestamp(3) with time zone NOT NULL,
  	"local" varchar NOT NULL,
  	"cidade" varchar NOT NULL,
  	"uf" varchar NOT NULL,
  	"descricao" varchar,
  	"link_ingressos" varchar,
  	"cancelado" boolean DEFAULT false,
  	"publicado" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nome" varchar NOT NULL,
  	"telefone" varchar,
  	"email" varchar,
  	"tipo_evento" varchar,
  	"pessoas" varchar,
  	"atmosfera" varchar,
  	"mensagem" varchar,
  	"status" "enum_leads_status" DEFAULT 'novo',
  	"anotacoes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"creditos" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumb_url" varchar,
  	"sizes_thumb_width" numeric,
  	"sizes_thumb_height" numeric,
  	"sizes_thumb_mime_type" varchar,
  	"sizes_thumb_filesize" numeric,
  	"sizes_thumb_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nome" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"momentos_id" integer,
  	"publicos_id" integer,
  	"etapas_id" integer,
  	"formatos_id" integer,
  	"numeros_id" integer,
  	"empresas_id" integer,
  	"depoimentos_id" integer,
  	"frases_id" integer,
  	"shows_id" integer,
  	"leads_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_manifesto_paragrafos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar
  );
  
  CREATE TABLE "home_kit_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar
  );
  
  CREATE TABLE "home_contato_perguntas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pergunta" varchar,
  	"dica" varchar
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Experiências Musicais',
  	"hero_linha1" varchar DEFAULT 'Música não preenche espaços.',
  	"hero_linha2" varchar DEFAULT 'Ela transforma momentos em memória.',
  	"hero_subtitulo" varchar DEFAULT 'Experiências musicais sertanejas para eventos corporativos, casamentos e celebrações memoráveis.',
  	"hero_video_id" integer,
  	"hero_imagem_id" integer,
  	"hero_cta1" varchar DEFAULT 'Criar a experiência do meu evento',
  	"hero_cta2" varchar DEFAULT 'Ver momentos',
  	"manifesto_eyebrow" varchar DEFAULT 'No que acreditamos',
  	"manifesto_fecho1" varchar DEFAULT 'Porque música não preenche espaços.',
  	"manifesto_fecho2" varchar DEFAULT 'Ela transforma momentos em memória.',
  	"momentos_eyebrow" varchar DEFAULT 'A experiência',
  	"momentos_titulo" varchar DEFAULT 'Momentos que permanecem',
  	"momentos_lead" varchar,
  	"publicos_eyebrow" varchar DEFAULT 'Segmentos',
  	"publicos_titulo" varchar DEFAULT 'Para quem criamos experiências',
  	"publicos_lead" varchar,
  	"processo_eyebrow" varchar DEFAULT 'Nosso processo',
  	"processo_titulo" varchar DEFAULT 'Como cada evento acontece',
  	"processo_lead" varchar,
  	"formatos_eyebrow" varchar DEFAULT 'Possibilidades',
  	"formatos_titulo" varchar DEFAULT 'Nossos formatos',
  	"formatos_lead" varchar,
  	"prova_eyebrow" varchar DEFAULT 'Confiança',
  	"prova_titulo" varchar DEFAULT 'Quem já viveu essa experiência',
  	"empresas_titulo" varchar DEFAULT 'Empresas que já confiaram no nosso trabalho',
  	"agenda_eyebrow" varchar DEFAULT 'Onde nos ver',
  	"agenda_titulo" varchar DEFAULT 'Próximas apresentações',
  	"artista_eyebrow" varchar DEFAULT 'Quem conduz a experiência',
  	"artista_nome" varchar DEFAULT 'João Vitor',
  	"artista_headline" varchar,
  	"artista_bio" varchar,
  	"artista_foto_id" integer,
  	"spotify_tipo" "enum_home_spotify_tipo" DEFAULT 'artist',
  	"spotify_id" varchar,
  	"kit_eyebrow" varchar DEFAULT 'Para produtores e RH',
  	"kit_titulo" varchar DEFAULT 'Kit de Imprensa',
  	"kit_lead" varchar,
  	"kit_cta" varchar DEFAULT 'Solicitar kit completo',
  	"contato_eyebrow" varchar DEFAULT 'Vamos conversar',
  	"contato_titulo" varchar DEFAULT 'Vamos criar a experiência ideal para o seu evento?',
  	"contato_lead" varchar DEFAULT 'Vamos construir juntos a experiência musical ideal para esse momento.',
  	"contato_botao" varchar DEFAULT 'Começar a conversa',
  	"contato_nota" varchar DEFAULT 'Resposta rápida via WhatsApp.',
  	"_status" "enum_home_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_home_v_version_manifesto_paragrafos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_kit_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_contato_perguntas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"pergunta" varchar,
  	"dica" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar DEFAULT 'Experiências Musicais',
  	"version_hero_linha1" varchar DEFAULT 'Música não preenche espaços.',
  	"version_hero_linha2" varchar DEFAULT 'Ela transforma momentos em memória.',
  	"version_hero_subtitulo" varchar DEFAULT 'Experiências musicais sertanejas para eventos corporativos, casamentos e celebrações memoráveis.',
  	"version_hero_video_id" integer,
  	"version_hero_imagem_id" integer,
  	"version_hero_cta1" varchar DEFAULT 'Criar a experiência do meu evento',
  	"version_hero_cta2" varchar DEFAULT 'Ver momentos',
  	"version_manifesto_eyebrow" varchar DEFAULT 'No que acreditamos',
  	"version_manifesto_fecho1" varchar DEFAULT 'Porque música não preenche espaços.',
  	"version_manifesto_fecho2" varchar DEFAULT 'Ela transforma momentos em memória.',
  	"version_momentos_eyebrow" varchar DEFAULT 'A experiência',
  	"version_momentos_titulo" varchar DEFAULT 'Momentos que permanecem',
  	"version_momentos_lead" varchar,
  	"version_publicos_eyebrow" varchar DEFAULT 'Segmentos',
  	"version_publicos_titulo" varchar DEFAULT 'Para quem criamos experiências',
  	"version_publicos_lead" varchar,
  	"version_processo_eyebrow" varchar DEFAULT 'Nosso processo',
  	"version_processo_titulo" varchar DEFAULT 'Como cada evento acontece',
  	"version_processo_lead" varchar,
  	"version_formatos_eyebrow" varchar DEFAULT 'Possibilidades',
  	"version_formatos_titulo" varchar DEFAULT 'Nossos formatos',
  	"version_formatos_lead" varchar,
  	"version_prova_eyebrow" varchar DEFAULT 'Confiança',
  	"version_prova_titulo" varchar DEFAULT 'Quem já viveu essa experiência',
  	"version_empresas_titulo" varchar DEFAULT 'Empresas que já confiaram no nosso trabalho',
  	"version_agenda_eyebrow" varchar DEFAULT 'Onde nos ver',
  	"version_agenda_titulo" varchar DEFAULT 'Próximas apresentações',
  	"version_artista_eyebrow" varchar DEFAULT 'Quem conduz a experiência',
  	"version_artista_nome" varchar DEFAULT 'João Vitor',
  	"version_artista_headline" varchar,
  	"version_artista_bio" varchar,
  	"version_artista_foto_id" integer,
  	"version_spotify_tipo" "enum__home_v_version_spotify_tipo" DEFAULT 'artist',
  	"version_spotify_id" varchar,
  	"version_kit_eyebrow" varchar DEFAULT 'Para produtores e RH',
  	"version_kit_titulo" varchar DEFAULT 'Kit de Imprensa',
  	"version_kit_lead" varchar,
  	"version_kit_cta" varchar DEFAULT 'Solicitar kit completo',
  	"version_contato_eyebrow" varchar DEFAULT 'Vamos conversar',
  	"version_contato_titulo" varchar DEFAULT 'Vamos criar a experiência ideal para o seu evento?',
  	"version_contato_lead" varchar DEFAULT 'Vamos construir juntos a experiência musical ideal para esse momento.',
  	"version_contato_botao" varchar DEFAULT 'Começar a conversa',
  	"version_contato_nota" varchar DEFAULT 'Resposta rápida via WhatsApp.',
  	"version__status" "enum__home_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"whatsapp" varchar DEFAULT '5511986894866' NOT NULL,
  	"whatsapp_exibicao" varchar DEFAULT '(11) 98689-4866',
  	"cidade" varchar DEFAULT 'São Paulo · SP',
  	"instagram" varchar,
  	"youtube" varchar,
  	"facebook" varchar,
  	"spotify" varchar,
  	"seo_titulo" varchar,
  	"seo_descricao" varchar,
  	"og_imagem_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "momentos" ADD CONSTRAINT "momentos_imagem_id_media_id_fk" FOREIGN KEY ("imagem_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publicos" ADD CONSTRAINT "publicos_imagem_id_media_id_fk" FOREIGN KEY ("imagem_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "empresas" ADD CONSTRAINT "empresas_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_momentos_fk" FOREIGN KEY ("momentos_id") REFERENCES "public"."momentos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_publicos_fk" FOREIGN KEY ("publicos_id") REFERENCES "public"."publicos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_etapas_fk" FOREIGN KEY ("etapas_id") REFERENCES "public"."etapas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_formatos_fk" FOREIGN KEY ("formatos_id") REFERENCES "public"."formatos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_numeros_fk" FOREIGN KEY ("numeros_id") REFERENCES "public"."numeros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_empresas_fk" FOREIGN KEY ("empresas_id") REFERENCES "public"."empresas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_depoimentos_fk" FOREIGN KEY ("depoimentos_id") REFERENCES "public"."depoimentos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_frases_fk" FOREIGN KEY ("frases_id") REFERENCES "public"."frases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_shows_fk" FOREIGN KEY ("shows_id") REFERENCES "public"."shows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_manifesto_paragrafos" ADD CONSTRAINT "home_manifesto_paragrafos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_kit_itens" ADD CONSTRAINT "home_kit_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_contato_perguntas" ADD CONSTRAINT "home_contato_perguntas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_video_id_media_id_fk" FOREIGN KEY ("hero_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_imagem_id_media_id_fk" FOREIGN KEY ("hero_imagem_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_artista_foto_id_media_id_fk" FOREIGN KEY ("artista_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_manifesto_paragrafos" ADD CONSTRAINT "_home_v_version_manifesto_paragrafos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_kit_itens" ADD CONSTRAINT "_home_v_version_kit_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_contato_perguntas" ADD CONSTRAINT "_home_v_version_contato_perguntas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_hero_video_id_media_id_fk" FOREIGN KEY ("version_hero_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_hero_imagem_id_media_id_fk" FOREIGN KEY ("version_hero_imagem_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_artista_foto_id_media_id_fk" FOREIGN KEY ("version_artista_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_og_imagem_id_media_id_fk" FOREIGN KEY ("og_imagem_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "momentos_imagem_idx" ON "momentos" USING btree ("imagem_id");
  CREATE INDEX "momentos_updated_at_idx" ON "momentos" USING btree ("updated_at");
  CREATE INDEX "momentos_created_at_idx" ON "momentos" USING btree ("created_at");
  CREATE INDEX "publicos_imagem_idx" ON "publicos" USING btree ("imagem_id");
  CREATE INDEX "publicos_updated_at_idx" ON "publicos" USING btree ("updated_at");
  CREATE INDEX "publicos_created_at_idx" ON "publicos" USING btree ("created_at");
  CREATE INDEX "etapas_updated_at_idx" ON "etapas" USING btree ("updated_at");
  CREATE INDEX "etapas_created_at_idx" ON "etapas" USING btree ("created_at");
  CREATE INDEX "formatos_updated_at_idx" ON "formatos" USING btree ("updated_at");
  CREATE INDEX "formatos_created_at_idx" ON "formatos" USING btree ("created_at");
  CREATE INDEX "numeros_updated_at_idx" ON "numeros" USING btree ("updated_at");
  CREATE INDEX "numeros_created_at_idx" ON "numeros" USING btree ("created_at");
  CREATE INDEX "empresas_logo_idx" ON "empresas" USING btree ("logo_id");
  CREATE INDEX "empresas_updated_at_idx" ON "empresas" USING btree ("updated_at");
  CREATE INDEX "empresas_created_at_idx" ON "empresas" USING btree ("created_at");
  CREATE INDEX "depoimentos_updated_at_idx" ON "depoimentos" USING btree ("updated_at");
  CREATE INDEX "depoimentos_created_at_idx" ON "depoimentos" USING btree ("created_at");
  CREATE INDEX "frases_updated_at_idx" ON "frases" USING btree ("updated_at");
  CREATE INDEX "frases_created_at_idx" ON "frases" USING btree ("created_at");
  CREATE INDEX "shows_updated_at_idx" ON "shows" USING btree ("updated_at");
  CREATE INDEX "shows_created_at_idx" ON "shows" USING btree ("created_at");
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumb_sizes_thumb_filename_idx" ON "media" USING btree ("sizes_thumb_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_momentos_id_idx" ON "payload_locked_documents_rels" USING btree ("momentos_id");
  CREATE INDEX "payload_locked_documents_rels_publicos_id_idx" ON "payload_locked_documents_rels" USING btree ("publicos_id");
  CREATE INDEX "payload_locked_documents_rels_etapas_id_idx" ON "payload_locked_documents_rels" USING btree ("etapas_id");
  CREATE INDEX "payload_locked_documents_rels_formatos_id_idx" ON "payload_locked_documents_rels" USING btree ("formatos_id");
  CREATE INDEX "payload_locked_documents_rels_numeros_id_idx" ON "payload_locked_documents_rels" USING btree ("numeros_id");
  CREATE INDEX "payload_locked_documents_rels_empresas_id_idx" ON "payload_locked_documents_rels" USING btree ("empresas_id");
  CREATE INDEX "payload_locked_documents_rels_depoimentos_id_idx" ON "payload_locked_documents_rels" USING btree ("depoimentos_id");
  CREATE INDEX "payload_locked_documents_rels_frases_id_idx" ON "payload_locked_documents_rels" USING btree ("frases_id");
  CREATE INDEX "payload_locked_documents_rels_shows_id_idx" ON "payload_locked_documents_rels" USING btree ("shows_id");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_manifesto_paragrafos_order_idx" ON "home_manifesto_paragrafos" USING btree ("_order");
  CREATE INDEX "home_manifesto_paragrafos_parent_id_idx" ON "home_manifesto_paragrafos" USING btree ("_parent_id");
  CREATE INDEX "home_kit_itens_order_idx" ON "home_kit_itens" USING btree ("_order");
  CREATE INDEX "home_kit_itens_parent_id_idx" ON "home_kit_itens" USING btree ("_parent_id");
  CREATE INDEX "home_contato_perguntas_order_idx" ON "home_contato_perguntas" USING btree ("_order");
  CREATE INDEX "home_contato_perguntas_parent_id_idx" ON "home_contato_perguntas" USING btree ("_parent_id");
  CREATE INDEX "home_hero_video_idx" ON "home" USING btree ("hero_video_id");
  CREATE INDEX "home_hero_imagem_idx" ON "home" USING btree ("hero_imagem_id");
  CREATE INDEX "home_artista_foto_idx" ON "home" USING btree ("artista_foto_id");
  CREATE INDEX "home__status_idx" ON "home" USING btree ("_status");
  CREATE INDEX "_home_v_version_manifesto_paragrafos_order_idx" ON "_home_v_version_manifesto_paragrafos" USING btree ("_order");
  CREATE INDEX "_home_v_version_manifesto_paragrafos_parent_id_idx" ON "_home_v_version_manifesto_paragrafos" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_kit_itens_order_idx" ON "_home_v_version_kit_itens" USING btree ("_order");
  CREATE INDEX "_home_v_version_kit_itens_parent_id_idx" ON "_home_v_version_kit_itens" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_contato_perguntas_order_idx" ON "_home_v_version_contato_perguntas" USING btree ("_order");
  CREATE INDEX "_home_v_version_contato_perguntas_parent_id_idx" ON "_home_v_version_contato_perguntas" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_version_hero_video_idx" ON "_home_v" USING btree ("version_hero_video_id");
  CREATE INDEX "_home_v_version_version_hero_imagem_idx" ON "_home_v" USING btree ("version_hero_imagem_id");
  CREATE INDEX "_home_v_version_version_artista_foto_idx" ON "_home_v" USING btree ("version_artista_foto_id");
  CREATE INDEX "_home_v_version_version__status_idx" ON "_home_v" USING btree ("version__status");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE INDEX "_home_v_latest_idx" ON "_home_v" USING btree ("latest");
  CREATE INDEX "settings_og_imagem_idx" ON "settings" USING btree ("og_imagem_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "momentos" CASCADE;
  DROP TABLE "publicos" CASCADE;
  DROP TABLE "etapas" CASCADE;
  DROP TABLE "formatos" CASCADE;
  DROP TABLE "numeros" CASCADE;
  DROP TABLE "empresas" CASCADE;
  DROP TABLE "depoimentos" CASCADE;
  DROP TABLE "frases" CASCADE;
  DROP TABLE "shows" CASCADE;
  DROP TABLE "leads" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_manifesto_paragrafos" CASCADE;
  DROP TABLE "home_kit_itens" CASCADE;
  DROP TABLE "home_contato_perguntas" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "_home_v_version_manifesto_paragrafos" CASCADE;
  DROP TABLE "_home_v_version_kit_itens" CASCADE;
  DROP TABLE "_home_v_version_contato_perguntas" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TABLE "settings" CASCADE;
  DROP TYPE "public"."enum_leads_status";
  DROP TYPE "public"."enum_home_spotify_tipo";
  DROP TYPE "public"."enum_home_status";
  DROP TYPE "public"."enum__home_v_version_spotify_tipo";
  DROP TYPE "public"."enum__home_v_version_status";`)
}
