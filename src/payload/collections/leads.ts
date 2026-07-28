import type { CollectionConfig, FieldAccess } from "payload";
import { criarPublicoLerAdmin } from "../access";

/** Acesso a NÍVEL DE CAMPO (assinatura FieldAccess, diferente de Access). */
const soAdmin: FieldAccess = ({ req }) => Boolean(req.user);

/** Campos internos: nunca aceitos de um POST anônimo, só admin lê/grava. */
const soAdminNoCampo = { create: soAdmin, read: soAdmin, update: soAdmin };

/**
 * Leads — o ativo comercial do site.
 *
 * LGPD: contém dado pessoal. Leitura SÓ para admin autenticado.
 * O formulário público pode criar, nunca listar.
 */
export const Leads: CollectionConfig = {
  slug: "leads",
  labels: { singular: "Contato recebido", plural: "Mensagens" },
  access: criarPublicoLerAdmin,
  admin: {
    useAsTitle: "nome",
    defaultColumns: ["nome", "tipoEvento", "status", "createdAt"],
    group: "Contatos recebidos",
  },
  fields: [
    { name: "nome", type: "text", label: "Nome", required: true },
    { name: "telefone", type: "text", label: "Telefone" },
    { name: "email", type: "email", label: "E-mail" },
    {
      name: "tipoEvento",
      type: "text",
      label: "Qual experiência está planejando",
    },
    { name: "pessoas", type: "text", label: "Quantas pessoas" },
    { name: "atmosfera", type: "text", label: "Atmosfera imaginada" },
    { name: "mensagem", type: "textarea", label: "Sobre o evento" },
    {
      name: "status",
      type: "select",
      label: "Situação",
      defaultValue: "novo",
      // formulário público não pode gravar status. (SEC-007)
      access: soAdminNoCampo,
      options: [
        { label: "Novo", value: "novo" },
        { label: "Em conversa", value: "conversando" },
        { label: "Fechado", value: "fechado" },
        { label: "Não rolou", value: "perdido" },
      ],
    },
    {
      name: "anotacoes",
      type: "textarea",
      label: "Anotações internas",
      // caixa interna: anônimo não escreve nem lê. (SEC-007)
      access: soAdminNoCampo,
      admin: { description: "Só você vê. Não aparece no site." },
    },
  ],
  timestamps: true,
};
