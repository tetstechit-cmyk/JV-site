import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Soundwave } from "@/components/brand/soundwave";
import { YoutubeBg } from "./youtube-bg";
import type { HeroYoutube } from "@/lib/mapear";

export type HeroProps = {
  eyebrow: string;
  linha1: string;
  linha2: string;
  subtitulo: string;
  cta1: string;
  cta2: string;
  video: string | null;
  youtube: HeroYoutube | null;
  imagem: string;
  whatsapp: string;
};

export function HeroView({
  eyebrow,
  linha1,
  linha2,
  subtitulo,
  cta1,
  cta2,
  video,
  youtube,
  imagem,
  whatsapp,
}: HeroProps) {
  const wa = (t: string) =>
    `https://wa.me/${whatsapp}?text=${encodeURIComponent(t)}`;

  return (
    <section
      id="inicio"
      className="grain relative flex min-h-[92svh] items-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        {video ? (
          <video
            key={video}
            className="size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={imagem}
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : youtube ? (
          <YoutubeBg
            id={youtube.id}
            inicio={youtube.inicio}
            fim={youtube.fim}
            poster={imagem}
          />
        ) : (
          <Image
            src={imagem}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="kenburns scale-110 object-cover object-center opacity-40 blur-[2px]"
          />
        )}
        <div className="absolute inset-0 bg-ink/72" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/40 to-ink" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-28 text-center sm:px-10">
        <Soundwave
          bars={44}
          height={34}
          className="mx-auto mb-9 max-w-xs opacity-80 sm:max-w-sm"
        />

        <p className="eyebrow mb-8 sm:mb-10">{eyebrow}</p>

        <h1 className="font-display text-[clamp(2.4rem,6.4vw,5.4rem)] leading-[1.06] font-semibold text-fg">
          <span className="block">{linha1}</span>
          <span className="mt-1 block italic text-amber">{linha2}</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
          {subtitulo}
        </p>

        <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
          <a
            href={wa(
              "Olá! Quero conversar sobre uma experiência musical para o meu evento.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "h-12 px-8 text-sm")}
          >
            {cta1}
          </a>
          <a
            href="#momentos"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 px-8 text-sm",
            )}
          >
            {cta2}
          </a>
        </div>
      </div>

      <a
        href="#manifesto"
        aria-label="Rolar para o manifesto"
        className="absolute inset-x-0 bottom-7 mx-auto flex w-11 justify-center text-fg-muted transition-colors hover:text-fg"
      >
        <ChevronDown className="size-6 motion-safe:animate-bounce" aria-hidden />
      </a>
    </section>
  );
}
