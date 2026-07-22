import Image from "next/image";
import { Soundwave } from "@/components/brand/soundwave";
import {
  InstagramIcon,
  YoutubeIcon,
  FacebookIcon,
  SpotifyIcon,
} from "@/components/brand/social-icons";
import { Container } from "./container";
import { settings, waLink } from "@/lib/site";

const socials = [
  { href: settings.instagramUrl, label: "Instagram", Icon: InstagramIcon },
  { href: settings.youtubeUrl, label: "YouTube", Icon: YoutubeIcon },
  { href: settings.facebookUrl, label: "Facebook", Icon: FacebookIcon },
  { href: settings.spotifyArtistUrl, label: "Spotify", Icon: SpotifyIcon },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink-2">
      <Container className="py-14">
        <Soundwave bars={40} height={30} className="mb-8 opacity-50" />
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <Image
              src="/brand/logo-jv-trim.png"
              alt="João Vitor — Cantor Oficial"
              width={722}
              height={404}
              className="h-11 w-auto"
            />
            <p className="mt-3 text-sm text-fg-muted">
              Cantor Sertanejo · {settings.city}
            </p>
            <a
              href={waLink("Olá João!")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-amber hover:underline"
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
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-line/60 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-fg-muted">
            © {new Date().getFullYear()} João Vitor · Cantor Oficial.
          </p>
          <div className="flex items-center gap-2 opacity-70">
            <span className="text-[0.65rem] uppercase tracking-widest text-fg-muted">
              Produção
            </span>
            <Image
              src="/brand/gigeck-trim.png"
              alt="Gigeck Produções"
              width={494}
              height={282}
              className="h-7 w-auto brightness-0 invert"
            />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 opacity-55">
          <span className="text-[0.65rem] uppercase tracking-[0.15em] text-fg-muted">
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
