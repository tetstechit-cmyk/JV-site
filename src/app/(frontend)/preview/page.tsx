import { headers } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import { env } from "@/env";
import { settings as mockSettings } from "@/lib/site";
import { txt } from "@/lib/mapear";
import { PreviewClient } from "./preview-client";
import type { DadosPreview } from "./dados";

/**
 * Pré-visualização ao vivo.
 *
 * SEGURANÇA: exige sessão do painel. Sem isso, qualquer pessoa veria
 * conteúdo não publicado. A verificação é feita aqui, no servidor —
 * nunca no cliente.
 */
export const dynamic = "force-dynamic";

async function lista(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: string,
  sort = "ordem",
) {
  const r = await payload.find({
    collection: collection as never,
    sort,
    limit: 100,
    depth: 2,
  });
  return r.docs as unknown as Record<string, unknown>[];
}

export default async function PreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string; slug?: string; id?: string }>;
}) {
  const { tipo, slug, id } = await searchParams;
  const payload = await getPayload({ config });

  const { user } = await payload.auth({ headers: await headers() });
  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center p-8 text-center">
        <div>
          <h1 className="font-display text-2xl text-fg">Acesso restrito</h1>
          <p className="mt-3 text-sm text-fg-muted">
            Entre no painel para ver a pré-visualização.
          </p>
          <a
            href="/admin"
            className="mt-6 inline-block text-sm text-amber hover:underline"
          >
            Ir para o painel
          </a>
        </div>
      </main>
    );
  }

  const [home, cfg, publicos, etapas, formatos, momentos, numeros, provaFotos, empresasDocs, depoimentos, frasesDocs, shows] =
    await Promise.all([
      payload.findGlobal({ slug: "home", depth: 2, draft: true }),
      payload.findGlobal({ slug: "settings", depth: 1 }),
      lista(payload, "publicos"),
      lista(payload, "etapas"),
      lista(payload, "formatos"),
      lista(payload, "momentos"),
      lista(payload, "numeros"),
      lista(payload, "provaFotos"),
      lista(payload, "empresas"),
      lista(payload, "depoimentos"),
      lista(payload, "frases"),
      lista(payload, "shows", "data"),
    ]);

  const s = (cfg ?? {}) as unknown as Record<string, unknown>;

  const inicial: DadosPreview = {
    home: (home ?? {}) as unknown as Record<string, unknown>,
    whatsapp: txt(s.whatsapp, mockSettings.whatsapp),
    publicos,
    etapas,
    formatos,
    momentos,
    numeros,
    provaFotos,
    empresas: empresasDocs.map((e) => String(e.nome ?? "")).filter(Boolean),
    depoimentos,
    frases: frasesDocs.map((f) => String(f.texto ?? "")).filter(Boolean),
    shows,
  };

  return (
    <PreviewClient
      inicial={inicial}
      serverURL={env.NEXT_PUBLIC_SITE_URL}
      tipo={tipo === "global" || tipo === "collection" ? tipo : null}
      slug={slug ?? null}
      id={id ?? null}
    />
  );
}
