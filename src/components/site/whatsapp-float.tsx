import { WhatsappIcon } from "@/components/brand/social-icons";
import { settings as mockSettings } from "@/lib/site";
import { getSettings, txt } from "@/lib/content";

export async function WhatsAppFloat() {
  const cfg = await getSettings();
  const s = (cfg ?? {}) as Record<string, unknown>;
  const numero = txt(s.whatsapp, mockSettings.whatsapp);
  const href =
    "https://wa.me/" +
    numero +
    "?text=" +
    encodeURIComponent(
      "Olá! Quero conversar sobre uma experiência musical para o meu evento.",
    );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full bg-amber px-4 py-3 font-sans text-xs font-medium tracking-[0.12em] text-[#120c02] uppercase shadow-lg shadow-black/40 transition-transform hover:scale-105"
    >
      <WhatsappIcon className="size-5" />
      <span className="hidden sm:inline">Fale conosco</span>
    </a>
  );
}
