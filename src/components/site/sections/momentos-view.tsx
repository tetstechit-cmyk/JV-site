import Image from "next/image";
import { Container, Section } from "../container";
import { SectionHeading } from "../section-heading";
import { Reveal } from "../reveal";

export type Momento = {
  id: string;
  src: string;
  alt: string;
  destaque?: boolean;
};

export type MomentosProps = {
  momentos: Momento[];
  eyebrow: string;
  titulo: string;
  lead: string;
};

export function MomentosView({
  momentos,
  eyebrow,
  titulo,
  lead,
}: MomentosProps) {
  return (
    <Section id="momentos" className="border-b border-line">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={titulo} lead={lead} />

        <div className="grid auto-rows-[190px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-4">
          {momentos.map((m, i) => (
            <Reveal
              key={m.id}
              delay={i * 110}
              className={`group relative overflow-hidden rounded-sm border border-line bg-ink-2 ${
                m.destaque ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(70%_60%_at_50%_40%,color-mix(in_oklab,var(--amber)_10%,transparent),transparent_75%)]" />
              {m.src ? (
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              ) : null}
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
