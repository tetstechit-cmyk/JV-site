import { Container, Section } from "../container";
import { Reveal } from "../reveal";
import { stats, clients, testimonials } from "@/lib/site";

export function Prova() {
  return (
    <Section id="prova" className="border-y border-line bg-ink-2">
      <Container>
        <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((s, i) => (
            <Reveal
              key={s.id}
              delay={i * 100}
              className="px-6 py-6 text-center sm:py-2"
            >
              <p className="font-display text-5xl font-bold tabular-nums whitespace-nowrap text-amber lg:text-6xl">
                {s.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.22em] text-fg-muted">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Empresas que já confiaram — parede monocromática (cinza uniforme) */}
        <Reveal className="mt-20">
          <p className="mb-8 text-center font-display text-xs font-semibold uppercase tracking-[0.28em] text-fg-muted">
            Empresas que já confiaram no nosso trabalho
          </p>
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
            <div className="marquee-track flex w-max items-center whitespace-nowrap">
              {[...clients, ...clients].map((c, i) => (
                <div key={i} className="flex items-center">
                  <span className="font-display text-lg font-semibold uppercase tracking-wide text-fg-muted/70 sm:text-xl">
                    {c}
                  </span>
                  <span
                    aria-hidden
                    className="mx-8 inline-block size-1.5 shrink-0 rounded-full bg-fg-muted/40"
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {testimonials.length > 0 ? (
          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {testimonials.map((t) => (
              <figure
                key={t.id}
                className="rounded-xl border border-line bg-surface p-6"
              >
                <blockquote className="text-lg leading-relaxed text-fg">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 text-sm text-fg-muted">
                  <span className="font-semibold text-fg">{t.author}</span>
                  {t.role ? ` · ${t.role}` : null}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
