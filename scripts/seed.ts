/**
 * Semeia o banco com o conteúdo atual do site (que hoje vive em src/lib/site.ts).
 *
 * Idempotente: se já existir conteúdo, não duplica.
 * Rodar: npm run seed
 */
import path from "path";
import { fileURLToPath } from "url";

// Imports dinâmicos: com `payload run`, imports estáticos destes módulos
// travam silenciosamente (o processo sai com 0 sem executar nada).
const { getPayload } = await import("payload");
const { default: config } = await import("../src/payload.config");
const {
  promise,
  manifesto,
  audiences,
  processSteps: etapasSite,
  formats,
  stats,
  clients,
  stagePhrases,
  artist,
  settings: cfg,
  shows: showsSite,
} = await import("../src/lib/site");

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../public");

async function main() {
  const payload = await getPayload({ config });
  const log = (m: string) => payload.logger.info(m);

  /* ---------- MÍDIA ---------- */
  const arquivos = [
    { file: "galeria/g-jv1.png", alt: "João Vitor de chapéu" },
    { file: "galeria/g-jv2.png", alt: "João Vitor cantando ao vivo" },
    { file: "galeria/g-blessed.png", alt: "João Vitor, cantor sertanejo" },
    { file: "galeria/g-guitarra.png", alt: "João Vitor tocando guitarra" },
    { file: "galeria/g-moletom.png", alt: "João Vitor" },
    { file: "joao-banner.png", alt: "Atmosfera de show" },
  ];

  const midia: Record<string, number> = {};
  for (const a of arquivos) {
    const existente = await payload.find({
      collection: "media",
      where: { alt: { equals: a.alt } },
      limit: 1,
    });
    if (existente.docs.length) {
      midia[a.file] = Number(existente.docs[0].id);
      continue;
    }
    const doc = await payload.create({
      collection: "media",
      data: { alt: a.alt },
      filePath: path.join(publicDir, a.file),
    });
    midia[a.file] = Number(doc.id);
    log(`mídia: ${a.file}`);
  }

  /* ---------- GLOBAL: PÁGINA INICIAL ---------- */
  await payload.updateGlobal({
    slug: "home",
    data: {
      heroEyebrow: "Experiências Musicais",
      heroLinha1: promise.line1,
      heroLinha2: promise.line2,
      heroSubtitulo: promise.subtitle,
      heroImagem: midia["joao-banner.png"],
      heroCta1: "Criar a experiência do meu evento",
      heroCta2: "Ver momentos",

      manifestoEyebrow: manifesto.eyebrow,
      manifestoParagrafos: manifesto.paragraphs.map((texto) => ({ texto })),
      manifestoFecho1: manifesto.closer,
      manifestoFecho2: promise.line2,

      momentosEyebrow: "A experiência",
      momentosTitulo: "Momentos que permanecem",
      momentosLead:
        "O que fica não é a música que tocou. É o que as pessoas sentiram enquanto ela tocava.",

      publicosEyebrow: "Segmentos",
      publicosTitulo: "Para quem criamos experiências",
      publicosLead: "Cada evento pede uma experiência própria.",

      processoEyebrow: "Nosso processo",
      processoTitulo: "Como cada evento acontece",
      processoLead:
        "Do primeiro contato ao dia seguinte do evento, cada etapa existe para que a experiência aconteça exatamente como você imaginou.",

      formatosEyebrow: "Possibilidades",
      formatosTitulo: "Nossos formatos",
      formatosLead:
        "O formato certo depende do espaço, do público e da atmosfera que você quer criar.",

      provaEyebrow: "Confiança",
      provaTitulo: "Quem já viveu essa experiência",
      empresasTitulo: "Empresas que já confiaram no nosso trabalho",

      agendaEyebrow: "Onde nos ver",
      agendaTitulo: "Próximas apresentações",

      artistaEyebrow: artist.eyebrow,
      artistaNome: artist.name,
      artistaHeadline: artist.headline,
      artistaBio: artist.body,
      artistaFoto: midia["galeria/g-guitarra.png"],
      artistaVideoYoutube: "https://www.youtube.com/watch?v=DThAk8-JNU4",
      artistaCanalYoutube:
        "https://www.youtube.com/channel/UCNw1NSnSufVQxEgyG04BSsA",

      kitEyebrow: "Para produtores e RH",
      kitTitulo: "Kit de Imprensa",
      kitLead:
        "Tudo que a sua produção precisa para fechar com segurança. Peça o material completo — respondemos rápido.",
      kitItens: [
        { texto: "Fotos em alta resolução" },
        { texto: "Rider técnico (som e luz)" },
        { texto: "Release / Bio (one-page)" },
        { texto: "Logo e material de marca" },
      ],
      kitCta: "Solicitar kit completo",

      contatoEyebrow: "Vamos conversar",
      contatoTitulo: "Vamos criar a experiência ideal para o seu evento?",
      contatoLead:
        "Vamos construir juntos a experiência musical ideal para esse momento.",
      contatoPerguntas: [
        { pergunta: "Qual experiência você está planejando?", dica: "Casamento, confraternização, aniversário…" },
        { pergunta: "Quantas pessoas participarão?", dica: "Uma estimativa já ajuda" },
        { pergunta: "Qual atmosfera você imagina?", dica: "Intimista, animada, elegante…" },
      ],
      contatoBotao: "Começar a conversa",
      contatoNota: "Resposta rápida via WhatsApp.",
    },
  });
  log("global: Página Inicial");

  /* ---------- GLOBAL: CONFIGURAÇÕES ---------- */
  await payload.updateGlobal({
    slug: "settings",
    data: {
      whatsapp: cfg.whatsapp,
      whatsappExibicao: cfg.whatsappDisplay,
      cidade: cfg.city,
      instagram: cfg.instagramUrl,
      youtube: cfg.youtubeUrl,
      facebook: cfg.facebookUrl,
      spotify: cfg.spotifyArtistUrl,
      seoTitulo: "Experiências Musicais para Eventos Memoráveis | João Vitor",
      seoDescricao:
        "Experiências musicais sertanejas para eventos corporativos, casamentos e celebrações memoráveis.",
    },
  });
  log("global: Configurações");

  /* ---------- COLLECTIONS ---------- */
  async function semear<T extends Record<string, unknown>>(
    collection: string,
    itens: T[],
    chave: string,
  ) {
    const atual = await payload.count({ collection: collection as never });
    if (atual.totalDocs > 0) {
      log(`${collection}: já tem ${atual.totalDocs} — pulando`);
      return;
    }
    for (const [i, item] of itens.entries()) {
      await payload.create({
        collection: collection as never,
        data: { ...item, ordem: i, publicado: true } as never,
      });
    }
    log(`${collection}: ${itens.length} itens (chave: ${chave})`);
  }

  await semear(
    "publicos",
    audiences.map((a) => ({
      titulo: a.title,
      frase: a.lead,
      descricao: a.description,
      imagem: midia[a.image.replace(/^\//, "")],
    })),
    "titulo",
  );

  await semear(
    "etapas",
    etapasSite.map((e) => ({ titulo: e.title, descricao: e.description })),
    "titulo",
  );

  await semear(
    "formatos",
    formats.map((f) => ({
      titulo: f.title,
      descricao: f.description,
      melhorPara: f.best,
    })),
    "titulo",
  );

  await semear(
    "momentos",
    [
      { imagem: midia["galeria/g-jv2.png"], legenda: "Ao vivo", destaque: true },
      { imagem: midia["galeria/g-jv1.png"], legenda: "Apresentação" },
      { imagem: midia["galeria/g-blessed.png"], legenda: "Bastidores" },
    ],
    "legenda",
  );

  await semear(
    "numeros",
    stats.map((s) => ({ valor: s.value, rotulo: s.label })),
    "rotulo",
  );

  await semear(
    "empresas",
    clients.map((nome) => ({ nome })),
    "nome",
  );

  await semear(
    "frases",
    stagePhrases.map((texto) => ({ texto })),
    "texto",
  );

  await semear(
    "shows",
    showsSite.map((s) => ({
      titulo: s.title,
      data: s.startsAt,
      local: s.venue,
      cidade: s.city,
      uf: s.state,
      descricao: s.description,
      cancelado: false,
    })),
    "titulo",
  );

  log("✅ seed concluído");
  process.exit(0);
}

try {
  await main();
} catch (e) {
  console.error("❌ seed falhou:", e);
  process.exit(1);
}
