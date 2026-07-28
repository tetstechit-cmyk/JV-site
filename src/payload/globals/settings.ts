import type { GlobalConfig } from "payload";
import { somenteAdmin } from "../access";
import { revalidarGlobal } from "../hooks/revalidar";

/** Links renderizados como href no site — exigem https://. (SEC-010) */
const urlHttps = (v: unknown) =>
  !v || /^https:\/\//.test(String(v)) || "Use um endereço https://";

/** Configurações gerais — contato, redes e SEO. */
export const Settings: GlobalConfig = {
  slug: "settings",
  label: "Configurações",
  // API fechada; site lê via Local API. (SEC-002)
  access: { read: somenteAdmin, update: somenteAdmin },
  hooks: { afterChange: [revalidarGlobal] },
  admin: { group: "Ajustes" },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Marca",
          description:
            "Logo e favicon do site. Trocar aqui muda a identidade — mexa só se souber o que está fazendo.",
          fields: [
            {
              name: "logo",
              type: "upload",
              relationTo: "media",
              label: "Logo (topo e rodapé)",
              admin: {
                description:
                  "PNG com FUNDO TRANSPARENTE, deitado (horizontal). Recomendado ~800×400px. A logo é clara — feita para fundo escuro. Se vazio, usa a logo atual do João.",
              },
            },
            {
              name: "favicon",
              type: "upload",
              relationTo: "media",
              label: "Favicon (ícone da aba do navegador)",
              admin: {
                description:
                  "PNG QUADRADO, 512×512px (mínimo 256×256). Simples e legível bem pequeno — só o símbolo, sem texto. Se vazio, usa o favicon atual.",
              },
            },
          ],
        },
        {
          label: "Contato",
          fields: [
            {
              name: "whatsapp",
              type: "text",
              label: "WhatsApp (só números, com DDI)",
              required: true,
              defaultValue: "5511986894866",
              admin: { description: "Ex.: 5511986894866 — 55 (Brasil) + DDD + número." },
            },
            {
              name: "whatsappExibicao",
              type: "text",
              label: "Telefone como aparece no site",
              defaultValue: "(11) 98689-4866",
            },
            { name: "cidade", type: "text", label: "Cidade base", defaultValue: "São Paulo · SP" },
          ],
        },
        {
          label: "Redes sociais",
          fields: [
            { name: "instagram", type: "text", label: "Instagram (link)", validate: urlHttps },
            { name: "youtube", type: "text", label: "YouTube (link)", validate: urlHttps },
            { name: "facebook", type: "text", label: "Facebook (link)", validate: urlHttps },
            { name: "spotify", type: "text", label: "Spotify (link do perfil)", validate: urlHttps },
          ],
        },
        {
          label: "Google e compartilhamento",
          description: "Como o site aparece na busca do Google e ao mandar o link no WhatsApp.",
          fields: [
            { name: "seoTitulo", type: "text", label: "Título no Google" },
            { name: "seoDescricao", type: "textarea", label: "Descrição no Google", maxLength: 160 },
            {
              name: "ogImagem",
              type: "upload",
              relationTo: "media",
              label: "Imagem de compartilhamento",
              admin: { description: "Aparece ao mandar o link no WhatsApp/Instagram. Ideal: 1200×630px." },
            },
          ],
        },
      ],
    },
  ],
};
