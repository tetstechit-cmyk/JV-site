"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { YoutubeIcon } from "@/components/brand/social-icons";

/**
 * Showcase de vídeo do YouTube — capa do vídeo do artista.
 *
 * Facade pattern (perf): a página carrega só a MINIATURA; o iframe pesado do
 * YouTube só entra no clique. Aí toca inline, com som (o clique é o gesto que
 * libera o autoplay). O botão "Ver canal" leva ao canal — assim clicar o
 * vídeo TOCA no site e o canal fica num CTA claro, sem ambiguidade.
 */
export function YoutubeShowcase({
  videoId,
  canalUrl,
}: {
  videoId: string;
  canalUrl: string;
}) {
  const [tocando, setTocando] = useState(false);
  // maxres nem sempre existe; cai para hq (sempre existe) no erro.
  const [thumb, setThumb] = useState(
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  );

  return (
    <div className="overflow-hidden rounded-sm border border-line bg-ink-2">
      <div className="relative aspect-video">
        {tocando ? (
          <iframe
            title="Vídeo de João Vitor"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setTocando(true)}
            aria-label="Assistir ao vídeo"
            className="group absolute inset-0 block cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb}
              onError={() =>
                setThumb(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`)
              }
              alt=""
              aria-hidden
              className="size-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
            />
            {/* leitura: escurece as bordas para o play saltar */}
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,transparent,color-mix(in_oklab,var(--ink)_70%,transparent))]" />

            {/* botão play âmbar */}
            <span className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-amber text-[#120c02] shadow-lg shadow-black/40 ring-0 transition-all duration-300 group-hover:scale-105 group-hover:ring-8 group-hover:ring-amber/15 sm:size-20">
              <Play className="ml-0.5 size-7 fill-current sm:size-8" aria-hidden />
            </span>
          </button>
        )}
      </div>

      {/* rodapé: canal */}
      <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-4">
        <span className="eyebrow">No palco</span>
        <a
          href={canalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans text-xs font-medium tracking-[0.1em] text-fg-muted uppercase transition-colors hover:text-amber"
        >
          <YoutubeIcon className="size-4" />
          Ver canal no YouTube
        </a>
      </div>
    </div>
  );
}
