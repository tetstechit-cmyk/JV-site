import { getMomentos, getHome, txt } from "@/lib/content";
import { MomentosView, type Momento } from "./momentos-view";

/** Fallback se o painel ainda não tiver momentos publicados. */
const PADRAO: Momento[] = [
  { id: "m1", src: "/galeria/g-jv2.png", alt: "João Vitor cantando ao vivo", destaque: true },
  { id: "m2", src: "/galeria/g-jv1.png", alt: "João Vitor em apresentação" },
  { id: "m3", src: "/galeria/g-blessed.png", alt: "João Vitor" },
];

export async function Momentos() {
  const [doBanco, home] = await Promise.all([getMomentos(), getHome()]);
  const h = (home ?? {}) as Record<string, unknown>;

  return (
    <MomentosView
      momentos={doBanco?.length ? doBanco : PADRAO}
      eyebrow={txt(h.momentosEyebrow, "A experiência")}
      titulo={txt(h.momentosTitulo, "Momentos que permanecem")}
      lead={txt(
        h.momentosLead,
        "O que fica não é a música que tocou. É o que as pessoas sentiram enquanto ela tocava.",
      )}
    />
  );
}
