import { artist as mockArtist } from "@/lib/site";
import { getHome, getFrases, txt, img } from "@/lib/content";
import { ArtistaView } from "./artista-view";

/** O artista — revelado DEPOIS da experiência. */
export async function Artista() {
  const [home, frases] = await Promise.all([getHome(), getFrases()]);
  const h = (home ?? {}) as Record<string, unknown>;

  const tipo = txt(h.spotifyTipo, "artist");
  const id = txt(h.spotifyId, "1NcHjMiIbcuCDUW9sg0Fls");

  return (
    <ArtistaView
      eyebrow={txt(h.artistaEyebrow, mockArtist.eyebrow)}
      nome={txt(h.artistaNome, mockArtist.name)}
      headline={txt(h.artistaHeadline, mockArtist.headline)}
      bio={txt(h.artistaBio, mockArtist.body)}
      foto={img(h.artistaFoto) ?? mockArtist.image}
      frase={frases[1] ?? frases[0] ?? ""}
      spotifyUrl={`https://open.spotify.com/embed/${tipo}/${id}?utm_source=generator&theme=0`}
    />
  );
}
