import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Container, Section } from "../container";
import { Reveal } from "../reveal";

export type KitProps = {
  eyebrow: string;
  titulo: string;
  lead: string;
  itens: string[];
  cta: string;
  whatsapp: string;
};

export function KitImprensaView({
  eyebrow,
  titulo,
  lead,
  itens,
  cta,
  whatsapp,
}: KitProps) {
  const wa = (t: string) =>
    `https://wa.me/${whatsapp}?text=${encodeURIComponent(t)}`;

  return (
    <Section id="kit-imprensa" className="border-b border-line">
      <Container>
        <Reveal>
          <div className="overflow-hidden rounded-sm border border-line bg-ink-2">
            <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="eyebrow mb-5">{eyebrow}</p>
                <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-tight font-semibold text-fg">
                  {titulo}
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-fg-muted">
                  {lead}
                </p>
                <a
                  href={wa("Olá! Quero o kit de imprensa completo.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "mt-8 h-12 px-8 text-sm",
                  )}
                >
                  {cta}
                </a>
              </div>

              <ul className="space-y-3">
                {itens.map((it) => (
                  <li
                    key={it}
                    className="flex items-center gap-3 border-b border-line/60 pb-3 last:border-0"
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-amber/40 text-amber">
                      <Check className="size-3" aria-hidden />
                    </span>
                    <span className="text-sm text-fg sm:text-base">{it}</span>
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
