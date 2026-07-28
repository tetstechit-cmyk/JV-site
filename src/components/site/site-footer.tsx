import Image from "next/image";
import { Soundwave } from "@/components/brand/soundwave";
import {
  InstagramIcon,
  YoutubeIcon,
  FacebookIcon,
  SpotifyIcon,
} from "@/components/brand/social-icons";
import { Container } from "./container";
import { settings as mockSettings, promise } from "@/lib/site";
import { getSettings, txt, img } from "@/lib/content";

export async function SiteFooter() {
  const cfg = await getSettings();
  const s = (cfg ?? {}) as Record<string, unknown>;

  const settings = {
    whatsapp: txt(s.whatsapp, mockSettings.whatsapp),
    whatsappDisplay: txt(s.whatsappExibicao, mockSettings.whatsappDisplay),
    city: txt(s.cidade, mockSettings.city),
    instagramUrl: txt(s.instagram, mockSettings.instagramUrl),
    youtubeUrl: txt(s.youtube, mockSettings.youtubeUrl),
    facebookUrl: txt(s.facebook, mockSettings.facebookUrl),
    spotifyArtistUrl: txt(s.spotify, mockSettings.spotifyArtistUrl),
  };

  const waLink = (t: string) =>
    "https://wa.me/" + settings.whatsapp + "?text=" + encodeURIComponent(t);

  const socials = [
    { href: settings.instagramUrl, label: "Instagram", Icon: InstagramIcon },
    { href: settings.youtubeUrl, label: "YouTube", Icon: YoutubeIcon },
    { href: settings.facebookUrl, label: "Facebook", Icon: FacebookIcon },
    { href: settings.spotifyArtistUrl, label: "Spotify", Icon: SpotifyIcon },
  ];

  return (
    <footer className="border-t border-line bg-ink-2">
      <Container className="py-16">
        <p className="mx-auto max-w-2xl text-center font-display text-[clamp(1.3rem,2.6vw,1.9rem)] leading-snug font-semibold text-fg">
          {promise.line1}{" "}
          <span className="italic text-amber">{promise.line2}</span>
        </p>

        <Soundwave bars={40} height={26} className="mx-auto mt-10 max-w-sm opacity-40" />

        <div className="mt-12 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img(s.logo) ?? "/brand/logo-jv-trim.png"}
              alt="João Vitor"
              className="h-10 w-auto opacity-90"
            />
            <p className="mt-3 text-sm text-fg-muted">
              Experiências Musicais · {settings.city}
            </p>
            <a
              href={waLink("Olá!")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-amber hover:underline"
            >
              {settings.whatsappDisplay}
            </a>
          </div>
          <div className="flex items-center gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-11 items-center justify-center rounded-full border border-line text-fg-muted transition-colors hover:border-amber hover:text-amber"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line/60 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-fg-muted">
            © {new Date().getFullYear()} João Vitor · Cantor Oficial.
          </p>
          <div className="flex items-center gap-2 opacity-70">
            <span className="font-sans text-[0.6rem] tracking-[0.18em] text-fg-muted uppercase">
              Produção
            </span>
            <Image
              src="/brand/gigeck-trim.png"
              alt="Gigeck Produções"
              width={494}
              height={282}
              className="h-9 w-auto brightness-0 invert"
            />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 opacity-55">
          <span className="font-sans text-[0.6rem] tracking-[0.15em] text-fg-muted uppercase">
            Desenvolvido por
          </span>
          <Image
            src="/brand/corex.png"
            alt="Corex Sistemas"
            width={4962}
            height={1167}
            className="h-4 w-auto"
          />
        </div>
      </Container>
    </footer>
  );
}
