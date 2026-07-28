import { Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Container, Section } from "../container";
import { SectionHeading } from "../section-heading";
import { Reveal } from "../reveal";
import type { Show } from "@/lib/site";

export type AgendaProps = {
  shows: Show[];
  eyebrow: string;
  titulo: string;
  whatsapp: string;
};

// Fuso fixo: no servidor (Vercel/UTC) e no navegador o horário tem de bater.
// Sem isto, show 21:00 em SP virava "00:00 do dia seguinte" no site.
const TZ = "America/Sao_Paulo";

/** Data utilizável? O live preview manda estados intermediários (campo
 * vazio enquanto redigita) — sem esta guarda, Intl.format lança RangeError
 * e derruba a página inteira do preview. */
function dataValida(iso: string) {
  const t = new Date(iso).getTime();
  return !Number.isNaN(t);
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  const opt = { timeZone: TZ } as const;
  const weekday = new Intl.DateTimeFormat("pt-BR", { ...opt, weekday: "long" }).format(d);
  const day = new Intl.DateTimeFormat("pt-BR", { ...opt, day: "2-digit" }).format(d);
  const month = new Intl.DateTimeFormat("pt-BR", { ...opt, month: "short" })
    .format(d)
    .replace(".", "");
  const time = new Intl.DateTimeFormat("pt-BR", {
    ...opt,
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
  return { weekday, day, month, time };
}

function monthLabel(iso: string) {
  const s = new Intl.DateTimeFormat("pt-BR", {
    timeZone: TZ,
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function groupByMonth(shows: Show[]) {
  const groups: { key: string; items: Show[] }[] = [];
  for (const s of shows) {
    const key = monthLabel(s.startsAt);
    const last = groups.at(-1);
    if (last && last.key === key) last.items.push(s);
    else groups.push({ key, items: [s] });
  }
  return groups;
}

function ShowRow({ show, wa }: { show: Show; wa: (t: string) => string }) {
  const { weekday, day, month, time } = fmtDate(show.startsAt);
  return (
    <li className="group flex items-center gap-4 rounded-sm border border-line bg-surface p-4 transition-colors hover:border-amber/40 sm:gap-6">
      <div className="flex w-12 shrink-0 flex-col items-center">
        <span className="font-display text-3xl leading-none font-semibold text-amber">
          {day}
        </span>
        <span className="mt-1 font-sans text-[0.6rem] tracking-[0.18em] text-fg-muted uppercase">
          {month}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="truncate font-display text-lg font-semibold text-fg sm:text-xl">
          {show.title}
        </h4>
        <p className="mt-0.5 flex min-w-0 items-center gap-1.5 text-xs text-fg-muted sm:text-sm">
          <MapPin className="size-3.5 shrink-0" aria-hidden />
          <span className="min-w-0 truncate">
            {show.venue} · {show.city}/{show.state} · {weekday}, {time}
          </span>
        </p>
      </div>
      <a
        href={
          show.ticketUrl ??
          wa(`Olá! Quero saber do show em ${show.city} (${day}/${month}).`)
        }
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Saber mais sobre o show em ${show.city}`}
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "shrink-0",
        )}
      >
        Quero ir
      </a>
    </li>
  );
}

export function AgendaView({ shows, eyebrow, titulo, whatsapp }: AgendaProps) {
  const wa = (t: string) =>
    `https://wa.me/${whatsapp}?text=${encodeURIComponent(t)}`;
  // Descarta shows com data inválida (estado transitório do live preview).
  const validos = shows.filter((s) => dataValida(s.startsAt));
  const groups = groupByMonth(validos);

  return (
    <Section id="agenda" className="border-b border-line">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={titulo} />
        {validos.length === 0 ? (
          <div className="flex flex-col items-start gap-4 rounded-sm border border-line bg-surface p-8">
            <Calendar className="size-7 text-amber" aria-hidden />
            <p className="font-display text-xl font-light text-fg">
              Em breve novas datas.
            </p>
            <p className="text-sm text-fg-muted">
              Quer uma experiência musical no seu evento? Vamos conversar.
            </p>
            <a
              href={wa("Olá! Quero contratar uma experiência para meu evento.")}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "sm" }))}
            >
              Falar no WhatsApp
            </a>
          </div>
        ) : (
          <div className="space-y-10">
            {groups.map((g, gi) => (
              <Reveal key={g.key} delay={gi * 80}>
                <h3 className="mb-4 flex items-center gap-3 font-sans text-[0.7rem] font-medium tracking-[0.2em] text-fg-muted uppercase">
                  <span className="h-px w-6 bg-line" />
                  {g.key}
                </h3>
                <ul className="flex flex-col gap-3">
                  {g.items.map((s) => (
                    <ShowRow key={s.id} show={s} wa={wa} />
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
