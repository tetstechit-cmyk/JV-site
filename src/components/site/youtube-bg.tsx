"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Vídeo de fundo do YouTube com controle de trecho (início/fim) e legenda
 * desligada.
 *
 * O embed simples não faz isso: o loop reinicia o vídeo inteiro, ignorando
 * o corte, e não dá para forçar a legenda a sumir. Por isso usamos o
 * IFrame Player API do YouTube — cria o player, toca o trecho escolhido em
 * loop e desliga o módulo de legendas.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;

/** Carrega o script do YouTube uma única vez. */
function carregarApi(): Promise<void> {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise<void>((resolve) => {
    if (typeof window === "undefined") return;
    if (window.YT?.Player) return resolve();
    const anterior = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      anterior?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return apiPromise;
}

export function YoutubeBg({
  id,
  inicio = 0,
  fim,
  poster,
}: {
  id: string;
  inicio?: number;
  fim?: number | null;
  /** Imagem que cobre o player até o vídeo começar (esconde o chrome do YT). */
  poster?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tocando, setTocando] = useState(false);

  useEffect(() => {
    let player: any;
    let timer: ReturnType<typeof setInterval> | undefined;
    let revealTimer: ReturnType<typeof setTimeout> | undefined;
    let cancelado = false;

    const semLegenda = (p: any) => {
      try {
        p.unloadModule("captions");
        p.unloadModule("cc");
      } catch {
        /* módulo pode não existir ainda */
      }
    };

    carregarApi().then(() => {
      if (cancelado || !ref.current || !window.YT) return;
      player = new window.YT.Player(ref.current, {
        videoId: id,
        host: "https://www.youtube-nocookie.com",
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          iv_load_policy: 3,
          cc_load_policy: 0, // não carrega legenda por padrão
          start: Math.max(0, Math.floor(inicio)),
          ...(fim ? { end: Math.floor(fim) } : {}),
        },
        events: {
          onReady: (e: any) => {
            e.target.mute();
            semLegenda(e.target);
            e.target.playVideo();
          },
          onStateChange: (e: any) => {
            const YT = window.YT;
            const s = e.data;
            if (s === YT.PlayerState.PLAYING) {
              semLegenda(e.target);
              // Segura o poster ~1s após o play para cobrir o "cartão de
              // início" do YouTube (título/branding que ele mostra ao começar).
              if (revealTimer) clearTimeout(revealTimer);
              revealTimer = setTimeout(() => {
                if (!cancelado) setTocando(true);
              }, 1000);
            } else if (
              s === YT.PlayerState.PAUSED ||
              s === YT.PlayerState.UNSTARTED ||
              s === YT.PlayerState.CUED
            ) {
              // Estados que mostram o botão/chrome do YouTube (NÃO o buffering,
              // que é transitório no loop): recobre com poster e tenta retomar.
              // Fundo de vídeo nunca deve ficar parado.
              if (revealTimer) clearTimeout(revealTimer);
              if (!cancelado) setTocando(false);
              if (s === YT.PlayerState.PAUSED) {
                try {
                  e.target.playVideo();
                } catch {
                  /* política de autoplay pode bloquear */
                }
              }
            }
            // Fim do trecho/vídeo → volta ao início.
            if (s === YT.PlayerState.ENDED) {
              e.target.seekTo(inicio, true);
              e.target.playVideo();
            }
          },
        },
      });

      // Loop do TRECHO: se há "fim", verifica e rebobina.
      if (fim) {
        timer = setInterval(() => {
          if (player?.getCurrentTime && player.getCurrentTime() >= fim) {
            player.seekTo(inicio, true);
          }
        }, 250);
      }
    });

    return () => {
      cancelado = true;
      if (timer) clearInterval(timer);
      if (revealTimer) clearTimeout(revealTimer);
      try {
        player?.destroy();
      } catch {
        /* ok */
      }
    };
  }, [id, inicio, fim]);

  return (
    <div
      className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        width: "100vw",
        height: "56.25vw",
        minHeight: "100vh",
        minWidth: "177.78vh",
      }}
    >
      <div ref={ref} className="size-full" />

      {/* Poster por cima até o vídeo tocar — some o chrome/botão do YouTube */}
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          aria-hidden
          className={
            "absolute inset-0 size-full object-cover transition-opacity duration-700 " +
            (tocando ? "opacity-0" : "opacity-100")
          }
        />
      ) : null}
    </div>
  );
}
