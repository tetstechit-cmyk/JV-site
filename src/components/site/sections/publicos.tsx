import { settings as mockSettings } from "@/lib/site";
import { getPublicos, getHome, getSettings, txt } from "@/lib/content";
import { PublicosView } from "./publicos-view";

export async function Publicos() {
  const [publicos, home, cfg] = await Promise.all([
    getPublicos(),
    getHome(),
    getSettings(),
  ]);
  const h = (home ?? {}) as Record<string, unknown>;
  const s = (cfg ?? {}) as Record<string, unknown>;

  return (
    <PublicosView
      publicos={publicos}
      eyebrow={txt(h.publicosEyebrow, "Segmentos")}
      titulo={txt(h.publicosTitulo, "Para quem criamos experiências")}
      lead={txt(h.publicosLead, "Cada evento pede uma experiência própria.")}
      whatsapp={txt(s.whatsapp, mockSettings.whatsapp)}
    />
  );
}
