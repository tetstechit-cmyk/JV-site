/**
 * Mapeamento de dados brutos → props das views.
 *
 * Funções PURAS (sem acesso a banco) usadas nos dois caminhos:
 * - servidor: containers das seções (site público)
 * - navegador: preview ao vivo
 *
 * Manter isto em um lugar só é o que garante que o preview mostre
 * exatamente o que o site vai mostrar.
 */
import * as mock from "./site";
import type { Audience, Format, ProcessStep, Show, Stat, Testimonial } from "./site";
import type { Momento } from "@/components/site/sections/momentos-view";

type Bruto = Record<string, unknown>;

/** Texto do banco com fallback. */
export function txt(valor: unknown, padrao: string): string {
  const s = typeof valor === "string" ? valor.trim() : "";
  return s.length ? s : padrao;
}

/** URL de um upload do Payload (ou null). */
export function img(valor: unknown): string | null {
  if (!valor || typeof valor !== "object") return null;
  const m = valor as { url?: string | null };
  return m.url ?? null;
}

export const POSTER_PADRAO = "/joao-banner.png";

/** Extrai o ID de 11 chars de um link do YouTube (youtu.be, watch, shorts…). */
export function youtubeId(raw: unknown): string | null {
  const url = typeof raw === "string" ? raw.trim() : "";
  if (!url) return null;
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/|live\/))([\w-]{11})/,
  );
  return m?.[1] ?? null;
}

export type HeroYoutube = { id: string; inicio: number; fim: number | null };

/** Config do vídeo de fundo do YouTube (id + trecho início/fim), ou null. */
export function heroYoutube(h: Bruto): HeroYoutube | null {
  const id = youtubeId(h.heroVideoYoutube);
  if (!id) return null;
  const inicio = Math.max(0, Number(h.heroVideoInicio) || 0);
  const fimN = Number(h.heroVideoFim);
  const fim = Number.isFinite(fimN) && fimN > inicio ? fimN : null;
  return { id, inicio, fim };
}

export const MOMENTOS_PADRAO: Momento[] = [
  { id: "m1", src: "/galeria/g-jv2.png", alt: "João Vitor cantando ao vivo", destaque: true },
  { id: "m2", src: "/galeria/g-jv1.png", alt: "João Vitor em apresentação" },
  { id: "m3", src: "/galeria/g-blessed.png", alt: "João Vitor" },
];

export const KIT_PADRAO = [
  "Fotos em alta resolução",
  "Rider técnico (som e luz)",
  "Release / Bio (one-page)",
  "Logo e material de marca",
];

/* ---------------- HOME (global) ---------------- */

export function mapHero(h: Bruto, whatsapp: string) {
  return {
    eyebrow: txt(h.heroEyebrow, "Experiências Musicais"),
    linha1: txt(h.heroLinha1, mock.promise.line1),
    linha2: txt(h.heroLinha2, mock.promise.line2),
    subtitulo: txt(h.heroSubtitulo, mock.promise.subtitle),
    cta1: txt(h.heroCta1, "Criar a experiência do meu evento"),
    cta2: txt(h.heroCta2, "Ver momentos"),
    video: img(h.heroVideo),
    youtube: heroYoutube(h),
    imagem: img(h.heroImagem) ?? POSTER_PADRAO,
    whatsapp,
  };
}

export function mapManifesto(h: Bruto) {
  const doBanco = Array.isArray(h.manifestoParagrafos)
    ? (h.manifestoParagrafos as { texto?: string }[])
        .map((p) => String(p?.texto ?? "").trim())
        .filter(Boolean)
    : [];
  return {
    eyebrow: txt(h.manifestoEyebrow, mock.manifesto.eyebrow),
    paragrafos: doBanco.length ? doBanco : mock.manifesto.paragraphs,
    fecho1: txt(h.manifestoFecho1, mock.manifesto.closer),
    fecho2: txt(h.manifestoFecho2, mock.promise.line2),
  };
}

export function mapMomentosMeta(h: Bruto) {
  return {
    eyebrow: txt(h.momentosEyebrow, "A experiência"),
    titulo: txt(h.momentosTitulo, "Momentos que permanecem"),
    lead: txt(
      h.momentosLead,
      "O que fica não é a música que tocou. É o que as pessoas sentiram enquanto ela tocava.",
    ),
  };
}

export function mapPublicosMeta(h: Bruto) {
  return {
    eyebrow: txt(h.publicosEyebrow, "Segmentos"),
    titulo: txt(h.publicosTitulo, "Para quem criamos experiências"),
    lead: txt(h.publicosLead, "Cada evento pede uma experiência própria."),
  };
}

export function mapProcessoMeta(h: Bruto) {
  return {
    eyebrow: txt(h.processoEyebrow, "Nosso processo"),
    titulo: txt(h.processoTitulo, "Como cada evento acontece"),
    lead: txt(
      h.processoLead,
      "Do primeiro contato ao dia seguinte do evento, cada etapa existe para que a experiência aconteça exatamente como você imaginou.",
    ),
  };
}

export function mapFormatosMeta(h: Bruto) {
  return {
    eyebrow: txt(h.formatosEyebrow, "Possibilidades"),
    titulo: txt(h.formatosTitulo, "Nossos formatos"),
    lead: txt(
      h.formatosLead,
      "O formato certo depende do espaço, do público e da atmosfera que você quer criar.",
    ),
  };
}

export function mapProvaMeta(h: Bruto) {
  return {
    eyebrow: txt(h.provaEyebrow, "Confiança"),
    titulo: txt(h.provaTitulo, "Quem já viveu essa experiência"),
    empresasTitulo: txt(
      h.empresasTitulo,
      "Empresas que já confiaram no nosso trabalho",
    ),
  };
}

export function mapAgendaMeta(h: Bruto) {
  return {
    eyebrow: txt(h.agendaEyebrow, "Onde nos ver"),
    titulo: txt(h.agendaTitulo, "Próximas apresentações"),
  };
}

export function mapArtista(h: Bruto, frases: string[]) {
  const tipo = txt(h.spotifyTipo, "artist");
  const id = txt(h.spotifyId, "1NcHjMiIbcuCDUW9sg0Fls");
  return {
    eyebrow: txt(h.artistaEyebrow, mock.artist.eyebrow),
    nome: txt(h.artistaNome, mock.artist.name),
    headline: txt(h.artistaHeadline, mock.artist.headline),
    bio: txt(h.artistaBio, mock.artist.body),
    foto: img(h.artistaFoto) ?? mock.artist.image,
    frase: frases[1] ?? frases[0] ?? "",
    spotifyUrl: `https://open.spotify.com/embed/${tipo}/${id}?utm_source=generator&theme=0`,
  };
}

export function mapKit(h: Bruto, whatsapp: string) {
  const doBanco = Array.isArray(h.kitItens)
    ? (h.kitItens as { texto?: string }[])
        .map((i) => String(i?.texto ?? "").trim())
        .filter(Boolean)
    : [];
  return {
    eyebrow: txt(h.kitEyebrow, "Para produtores e RH"),
    titulo: txt(h.kitTitulo, "Kit de Imprensa"),
    lead: txt(
      h.kitLead,
      "Tudo que a sua produção precisa para fechar com segurança. Peça o material completo — respondemos rápido.",
    ),
    itens: doBanco.length ? doBanco : KIT_PADRAO,
    cta: txt(h.kitCta, "Solicitar kit completo"),
    whatsapp,
  };
}

/* ---------------- COLEÇÕES (item bruto → tipo do site) ---------------- */

export function mapPublico(d: Bruto, i = 0): Audience {
  return {
    id: String(d.id ?? i),
    title: String(d.titulo ?? ""),
    lead: String(d.frase ?? ""),
    description: String(d.descricao ?? ""),
    image: img(d.imagem) ?? "",
  };
}

export function mapEtapa(d: Bruto, i = 0): ProcessStep {
  return {
    id: String(d.id ?? i),
    title: String(d.titulo ?? ""),
    description: String(d.descricao ?? ""),
  };
}

export function mapFormato(d: Bruto, i = 0): Format {
  return {
    id: String(d.id ?? i),
    title: String(d.titulo ?? ""),
    description: String(d.descricao ?? ""),
    best: String(d.melhorPara ?? ""),
  };
}

export function mapMomento(d: Bruto, i = 0): Momento {
  return {
    id: String(d.id ?? i),
    src: img(d.imagem) ?? "",
    alt: String((d.imagem as { alt?: string })?.alt ?? d.legenda ?? "João Vitor"),
    destaque: Boolean(d.destaque),
  };
}

export function mapNumero(d: Bruto, i = 0): Stat {
  return {
    id: String(d.id ?? i),
    value: String(d.valor ?? ""),
    label: String(d.rotulo ?? ""),
  };
}

export function mapDepoimento(d: Bruto, i = 0): Testimonial {
  return {
    id: String(d.id ?? i),
    author: String(d.autor ?? ""),
    role: d.cargo ? String(d.cargo) : undefined,
    quote: String(d.citacao ?? ""),
  };
}

export function mapShow(d: Bruto, i = 0): Show {
  return {
    id: String(d.id ?? i),
    title: String(d.titulo ?? ""),
    venue: String(d.local ?? ""),
    city: String(d.cidade ?? ""),
    state: String(d.uf ?? ""),
    startsAt: String(d.data ?? ""),
    ticketUrl: d.linkIngressos ? String(d.linkIngressos) : undefined,
    description: d.descricao ? String(d.descricao) : undefined,
  };
}
