"use client";

import { useMemo, useState } from "react";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { HeroView } from "@/components/site/hero-view";
import { ManifestoView } from "@/components/site/sections/manifesto-view";
import { MomentosView } from "@/components/site/sections/momentos-view";
import { PublicosView } from "@/components/site/sections/publicos-view";
import { ProcessoView } from "@/components/site/sections/processo-view";
import { FormatosView } from "@/components/site/sections/formatos-view";
import { ProvaView } from "@/components/site/sections/prova-view";
import { ArtistaView } from "@/components/site/sections/artista-view";
import { FrasesView } from "@/components/site/sections/frases-view";
import { AgendaView } from "@/components/site/sections/agenda-view";
import { KitImprensaView } from "@/components/site/sections/kit-imprensa-view";
import type { DadosPreview } from "./dados";
import { montarSecoes } from "./dados";

/**
 * Preview em tempo real.
 *
 * O painel envia o que está sendo digitado via postMessage; o hook
 * `useLivePreview` entrega esses dados aqui e a página re-renderiza —
 * sem salvar, sem recarregar.
 *
 * O site público NÃO usa este caminho: lá as seções continuam sendo
 * Server Components (rápido e bom de SEO). Aqui usamos as mesmas views,
 * só que alimentadas pelo painel.
 */

/** Coleção editada → qual seção da página ela alimenta. */
const SECAO_DO_SLUG: Record<string, string> = {
  momentos: "momentos",
  publicos: "publicos",
  etapas: "processo",
  formatos: "formatos",
  numeros: "prova",
  empresas: "prova",
  depoimentos: "prova",
  frases: "frases",
  shows: "agenda",
};

export function PreviewClient({
  inicial,
  serverURL,
  tipo,
  slug,
  id,
}: {
  inicial: DadosPreview;
  serverURL: string;
  tipo: "global" | "collection" | null;
  slug: string | null;
  id: string | null;
}) {
  // O merge de coleção do live preview busca /api/{slug}/{id} — o `id`
  // PRECISA estar no initialData, senão o merge falha e nada atualiza.
  // Globals não têm id (endpoint /api/globals/{slug}), então `{}` basta.
  // Estável por ref (useMemo) para não re-inscrever a cada render.
  const initialData = useMemo<Record<string, unknown>>(
    () => (tipo === "collection" && id ? { id } : {}),
    [tipo, id],
  );

  // `data` começa como o initialData e é substituído a cada tecla digitada.
  const { data } = useLivePreview<Record<string, unknown>>({
    serverURL,
    depth: 2,
    initialData,
  });

  const s = montarSecoes(inicial, data, tipo, slug);

  // Qual seção está sendo editada (só existe foco para coleções mapeadas).
  const foco = tipo === "collection" && slug ? SECAO_DO_SLUG[slug] : undefined;

  // Abre focado na seção editada; toggle mostra o site inteiro.
  const [modo, setModo] = useState<"secao" | "tudo">(foco ? "secao" : "tudo");

  const secoes: { key: string; node: React.ReactNode }[] = [
    { key: "inicio", node: <HeroView {...s.hero} /> },
    { key: "manifesto", node: <ManifestoView {...s.manifesto} /> },
    { key: "momentos", node: <MomentosView {...s.momentos} /> },
    { key: "publicos", node: <PublicosView {...s.publicos} /> },
    { key: "processo", node: <ProcessoView {...s.processo} /> },
    { key: "formatos", node: <FormatosView {...s.formatos} /> },
    { key: "prova", node: <ProvaView {...s.prova} /> },
    { key: "artista", node: <ArtistaView {...s.artista} /> },
    { key: "frases", node: <FrasesView {...s.frases} /> },
    { key: "agenda", node: <AgendaView {...s.agenda} /> },
    { key: "kit", node: <KitImprensaView {...s.kit} /> },
  ];

  const visiveis =
    modo === "secao" && foco
      ? secoes.filter((x) => x.key === foco)
      : secoes;

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[100] flex flex-wrap items-center justify-between gap-2 bg-amber px-3 py-1.5">
        <span className="font-sans text-[0.6rem] font-medium tracking-[0.14em] text-[#120c02] uppercase">
          Pré-visualização ao vivo
        </span>

        {foco ? (
          <div className="flex overflow-hidden rounded-full border border-[#120c02]/25">
            {(
              [
                ["secao", "Seção atual"],
                ["tudo", "Site todo"],
              ] as const
            ).map(([valor, rotulo]) => (
              <button
                key={valor}
                type="button"
                onClick={() => setModo(valor)}
                aria-pressed={modo === valor}
                className={
                  "px-3 py-0.5 font-sans text-[0.62rem] font-semibold tracking-wide uppercase transition-colors " +
                  (modo === valor
                    ? "bg-[#120c02] text-amber"
                    : "text-[#120c02]/70 hover:text-[#120c02]")
                }
              >
                {rotulo}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <main className="pt-9">
        {visiveis.map((sec) => (
          <div key={sec.key}>{sec.node}</div>
        ))}
      </main>
    </>
  );
}
