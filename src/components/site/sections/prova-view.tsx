import Image from "next/image";
import { Container, Section } from "../container";
import { SectionHeading } from "../section-heading";
import { Reveal } from "../reveal";
import type { Stat, Testimonial } from "@/lib/site";

// ⚠️ Trocar por fotos REAIS de eventos (plateia, clientes) quando chegarem.
const FOTOS = [
  { src: "/galeria/g-guitarra.png", alt: "Apresentação ao vivo" },
  { src: "/galeria/g-jv1.png", alt: "João Vitor em evento" },
  { src: "/galeria/g-moletom.png", alt: "Bastidores" },
];

export type ProvaProps = {
  numeros: Stat[];
  empresas: string[];
  depoimentos: Testimonial[];
  eyebrow: string;
  titulo: string;
  empresasTitulo: string;
};

export function ProvaView({
  numeros,
  empresas,
  depoimentos,
  eyebrow,
  titulo,
  empresasTitulo,
}: ProvaProps) {
  return (
    <Section id="prova" className="border-b border-line bg-ink-2">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={titulo} align="center" />

        <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {numeros.map((s, i) => (
            <Reveal key={s.id} delay={i * 100} className="px-6 py-6 text-center sm:py-2">
              <p className="font-display text-[clamp(2.6rem,5vw,3.6rem)] leading-none font-semibold tabular-nums whitespace-nowrap text-amber">
                {s.value}
              </p>
              <p className="eyebrow mt-3">{s.label}</p>
            </Reveal>
          ))}
        </div>

        {/* Fotos — brief pede registro de quem viveu a experiência */}
        <div className="mt-16 grid gap-3 sm:grid-cols-3">
          {FOTOS.map((p, i) => (
            <Reveal
              key={p.src}
              delay={i * 100}
              className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-line bg-ink"
            >
              <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(65%_60%_at_50%_40%,color-mix(in_oklab,var(--amber)_10%,transparent),transparent_75%)]" />
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </Reveal>
          ))}
        </div>

        {/* Empresas — carrossel lento, monocromático */}
        <Reveal className="mt-20">
          <p className="eyebrow mb-8 text-center">{empresasTitulo}</p>
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
            <div className="marquee-track flex w-max items-center whitespace-nowrap">
              {[...empresas, ...empresas].map((c, i) => (
                <div key={i} className="flex items-center">
                  <span className="font-display text-xl font-light text-fg-muted/75 sm:text-2xl">
                    {c}
                  </span>
                  <span
                    aria-hidden
                    className="mx-9 inline-block size-1 shrink-0 rounded-full bg-fg-muted/35"
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {depoimentos.length > 0 ? (
          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {depoimentos.map((t) => (
              <figure
                key={t.id}
                className="rounded-sm border border-line bg-surface p-8"
              >
                <blockquote className="font-display text-xl leading-relaxed font-light italic text-fg">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 text-sm text-fg-muted">
                  <span className="text-fg">{t.author}</span>
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
