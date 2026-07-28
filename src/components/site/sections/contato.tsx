import { settings as mockSettings } from "@/lib/site";
import { getHome, getSettings, txt } from "@/lib/content";
import { ContatoForm, type ConteudoContato } from "./contato-form";

/** Server component: busca o conteúdo do painel e entrega ao formulário. */
export async function Contato() {
  const [home, cfg] = await Promise.all([getHome(), getSettings()]);
  const h = (home ?? {}) as Record<string, unknown>;
  const s = (cfg ?? {}) as Record<string, unknown>;

  const perguntasBanco = Array.isArray(h.contatoPerguntas)
    ? (h.contatoPerguntas as { pergunta?: string; dica?: string }[])
        .map((p) => ({
          pergunta: String(p?.pergunta ?? "").trim(),
          dica: String(p?.dica ?? "").trim(),
        }))
        .filter((p) => p.pergunta)
    : [];

  const conteudo: ConteudoContato = {
    eyebrow: txt(h.contatoEyebrow, "Vamos conversar"),
    titulo: txt(h.contatoTitulo, "Vamos criar a experiência ideal para o seu evento?"),
    lead: txt(
      h.contatoLead,
      "Vamos construir juntos a experiência musical ideal para esse momento.",
    ),
    botao: txt(h.contatoBotao, "Começar a conversa"),
    nota: txt(h.contatoNota, "Resposta rápida via WhatsApp."),
    whatsapp: txt(s.whatsapp, mockSettings.whatsapp),
    whatsappExibicao: txt(s.whatsappExibicao, mockSettings.whatsappDisplay),
    perguntas: perguntasBanco.length
      ? perguntasBanco
      : [
          { pergunta: "Qual experiência você está planejando?", dica: "Casamento, confraternização, aniversário…" },
          { pergunta: "Quantas pessoas participarão?", dica: "Uma estimativa já ajuda" },
          { pergunta: "Qual atmosfera você imagina?", dica: "Intimista, animada, elegante…" },
        ],
    redes: {
      instagram: txt(s.instagram, mockSettings.instagramUrl),
      youtube: txt(s.youtube, mockSettings.youtubeUrl),
      facebook: txt(s.facebook, mockSettings.facebookUrl),
      spotify: txt(s.spotify, mockSettings.spotifyArtistUrl),
    },
  };

  return <ContatoForm conteudo={conteudo} />;
}
