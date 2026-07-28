import type { HeroProps } from "@/components/site/hero-view";
import type { ManifestoProps } from "@/components/site/sections/manifesto-view";
import type { MomentosProps } from "@/components/site/sections/momentos-view";
import type { PublicosProps } from "@/components/site/sections/publicos-view";
import type { ProcessoProps } from "@/components/site/sections/processo-view";
import type { FormatosProps } from "@/components/site/sections/formatos-view";
import type { ProvaProps } from "@/components/site/sections/prova-view";
import type { ArtistaProps } from "@/components/site/sections/artista-view";
import type { FrasesProps } from "@/components/site/sections/frases-view";
import type { AgendaProps } from "@/components/site/sections/agenda-view";
import type { KitProps } from "@/components/site/sections/kit-imprensa-view";
import * as M from "@/lib/mapear";

type Bruto = Record<string, unknown>;

/** Tudo que o preview precisa, já em forma bruta (como vem do banco). */
export type DadosPreview = {
  home: Bruto;
  whatsapp: string;
  publicos: Bruto[];
  etapas: Bruto[];
  formatos: Bruto[];
  momentos: Bruto[];
  numeros: Bruto[];
  empresas: string[];
  depoimentos: Bruto[];
  frases: string[];
  shows: Bruto[];
};

export type Secoes = {
  hero: HeroProps;
  manifesto: ManifestoProps;
  momentos: MomentosProps;
  publicos: PublicosProps;
  processo: ProcessoProps;
  formatos: FormatosProps;
  prova: ProvaProps;
  artista: ArtistaProps;
  frases: FrasesProps;
  agenda: AgendaProps;
  kit: KitProps;
};

/** Substitui (ou acrescenta) o documento editado dentro da lista. */
function fundirLista(lista: Bruto[], editado: Bruto | null): Bruto[] {
  if (!editado?.id) return lista;
  const i = lista.findIndex((d) => String(d.id) === String(editado.id));
  if (i === -1) return [...lista, editado];
  const copia = [...lista];
  copia[i] = { ...copia[i], ...editado };
  return copia;
}

/**
 * Monta as props de todas as seções, aplicando por cima o documento que
 * está sendo editado no painel (vindo do live preview).
 */
export function montarSecoes(
  inicial: DadosPreview,
  editado: Bruto | null,
  tipo: "global" | "collection" | null,
  slug: string | null,
): Secoes {
  const temEdicao = Boolean(editado && Object.keys(editado).length);

  // global "home" sendo editado → mescla sobre o home carregado
  const home: Bruto =
    temEdicao && tipo === "global" && slug === "home"
      ? { ...inicial.home, ...editado }
      : inicial.home;

  const naLista = (nome: keyof DadosPreview, lista: Bruto[]) =>
    temEdicao && tipo === "collection" && slug === nome
      ? fundirLista(lista, editado)
      : lista;

  const publicos = naLista("publicos", inicial.publicos);
  const etapas = naLista("etapas", inicial.etapas);
  const formatos = naLista("formatos", inicial.formatos);
  const momentos = naLista("momentos", inicial.momentos);
  const numeros = naLista("numeros", inicial.numeros);
  const depoimentos = naLista("depoimentos", inicial.depoimentos);
  const shows = naLista("shows", inicial.shows);

  const empresas =
    temEdicao && tipo === "collection" && slug === "empresas"
      ? [
          ...inicial.empresas.filter((n) => n !== String(editado?.nome ?? "")),
          String(editado?.nome ?? ""),
        ].filter(Boolean)
      : inicial.empresas;

  const frases =
    temEdicao && tipo === "collection" && slug === "frases"
      ? [
          ...inicial.frases.filter((t) => t !== String(editado?.texto ?? "")),
          String(editado?.texto ?? ""),
        ].filter(Boolean)
      : inicial.frases;

  const wa = inicial.whatsapp;
  const momentosMapeados = momentos.map(M.mapMomento).filter((m) => m.src);

  return {
    hero: M.mapHero(home, wa),
    manifesto: M.mapManifesto(home),
    momentos: {
      momentos: momentosMapeados.length ? momentosMapeados : M.MOMENTOS_PADRAO,
      ...M.mapMomentosMeta(home),
    },
    publicos: {
      publicos: publicos.map(M.mapPublico),
      ...M.mapPublicosMeta(home),
      whatsapp: wa,
    },
    processo: { etapas: etapas.map(M.mapEtapa), ...M.mapProcessoMeta(home) },
    formatos: { formatos: formatos.map(M.mapFormato), ...M.mapFormatosMeta(home) },
    prova: {
      numeros: numeros.map(M.mapNumero),
      empresas,
      depoimentos: depoimentos.map(M.mapDepoimento),
      ...M.mapProvaMeta(home),
    },
    artista: M.mapArtista(home, frases),
    frases: { frases },
    agenda: {
      shows: shows.map(M.mapShow),
      ...M.mapAgendaMeta(home),
      whatsapp: wa,
    },
    kit: M.mapKit(home, wa),
  };
}
