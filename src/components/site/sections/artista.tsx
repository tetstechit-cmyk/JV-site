import { getHome, getFrases } from "@/lib/content";
import { mapArtista } from "@/lib/mapear";
import { ArtistaView } from "./artista-view";

/** O artista — revelado DEPOIS da experiência. */
export async function Artista() {
  const [home, frases] = await Promise.all([getHome(), getFrases()]);
  const h = (home ?? {}) as Record<string, unknown>;

  return <ArtistaView {...mapArtista(h, frases)} />;
}
