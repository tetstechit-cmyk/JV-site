import { promise, settings as mockSettings } from "@/lib/site";
import { getHome, getSettings, txt, img } from "@/lib/content";
import { heroYoutube } from "@/lib/mapear";
import { HeroView } from "./hero-view";

const POSTER_PADRAO = "/joao-banner.png";

/**
 * Hero — a EXPERIÊNCIA primeiro, o artista depois.
 * Vídeo e imagem de fundo vêm do painel (aba "1. Abertura").
 */
export async function Hero() {
  const [home, cfg] = await Promise.all([getHome(), getSettings()]);
  const h = (home ?? {}) as Record<string, unknown>;
  const s = (cfg ?? {}) as Record<string, unknown>;

  return (
    <HeroView
      eyebrow={txt(h.heroEyebrow, "Experiências Musicais")}
      linha1={txt(h.heroLinha1, promise.line1)}
      linha2={txt(h.heroLinha2, promise.line2)}
      subtitulo={txt(h.heroSubtitulo, promise.subtitle)}
      cta1={txt(h.heroCta1, "Criar a experiência do meu evento")}
      cta2={txt(h.heroCta2, "Ver momentos")}
      video={img(h.heroVideo)}
      youtube={heroYoutube(h)}
      imagem={img(h.heroImagem) ?? POSTER_PADRAO}
      whatsapp={txt(s.whatsapp, mockSettings.whatsapp)}
    />
  );
}
