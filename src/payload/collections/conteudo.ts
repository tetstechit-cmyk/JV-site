import type { CollectionConfig } from "payload";
import { publicoPublicado, somenteAdmin } from "../access";
import { revalidarAoMudar, revalidarAoExcluir } from "../hooks/revalidar";

/**
 * Listas ordenáveis do site.
 *
 * Padrão: o João adiciona/edita/remove/reordena itens — mas não mexe na
 * estrutura da seção. Liberdade de conteúdo, zero liberdade de quebrar layout.
 */

const acessoConteudo = {
  // anônimo só lê publicado; admin lê tudo. (SEC-001)
  read: publicoPublicado,
  create: somenteAdmin,
  update: somenteAdmin,
  delete: somenteAdmin,
};

/** Campo de ordenação — menor número aparece primeiro. */
const campoOrdem = {
  name: "ordem",
  type: "number" as const,
  label: "Ordem de exibição",
  defaultValue: 0,
  admin: {
    description: "Menor número aparece primeiro.",
    position: "sidebar" as const,
  },
};

/** Publicado/rascunho — nasce como rascunho, publica de propósito. */
const campoPublicado = {
  name: "publicado",
  type: "checkbox" as const,
  label: "Publicado no site",
  defaultValue: false,
  admin: { position: "sidebar" as const },
};

const SECOES = "Conteúdo do site";
const PROVA = "Prova social";

/** 3. Para quem criamos experiências */
export const Publicos: CollectionConfig = {
  slug: "publicos",
  hooks: { afterChange: [revalidarAoMudar], afterDelete: [revalidarAoExcluir] },
  labels: { singular: "Segmento", plural: "2 · Para quem criamos" },
  access: acessoConteudo,
  admin: {
    useAsTitle: "titulo",
    defaultColumns: ["titulo", "ordem", "publicado"],
    group: SECOES,
  },
  defaultSort: "ordem",
  fields: [
    { name: "titulo", type: "text", label: "Título", required: true },
    {
      name: "frase",
      type: "text",
      label: "Frase de destaque",
      admin: { description: "Aparece em itálico dourado. Ex.: 'A trilha sonora do dia que não se repete.'" },
    },
    { name: "descricao", type: "textarea", label: "Descrição", required: true },
    {
      name: "imagem",
      type: "upload",
      relationTo: "media",
      label: "Imagem do segmento",
    },
    campoOrdem,
    campoPublicado,
  ],
};

/** 4. Como cada evento acontece */
export const Etapas: CollectionConfig = {
  slug: "etapas",
  hooks: { afterChange: [revalidarAoMudar], afterDelete: [revalidarAoExcluir] },
  labels: { singular: "Etapa", plural: "3 · Como acontece" },
  access: acessoConteudo,
  admin: {
    useAsTitle: "titulo",
    defaultColumns: ["titulo", "ordem", "publicado"],
    group: SECOES,
  },
  defaultSort: "ordem",
  fields: [
    { name: "titulo", type: "text", label: "Nome da etapa", required: true },
    { name: "descricao", type: "textarea", label: "Descrição", required: true },
    campoOrdem,
    campoPublicado,
  ],
};

/** 5. Nossos formatos */
export const Formatos: CollectionConfig = {
  slug: "formatos",
  hooks: { afterChange: [revalidarAoMudar], afterDelete: [revalidarAoExcluir] },
  labels: { singular: "Formato", plural: "4 · Formatos" },
  access: acessoConteudo,
  admin: {
    useAsTitle: "titulo",
    defaultColumns: ["titulo", "ordem", "publicado"],
    group: SECOES,
  },
  defaultSort: "ordem",
  fields: [
    { name: "titulo", type: "text", label: "Nome do formato", required: true },
    { name: "descricao", type: "textarea", label: "Descrição", required: true },
    {
      name: "melhorPara",
      type: "text",
      label: "Melhor para",
      admin: { description: "Ex.: 'Cerimônias, recepções e jantares'" },
    },
    campoOrdem,
    campoPublicado,
  ],
};

/** 2. Momentos que permanecem (galeria) */
export const Momentos: CollectionConfig = {
  slug: "momentos",
  hooks: { afterChange: [revalidarAoMudar], afterDelete: [revalidarAoExcluir] },
  labels: { singular: "Momento", plural: "1 · Momentos" },
  access: acessoConteudo,
  admin: {
    useAsTitle: "legenda",
    defaultColumns: ["legenda", "ordem", "publicado"],
    group: SECOES,
  },
  defaultSort: "ordem",
  fields: [
    {
      name: "imagem",
      type: "upload",
      relationTo: "media",
      label: "Foto ou vídeo",
      required: true,
    },
    { name: "legenda", type: "text", label: "Legenda (opcional)" },
    {
      name: "destaque",
      type: "checkbox",
      label: "Ocupar espaço maior no mosaico",
      defaultValue: false,
    },
    campoOrdem,
    campoPublicado,
  ],
};

/** 6a. Números (Quem já viveu) */
export const Numeros: CollectionConfig = {
  slug: "numeros",
  hooks: { afterChange: [revalidarAoMudar], afterDelete: [revalidarAoExcluir] },
  labels: { singular: "Número", plural: "1 · Números" },
  access: acessoConteudo,
  admin: {
    useAsTitle: "rotulo",
    defaultColumns: ["valor", "rotulo", "ordem", "publicado"],
    group: PROVA,
  },
  defaultSort: "ordem",
  fields: [
    {
      name: "valor",
      type: "text",
      label: "Número",
      required: true,
      admin: { description: "Ex.: '+300', '+50 mil', '8'" },
    },
    {
      name: "rotulo",
      type: "text",
      label: "Legenda",
      required: true,
      admin: { description: "Ex.: 'Eventos realizados'" },
    },
    campoOrdem,
    campoPublicado,
  ],
};

/** 6b. Empresas que já confiaram */
export const Empresas: CollectionConfig = {
  slug: "empresas",
  hooks: { afterChange: [revalidarAoMudar], afterDelete: [revalidarAoExcluir] },
  labels: { singular: "Empresa", plural: "2 · Empresas" },
  access: acessoConteudo,
  admin: {
    useAsTitle: "nome",
    defaultColumns: ["nome", "ordem", "publicado"],
    group: PROVA,
  },
  defaultSort: "ordem",
  fields: [
    { name: "nome", type: "text", label: "Nome da empresa", required: true },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      label: "Logo (opcional)",
      admin: { description: "Se não tiver logo, o nome aparece em texto." },
    },
    campoOrdem,
    campoPublicado,
  ],
};

/** 6c. Depoimentos */
export const Depoimentos: CollectionConfig = {
  slug: "depoimentos",
  hooks: { afterChange: [revalidarAoMudar], afterDelete: [revalidarAoExcluir] },
  labels: { singular: "Depoimento", plural: "3 · Depoimentos" },
  access: acessoConteudo,
  admin: {
    useAsTitle: "autor",
    defaultColumns: ["autor", "ordem", "publicado"],
    group: PROVA,
  },
  defaultSort: "ordem",
  fields: [
    { name: "autor", type: "text", label: "Quem falou", required: true },
    {
      name: "cargo",
      type: "text",
      label: "Cargo / empresa",
      admin: { description: "Ex.: 'RH · Assaí Atacadista'" },
    },
    { name: "citacao", type: "textarea", label: "Depoimento", required: true },
    campoOrdem,
    campoPublicado,
  ],
};

/** Frases de palco do João */
export const Frases: CollectionConfig = {
  slug: "frases",
  hooks: { afterChange: [revalidarAoMudar], afterDelete: [revalidarAoExcluir] },
  labels: { singular: "Frase de palco", plural: "5 · Frases de palco" },
  access: acessoConteudo,
  admin: {
    useAsTitle: "texto",
    defaultColumns: ["texto", "ordem", "publicado"],
    group: SECOES,
  },
  defaultSort: "ordem",
  fields: [
    { name: "texto", type: "text", label: "Frase", required: true },
    campoOrdem,
    campoPublicado,
  ],
};

/** Agenda de shows */
export const Shows: CollectionConfig = {
  slug: "shows",
  hooks: { afterChange: [revalidarAoMudar], afterDelete: [revalidarAoExcluir] },
  labels: { singular: "Show", plural: "Agenda de shows" },
  access: acessoConteudo,
  admin: {
    useAsTitle: "titulo",
    defaultColumns: ["titulo", "cidade", "data", "publicado"],
    group: "Agenda de shows",
  },
  defaultSort: "data",
  fields: [
    { name: "titulo", type: "text", label: "Nome do evento", required: true },
    {
      name: "data",
      type: "date",
      label: "Data e hora",
      required: true,
      admin: { date: { pickerAppearance: "dayAndTime" } },
    },
    { name: "local", type: "text", label: "Local", required: true },
    { name: "cidade", type: "text", label: "Cidade", required: true },
    {
      name: "uf",
      type: "text",
      label: "Estado (UF)",
      required: true,
      maxLength: 2,
    },
    { name: "descricao", type: "textarea", label: "Descrição (opcional)" },
    {
      name: "linkIngressos",
      type: "text",
      label: "Link de ingressos (opcional)",
      // href renderizado no site — exige https:// para não virar phishing. (SEC-010)
      validate: (v: unknown) =>
        !v || /^https:\/\//.test(String(v)) || "Use um endereço https://",
      admin: { description: "Deixe vazio para o botão levar ao WhatsApp." },
    },
    {
      name: "cancelado",
      type: "checkbox",
      label: "Cancelado",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    campoPublicado,
  ],
};
