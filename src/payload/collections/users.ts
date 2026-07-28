import type { CollectionConfig } from "payload";
import { somenteAdmin } from "../access";

/**
 * Administradores do painel.
 *
 * Segurança:
 * - auth nativa do Payload (hash forte, cookie httpOnly, CSRF).
 * - SEM cadastro público: criar admin exige estar autenticado.
 * - maxLoginAttempts + lockTime: freia brute-force. lockTime curto de
 *   propósito — admin único com lock longo vira auto-DoS (quem souber o
 *   e-mail tranca o João para fora).
 */
export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Administrador", plural: "Administradores" },
  auth: {
    tokenExpiration: 60 * 60 * 8, // 8h
    maxLoginAttempts: 8,
    lockTime: 10 * 60 * 1000, // 10 min — curto, evita auto-DoS
    cookies: {
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    },
  },
  access: {
    read: somenteAdmin,
    create: somenteAdmin, // nunca público
    update: somenteAdmin,
    delete: somenteAdmin,
    admin: ({ req }) => Boolean(req.user),
  },
  admin: { useAsTitle: "email", group: "Ajustes" },
  fields: [
    {
      name: "nome",
      type: "text",
      label: "Nome",
      required: true,
    },
  ],
};
