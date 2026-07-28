/* Layout do painel — isolado do site público.
   O Payload traz o próprio CSS; por isso vive em route group separado. */
import type { ServerFunctionClient } from "payload";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import config from "@payload-config";
import "@payloadcms/next/css";
// Identidade "Memória" no painel (importado aqui: o Turbopack processa
// este caminho de forma confiável, diferente de admin.css no config).
import "../../payload/admin/custom.css";
import { importMap } from "./admin/importMap";

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

export default function Layout({ children }: Args) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
