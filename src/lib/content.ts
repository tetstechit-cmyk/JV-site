import "server-only";
import { cache } from "react";
import { draftMode } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import * as mock from "./site";

/**
 * Está no modo rascunho? (ativado por /api/preview, que exige sessão)
 *
 * Quando ligado, o site mostra TAMBÉM o conteúdo não publicado — é o
 * "ver antes de publicar". Para o visitante comum continua tudo igual:
 * o Next serve a versão estática de quem não tem o cookie de rascunho.
 */
const emRascunho = cache(async (): Promise<boolean> => {
  try {
    const d = await draftMode();
    return d.isEnabled;
  } catch {
    return false; // fora de contexto de request (build) — nunca rascunho
  }
});

/**
 * Camada de leitura do conteúdo — o site público lê daqui.
 *
 * Princípios:
 * - `cache()` do React deduplica: várias seções pedindo o mesmo global
 *   geram UMA query por request.
 * - FALLBACK: se o banco falhar ou vier vazio, devolve o conteúdo do mock.
 *   O site nunca fica em branco por causa do painel.
 * - server-only: nada disto chega ao navegador.
 */

const client = cache(async () => getPayload({ config }));

/** Executa uma leitura tolerante a falha — nunca derruba a página. */
async function seguro<T>(fn: () => Promise<T>, padrao: T): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    console.error("[content] leitura falhou, usando fallback:", e);
    return padrao;
  }
}

/** URL de imagem a partir de um upload do Payload (ou null). */
function urlDe(midia: unknown): string | null {
  if (!midia || typeof midia !== "object") return null;
  const m = midia as { url?: string | null };
  return m.url ?? null;
}

/* ---------------- GLOBAIS ---------------- */

export const getHome = cache(async () =>
  seguro(async () => {
    const p = await client();
    // draft: true traz a última versão salva (mesmo não publicada)
    return await p.findGlobal({
      slug: "home",
      depth: 2,
      draft: await emRascunho(),
    });
  }, null as Awaited<ReturnType<Awaited<ReturnType<typeof client>>["findGlobal"]>> | null),
);

export const getSettings = cache(async () =>
  seguro(async () => {
    const p = await client();
    return await p.findGlobal({ slug: "settings", depth: 1 });
  }, null as Awaited<ReturnType<Awaited<ReturnType<typeof client>>["findGlobal"]>> | null),
);

/** Exposto para a UI mostrar o aviso de "modo rascunho". */
export const estaEmRascunho = emRascunho;

/* ---------------- COLEÇÕES ---------------- */

async function listaPublicada(collection: string, sort = "ordem") {
  const p = await client();
  const rascunho = await emRascunho();
  const r = await p.find({
    collection: collection as never,
    // no preview, mostra tudo (inclusive o que ainda não foi publicado)
    where: rascunho ? {} : { publicado: { equals: true } },
    sort,
    limit: 100,
    depth: 2,
  });
  return r.docs as Record<string, unknown>[];
}

export const getPublicos = cache(async () =>
  seguro(async () => {
    const docs = await listaPublicada("publicos");
    if (!docs.length) return mock.audiences;
    return docs.map((d, i) => ({
      id: String(d.id ?? i),
      title: String(d.titulo ?? ""),
      lead: String(d.frase ?? ""),
      description: String(d.descricao ?? ""),
      image: urlDe(d.imagem) ?? mock.audiences[i % mock.audiences.length].image,
    }));
  }, mock.audiences),
);

export const getEtapas = cache(async () =>
  seguro(async () => {
    const docs = await listaPublicada("etapas");
    if (!docs.length) return mock.processSteps;
    return docs.map((d, i) => ({
      id: String(d.id ?? i),
      title: String(d.titulo ?? ""),
      description: String(d.descricao ?? ""),
    }));
  }, mock.processSteps),
);

export const getFormatos = cache(async () =>
  seguro(async () => {
    const docs = await listaPublicada("formatos");
    if (!docs.length) return mock.formats;
    return docs.map((d, i) => ({
      id: String(d.id ?? i),
      title: String(d.titulo ?? ""),
      description: String(d.descricao ?? ""),
      best: String(d.melhorPara ?? ""),
    }));
  }, mock.formats),
);

export const getMomentos = cache(async () =>
  seguro(async () => {
    const docs = await listaPublicada("momentos");
    if (!docs.length) return null;
    return docs.map((d, i) => ({
      id: String(d.id ?? i),
      src: urlDe(d.imagem) ?? "",
      alt: String((d.imagem as { alt?: string })?.alt ?? d.legenda ?? "João Vitor"),
      destaque: Boolean(d.destaque),
    })).filter((m) => m.src);
  }, null),
);

export const getNumeros = cache(async () =>
  seguro(async () => {
    const docs = await listaPublicada("numeros");
    if (!docs.length) return mock.stats;
    return docs.map((d, i) => ({
      id: String(d.id ?? i),
      value: String(d.valor ?? ""),
      label: String(d.rotulo ?? ""),
    }));
  }, mock.stats),
);

export const getEmpresas = cache(async () =>
  seguro(async () => {
    const docs = await listaPublicada("empresas");
    if (!docs.length) return mock.clients;
    return docs.map((d) => String(d.nome ?? ""));
  }, mock.clients),
);

export const getDepoimentos = cache(async () =>
  seguro(async () => {
    const docs = await listaPublicada("depoimentos");
    return docs.map((d, i) => ({
      id: String(d.id ?? i),
      author: String(d.autor ?? ""),
      role: d.cargo ? String(d.cargo) : undefined,
      quote: String(d.citacao ?? ""),
    }));
  }, mock.testimonials),
);

export const getProvaFotos = cache(async () =>
  seguro(async () => {
    const docs = await listaPublicada("provaFotos");
    return docs
      .map((d, i) => ({
        id: String(d.id ?? i),
        src: urlDe(d.imagem) ?? "",
        alt: String(
          (d.imagem as { alt?: string })?.alt ?? d.legenda ?? "Momento do evento",
        ),
      }))
      .filter((f) => f.src);
  }, [] as { id: string; src: string; alt: string }[]),
);

export const getFrases = cache(async () =>
  seguro(async () => {
    const docs = await listaPublicada("frases");
    if (!docs.length) return mock.stagePhrases;
    return docs.map((d) => String(d.texto ?? ""));
  }, mock.stagePhrases),
);

export const getShows = cache(async (): Promise<mock.Show[]> =>
  seguro<mock.Show[]>(async () => {
    const p = await client();
    const r = await p.find({
      collection: "shows",
      where: {
        and: [
          { publicado: { equals: true } },
          { cancelado: { not_equals: true } },
          { data: { greater_than_equal: new Date().toISOString() } },
        ],
      },
      sort: "data",
      limit: 100,
    });
    const docs = r.docs as unknown as Record<string, unknown>[];
    if (!docs.length) return [];
    return docs.map((d, i) => ({
      id: String(d.id ?? i),
      title: String(d.titulo ?? ""),
      venue: String(d.local ?? ""),
      city: String(d.cidade ?? ""),
      state: String(d.uf ?? ""),
      startsAt: String(d.data ?? ""),
      ticketUrl: d.linkIngressos ? String(d.linkIngressos) : undefined,
      description: d.descricao ? String(d.descricao) : undefined,
    }));
  }, mock.upcomingShows()),
);

/* ---------------- HELPERS ---------------- */

/** Texto do global com fallback: usa o do banco, ou o padrão do mock. */
export function txt(valor: unknown, padrao: string): string {
  const s = typeof valor === "string" ? valor.trim() : "";
  return s.length ? s : padrao;
}

/** Imagem do global (ou null para o componente decidir o fallback). */
export function img(valor: unknown): string | null {
  return urlDe(valor);
}
