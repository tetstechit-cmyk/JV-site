/**
 * Migra as mídias que ficaram no disco local para a Cloudinary.
 *
 * Reenvia o arquivo de /public para cada MediaAsset que ainda não tem URL
 * do CDN, e remove os documentos de teste.
 * Rodar: npm run migrar:midia
 */
import path from "path";

const { getPayload } = await import("payload");
const { default: config } = await import("../src/payload.config");

/** alt → arquivo de origem em /public */
const ORIGENS: Record<string, string> = {
  "João Vitor de chapéu": "galeria/g-jv1.png",
  "João Vitor cantando ao vivo": "galeria/g-jv2.png",
  "João Vitor, cantor sertanejo": "galeria/g-blessed.png",
  "João Vitor tocando guitarra": "galeria/g-guitarra.png",
  "João Vitor": "galeria/g-moletom.png",
  "Atmosfera de show": "joao-banner.png",
};

const TESTES = [
  "Teste de upload na Cloudinary",
  "Teste URL direta CDN",
  "Teste URL corrigida",
];

async function main() {
  const payload = await getPayload({ config });
  const publicDir = path.resolve("public");

  // 1) remove documentos de teste
  for (const alt of TESTES) {
    const r = await payload.find({
      collection: "media",
      where: { alt: { equals: alt } },
      limit: 10,
    });
    for (const doc of r.docs) {
      await payload.delete({ collection: "media", id: doc.id });
      payload.logger.info(`removido (teste): ${alt}`);
    }
  }

  // 2) reenvia as mídias reais.
  //
  // ⚠️ Não dá para confiar na URL para saber se o arquivo existe: o Payload
  // GERA a URL do CDN mesmo quando o arquivo nunca subiu (caso das mídias
  // criadas no seed, antes da Cloudinary). Por isso testamos de verdade.
  const todas = await payload.find({ collection: "media", limit: 100 });
  for (const doc of todas.docs) {
    const d = doc as { id: string | number; alt?: string; url?: string };
    const origem = d.alt ? ORIGENS[d.alt] : undefined;

    if (!origem) {
      payload.logger.info(`pulando: ${d.alt} (sem arquivo de origem)`);
      continue;
    }

    // checagem real: a URL responde?
    let existe = false;
    if (d.url) {
      try {
        const r = await fetch(d.url, { method: "HEAD" });
        existe = r.ok;
      } catch {
        existe = false;
      }
    }
    if (existe) {
      payload.logger.info(`pulando: ${d.alt} (confirmado no CDN)`);
      continue;
    }

    await payload.update({
      collection: "media",
      id: d.id,
      data: { alt: d.alt },
      filePath: path.join(publicDir, origem),
    });
    payload.logger.info(`migrado: ${d.alt}`);
  }

  payload.logger.info("✅ migração concluída");
  process.exit(0);
}

try {
  await main();
} catch (e) {
  console.error("❌ falhou:", e);
  process.exit(1);
}
