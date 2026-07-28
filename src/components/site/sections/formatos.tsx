import { getFormatos, getHome, txt } from "@/lib/content";
import { FormatosView } from "./formatos-view";

export async function Formatos() {
  const [formatos, home] = await Promise.all([getFormatos(), getHome()]);
  const h = (home ?? {}) as Record<string, unknown>;

  return (
    <FormatosView
      formatos={formatos}
      eyebrow={txt(h.formatosEyebrow, "Possibilidades")}
      titulo={txt(h.formatosTitulo, "Nossos formatos")}
      lead={txt(
        h.formatosLead,
        "O formato certo depende do espaço, do público e da atmosfera que você quer criar.",
      )}
    />
  );
}
