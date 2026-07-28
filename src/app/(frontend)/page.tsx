import { BarraRascunho } from "@/components/site/barra-rascunho";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { Hero } from "@/components/site/hero";
import { Manifesto } from "@/components/site/sections/manifesto";
import { Momentos } from "@/components/site/sections/momentos";
import { Publicos } from "@/components/site/sections/publicos";
import { Processo } from "@/components/site/sections/processo";
import { Formatos } from "@/components/site/sections/formatos";
import { Prova } from "@/components/site/sections/prova";
import { Artista } from "@/components/site/sections/artista";
import { FrasesMarquee } from "@/components/site/sections/frases";
import { Agenda } from "@/components/site/sections/agenda";
import { KitImprensa } from "@/components/site/sections/kit-imprensa";
import { Contato } from "@/components/site/sections/contato";
import { settings, promise } from "@/lib/site";
import { getSettings, img } from "@/lib/content";

/**
 * Revalida no máximo a cada 1h. O filtro "shows futuros" (data >= agora) é
 * avaliado na renderização — sem isto, um build de segunda mostraria shows
 * já passados a semana toda, até alguém salvar algo no painel. O
 * revalidatePath on-demand (ao publicar) continua valendo por cima disto.
 */
export const revalidate = 3600;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "João Vitor",
  alternateName: "João Vitor Cantor Oficial",
  description: `${promise.line1} ${promise.line2} ${promise.subtitle}`,
  genre: "Sertanejo",
  url: "https://joaovitorcantor.com.br",
  sameAs: [
    settings.instagramUrl,
    settings.youtubeUrl,
    settings.facebookUrl,
    settings.spotifyArtistUrl,
  ],
};

export default async function HomePage() {
  const cfg = await getSettings();
  const s = (cfg ?? {}) as Record<string, unknown>;
  const logo = img(s.logo) ?? "/brand/logo-jv-trim.png";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BarraRascunho />
      <SiteHeader logo={logo} />
      <main>
        {/* 1. A sensação */}
        <Hero />
        {/* 2. No que acreditamos */}
        <Manifesto />
        {/* 3. A experiência acontecendo */}
        <Momentos />
        {/* 4. Para quem criamos */}
        <Publicos />
        {/* 5. Como acontece */}
        <Processo />
        {/* 6. Formatos */}
        <Formatos />
        {/* 7. Quem já viveu */}
        <Prova />
        {/* 8. Só agora: o artista */}
        <Artista />
        <FrasesMarquee />
        <Agenda />
        <KitImprensa />
        {/* 9. A conversa */}
        <Contato />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
