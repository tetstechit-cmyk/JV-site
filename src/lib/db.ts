import "server-only";
import { PrismaClient } from "@prisma/client";

// Singleton — evita esgotar conexões no dev (HMR recria módulos).
// Em produção (Vercel serverless), usar SEMPRE o endpoint POOLED do Neon.
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
