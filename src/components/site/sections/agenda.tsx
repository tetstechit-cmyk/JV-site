import { settings as mockSettings } from "@/lib/site";
import { getShows, getHome, getSettings, txt } from "@/lib/content";
import { AgendaView } from "./agenda-view";

export async function Agenda() {
  const [shows, home, cfg] = await Promise.all([
    getShows(),
    getHome(),
    getSettings(),
  ]);
  const h = (home ?? {}) as Record<string, unknown>;
  const s = (cfg ?? {}) as Record<string, unknown>;

  return (
    <AgendaView
      shows={shows}
      eyebrow={txt(h.agendaEyebrow, "Onde nos ver")}
      titulo={txt(h.agendaTitulo, "Próximas apresentações")}
      whatsapp={txt(s.whatsapp, mockSettings.whatsapp)}
    />
  );
}
