// Conteúdo do site — MOCK tipado, espelhando o modelo Prisma do blueprint.
// No Escopo 2 isto vira leitura do Neon; os componentes não mudam.
// ⚠️ Números e depoimentos são PLACEHOLDER até o João mandar os reais.

export type Show = {
  id: string;
  title: string;
  venue: string;
  city: string;
  state: string;
  startsAt: string; // ISO
  ticketUrl?: string;
  description?: string;
  isCancelled?: boolean;
};

export type Audience = {
  id: string;
  title: string;
  lead: string;
  description: string;
  image: string;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type Format = {
  id: string;
  title: string;
  description: string;
  best: string;
};

export type Testimonial = {
  id: string;
  author: string;
  role?: string;
  quote: string;
};

export type Stat = { id: string; label: string; value: string };

export const settings = {
  name: "João Vitor",
  role: "Cantor Oficial",
  tagline: "Experiências Musicais",
  city: "São Paulo · SP",
  whatsapp: "5511986894866",
  whatsappDisplay: "(11) 98689-4866",
  instagramUrl: "https://www.instagram.com/joaovitorcantoroficial/",
  youtubeUrl: "https://www.youtube.com/@JoaoVitorCantorOficial",
  facebookUrl: "https://www.facebook.com/profile.php?id=100075582231309",
  spotifyArtistUrl: "https://open.spotify.com/artist/1NcHjMiIbcuCDUW9sg0Fls",
};

/** A promessa central — repetida como fio condutor da página. */
export const promise = {
  line1: "Música não preenche espaços.",
  line2: "Ela transforma momentos em memória.",
  subtitle:
    "Experiências musicais sertanejas para eventos corporativos, casamentos e celebrações memoráveis.",
};

export const manifesto = {
  eyebrow: "No que acreditamos",
  /** "Porque" é do texto original do briefing — não remover. */
  closer: "Porque música não preenche espaços.",
  paragraphs: [
    "Acreditamos que a música vai muito além do entretenimento. Ela aproxima pessoas, celebra conquistas, marca o início de histórias e transforma encontros em lembranças.",
    "Cada evento possui uma energia única e merece uma trilha sonora construída com sensibilidade, presença e profissionalismo.",
    "Mais do que apresentações musicais, criamos experiências através do sertanejo para empresas, casamentos e celebrações que desejam ser lembradas.",
  ],
};

/** Link de WhatsApp com mensagem pré-preenchida (CTA de conversão). */
export function waLink(text: string): string {
  return `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(text)}`;
}

// Datas 2026 (hoje = 22/07/2026). ⚠️ Shows placeholder — trocar pelos reais.
export const shows: Show[] = [
  {
    id: "s1",
    title: "Sertanejo no Simples",
    venue: "Loirassa Bar",
    city: "Sorocaba",
    state: "SP",
    startsAt: "2026-07-30T21:00:00-03:00",
    description: "Toda quinta — o melhor do sertanejo ao vivo, num clima descontraído.",
  },
  {
    id: "s2",
    title: "Sertanejo no Simples",
    venue: "Loirassa Bar",
    city: "Sorocaba",
    state: "SP",
    startsAt: "2026-08-06T21:00:00-03:00",
    description: "Resenha ao vivo e na unha — clássicos e o que tá tocando agora.",
  },
  {
    id: "s3",
    title: "Evento Corporativo · Confraternização",
    venue: "Espaço a confirmar",
    city: "São Paulo",
    state: "SP",
    startsAt: "2026-09-12T20:00:00-03:00",
    description: "Show sob medida para evento de empresa.",
  },
];

/** Shows futuros, derivados da data (upcoming/past NÃO é campo manual). */
export function upcomingShows(list: Show[] = shows): Show[] {
  const now = Date.now();
  return list
    .filter((s) => !s.isCancelled && new Date(s.startsAt).getTime() >= now)
    .sort(
      (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
    );
}

/** Para quem criamos experiências. */
export const audiences: Audience[] = [
  {
    id: "a1",
    title: "Eventos Corporativos",
    lead: "Quando a empresa celebra, todo mundo lembra.",
    description:
      "Confraternizações, premiações e convenções que precisam de energia certa na hora certa. Postura profissional, repertório alinhado ao público e compromisso absoluto com o cronograma.",
    image: "/galeria/g-blessed.png",
  },
  {
    id: "a2",
    title: "Casamentos",
    lead: "A trilha sonora do dia que não se repete.",
    description:
      "Da cerimônia à pista, cada momento com a música que ele pede. Sensibilidade para emocionar na hora do sim e presença para não deixar a festa cair.",
    image: "/galeria/g-jv2.png",
  },
  {
    id: "a3",
    title: "Eventos Privados",
    lead: "Celebrações que merecem ser lembradas.",
    description:
      "Aniversários, encontros e comemorações íntimas. Um formato pensado para o tamanho do seu espaço e para a atmosfera que você imagina.",
    image: "/galeria/g-jv1.png",
  },
];

/** Como cada evento acontece — organização e profissionalismo. */
export const processSteps: ProcessStep[] = [
  {
    id: "p1",
    title: "Briefing",
    description:
      "Entendemos o evento, o público e a sensação que você quer provocar. Antes da música, vem a escuta.",
  },
  {
    id: "p2",
    title: "Planejamento",
    description:
      "Formato, estrutura de som e luz, tempo de palco e cronograma alinhados com a sua produção.",
  },
  {
    id: "p3",
    title: "Repertório Personalizado",
    description:
      "Uma seleção construída para o seu momento — do clássico que emociona ao hit que enche a pista.",
  },
  {
    id: "p4",
    title: "Execução",
    description:
      "No dia, presença e leitura de público. A energia sobe e desce na hora certa, do início ao fim.",
  },
  {
    id: "p5",
    title: "Pós-evento",
    description:
      "Registro dos melhores momentos e um retorno sobre a experiência. A memória continua depois da última música.",
  },
];

/** Nossos formatos. */
export const formats: Format[] = [
  {
    id: "f1",
    title: "Solo",
    description:
      "Voz e violão. Intimista, envolvente e perfeito para momentos de proximidade.",
    best: "Cerimônias, recepções e jantares",
  },
  {
    id: "f2",
    title: "Dupla",
    description:
      "Mais corpo e dinâmica, mantendo a leveza. O equilíbrio entre clima e energia.",
    best: "Confraternizações e festas médias",
  },
  {
    id: "f3",
    title: "Banda Completa",
    description:
      "A experiência cheia: banda, som e luz para encher qualquer palco e qualquer pista.",
    best: "Grandes eventos e casamentos",
  },
  {
    id: "f4",
    title: "Experiência Personalizada",
    description:
      "Formato desenhado do zero para o seu evento — estrutura, repertório e tempo sob medida.",
    best: "Quando o momento pede algo único",
  },
];

// ⚠️ PLACEHOLDER — confirmar números REAIS com o João antes de publicar.
export const stats: Stat[] = [
  { id: "st1", label: "Eventos realizados", value: "+300" },
  { id: "st2", label: "Pessoas impactadas", value: "+50 mil" },
  { id: "st3", label: "Anos de estrada", value: "8" },
];

// Preencher com depoimentos REAIS de contratantes (pedido ao João).
export const testimonials: Testimonial[] = [];

// Empresas que já contrataram (prova social B2B).
export const clients = [
  "Assaí Atacadista",
  "Eztec Empreendimentos",
  "Setin Incorporadora",
  "Pragma Gestão de Patrimônio",
  "Promofarma",
  "Nextcar",
  "Labrits Química",
  "Imbras Equip. Magnéticos",
  "Clube Primeiro de Maio",
  "RTE Rolamentos",
];

// Frases de palco — identidade do João (usadas na seção do artista).
export const stagePhrases = [
  "Eu queria não querer, mas já que eu quero… deixa cair, papai!",
  "Essa noite eu chego igual ao papa, beijando o chão.",
  "Tá na hora de molhar o pescoço por dentro.",
  "Não quero saber quem pintou a barata de verniz, só sei que eu quero o resto da tinta.",
];

/**
 * Player do Spotify.
 *
 * type "artist" → mostra "Top tracks": a ordem é ALGORÍTMICA (popularidade),
 *                 não dá para editar.
 * type "playlist" → mostra as faixas na ORDEM DA PLAYLIST. O João controla
 *                 tudo pelo app do Spotify (reordenar, incluir, remover),
 *                 sem precisar mexer no site.  ← recomendado
 *
 * Para trocar: crie a playlist no Spotify → Compartilhar → Copiar link →
 * pegue o ID depois de /playlist/ e cole abaixo, mudando o type.
 */
export const spotifyEmbed = {
  type: "artist" as "artist" | "playlist" | "album",
  id: "1NcHjMiIbcuCDUW9sg0Fls",
};

export function spotifyEmbedUrl(): string {
  return `https://open.spotify.com/embed/${spotifyEmbed.type}/${spotifyEmbed.id}?utm_source=generator&theme=0`;
}

/** Bio do artista — revelado DEPOIS da experiência. */
export const artist = {
  eyebrow: "Quem conduz a experiência",
  name: "João Vitor",
  headline: "Oito anos de estrada. Uma entrega só.",
  body: "João Vitor leva o melhor do sertanejo para cada palco — do bar lotado ao evento corporativo. Da moda de viola aos hits que tocam hoje, é leitura de público na veia: sabe a hora de emocionar e a hora de fazer a pista pular. Voz, presença e aquela pegada que faz a noite não cair.",
  image: "/galeria/g-guitarra.png",
};
