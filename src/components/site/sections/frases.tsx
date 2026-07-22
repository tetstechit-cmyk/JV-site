import { stagePhrases } from "@/lib/site";

/**
 * Voz de palco — ticker das frases do João.
 * Fade nas bordas, frases alternando cheio/contorno âmbar, losango coral, loop lento.
 */
export function FrasesMarquee() {
  const items = [...stagePhrases, ...stagePhrases]; // duplicado p/ loop contínuo

  return (
    <section
      aria-label="Frases de palco de João Vitor"
      className="overflow-hidden border-y border-line bg-ink-2 py-7 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
    >
      <div className="marquee-track flex w-max items-center whitespace-nowrap">
        {items.map((p, i) => (
          <div key={i} className="flex items-center">
            <span className="font-display text-2xl font-bold uppercase tracking-tight text-fg sm:text-[1.7rem]">
              {p}
            </span>
            <span
              aria-hidden
              className="mx-8 inline-block size-2.5 shrink-0 rotate-45 bg-coral shadow-[0_0_10px] shadow-coral/50"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
