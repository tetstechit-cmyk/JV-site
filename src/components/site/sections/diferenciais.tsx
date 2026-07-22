import { Container, Section } from "../container";
import { SectionHeading } from "../section-heading";
import { Reveal } from "../reveal";
import { differentials } from "@/lib/site";

export function Diferenciais() {
  return (
    <Section id="diferenciais">
      <Container>
        <SectionHeading eyebrow="Por que o João" title="Diferenciais" />
        {/* matriz com hairlines (gap-px sobre bg-line) — nada de card flutuante */}
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {differentials.map((d, i) => (
            <Reveal key={d.id} delay={i * 80}>
              <div className="group flex h-full gap-5 bg-ink p-7 transition-colors hover:bg-surface sm:p-9">
                <span className="font-display text-5xl font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_var(--amber)] sm:text-6xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight text-fg">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {d.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
