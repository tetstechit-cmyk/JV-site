import Image from "next/image";
import { Container, Section } from "../container";
import { SectionHeading } from "../section-heading";
import { Reveal } from "../reveal";

// Recortes do João. Tile escuro + glow âmbar atrás ilumina o recorte.
const photos = [
  { src: "/galeria/g-jv1.png", alt: "João Vitor de chapéu" },
  { src: "/galeria/g-jv2.png", alt: "João Vitor" },
  { src: "/galeria/g-blessed.png", alt: "João Vitor, cantor sertanejo" },
];

export function Galeria() {
  return (
    <Section id="galeria">
      <Container>
        <SectionHeading eyebrow="Momentos" title="Galeria" />
        <div className="grid gap-4 sm:grid-cols-3">
          {photos.map((p, i) => (
            <Reveal
              key={p.src}
              delay={i * 100}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-line bg-ink-2"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_38%,color-mix(in_oklab,var(--amber)_15%,transparent),transparent_72%)]" />
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="relative object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
