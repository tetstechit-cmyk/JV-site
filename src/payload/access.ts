import type { Access } from "payload";

/**
 * Regras de acesso — a fronteira de autorização (na API REST do Payload).
 *
 * IMPORTANTE: o site público NÃO depende disto — ele lê pela Local API
 * (`getPayload().find`), que roda com `overrideAccess: true`. Estas regras
 * protegem a superfície EXTERNA: quem bate direto em /api/*.
 */

/**
 * Conteúdo do site na API externa:
 * - admin logado → vê tudo (inclusive rascunho)
 * - anônimo → SÓ o que está `publicado: true` (constraint, não `true`)
 *
 * Antes era `() => true`, o que devolvia rascunho a qualquer anônimo via
 * `GET /api/shows`. `true` não filtra; um objeto `where` filtra.
 */
export const publicoPublicado: Access = ({ req }) =>
  req.user ? true : { publicado: { equals: true } };

/** Leitura totalmente pública (sem campo `publicado`, ex.: mídia). */
export const publico: Access = () => true;

/** Exige admin autenticado. Usado em toda escrita e em dados sensíveis. */
export const somenteAdmin: Access = ({ req }) => Boolean(req.user);

/**
 * Leads: qualquer visitante pode CRIAR (o formulário envia),
 * mas só admin autenticado pode LER/EDITAR — são dados pessoais (LGPD).
 */
export const criarPublicoLerAdmin = {
  create: publico,
  read: somenteAdmin,
  update: somenteAdmin,
  delete: somenteAdmin,
};
