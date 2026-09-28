import Script from "next/script";
import { GOOGLE_ADS_ID } from "@/lib/gtag";

/**
 * Tag global do Google (gtag.js) com a conta do Google Ads.
 * afterInteractive: carrega depois da página ficar interativa, sem
 * atrasar o primeiro render.
 */
export function GoogleAds() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>
    </>
  );
}
