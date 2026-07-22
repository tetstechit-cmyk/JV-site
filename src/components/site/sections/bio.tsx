import Image from "next/image";
import { Container, Section } from "../container";
import { SectionHeading } from "../section-heading";
import { Reveal } from "../reveal";
import { settings, stagePhrases } from "@/lib/site";

export function Bio() {
  return (
    <Section id="biografia">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow="Quem é" title="Biografia" />
            <p className="font-display text-2xl font-medium uppercase tracking-tight text-fg">
              {settings.bioHeadline}
            </p>
            <p className="mt-5 text-lg leading-relaxed text-fg-muted">
              {settings.bioBody}
            </p>
            <blockquote className="mt-8 border-l-2 border-coral pl-5 font-display text-lg font-bold uppercase italic leading-snug tracking-tight text-fg sm:text-xl">
              “{stagePhrases[1]}”
            </blockquote>
          </Reveal>

          <Reveal
            delay={120}
            className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-line bg-ink-2"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_40%,color-mix(in_oklab,var(--amber)_15%,transparent),transparent_72%)]" />
            <Image
              src="/galeria/g-guitarra.png"
              alt="João Vitor tocando guitarra"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="relative object-cover object-top"
            />
          </Reveal>
        </div>

        <Reveal delay={80} className="mt-16">
          <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.3em] text-fg-muted">
            Ouça no Spotify
          </p>
          <iframe
            title="João Vitor no Spotify"
            src="https://open.spotify.com/embed/artist/1NcHjMiIbcuCDUW9sg0Fls?utm_source=generator&theme=0"
            width="100%"
            height="352"
            loading="lazy"
            style={{ border: 0, borderRadius: 12 }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </Reveal>
      </Container>
    </Section>
  );
}
