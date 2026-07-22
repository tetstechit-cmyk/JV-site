import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fixa a raiz no projeto (havia um package-lock.json na home confundindo o Next).
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
