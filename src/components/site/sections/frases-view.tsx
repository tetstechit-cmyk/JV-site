export type FrasesProps = { frases: string[] };

/**
 * Voz de palco — ticker das frases do João.
 * Aparece depois da seção do artista: é a personalidade dele, não a promessa.
 */
export function FrasesView({ frases }: FrasesProps) {
  if (!frases.length) return null;
  const items = [...frases, ...frases];

  return (
    <section
      aria-label="Frases de palco de João Vitor"
      className="overflow-hidden border-b border-line bg-ink-2 py-7 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
    >
      <div className="marquee-track flex w-max items-center whitespace-nowrap">
        {items.map((p, i) => (
          <div key={i} className="flex items-center">
            <span className="font-display text-xl font-light italic text-fg/85 sm:text-2xl">
              “{p}”
            </span>
            <span
              aria-hidden
              className="mx-9 inline-block size-1.5 shrink-0 rotate-45 bg-coral/70"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
