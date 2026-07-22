import { WhatsappIcon } from "@/components/brand/social-icons";
import { waLink } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={waLink("Olá João! Quero um orçamento para meu evento.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full bg-amber px-4 py-3 font-display text-sm font-semibold tracking-wide text-[#120c02] uppercase shadow-lg shadow-black/40 transition-transform hover:scale-105"
    >
      <WhatsappIcon className="size-5" />
      <span className="hidden sm:inline">Contratar</span>
    </a>
  );
}
