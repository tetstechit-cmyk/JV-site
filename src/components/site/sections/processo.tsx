import { getEtapas, getHome, txt } from "@/lib/content";
import { ProcessoView } from "./processo-view";

/** Container: busca no banco e entrega para a view. */
export async function Processo() {
  const [etapas, home] = await Promise.all([getEtapas(), getHome()]);
  const h = (home ?? {}) as Record<string, unknown>;

  return (
    <ProcessoView
      etapas={etapas}
      eyebrow={txt(h.processoEyebrow, "Nosso processo")}
      titulo={txt(h.processoTitulo, "Como cada evento acontece")}
      lead={txt(
        h.processoLead,
        "Do primeiro contato ao dia seguinte do evento, cada etapa existe para que a experiência aconteça exatamente como você imaginou.",
      )}
    />
  );
}
