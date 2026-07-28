import { Container, Section } from "../container";
import { Reveal } from "../reveal";

export type ManifestoProps = {
  eyebrow: string;
  paragrafos: string[];
  fecho1: string;
  fecho2: string;
};

export function ManifestoView({
  eyebrow,
  paragrafos,
  fecho1,
  fecho2,
}: ManifestoProps) {
  return (
    <Section id="manifesto" className="border-b border-line">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="eyebrow mb-8">{eyebrow}</p>
          </Reveal>

          {paragrafos.map((p, i) => (
            <Reveal key={i} delay={i * 90}>
              <p
                className={
                  i === 0
                    ? "font-display text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.4] font-light text-fg"
                    : "mt-6 text-base leading-relaxed text-fg-muted sm:text-lg"
                }
              >
                {p}
              </p>
            </Reveal>
          ))}

          <Reveal delay={280}>
            <div className="mt-12 border-l border-amber/50 pl-6">
              <p className="font-display text-[clamp(1.4rem,2.8vw,2rem)] leading-[1.3] font-semibold text-fg">
                {fecho1}
              </p>
              <p className="font-display text-[clamp(1.4rem,2.8vw,2rem)] leading-[1.3] font-light italic text-amber">
                {fecho2}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
