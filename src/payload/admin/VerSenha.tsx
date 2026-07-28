"use client";

import { useEffect } from "react";

/**
 * Botão "ver senha" no login.
 *
 * O Payload não traz esse toggle e não expõe o markup do campo, então
 * injetamos o botão no input de senha depois que o form monta.
 * Acessível: tem aria-label e aria-pressed, e é focável pelo teclado.
 */
export default function VerSenha() {
  useEffect(() => {
    const ID = "jv-ver-senha";

    function montar() {
      const input = document.querySelector<HTMLInputElement>(
        'form.login__form input[type="password"]',
      );
      if (!input || document.getElementById(ID)) return false;

      const campo = input.parentElement;
      if (!campo) return false;
      if (getComputedStyle(campo).position === "static") {
        campo.style.position = "relative";
      }

      const botao = document.createElement("button");
      botao.id = ID;
      botao.type = "button";
      botao.setAttribute("aria-label", "Mostrar senha");
      botao.setAttribute("aria-pressed", "false");
      botao.innerHTML = olho(false);
      Object.assign(botao.style, {
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "34px",
        height: "34px",
        padding: "0",
        border: "0",
        borderRadius: "6px",
        background: "transparent",
        color: "#9d9891",
        cursor: "pointer",
        transition: "color .18s ease, background .18s ease",
      } satisfies Partial<CSSStyleDeclaration>);

      botao.addEventListener("mouseenter", () => {
        botao.style.color = "#e8cb96";
        botao.style.background = "rgba(216,179,112,.12)";
      });
      botao.addEventListener("mouseleave", () => {
        botao.style.color = "#9d9891";
        botao.style.background = "transparent";
      });

      botao.addEventListener("click", () => {
        const visivel = input.type === "text";
        input.type = visivel ? "password" : "text";
        botao.setAttribute("aria-pressed", String(!visivel));
        botao.setAttribute(
          "aria-label",
          visivel ? "Mostrar senha" : "Ocultar senha",
        );
        botao.innerHTML = olho(!visivel);
        input.focus();
      });

      // espaço para o botão não cobrir o texto digitado
      input.style.paddingRight = "48px";
      campo.appendChild(botao);
      return true;
    }

    if (montar()) return;

    // o form pode montar depois — observa até aparecer
    const obs = new MutationObserver(() => {
      if (montar()) obs.disconnect();
    });
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  return null;
}

/** Ícone de olho (aberto/riscado), no traço do lucide usado no site. */
function olho(visivel: boolean) {
  const comum = `fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"`;
  return visivel
    ? `<svg width="18" height="18" viewBox="0 0 24 24" ${comum} aria-hidden="true">
         <path d="M10.7 5.1A9.9 9.9 0 0 1 12 5c7 0 10 7 10 7a13.2 13.2 0 0 1-1.7 2.7"/>
         <path d="M6.6 6.6A13.5 13.5 0 0 0 2 12s3 7 10 7a9.7 9.7 0 0 0 5.4-1.6"/>
         <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>
         <path d="m2 2 20 20"/>
       </svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" ${comum} aria-hidden="true">
         <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
         <circle cx="12" cy="12" r="3"/>
       </svg>`;
}
