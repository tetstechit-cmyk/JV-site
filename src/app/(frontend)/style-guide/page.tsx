import type { Metadata } from "next";
import { Soundwave } from "@/components/brand/soundwave";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Design System",
  description: "Meia-Noite no Palco — o sistema visual de João Vitor.",
};

/* ---------- helpers locais ---------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="h-2 w-2 rounded-full bg-amber shadow-[0_0_12px] shadow-amber/60" />
      <h2 className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-fg-muted">
        {children}
      </h2>
    </div>
  );
}

function Swatch({
  name,
  hex,
  className,
  dark,
}: {
  name: string;
  hex: string;
  className: string;
  dark?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className={`h-24 w-full ${className}`} />
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-display text-sm font-medium uppercase tracking-wide">
          {name}
        </span>
        <span
          className={`font-mono text-xs ${dark ? "text-fg-muted" : "text-fg-muted"}`}
        >
          {hex}
        </span>
      </div>
    </div>
  );
}

/* ---------- página ---------- */

export default function StyleGuidePage() {
  return (
    <main className="relative mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
      {/* HERO */}
      <header className="relative grain mb-28 overflow-hidden rounded-3xl border border-line bg-ink-2 px-6 py-16 sm:px-14 sm:py-24">
        <div className="pointer-events-none absolute inset-x-0 -top-1/3 h-2/3 bg-[radial-gradient(50%_60%_at_50%_100%,color-mix(in_oklab,var(--amber)_30%,transparent),transparent_70%)]" />
        <div className="relative">
          <p className="mb-6 font-display text-xs font-semibold uppercase tracking-[0.4em] text-amber">
            Design System · Meia-Noite no Palco
          </p>

          <Soundwave bars={52} height={60} className="mb-8 max-w-2xl" />

          <h1 className="font-display font-bold uppercase leading-[0.86] tracking-[-0.02em] text-fg">
            <span className="block text-[clamp(3rem,13vw,9rem)]">João Vitor</span>
            <span className="mt-2 block text-[clamp(1rem,4.5vw,2.4rem)] font-medium tracking-[0.35em] text-fg-muted">
              Cantor Oficial
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-fg-muted">
            Não é site de artista comum. É vitrine de quem chegou grande — dark,
            cinematográfico, com a onda de áudio dele como assinatura. Feito pra
            fechar palco corporativo.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button size="lg" className="h-11 px-6 text-sm">
              Contratar pro meu evento
            </Button>
            <Button variant="outline" size="lg" className="h-11 px-6 text-sm">
              Ver agenda
            </Button>
          </div>
        </div>
      </header>

      {/* FRASE DE PALCO */}
      <section className="mb-28">
        <SectionLabel>Voz de palco — a identidade dele</SectionLabel>
        <blockquote className="relative border-l-2 border-coral pl-6 sm:pl-10">
          <p className="font-display text-[clamp(2rem,7vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.01em] text-fg">
            Deixa cair,{" "}
            <span className="text-amber">papai!</span>
          </p>
        </blockquote>
        <ul className="mt-10 grid gap-3 text-fg-muted sm:grid-cols-2">
          {[
            "Essa noite eu chego igual ao papa, beijando o chão.",
            "Tá na hora de molhar o pescoço por dentro.",
            "Eu queria não querer, mas já que eu quero…",
            "Só sei que eu quero o resto da tinta.",
          ].map((f) => (
            <li
              key={f}
              className="rounded-lg border border-line bg-surface px-4 py-3 text-sm italic"
            >
              “{f}”
            </li>
          ))}
        </ul>
      </section>

      {/* PALETA */}
      <section className="mb-28">
        <SectionLabel>Paleta</SectionLabel>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <Swatch name="Palco" hex="#0A0A0B" className="bg-ink" />
          <Swatch name="Superfície" hex="#16161A" className="bg-surface" />
          <Swatch name="Refletor" hex="#EAA23A" className="bg-amber" />
          <Swatch name="Coral" hex="#EC6A5C" className="bg-coral" />
          <Swatch name="Contraluz" hex="#33B7AC" className="bg-teal" />
          <Swatch name="Luz" hex="#F4F1EA" className="bg-fg" />
        </div>
      </section>

      {/* TIPOGRAFIA */}
      <section className="mb-28">
        <SectionLabel>Tipografia</SectionLabel>
        <div className="space-y-8">
          <div className="rounded-xl border border-line bg-surface p-6 sm:p-10">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-fg-muted">
              Display — Oswald (títulos, caixa-alta)
            </p>
            <p className="font-display text-6xl font-bold uppercase leading-none tracking-tight">
              Sertanejo ao vivo
            </p>
            <p className="mt-3 font-display text-2xl font-medium uppercase tracking-[0.2em] text-fg-muted">
              Agenda · Diferenciais · Serviços
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-6 sm:p-10">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-fg-muted">
              Corpo — Hanken Grotesk
            </p>
            <p className="max-w-2xl text-lg leading-relaxed">
              João Vitor leva o melhor do sertanejo pra cada palco — do bar
              lotado ao evento corporativo. Moda de viola, clássicos que marcaram
              época e a energia que faz a noite não acabar.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">
              Texto de apoio, legendas e detalhes vivem aqui — legível, discreto,
              com leve calor.
            </p>
          </div>
        </div>
      </section>

      {/* SOUNDWAVE */}
      <section className="mb-28">
        <SectionLabel>Assinatura — Soundwave</SectionLabel>
        <div className="space-y-6">
          <div className="rounded-xl border border-line bg-ink-2 p-8">
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-fg-muted">
              Animado — respira devagar. Regra: 1 por tela (só no hero).
            </p>
            <Soundwave bars={56} height={64} />
          </div>
          <div className="rounded-xl border border-line bg-ink-2 p-8">
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-fg-muted">
              Estático — divisória de seção
            </p>
            <Soundwave bars={72} height={44} animated={false} />
          </div>
        </div>
      </section>

      {/* COMPONENTES */}
      <section className="mb-28">
        <SectionLabel>Componentes</SectionLabel>

        <div className="mb-10 space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-fg-muted">
            Botões
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Contratar</Button>
            <Button variant="outline">Ver agenda</Button>
            <Button variant="secondary">Kit imprensa</Button>
            <Button variant="ghost">Saiba mais</Button>
            <Button variant="link">Spotify</Button>
          </div>
        </div>

        <div className="mb-10 space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-fg-muted">
            Badges
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Próximo show</Badge>
            <Badge variant="secondary">Corporativo</Badge>
            <Badge variant="outline">Ao vivo</Badge>
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-fg-muted">
            Card — mock de “próximo show”
          </p>
          <Card className="max-w-md overflow-hidden">
            <div className="bg-[radial-gradient(60%_100%_at_0%_0%,color-mix(in_oklab,var(--coral)_22%,transparent),transparent)]">
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <Badge>Quinta-feira</Badge>
                  <Badge variant="outline">Sorocaba · SP</Badge>
                </div>
                <CardTitle className="font-display text-3xl font-bold uppercase tracking-tight">
                  Sertanejo no Simples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-fg-muted">
                  Loirassa Bar · o melhor do sertanejo ao vivo, num clima
                  descontraído.
                </p>
                <div className="mt-5">
                  <Button size="sm">Garantir presença</Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* rodapé */}
      <footer className="border-t border-line pt-8">
        <Soundwave bars={40} height={28} animated={false} className="mb-6 opacity-40" />
        <p className="font-display text-sm uppercase tracking-[0.28em] text-fg-muted">
          João Vitor · Cantor Oficial — Design System v0.1
        </p>
      </footer>
    </main>
  );
}
