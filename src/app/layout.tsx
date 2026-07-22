import type { Metadata } from "next";
import { Oswald, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

// Display condensado e pesado — DNA da logo do João (caixa-alta, forte).
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

// Corpo humanista, limpo e com leve calor — sem cara de "Inter genérico".
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

// TODO: trocar pelo domínio real no Escopo 3 (registro.br).
const SITE_URL = "https://joaovitorcantor.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "João Vitor — Cantor Sertanejo | Shows e Eventos Corporativos",
    template: "%s · João Vitor",
  },
  description:
    "João Vitor, cantor sertanejo. O melhor do sertanejo ao vivo — do bar lotado ao evento corporativo. Contrate para o seu evento.",
  keywords: [
    "João Vitor",
    "cantor sertanejo",
    "sertanejo ao vivo",
    "show sertanejo",
    "cantor para evento corporativo",
    "música ao vivo São Paulo",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "João Vitor — Cantor Oficial",
    title: "João Vitor — Cantor Sertanejo",
    description:
      "O melhor do sertanejo ao vivo — do bar lotado ao evento corporativo.",
    // TODO: card OG dedicado 1200x630 (pendente de arte). Banner como stopgap.
    images: [{ url: "/joao-banner.png", width: 600, height: 600, alt: "João Vitor" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${oswald.variable} ${hanken.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
