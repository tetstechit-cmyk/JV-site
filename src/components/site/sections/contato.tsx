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
import { SectionHeading } from "../section-heading";
import { settings, waLink } from "@/lib/site";

const field =
  "w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-fg placeholder:text-fg-muted focus-visible:border-amber focus-visible:outline-none";

const socials = [
  { href: settings.instagramUrl, label: "Instagram", Icon: InstagramIcon },
  { href: settings.youtubeUrl, label: "YouTube", Icon: YoutubeIcon },
  { href: settings.facebookUrl, label: "Facebook", Icon: FacebookIcon },
  { href: settings.spotifyArtistUrl, label: "Spotify", Icon: SpotifyIcon },
];

export function Contato() {
  const [form, setForm] = useState({
    nome: "",
    tipo: "",
    data: "",
    cidade: "",
    msg: "",
  });

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = [
      `Olá João! Sou ${form.nome || "(nome)"}.`,
      `Quero um orçamento para ${form.tipo || "meu evento"}`,
      form.data ? `no dia ${form.data}` : "",
      form.cidade ? `em ${form.cidade}` : "",
      form.msg ? `\n\n${form.msg}` : "",
    ]
      .filter(Boolean)
      .join(" ")
      .trim();
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  }

  return (
    <Section id="contato">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="Vamos marcar" title="Contato" />
            <p className="max-w-md text-lg leading-relaxed text-fg-muted">
              Show, bar, casamento ou evento corporativo — me conta o que você
              precisa que eu monto a proposta. Resposta rápida no WhatsApp.
            </p>
            <a
              href={waLink("Olá João! Quero falar sobre um evento.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block font-display text-2xl font-bold tracking-tight text-amber hover:underline"
            >
              {settings.whatsappDisplay}
            </a>
            <div className="mt-8 flex items-center gap-3">
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
          </div>

          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-wide text-fg-muted">
                  Seu nome
                </span>
                <input
                  required
                  value={form.nome}
                  onChange={(e) => set("nome", e.target.value)}
                  placeholder="Como te chamo?"
                  className={field}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-wide text-fg-muted">
                  Tipo de evento
                </span>
                <select
                  value={form.tipo}
                  onChange={(e) => set("tipo", e.target.value)}
                  className={field}
                >
                  <option value="">Selecione…</option>
                  <option>Evento corporativo</option>
                  <option>Bar / balada</option>
                  <option>Casamento</option>
                  <option>Aniversário / festa</option>
                  <option>Outro</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-wide text-fg-muted">
                  Data (aprox.)
                </span>
                <input
                  value={form.data}
                  onChange={(e) => set("data", e.target.value)}
                  placeholder="Ex.: 12/09"
                  className={field}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-wide text-fg-muted">
                  Cidade
                </span>
                <input
                  value={form.cidade}
                  onChange={(e) => set("cidade", e.target.value)}
                  placeholder="Onde é o evento?"
                  className={field}
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-wide text-fg-muted">
                Mensagem
              </span>
              <textarea
                value={form.msg}
                onChange={(e) => set("msg", e.target.value)}
                rows={4}
                placeholder="Conta um pouco do evento…"
                className={cn(field, "resize-none")}
              />
            </label>
            <button
              type="submit"
              className={cn(buttonVariants({ size: "lg" }), "h-12 text-sm")}
            >
              Enviar pelo WhatsApp
            </button>
          </form>
        </div>
      </Container>
    </Section>
  );
}
