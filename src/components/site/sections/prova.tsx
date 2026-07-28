import {
  getNumeros,
  getEmpresas,
  getDepoimentos,
  getHome,
  txt,
} from "@/lib/content";
import { ProvaView } from "./prova-view";

export async function Prova() {
  const [numeros, empresas, depoimentos, home] = await Promise.all([
    getNumeros(),
    getEmpresas(),
    getDepoimentos(),
    getHome(),
  ]);
  const h = (home ?? {}) as Record<string, unknown>;

  return (
    <ProvaView
      numeros={numeros}
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
