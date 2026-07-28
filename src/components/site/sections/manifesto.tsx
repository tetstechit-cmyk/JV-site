import { manifesto as mockManifesto, promise } from "@/lib/site";
import { getHome, txt } from "@/lib/content";
import { ManifestoView } from "./manifesto-view";

export async function Manifesto() {
  const home = await getHome();
  const h = (home ?? {}) as Record<string, unknown>;

  const doBanco = Array.isArray(h.manifestoParagrafos)
    ? (h.manifestoParagrafos as { texto?: string }[])
        .map((p) => String(p?.texto ?? "").trim())
        .filter(Boolean)
    : [];

  return (
    <ManifestoView
      eyebrow={txt(h.manifestoEyebrow, mockManifesto.eyebrow)}
      paragrafos={doBanco.length ? doBanco : mockManifesto.paragraphs}
      fecho1={txt(h.manifestoFecho1, mockManifesto.closer)}
      fecho2={txt(h.manifestoFecho2, promise.line2)}
    />
  );
}
