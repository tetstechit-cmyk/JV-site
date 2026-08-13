import Image from "next/image";
import { Container, Section } from "../container";
import { Reveal } from "../reveal";
import { Soundwave } from "@/components/brand/soundwave";
import { YoutubeShowcase } from "../youtube-showcase";

export type ArtistaProps = {
  eyebrow: string;
  nome: string;
  headline: string;
  bio: string;
  foto: string;
  frase: string;
  videoId: string;
  canalUrl: string;
};

export function ArtistaView({
  eyebrow,
  nome,
  headline,
  bio,
  foto,
  frase,
  videoId,
  canalUrl,
}: ArtistaProps) {
  return (
    <Section id="artista" className="border-b border-line">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-sm border border-line bg-ink-2">
            <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(60%_55%_at_50%_40%,color-mix(in_oklab,var(--amber)_13%,transparent),transparent_72%)]" />
            {foto ? (
              <Image
                src={foto}
                alt={`${nome}, cantor sertanejo`}
                fill
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="object-cover object-top"
              />
            ) : null}
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow mb-5">{eyebrow}</p>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] font-semibold text-fg">
              {nome}
            </h2>
            {headline ? (
              <p className="mt-4 font-display text-xl italic text-amber sm:text-2xl">
                {headline}
              </p>
            ) : null}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted">
              {bio}
            </p>

            {frase ? (
              <blockquote className="mt-8 border-l border-coral/60 pl-5">
                <p className="font-display text-lg leading-snug font-light italic text-fg sm:text-xl">
                  “{frase}”
                </p>
              </blockquote>
            ) : null}

            <Soundwave bars={36} height={30} className="mt-9 max-w-xs opacity-70" />
          </Reveal>
        </div>

        <Reveal delay={80} className="mt-16">
          <p className="eyebrow mb-5">Assista</p>
          <YoutubeShowcase videoId={videoId} canalUrl={canalUrl} />
        </Reveal>
      </Container>
    </Section>
  );
}
