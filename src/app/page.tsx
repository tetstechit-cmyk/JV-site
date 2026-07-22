import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { Hero } from "@/components/site/hero";
import { FrasesMarquee } from "@/components/site/sections/frases";
import { Bio } from "@/components/site/sections/bio";
import { Diferenciais } from "@/components/site/sections/diferenciais";
import { Servicos } from "@/components/site/sections/servicos";
import { Agenda } from "@/components/site/sections/agenda";
import { Galeria } from "@/components/site/sections/galeria";
import { Prova } from "@/components/site/sections/prova";
import { KitImprensa } from "@/components/site/sections/kit-imprensa";
import { Contato } from "@/components/site/sections/contato";
import { settings } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "João Vitor",
  alternateName: "João Vitor Cantor Oficial",
  description:
    "Cantor sertanejo. Shows e eventos corporativos — o melhor do sertanejo ao vivo.",
  genre: "Sertanejo",
  url: "https://joaovitorcantor.com.br",
  sameAs: [
    settings.instagramUrl,
    settings.youtubeUrl,
    settings.facebookUrl,
    settings.spotifyArtistUrl,
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main>
        <Hero />
        <FrasesMarquee />
        <Bio />
        <Diferenciais />
        <Servicos />
        <Agenda />
        <Galeria />
        <Prova />
        <KitImprensa />
        <Contato />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
