import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Soundwave } from "@/components/brand/soundwave";
import { Reveal } from "./reveal";
import { settings, waLink } from "@/lib/site";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* brilho de refletor, único e discreto */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70%] bg-[radial-gradient(55%_65%_at_50%_0%,color-mix(in_oklab,var(--amber)_13%,transparent),transparent_72%)]" />

      <div className="mx-auto grid max-w-6xl items-center gap-2 px-6 pt-28 sm:px-10 md:min-h-[90vh] md:grid-cols-[1.05fr_0.95fr] md:gap-6 md:pt-32">
        <Reveal className="relative z-10 pb-6 md:pb-0">
          <p className="mb-10 flex items-center gap-3 font-display text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-amber sm:mb-12 sm:text-xs sm:tracking-[0.32em]">
            <span className="h-px w-8 shrink-0 bg-amber" />
            {settings.tagline} · São Paulo
          </p>

          <h1 className="font-display font-bold uppercase leading-[0.92] tracking-[-0.02em]">
            <span className="block text-[clamp(3.2rem,12vw,8rem)] text-fg">
              João Vitor
            </span>
            <span className="mt-2 block text-[clamp(1rem,3.2vw,1.9rem)] font-medium tracking-[0.32em] text-fg-muted">
              Cantor Oficial
            </span>
          </h1>

          <p className="mt-7 max-w-md text-lg leading-relaxed text-fg-muted">
            O melhor do sertanejo ao vivo — do bar lotado ao evento corporativo.
            Repertório que enche a pista e não deixa a noite cair.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={waLink("Olá João! Quero um orçamento para meu evento.")}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "h-12 px-7 text-sm")}
            >
              Contratar pro meu evento
            </a>
            <a
              href="#agenda"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 px-7 text-sm",
              )}
            >
              Ver agenda
            </a>
          </div>

          <Soundwave bars={40} height={38} className="mt-12 max-w-sm opacity-80" />
        </Reveal>

        {/* imagem com fade no rodapé — dissolve a perna cortada no fundo */}
        <Reveal
          delay={150}
          className="relative flex h-[400px] items-end justify-center md:h-[640px]"
        >
          <div className="pointer-events-none absolute bottom-6 h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--coral)_22%,transparent),transparent_70%)] blur-3xl" />
          <Image
            src="/joao-hero.png"
            alt="João Vitor, cantor sertanejo, de chapéu"
            width={1783}
            height={3301}
            priority
            sizes="(max-width: 768px) 82vw, 42vw"
            className="relative z-10 h-full w-auto object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,0.55)] [mask-image:linear-gradient(to_bottom,#000_78%,transparent_99%)]"
          />
        </Reveal>
      </div>
    </section>
  );
}
