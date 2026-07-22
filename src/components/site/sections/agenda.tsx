import { Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Container, Section } from "../container";
import { SectionHeading } from "../section-heading";
import { Reveal } from "../reveal";
import { upcomingShows, waLink, type Show } from "@/lib/site";

function fmtDate(iso: string) {
  const d = new Date(iso);
  const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(d);
  const day = new Intl.DateTimeFormat("pt-BR", { day: "2-digit" }).format(d);
  const month = new Intl.DateTimeFormat("pt-BR", { month: "short" })
    .format(d)
    .replace(".", "");
  const time = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
  return { weekday, day, month, time };
}

function monthLabel(iso: string) {
  const s = new Intl.DateTimeFormat("pt-BR", {
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

function ShowRow({ show }: { show: Show }) {
  const { weekday, day, month, time } = fmtDate(show.startsAt);
  return (
    <li className="group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-amber/40 sm:gap-6">
      <div className="flex w-12 shrink-0 flex-col items-center">
        <span className="font-display text-3xl font-bold leading-none text-amber">
          {day}
        </span>
        <span className="font-display text-[0.65rem] font-semibold uppercase tracking-widest text-fg-muted">
          {month}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="truncate font-display text-lg font-bold uppercase tracking-tight text-fg sm:text-xl">
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
          waLink(`Olá João! Quero saber do show em ${show.city} (${day}/${month}).`)
        }
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Quero ir no show em ${show.city}`}
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

export function Agenda() {
  const shows = upcomingShows();
  const groups = groupByMonth(shows);

  return (
    <Section id="agenda">
      <Container>
        <SectionHeading eyebrow="Próximos shows" title="Agenda" />
        {shows.length === 0 ? (
          <div className="flex flex-col items-start gap-4 rounded-xl border border-line bg-surface p-8">
            <Calendar className="size-8 text-amber" aria-hidden />
            <p className="text-lg text-fg">Em breve novas datas.</p>
            <p className="text-sm text-fg-muted">
              Quer o João no seu evento? Me chama que a gente marca.
            </p>
            <a
              href={waLink("Olá João! Quero contratar para um evento.")}
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
                <h3 className="mb-4 flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.2em] text-fg-muted">
                  <span className="h-px w-6 bg-line" />
                  {g.key}
                </h3>
                <ul className="flex flex-col gap-3">
                  {g.items.map((s) => (
                    <ShowRow key={s.id} show={s} />
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
