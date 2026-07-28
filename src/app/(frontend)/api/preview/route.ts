import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Ativa o modo rascunho e leva ao site.
 *
 * Segurança:
 * - só entra em modo rascunho quem tem SESSÃO VÁLIDA no painel;
 * - o destino passa por parse + allowlist para evitar open redirect
 *   (`startsWith("/")` deixava passar `//evil.com`, `/\evil.com`, etc.).
 */
const DESTINOS_OK = new Set(["/", "/preview"]);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const bruto = searchParams.get("path") || "/";

  // Extrai só o pathname; se a origem mudar, é redirect externo → recusa.
  let destino: string;
  try {
    const u = new URL(bruto, "https://placeholder.invalid");
    if (u.origin !== "https://placeholder.invalid") throw new Error("externo");
    destino = u.pathname;
  } catch {
    return new Response("Caminho inválido", { status: 400 });
  }

  if (!DESTINOS_OK.has(destino)) {
    return new Response("Caminho não permitido", { status: 400 });
  }

  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: req.headers });

  if (!user) {
    return new Response("Não autorizado — faça login no painel.", {
      status: 401,
    });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(destino);
}
