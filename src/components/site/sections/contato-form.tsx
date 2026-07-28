"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  InstagramIcon,
  YoutubeIcon,
  FacebookIcon,
  SpotifyIcon,
} from "@/components/brand/social-icons";
import { Container, Section } from "../container";
import { Reveal } from "../reveal";
/** Conteúdo vindo do painel (buscado pelo server component `Contato`). */
export type ConteudoContato = {
  eyebrow: string;
  titulo: string;
  lead: string;
  botao: string;
  nota: string;
  whatsapp: string;
  whatsappExibicao: string;
  perguntas: { pergunta: string; dica: string }[];
  redes: { instagram: string; youtube: string; facebook: string; spotify: string };
};

/** Campo com underline — conversa, não formulário burocrático. */
const field =
  "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-base text-fg transition-colors placeholder:text-fg-muted/60 focus:border-amber focus:outline-none";

const CHAVES = ["tipo", "pessoas", "atmosfera"] as const;

export function ContatoForm({ conteudo }: { conteudo: ConteudoContato }) {
  const [form, setForm] = useState({
    tipo: "",
    pessoas: "",
    atmosfera: "",
    sobre: "",
    nome: "",
    telefone: "",
    email: "",
  });

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const socials = [
    { href: conteudo.redes.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: conteudo.redes.youtube, label: "YouTube", Icon: YoutubeIcon },
    { href: conteudo.redes.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: conteudo.redes.spotify, label: "Spotify", Icon: SpotifyIcon },
  ].filter((s) => s.href);

  const wa = (texto: string) =>
    `https://wa.me/${conteudo.whatsapp}?text=${encodeURIComponent(texto)}`;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = [
      `Olá! Sou ${form.nome || "(nome)"}.`,
      "",
      `Experiência que estou planejando: ${form.tipo || "—"}`,
      `Número de pessoas: ${form.pessoas || "—"}`,
      `Atmosfera imaginada: ${form.atmosfera || "—"}`,
      form.sobre ? `\nSobre o evento: ${form.sobre}` : "",
      form.email ? `\nE-mail: ${form.email}` : "",
      form.telefone ? `Telefone: ${form.telefone}` : "",
    ]
      .filter((l) => l !== "")
      .join("\n")
      .trim();
    window.open(wa(text), "_blank", "noopener,noreferrer");
  }

  return (
    <Section id="contato">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-5">{conteudo.eyebrow}</p>
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.1] font-semibold text-fg">
              {conteudo.titulo}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-fg-muted">
              {conteudo.lead}
            </p>

            <a
              href={wa("Olá! Quero falar sobre uma experiência para meu evento.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-block font-display text-2xl font-light text-amber transition-opacity hover:opacity-80 sm:text-3xl"
            >
              {conteudo.whatsappExibicao}
            </a>
            <p className="mt-2 text-sm text-fg-muted">{conteudo.nota}</p>

            <div className="mt-9 flex items-center gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-11 items-center justify-center rounded-full border border-line text-fg-muted transition-colors hover:border-amber hover:text-amber"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <form onSubmit={onSubmit} className="space-y-10">
              {conteudo.perguntas.map((q, i) => (
                <div key={i}>
                  <label
                    htmlFor={CHAVES[i] ?? `p${i}`}
                    className="mb-2 block font-display text-xl font-semibold text-fg sm:text-2xl"
                  >
                    <span className="mr-3 font-sans text-xs tracking-widest text-amber">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {q.pergunta}
                  </label>
                  <input
                    id={CHAVES[i] ?? `p${i}`}
                    value={CHAVES[i] ? form[CHAVES[i]] : ""}
                    onChange={(e) =>
                      CHAVES[i] && set(CHAVES[i], e.target.value)
                    }
                    placeholder={q.dica}
                    className={field}
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="sobre"
                  className="mb-2 block font-display text-xl font-semibold text-fg sm:text-2xl"
                >
                  <span className="mr-3 font-sans text-xs tracking-widest text-amber">
                    04
                  </span>
                  Conte um pouco sobre o seu evento
                </label>
                <textarea
                  id="sobre"
                  rows={3}
                  value={form.sobre}
                  onChange={(e) => set("sobre", e.target.value)}
                  placeholder="Data, local, o que não pode faltar…"
                  className={cn(field, "resize-none")}
                />
              </div>

              <div className="grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
                <div>
                  <label htmlFor="nome" className="eyebrow mb-1 block">
                    Nome
                  </label>
                  <input
                    id="nome"
                    required
                    value={form.nome}
                    onChange={(e) => set("nome", e.target.value)}
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="telefone" className="eyebrow mb-1 block">
                    Telefone
                  </label>
                  <input
                    id="telefone"
                    type="tel"
                    inputMode="tel"
                    value={form.telefone}
                    onChange={(e) => set("telefone", e.target.value)}
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="eyebrow mb-1 block">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={field}
                  />
                </div>
              </div>

              <button
                type="submit"
                className={cn(buttonVariants({ size: "lg" }), "h-12 w-full text-sm")}
              >
                {conteudo.botao}
              </button>
            </form>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
