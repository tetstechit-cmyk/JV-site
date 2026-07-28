import { Container, Section } from "../container";
import { SectionHeading } from "../section-heading";
import { Reveal } from "../reveal";
import type { Format } from "@/lib/site";

export type FormatosProps = {
  formatos: Format[];
  eyebrow: string;
  titulo: string;
  lead: string;
};

export function FormatosView({ formatos, eyebrow, titulo, lead }: FormatosProps) {
  return (
    <Section id="formatos" className="border-b border-line">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={titulo} lead={lead} />

        <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
          {formatos.map((f, i) => (
            <Reveal key={f.id} delay={i * 80}>
              <div className="flex h-full flex-col bg-ink p-8 transition-colors duration-300 hover:bg-surface sm:p-10">
                <h3 className="font-display text-2xl font-semibold text-fg sm:text-3xl">
                  {f.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-fg-muted sm:text-base">
                  {f.description}
                </p>
                <p className="mt-6 border-t border-line pt-4 font-sans text-[0.7rem] tracking-[0.18em] text-amber uppercase">
                  {f.best}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
