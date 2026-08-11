import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { pt } from "@payloadcms/translations/languages/pt";
import { cloudStoragePlugin } from "@payloadcms/plugin-cloud-storage";
import { cloudinaryAdapter } from "./payload/storage/cloudinary";
import { env } from "@/env";
import sharp from "sharp";

import { Media } from "./payload/collections/media";
import { Users } from "./payload/collections/users";
import { Leads } from "./payload/collections/leads";
import {
  Publicos,
  Etapas,
  Formatos,
  Momentos,
  Numeros,
  Empresas,
  Depoimentos,
  ProvaFotos,
  Frases,
  Shows,
} from "./payload/collections/conteudo";
import { Home } from "./payload/globals/home";
import { Settings } from "./payload/globals/settings";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "· Painel João Vitor",
    },
    // Identidade "Memória" no painel: preto fosco, champanhe, Cormorant.
    // Trava no escuro: a logo do artista é branca e a marca é dark.
    theme: "dark",

    /**
     * Pré-visualização: mostra o site (com o rascunho) dentro do painel.
     * A rota /api/preview exige sessão antes de ligar o modo rascunho.
     */
    livePreview: {
      // A rota /preview identifica o que está sendo editado para aplicar
      // a alteração na seção certa em tempo real.
      url: ({ collectionConfig, globalConfig, data }) => {
        const base = env.NEXT_PUBLIC_SITE_URL;
        const p = new URLSearchParams();
        if (globalConfig) {
          p.set("tipo", "global");
          p.set("slug", globalConfig.slug);
        } else if (collectionConfig) {
          p.set("tipo", "collection");
          p.set("slug", collectionConfig.slug);
          // O merge do live preview busca /api/{slug}/{id}. Sem o id, o
          // merge de coleção quebra e o preview não atualiza ao digitar.
          if (data?.id != null) p.set("id", String(data.id));
        }
        return `${base}/preview?${p.toString()}`;
      },
      globals: ["home", "settings"],
      collections: [
        "momentos",
        "publicos",
        "etapas",
        "formatos",
        "numeros",
        "empresas",
        "depoimentos",
        "provaFotos",
        "frases",
        "shows",
      ],
      breakpoints: [
        { name: "celular", label: "Celular", width: 390, height: 844 },
        { name: "tablet", label: "Tablet", width: 768, height: 1024 },
        { name: "desktop", label: "Computador", width: 1440, height: 900 },
      ],
    },
    // CSS da identidade é importado em src/app/(payload)/layout.tsx.
    // Base para resolver os componentes customizados (src/).
    importMap: { baseDir: path.resolve(dirname) },
    components: {
      graphics: {
        Logo: "/payload/admin/Logo.tsx#default",
        Icon: "/payload/admin/Icon.tsx#default",
      },
      // "Sair" e "Ver o site" explícitos no fim do menu — o logout nativo
      // do Payload fica escondido atrás de um ícone.
      afterNavLinks: ["/payload/admin/RodapeNav.tsx#default"],
      // Botão "ver senha" no login (o Payload não traz nativo).
      afterLogin: ["/payload/admin/VerSenha.tsx#default"],
    },
  },

  // Português no painel — o mantenedor não é técnico.
  i18n: { supportedLanguages: { pt }, fallbackLanguage: "pt" },

  collections: [
    // conteúdo das seções
    Momentos,
    Publicos,
    Etapas,
    Formatos,
    Numeros,
    Empresas,
    Depoimentos,
    ProvaFotos,
    Frases,
    // agenda
    Shows,
    // contatos recebidos
    Leads,
    // sistema
    Media,
    Users,
  ],

  globals: [Home, Settings],

  editor: lexicalEditor(),

  // Origem confiável: fecha a allowlist de CSRF (era vazia = aceitava
  // qualquer Origin) e de CORS. (SEC-005)
  serverURL: env.NEXT_PUBLIC_SITE_URL,
  cors: [env.NEXT_PUBLIC_SITE_URL],
  csrf: [env.NEXT_PUBLIC_SITE_URL],

  // Segredo de assinatura de sessão — validado (min 32) em src/env.ts.
  secret: env.PAYLOAD_SECRET,

  db: postgresAdapter({
    pool: {
      // Runtime usa o endpoint POOLED (serverless abre muitas conexões).
      // Migrations usam o endpoint DIRETO — o pooler do Neon não lida bem
      // com DDL em transação.
      connectionString:
        (process.env.PAYLOAD_MIGRATING === "true"
          ? process.env.DIRECT_URL
          : process.env.DATABASE_URL) || "",
    },
    migrationDir: path.resolve(dirname, "../migrations"),
  }),

  // Processamento de imagem no upload (redimensiona e normaliza).
  sharp,

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  // Sem GraphQL público: reduz superfície de ataque. REST interno basta.
  graphQL: { disable: true },

  plugins: [
    /**
     * Armazenamento das mídias na Cloudinary.
     *
     * Em produção serverless o disco é efêmero — sem storage externo, toda
     * foto que o João subir sumiria no próximo deploy.
     *
     * Só ativa quando as credenciais existem: em dev sem Cloudinary, o
     * Payload cai no disco local e o painel continua funcionando.
     */
    ...(process.env.CLOUDINARY_CLOUD_NAME
      ? [
          cloudStoragePlugin({
            collections: {
              media: {
                // URL aponta direto para o CDN da Cloudinary, sem passar
                // pelo nosso servidor (economiza função serverless).
                disablePayloadAccessControl: true,
                adapter: cloudinaryAdapter({
                  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
                  apiKey: process.env.CLOUDINARY_API_KEY || "",
                  apiSecret: process.env.CLOUDINARY_API_SECRET || "",
                }),
              },
            },
          }),
        ]
      : []),
  ],
});
