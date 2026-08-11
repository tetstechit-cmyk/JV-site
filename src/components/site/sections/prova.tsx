import {
  getNumeros,
  getEmpresas,
  getDepoimentos,
  getProvaFotos,
  getHome,
  txt,
} from "@/lib/content";
import { ProvaView, type ProvaFoto } from "./prova-view";

/** Placeholder até o João subir fotos de plateia no painel. */
const FOTOS_PADRAO: ProvaFoto[] = [
  { id: "f1", src: "/galeria/g-guitarra.png", alt: "Apresentação ao vivo" },
  { id: "f2", src: "/galeria/g-jv1.png", alt: "João Vitor em evento" },
  { id: "f3", src: "/galeria/g-moletom.png", alt: "Bastidores" },
];

export async function Prova() {
  const [numeros, fotos, empresas, depoimentos, home] = await Promise.all([
    getNumeros(),
    getProvaFotos(),
    getEmpresas(),
    getDepoimentos(),
    getHome(),
  ]);
  const h = (home ?? {}) as Record<string, unknown>;

  return (
    <ProvaView
      numeros={numeros}
      fotos={fotos.length ? fotos : FOTOS_PADRAO}
      empresas={empresas}
      depoimentos={depoimentos}
      eyebrow={txt(h.provaEyebrow, "Confiança")}
      titulo={txt(h.provaTitulo, "Quem já viveu essa experiência")}
      empresasTitulo={txt(
        h.empresasTitulo,
        "Empresas que já confiaram no nosso trabalho",
      )}
    />
  );
}
