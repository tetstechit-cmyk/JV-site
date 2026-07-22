"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/brand/social-icons";
import { waLink } from "@/lib/site";

const NAV = [
  { href: "#biografia", label: "Bio" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#servicos", label: "Serviços" },
  { href: "#agenda", label: "Agenda" },
  { href: "#galeria", label: "Galeria" },
  { href: "#kit-imprensa", label: "Kit" },
  { href: "#contato", label: "Contato" },
];

const CTA_TEXT = "Olá João! Quero um orçamento para meu evento.";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  // Escape fecha o menu mobile; trava o scroll do body enquanto aberto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Scroll-spy: marca a seção que está no centro da viewport.
  useEffect(() => {
    const ids = ["inicio", ...NAV.map((n) => n.href.slice(1))];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => e !== null);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-ink/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 sm:px-10">
          <a
            href="#inicio"
            onClick={() => setOpen(false)}
            aria-label="João Vitor — Cantor Oficial"
            className="flex items-center"
          >
            <Image
              src="/brand/logo-jv-trim.png"
              alt="João Vitor — Cantor Oficial"
              width={722}
              height={404}
              priority
              className="h-9 w-auto sm:h-10"
            />
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {NAV.map((n) => {
              const isActive = active === n.href.slice(1);
              return (
                <a
                  key={n.href}
                  href={n.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group relative font-display text-xs font-semibold uppercase tracking-[0.18em] transition-colors",
                    isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {n.label}
                  <span
                    className={cn(
                      "absolute -bottom-2 left-0 h-px bg-amber transition-[width] duration-300 ease-out",
                      isActive ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={waLink(CTA_TEXT)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "sm" }),
                "hidden h-9 px-4 text-xs sm:inline-flex",
              )}
            >
              Contratar
            </a>
            <button
              type="button"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="flex size-11 items-center justify-center rounded-lg text-fg transition-colors hover:bg-surface-2 lg:hidden"
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Overlay mobile — fora do header (backdrop-filter cria containing block) */}
      <div
        id="mobile-nav"
        inert={!open}
        aria-hidden={!open}
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 z-40 bg-ink/95 backdrop-blur-xl transition-opacity duration-200 lg:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <nav className="flex h-full flex-col overflow-y-auto px-6 py-4">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="border-b border-line/50 py-4 font-display text-2xl font-bold uppercase tracking-tight text-fg"
            >
              {n.label}
            </a>
          ))}
          <a
            href={waLink(CTA_TEXT)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className={cn(buttonVariants({ size: "lg" }), "mt-6 h-12 gap-2 text-sm")}
          >
            <WhatsappIcon className="size-5" />
            Contratar pro meu evento
          </a>
        </nav>
      </div>
    </>
  );
}
