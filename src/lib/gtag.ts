/**
 * Google Ads — tag global + conversão de lead.
 *
 * Os IDs rodam no navegador e são públicos (não são segredo).
 */
export const GOOGLE_ADS_ID = "AW-10846815195";

/** Conversão "Contato": envio do formulário que abre o WhatsApp. */
const CONVERSAO_CONTATO = `${GOOGLE_ADS_ID}/qyqFCN6SvIUdENuHlbQo`;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Registra a conversão de contato no Google Ads.
 * Sem gtag carregado (bloqueador de anúncio, rede lenta), não faz nada —
 * o WhatsApp abre do mesmo jeito.
 */
export function registrarConversaoContato() {
  window.gtag?.("event", "conversion", { send_to: CONVERSAO_CONTATO });
}
