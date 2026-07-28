import type { Adapter, GeneratedAdapter } from "@payloadcms/plugin-cloud-storage/types";
import { v2 as cloudinary } from "cloudinary";

/**
 * Adapter de armazenamento para Cloudinary.
 *
 * Escrito aqui (em vez de usar plugin de terceiro) para não ficar refém de
 * uma dependência que pode ser abandonada: usamos o plugin-cloud-storage
 * OFICIAL do Payload + o SDK oficial da Cloudinary.
 *
 * As URLs da Cloudinary são públicas por padrão, então o site serve as
 * imagens direto do CDN deles.
 */

type Opcoes = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  /** Pasta dentro da Cloudinary (organiza a conta). */
  pasta?: string;
};

export function cloudinaryAdapter({
  cloudName,
  apiKey,
  apiSecret,
  pasta = "joao-vitor",
}: Opcoes): Adapter {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  /** public_id determinístico: pasta + nome sem extensão. */
  const idDe = (filename: string) =>
    `${pasta}/${filename.replace(/\.[^.]+$/, "")}`;

  const extensaoDe = (filename: string) =>
    filename.split(".").pop()?.toLowerCase() || "png";

  const ehVideo = (filename: string) =>
    ["mp4", "mov", "webm", "m4v"].includes(extensaoDe(filename));

  return (): GeneratedAdapter => ({
    name: "cloudinary",

    async handleUpload({ file }) {
      await new Promise<void>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            public_id: idDe(file.filename),
            resource_type: "auto", // aceita imagem e vídeo
            overwrite: true,
            invalidate: true,
          },
          (erro) => (erro ? reject(erro) : resolve()),
        );
        stream.end(file.buffer);
      });
    },

    async handleDelete({ filename }) {
      // resource_type precisa bater com o que foi enviado; tenta imagem e vídeo.
      for (const tipo of ["image", "video"] as const) {
        try {
          await cloudinary.uploader.destroy(idDe(filename), {
            resource_type: tipo,
            invalidate: true,
          });
        } catch {
          /* segue: o arquivo pode ser do outro tipo */
        }
      }
    },

    generateURL({ filename }) {
      // "auto" só vale no UPLOAD. Na entrega, a Cloudinary exige o tipo
      // explícito — /auto/upload/ devolve HTTP 400.
      return cloudinary.url(idDe(filename), {
        secure: true,
        resource_type: ehVideo(filename) ? "video" : "image",
        format: extensaoDe(filename),
      });
    },

    /**
     * Redireciona para o CDN da Cloudinary em vez de servir o arquivo pelo
     * nosso servidor — evita gastar função serverless com entrega de imagem.
     */
    staticHandler: async (req, { params: { filename } }) => {
      const url = cloudinary.url(idDe(filename), {
        secure: true,
        resource_type: ehVideo(filename) ? "video" : "image",
        format: extensaoDe(filename),
      });
      return Response.redirect(url, 302);
    },
  });
}
