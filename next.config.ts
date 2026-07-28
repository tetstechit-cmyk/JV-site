import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // Fixa a raiz no projeto (havia um package-lock.json na home confundindo o Next).
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    // A Cloudinary serve as mídias pelo CDN dela — precisa estar liberado,
    // senão o next/image recusa otimizar a imagem.
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
  // Cabeçalhos de segurança. frame-ancestors 'self': painel e /preview são
  // a mesma origem (Payload montado em /admin do mesmo app), então o live
  // preview continua funcionando e clickjacking cross-site é bloqueado.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), camera=(), microphone=()",
          },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
