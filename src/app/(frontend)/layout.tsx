import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { getSettings, txt, img } from "@/lib/content";
import "./globals.css";

// Display editorial — voz de "experiência", elegante e memorável.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

// Corpo geométrico limpo — legibilidade sem ruído.
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

// TODO: trocar pelo domínio real no Escopo 3 (registro.br).
const SITE_URL = "https://joaovitorcantor.com.br";

const DESC_PADRAO =
  "Experiências musicais sertanejas para eventos corporativos, casamentos e celebrações memoráveis. Música não preenche espaços — transforma momentos em memória.";

/**
 * Metadata dinâmica: favicon, OG e SEO vêm do painel (aba Marca / Google),
 * com fallback nos arquivos de /public. getSettings usa Local API sem
 * cookies, então a home continua estática.
 */
export async function generateMetadata(): Promise<Metadata> {
  const cfg = await getSettings();
  const s = (cfg ?? {}) as Record<string, unknown>;

  const favicon = img(s.favicon) ?? "/favicon.png";
  const og = img(s.ogImagem) ?? "/joao-banner.png";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: txt(
        s.seoTitulo,
        "Experiências Musicais para Eventos Memoráveis | João Vitor",
      ),
      template: "%s · João Vitor",
    },
    description: txt(s.seoDescricao, DESC_PADRAO),
    keywords: [
      "experiência musical para eventos",
      "música ao vivo evento corporativo",
      "cantor para casamento",
      "sertanejo ao vivo",
      "João Vitor",
      "atração musical confraternização",
    ],
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: img(s.favicon) ?? "/apple-icon.png",
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: SITE_URL,
      siteName: "João Vitor — Experiências Musicais",
      title: "Música não preenche espaços. Transforma momentos em memória.",
      description: DESC_PADRAO,
      images: [{ url: og, width: 1200, height: 630, alt: "João Vitor" }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${dmSans.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
