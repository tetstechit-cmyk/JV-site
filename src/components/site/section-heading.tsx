import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  className,
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-12", className)}>
      <div className="mb-4 flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-amber shadow-[0_0_12px] shadow-amber/50" />
        <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-fg-muted">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-fg sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}
