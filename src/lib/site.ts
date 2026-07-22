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

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string; // nome de ícone lucide
};

export type Differential = {
  id: string;
  title: string;
  description: string;
  icon: string;
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
  tagline: "Cantor Sertanejo",
  city: "São Paulo · SP",
  whatsapp: "5511986894866",
  whatsappDisplay: "(11) 98689-4866",
  instagramUrl: "https://www.instagram.com/joaovitorcantoroficial/",
  youtubeUrl: "https://www.youtube.com/@JoaoVitorCantorOficial",
  facebookUrl: "https://www.facebook.com/profile.php?id=100075582231309",
  spotifyArtistUrl: "https://open.spotify.com/artist/1NcHjMiIbcuCDUW9sg0Fls",
  // Rascunho de bio (a revisar com o João):
  bioHeadline: "Do bar lotado ao palco corporativo — a mesma entrega.",
  bioBody:
    "João Vitor leva o melhor do sertanejo pra cada palco. Da moda de viola aos hits que tocam hoje, é leitura de público na veia: sabe a hora de emocionar e a hora de fazer a pista pular. Voz, presença e aquela pegada que faz a noite não cair.",
};

/** Link de WhatsApp com mensagem pré-preenchida (CTA de conversão). */
export function waLink(text: string): string {
  return `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(text)}`;
}

// Datas 2026 (hoje = 21/07/2026). ⚠️ Shows placeholder — trocar pelos reais.
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

export const differentials: Differential[] = [
  {
    id: "d1",
    icon: "Flame",
    title: "Repertório que enche a pista",
    description:
      "Da moda de viola ao sertanejo que tá tocando agora. Leitura de público na hora — a pista não esvazia.",
  },
  {
    id: "d2",
    icon: "Speaker",
    title: "Estrutura profissional",
    description:
      "Som e luz de qualidade, banda afiada e pontualidade. O palco chega pronto pro seu evento.",
  },
  {
    id: "d3",
    icon: "Building2",
    title: "Palco corporativo",
    description:
      "Experiência em evento de empresa: postura, repertório sob medida e compromisso com o horário.",
  },
  {
    id: "d4",
    icon: "PartyPopper",
    title: "Energia do início ao fim",
    description:
      "A noite não cai. Entrega constante que segura a pista até a última música.",
  },
];

export const services: Service[] = [
  {
    id: "sv1",
    icon: "Mic2",
    title: "Show completo (com banda)",
    description: "A experiência cheia: banda, som e luz pra encher qualquer palco.",
  },
  {
    id: "sv2",
    icon: "Guitar",
    title: "Voz e violão (acústico)",
    description: "Formato intimista pra bares, recepções e momentos mais próximos.",
  },
  {
    id: "sv3",
    icon: "Building2",
    title: "Eventos corporativos",
    description: "Confraternizações e ações de empresa, com repertório sob medida.",
  },
  {
    id: "sv4",
    icon: "Heart",
    title: "Casamentos e festas",
    description: "Da cerimônia à pista — a trilha da sua festa do jeito certo.",
  },
];

// ⚠️ PLACEHOLDER — confirmar números REAIS com o João antes de publicar.
export const stats: Stat[] = [
  { id: "st1", label: "Shows realizados", value: "+300" },
  { id: "st2", label: "Pessoas na plateia", value: "+50 mil" },
  { id: "st3", label: "Anos de estrada", value: "8" },
];

// Preencher com depoimentos REAIS de contratantes (pedido ao João).
export const testimonials: Testimonial[] = [];

// Empresas que já contrataram (prova social B2B). Logos entram quando o João mandar.
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

// Frases de palco — identidade do João (completas).
export const stagePhrases = [
  "Eu queria não querer, mas já que eu quero… deixa cair, papai!",
  "Essa noite eu chego igual ao papa, beijando o chão.",
  "Tá na hora de molhar o pescoço por dentro.",
  "Não quero saber quem pintou a barata de verniz, só sei que eu quero o resto da tinta.",
];
