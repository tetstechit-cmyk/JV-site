import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-14",
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      <p className="eyebrow mb-5">{eyebrow}</p>
      <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.1] font-semibold text-fg">
        {title}
      </h2>
      {lead ? (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
