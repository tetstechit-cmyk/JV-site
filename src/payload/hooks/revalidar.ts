import { revalidatePath } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";

/**
 * Quando o João salva no painel, a home revalida — o site atualiza em segundos.
 *
 * Como todo o conteúdo aparece na mesma página, revalidar "/" cobre tudo.
 * Simples de raciocinar e impossível de esquecer uma tag.
 */
function revalidarHome(motivo: string) {
  try {
    revalidatePath("/", "page");
    console.info(`[revalidar] home atualizada (${motivo})`);
  } catch (e) {
    // Fora de contexto Next (ex.: script de seed) — ignora sem quebrar.
    console.warn("[revalidar] ignorado:", (e as Error).message);
  }
}

export const revalidarAoMudar: CollectionAfterChangeHook = ({
  doc,
  collection,
}) => {
  revalidarHome(collection?.slug ?? "coleção");
  return doc;
};

export const revalidarAoExcluir: CollectionAfterDeleteHook = ({
  doc,
  collection,
}) => {
  revalidarHome(`${collection?.slug ?? "coleção"} (exclusão)`);
  return doc;
};

export const revalidarGlobal: GlobalAfterChangeHook = ({ doc, global }) => {
  revalidarHome(global?.slug ?? "global");
  return doc;
};
