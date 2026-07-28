import { settings as mockSettings } from "@/lib/site";
import { getHome, getSettings, txt } from "@/lib/content";
import { KitImprensaView } from "./kit-imprensa-view";

const PADRAO = [
  "Fotos em alta resolução",
  "Rider técnico (som e luz)",
  "Release / Bio (one-page)",
  "Logo e material de marca",
];

export async function KitImprensa() {
  const [home, cfg] = await Promise.all([getHome(), getSettings()]);
  const h = (home ?? {}) as Record<string, unknown>;
  const s = (cfg ?? {}) as Record<string, unknown>;

  const doBanco = Array.isArray(h.kitItens)
    ? (h.kitItens as { texto?: string }[])
        .map((i) => String(i?.texto ?? "").trim())
        .filter(Boolean)
    : [];

  return (
    <KitImprensaView
      eyebrow={txt(h.kitEyebrow, "Para produtores e RH")}
      titulo={txt(h.kitTitulo, "Kit de Imprensa")}
      lead={txt(
        h.kitLead,
        "Tudo que a sua produção precisa para fechar com segurança. Peça o material completo — respondemos rápido.",
      )}
      itens={doBanco.length ? doBanco : PADRAO}
      cta={txt(h.kitCta, "Solicitar kit completo")}
      whatsapp={txt(s.whatsapp, mockSettings.whatsapp)}
    />
  );
}
