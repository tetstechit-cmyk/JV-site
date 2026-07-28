import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Validação de ambiente (server-only). Falha o build/boot se faltar algo.
 * Nunca exponha estes valores no client (nada de NEXT_PUBLIC_*).
 */
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    DIRECT_URL: z.string().url(),
    PAYLOAD_SECRET: z.string().min(32),
    // Cloudinary: opcionais. Sem eles, o Payload usa disco local (só dev).
    CLOUDINARY_CLOUD_NAME: z.string().optional(),
    CLOUDINARY_API_KEY: z.string().optional(),
    CLOUDINARY_API_SECRET: z.string().optional(),
  },
  client: {
    // Origem pública do site — usada no CSRF/CORS e no live preview.
    // t3-env exige que vars NEXT_PUBLIC_* fiquem no bloco client.
    NEXT_PUBLIC_SITE_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  emptyStringAsUndefined: true,
});
