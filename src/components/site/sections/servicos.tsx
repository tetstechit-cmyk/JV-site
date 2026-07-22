import { Container, Section } from "../container";
import { SectionHeading } from "../section-heading";
import { Reveal } from "../reveal";
import { services } from "@/lib/site";

export function Servicos() {
  return (
    <Section id="servicos" className="border-y border-line bg-ink-2">
      <Container>
        <SectionHeading eyebrow="O que eu levo" title="Serviços" />
        {/* lista de índice — tipografia grande, sem cards */}
        <ul>
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 70}>
              <li className="group grid gap-2 border-t border-line py-7 last:border-b sm:grid-cols-[1fr_1fr] sm:items-baseline sm:gap-8">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-amber">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-fg transition-colors group-hover:text-amber sm:text-3xl">
                    {s.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-fg-muted sm:pt-1">
                  {s.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
