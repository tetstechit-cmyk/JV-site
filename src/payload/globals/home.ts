import type { GlobalConfig } from "payload";
import { somenteAdmin } from "../access";
import { revalidarGlobal } from "../hooks/revalidar";

/**
 * Página Inicial — todos os textos fixos do site, em ABAS por seção.
 *
 * Uma tela só (em vez de 11), porque o mantenedor é não-técnico: ele abre
 * "Página Inicial" e navega pelas abas na mesma ordem em que as seções
 * aparecem no site.
 *
 * Os campos ESTRATÉGICOS (promessa do hero, manifesto) levam aviso — foram
 * definidos no posicionamento e não devem ser reescritos sem critério.
 */
export const Home: GlobalConfig = {
  slug: "home",
  label: "Textos da página",
  // API fechada: o site lê via Local API (overrideAccess). Sem isto, o
  // rascunho vazava por GET /api/globals/home?draft=true. (SEC-002)
  access: { read: somenteAdmin, update: somenteAdmin },
  hooks: { afterChange: [revalidarGlobal] },
  admin: { group: "Conteúdo do site" },
  versions: { drafts: true, max: 30 }, // histórico p/ reverter
  fields: [
    {
      type: "tabs",
      tabs: [
        // ---------------- HERO ----------------
        {
          label: "1. Abertura",
          description:
            "A primeira coisa que o visitante vê. É a promessa da marca — mude com cuidado.",
          fields: [
            { name: "heroEyebrow", type: "text", label: "Rótulo pequeno", defaultValue: "Experiências Musicais" },
            {
              name: "heroLinha1",
              type: "text",
              label: "Frase principal — linha 1",
              required: true,
              defaultValue: "Música não preenche espaços.",
              admin: { description: "⚠️ Promessa da marca, definida no posicionamento." },
            },
            {
              name: "heroLinha2",
              type: "text",
              label: "Frase principal — linha 2 (em dourado)",
              required: true,
              defaultValue: "Ela transforma momentos em memória.",
              admin: { description: "⚠️ Promessa da marca, definida no posicionamento." },
            },
            {
              name: "heroSubtitulo",
              type: "textarea",
              label: "Subtítulo",
              required: true,
              defaultValue:
                "Experiências musicais sertanejas para eventos corporativos, casamentos e celebrações memoráveis.",
            },
            {
              name: "heroVideo",
              type: "upload",
              relationTo: "media",
              label: "Vídeo de abertura — arquivo (opcional)",
              admin: {
                description:
                  "Compilado de eventos: casamentos, corporativo, plateia, brindes, luzes. Melhor qualidade. Se vazio, tenta o link do YouTube; senão a imagem.",
              },
            },
            {
              name: "heroVideoYoutube",
              type: "text",
              label: "OU link do YouTube (opcional)",
              validate: (v: unknown) =>
                !v ||
                /(youtu\.be\/|youtube\.com\/)/.test(String(v)) ||
                "Cole um link do YouTube (youtube.com ou youtu.be).",
              admin: {
                description:
                  "Cole o link de um vídeo do YouTube para usar de fundo, sem subir arquivo. Toca mudo, em loop, sem controles nem legenda. Prefira um vídeo HORIZONTAL. O arquivo acima tem prioridade sobre o link.",
              },
            },
            {
              name: "heroVideoInicio",
              type: "number",
              label: "YouTube — começar em (segundos)",
              min: 0,
              admin: {
                width: "50%",
                description: "Ex.: 12 começa aos 12s. Vazio = do início.",
                condition: (data) => Boolean(data?.heroVideoYoutube),
              },
            },
            {
              name: "heroVideoFim",
              type: "number",
              label: "YouTube — terminar em (segundos)",
              min: 0,
              admin: {
                width: "50%",
                description: "Ex.: 30 corta aos 30s e reinicia o trecho. Vazio = até o fim.",
                condition: (data) => Boolean(data?.heroVideoYoutube),
              },
            },
            {
              name: "heroImagem",
              type: "upload",
              relationTo: "media",
              label: "Imagem de fundo (usada se não houver vídeo)",
            },
            { name: "heroCta1", type: "text", label: "Botão principal", defaultValue: "Criar a experiência do meu evento" },
            { name: "heroCta2", type: "text", label: "Botão secundário", defaultValue: "Ver momentos" },
          ],
        },

        // ---------------- MANIFESTO ----------------
        {
          label: "2. Manifesto",
          description: "No que acreditamos. Abre a página contando a filosofia.",
          fields: [
            { name: "manifestoEyebrow", type: "text", label: "Rótulo pequeno", defaultValue: "No que acreditamos" },
            {
              name: "manifestoParagrafos",
              type: "array",
              label: "Parágrafos",
              labels: { singular: "Parágrafo", plural: "Parágrafos" },
              fields: [{ name: "texto", type: "textarea", label: "Texto", required: true }],
              admin: { description: "Arraste para reordenar. O primeiro aparece em destaque maior." },
            },
            {
              name: "manifestoFecho1",
              type: "text",
              label: "Frase de fecho — linha 1",
              defaultValue: "Porque música não preenche espaços.",
            },
            {
              name: "manifestoFecho2",
              type: "text",
              label: "Frase de fecho — linha 2 (dourado)",
              defaultValue: "Ela transforma momentos em memória.",
            },
          ],
        },

        // ---------------- TÍTULOS DAS SEÇÕES ----------------
        {
          label: "3. Títulos das seções",
          description:
            "Os títulos que aparecem acima de cada bloco. Os itens de cada lista você edita no menu lateral.",
          fields: [
            { name: "momentosEyebrow", type: "text", label: "Momentos · rótulo", defaultValue: "A experiência" },
            { name: "momentosTitulo", type: "text", label: "Momentos · título", defaultValue: "Momentos que permanecem" },
            { name: "momentosLead", type: "textarea", label: "Momentos · texto de apoio" },

            { name: "publicosEyebrow", type: "text", label: "Para quem · rótulo", defaultValue: "Segmentos" },
            { name: "publicosTitulo", type: "text", label: "Para quem · título", defaultValue: "Para quem criamos experiências" },
            { name: "publicosLead", type: "textarea", label: "Para quem · texto de apoio" },

            { name: "processoEyebrow", type: "text", label: "Processo · rótulo", defaultValue: "Nosso processo" },
            { name: "processoTitulo", type: "text", label: "Processo · título", defaultValue: "Como cada evento acontece" },
            { name: "processoLead", type: "textarea", label: "Processo · texto de apoio" },

            { name: "formatosEyebrow", type: "text", label: "Formatos · rótulo", defaultValue: "Possibilidades" },
            { name: "formatosTitulo", type: "text", label: "Formatos · título", defaultValue: "Nossos formatos" },
            { name: "formatosLead", type: "textarea", label: "Formatos · texto de apoio" },

            { name: "provaEyebrow", type: "text", label: "Quem já viveu · rótulo", defaultValue: "Confiança" },
            { name: "provaTitulo", type: "text", label: "Quem já viveu · título", defaultValue: "Quem já viveu essa experiência" },
            { name: "empresasTitulo", type: "text", label: "Empresas · frase acima da lista", defaultValue: "Empresas que já confiaram no nosso trabalho" },

            { name: "agendaEyebrow", type: "text", label: "Agenda · rótulo", defaultValue: "Onde nos ver" },
            { name: "agendaTitulo", type: "text", label: "Agenda · título", defaultValue: "Próximas apresentações" },
          ],
        },

        // ---------------- ARTISTA ----------------
        {
          label: "4. O artista",
          description: "Aparece depois da experiência — é a revelação de quem entrega.",
          fields: [
            { name: "artistaEyebrow", type: "text", label: "Rótulo pequeno", defaultValue: "Quem conduz a experiência" },
            { name: "artistaNome", type: "text", label: "Nome", defaultValue: "João Vitor" },
            { name: "artistaHeadline", type: "text", label: "Frase de destaque (dourado)" },
            { name: "artistaBio", type: "textarea", label: "Biografia", required: true },
            { name: "artistaFoto", type: "upload", relationTo: "media", label: "Foto" },
            {
              name: "artistaVideoYoutube",
              type: "text",
              label: "Vídeo de capa (link do YouTube)",
              validate: (v: unknown) =>
                !v ||
                /(youtu\.be\/|youtube\.com\/)/.test(String(v)) ||
                "Cole um link do YouTube (youtube.com ou youtu.be).",
              admin: {
                description:
                  "Aparece como capa na seção do artista. Ao clicar, toca aqui no site. Cole o link do vídeo (ex.: https://www.youtube.com/watch?v=...).",
              },
            },
            {
              name: "artistaCanalYoutube",
              type: "text",
              label: "Link do canal no YouTube",
              validate: (v: unknown) =>
                !v ||
                /youtube\.com\//.test(String(v)) ||
                "Cole o link do canal (youtube.com/...).",
              admin: {
                description:
                  "Botão 'Ver canal no YouTube' abaixo do vídeo leva para cá.",
              },
            },
          ],
        },

        // ---------------- KIT + CONTATO ----------------
        {
          label: "5. Kit e Contato",
          fields: [
            { name: "kitEyebrow", type: "text", label: "Kit · rótulo", defaultValue: "Para produtores e RH" },
            { name: "kitTitulo", type: "text", label: "Kit · título", defaultValue: "Kit de Imprensa" },
            { name: "kitLead", type: "textarea", label: "Kit · texto" },
            {
              name: "kitItens",
              type: "array",
              label: "Kit · o que inclui",
              labels: { singular: "Item", plural: "Itens" },
              fields: [{ name: "texto", type: "text", label: "Item", required: true }],
            },
            { name: "kitCta", type: "text", label: "Kit · botão", defaultValue: "Solicitar kit completo" },

            { name: "contatoEyebrow", type: "text", label: "Contato · rótulo", defaultValue: "Vamos conversar" },
            {
              name: "contatoTitulo",
              type: "text",
              label: "Contato · título",
              defaultValue: "Vamos criar a experiência ideal para o seu evento?",
            },
            {
              name: "contatoLead",
              type: "textarea",
              label: "Contato · texto",
              defaultValue: "Vamos construir juntos a experiência musical ideal para esse momento.",
            },
            {
              name: "contatoPerguntas",
              type: "array",
              label: "Perguntas do formulário",
              labels: { singular: "Pergunta", plural: "Perguntas" },
              fields: [
                { name: "pergunta", type: "text", label: "Pergunta", required: true },
                { name: "dica", type: "text", label: "Dica dentro do campo" },
              ],
              admin: { description: "Arraste para reordenar." },
            },
            { name: "contatoBotao", type: "text", label: "Texto do botão", defaultValue: "Começar a conversa" },
            { name: "contatoNota", type: "text", label: "Nota abaixo do telefone", defaultValue: "Resposta rápida via WhatsApp." },
          ],
        },
      ],
    },
  ],
};
