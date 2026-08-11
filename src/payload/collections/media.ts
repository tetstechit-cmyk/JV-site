import type { CollectionConfig } from "payload";
import { publico, somenteAdmin } from "../access";
import { revalidarAoMudar, revalidarAoExcluir } from "../hooks/revalidar";

/**
 * Mídia — fonte única de imagem/vídeo do site.
 *
 * Segurança: allowlist de tipos (SVG BANIDO — é XML e pode carregar script),
 * teto de tamanho, e geração de tamanhos otimizados no upload.
 */
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Mídia", plural: "Mídias" },
  // Trocar o ARQUIVO de uma foto muda a URL no site — sem isto a home ficava
  // servindo a URL antiga (já apagada do Cloudinary) = imagem quebrada.
  hooks: { afterChange: [revalidarAoMudar], afterDelete: [revalidarAoExcluir] },
  access: {
    read: publico,
    create: somenteAdmin,
    update: somenteAdmin,
    delete: somenteAdmin,
  },
  admin: { group: "Ajustes", useAsTitle: "alt" },
  upload: {
    // SVG fora de propósito: magic bytes não distinguem SVG com <script>.
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif", "video/mp4"],
    imageSizes: [
      { name: "thumb", width: 400, height: 500, position: "centre" },
      { name: "card", width: 900 },
      { name: "hero", width: 1920 },
    ],
    // Miniatura na lista/campos do painel. O Payload só gera thumbnail
    // automático de uma size chamada "thumbnail"; a nossa é "thumb", então
    // apontamos explicitamente para a URL dela na Cloudinary.
    adminThumbnail: ({ doc }) => {
      const sizes = doc?.sizes as { thumb?: { url?: string | null } } | undefined;
      return sizes?.thumb?.url ?? (doc?.url as string | undefined) ?? null;
    },
    focalPoint: true,
    crop: true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Descrição da imagem (acessibilidade e SEO)",
      required: true,
      admin: {
        description:
          "Descreva o que aparece na foto. Ex.: 'Plateia cantando junto em evento corporativo'.",
      },
    },
    {
      name: "creditos",
      type: "text",
      label: "Créditos do fotógrafo (opcional)",
    },
  ],
};
