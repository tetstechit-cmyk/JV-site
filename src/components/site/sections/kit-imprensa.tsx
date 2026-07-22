import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Container, Section } from "../container";
import { Reveal } from "../reveal";
import { waLink } from "@/lib/site";

const includes = [
  "Fotos em alta resolução",
  "Rider técnico (som e luz)",
  "Release / Bio (one-page)",
  "Logo e material de marca",
];

export function KitImprensa() {
  return (
    <Section id="kit-imprensa">
      <Container>
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-surface to-ink-2">
            <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="mb-6 inline-block rounded-full border border-amber/30 px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.2em] text-amber">
                  Para produtores e RH
                </span>
                <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-fg sm:text-5xl">
                  Kit de Imprensa
                </h2>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-fg-muted">
                  Tudo que você precisa pra fechar com segurança. Peça o kit
                  completo — respondo rápido.
                </p>
                <a
                  href={waLink("Olá João! Quero o kit de imprensa completo.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "mt-8 h-12 px-7 text-sm",
                  )}
                >
                  Solicitar kit completo
                </a>
              </div>

              <ul className="space-y-3">
                {includes.map((it) => (
                  <li
                    key={it}
                    className="flex items-center gap-3 rounded-xl border border-line/60 bg-ink/40 px-5 py-4"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-amber/15 text-amber">
                      <Check className="size-4" aria-hidden />
                    </span>
                    <span className="font-display text-sm font-semibold uppercase tracking-wide text-fg">
                      {it}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
