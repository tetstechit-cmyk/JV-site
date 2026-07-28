import { Container, Section } from "../container";
import { SectionHeading } from "../section-heading";
import { Reveal } from "../reveal";
import type { ProcessStep } from "@/lib/site";

/**
 * View pura — só renderiza o que recebe.
 *
 * Separada do container para poder rodar também no navegador (live preview),
 * onde os dados chegam do painel em vez do banco.
 */
export type ProcessoProps = {
  etapas: ProcessStep[];
  eyebrow: string;
  titulo: string;
  lead: string;
};

export function ProcessoView({ etapas, eyebrow, titulo, lead }: ProcessoProps) {
  return (
    <Section id="processo" className="border-b border-line bg-ink-2">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={titulo} lead={lead} />

        <ol className="relative">
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[15px] w-px bg-gradient-to-b from-amber/50 via-line to-transparent sm:left-[19px]"
          />
          {etapas.map((step, i) => (
            <Reveal key={step.id} delay={i * 90}>
              <li className="relative grid grid-cols-[32px_1fr] gap-5 pb-10 last:pb-0 sm:grid-cols-[40px_1fr] sm:gap-8">
                <span className="relative z-10 flex size-8 items-center justify-center rounded-full border border-amber/40 bg-ink font-sans text-[0.7rem] font-medium text-amber sm:size-10 sm:text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1">
                  <h3 className="font-display text-xl font-semibold text-fg sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-fg-muted sm:text-base">
                    {step.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
