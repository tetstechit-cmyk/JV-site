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
    AUTH_SECRET: z.string().min(32),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
  emptyStringAsUndefined: true,
});
