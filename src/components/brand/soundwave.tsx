import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Soundwave — motif de assinatura do João Vitor.
 * Reconstrói o equalizer da logo dele como sistema visual reutilizável:
 * divisórias de seção, hero, loaders.
 *
 * Padrão de alturas determinístico (mesmo no server e no client → sem
 * hydration mismatch). Anima via CSS (`@keyframes soundwave` em globals.css),
 * respeitando `prefers-reduced-motion`.
 */

// Silhueta de onda estável (0..1). Não usar Math.random (quebra hydration).
const PEAKS = [
  0.30, 0.52, 0.74, 0.46, 0.92, 0.64, 0.38, 0.86, 0.56, 0.70, 0.34, 0.60,
  0.80, 0.44, 1.0, 0.58, 0.36, 0.72, 0.50, 0.88, 0.42, 0.66, 0.32, 0.78,
];

type SoundwaveProps = {
  /** Número de barras. */
  bars?: number;
  /** Altura do bloco em px. */
  height?: number;
  /** Anima as barras (equalizer). Desligue para divisória estática. */
  animated?: boolean;
  className?: string;
};

export function Soundwave({
  bars = 48,
  height = 56,
  animated = true,
  className,
}: SoundwaveProps) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={cn(
        "flex w-full items-end justify-center gap-[3px] overflow-hidden",
        className,
      )}
      style={{ height }}
      data-animated={animated ? "" : undefined}
    >
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="soundwave-bar"
          style={
            {
              "--peak": PEAKS[i % PEAKS.length],
              "--i": i,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
