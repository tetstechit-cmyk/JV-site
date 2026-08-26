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
import { Contato } from "@/components/site/sections/contato";
import { settings, promise } from "@/lib/site";
import { getSettings, img, txt } from "@/lib/content";

/**
 * Home SEMPRE fresca: cada visita lê o banco. É o único jeito de garantir
 * que "salvou no painel = apareceu no site" seja INSTANTÂNEO — o
 * revalidatePath on-demand dentro dos hooks do Payload não dispara de forma
 * confiável na Vercel. Custo: ~12 queries pequenas por request (Neon pooled
 * aguenta de sobra para o tráfego deste site). Também mantém o filtro de
 * "shows futuros" sempre correto.
 */
export const dynamic = "force-dynamic";

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

  // Rótulos do menu vêm do painel; ordem e destinos são fixos.
  const nav = [
    { href: "#momentos", label: txt(s.menuExperiencia, "Experiência") },
    { href: "#publicos", label: txt(s.menuEventos, "Eventos") },
    { href: "#processo", label: txt(s.menuComoFunciona, "Como funciona") },
    { href: "#formatos", label: txt(s.menuFormatos, "Formatos") },
    { href: "#artista", label: txt(s.menuArtista, "João Vitor") },
    { href: "#contato", label: txt(s.menuContato, "Contato") },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BarraRascunho />
      <SiteHeader logo={logo} nav={nav} />
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
        {/* 9. A conversa */}
        <Contato />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
