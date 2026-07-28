import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Container, Section } from "../container";
import { SectionHeading } from "../section-heading";
import { Reveal } from "../reveal";
import type { Audience } from "@/lib/site";

export type PublicosProps = {
  publicos: Audience[];
  eyebrow: string;
  titulo: string;
  lead: string;
  whatsapp: string;
};

export function PublicosView({
  publicos,
  eyebrow,
  titulo,
  lead,
  whatsapp,
}: PublicosProps) {
  const wa = (t: string) =>
    `https://wa.me/${whatsapp}?text=${encodeURIComponent(t)}`;

  return (
    <Section id="publicos" className="border-b border-line">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={titulo} lead={lead} />

        <div className="space-y-4">
          {publicos.map((a, i) => (
            <Reveal key={a.id} delay={i * 100}>
              <article
                className={cn(
                  "group grid items-center gap-8 overflow-hidden rounded-sm border border-line bg-ink-2 p-6 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10",
                  i % 2 === 1 && "lg:[&>figure]:order-first",
                )}
              >
                <div>
                  <p className="eyebrow mb-4">{`0${i + 1}`}</p>
                  <h3 className="font-display text-[clamp(1.7rem,3.2vw,2.4rem)] leading-tight font-semibold text-fg">
                    {a.title}
                  </h3>
                  <p className="mt-3 font-display text-lg italic text-amber sm:text-xl">
                    {a.lead}
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-fg-muted sm:text-base">
                    {a.description}
                  </p>
                  <a
                    href={wa(
                      `Olá! Quero uma experiência musical para ${a.title.toLowerCase()}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "mt-7",
                    )}
                  >
                    Conversar sobre isso
                  </a>
                </div>

                <figure className="relative aspect-[5/4] overflow-hidden rounded-sm bg-ink">
                  <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(65%_60%_at_50%_40%,color-mix(in_oklab,var(--amber)_12%,transparent),transparent_75%)]" />
                  {a.image ? (
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  ) : null}
                </figure>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
