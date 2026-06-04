"use client";

import Script from "next/script";
import type { ConsentState } from "@/lib/consent";

/**
 * Caricatore di tracker GATED DAL CONSENSO.
 *
 * Gli script partono SOLO se:
 *  1) l'utente ha dato il consenso per quella categoria, E
 *  2) l'ID corrispondente è stato inserito qui sotto.
 *
 * Finché gli ID restano vuoti, NON viene caricato/eseguito nulla.
 * Niente tracker prima dell'opt-in (conforme GDPR).
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  👉 QUI inserirai gli ID quando li avrai (ora vuoti = nulla parte):  │
 * └─────────────────────────────────────────────────────────────────────┘
 */

// ANALYTICS — Google Analytics 4: inserisci il Measurement ID (es. "G-XXXXXXXXXX")
const GA4_MEASUREMENT_ID = "";

// MARKETING — Meta (Facebook) Pixel: inserisci il Pixel ID (es. "123456789012345")
const META_PIXEL_ID = "";

// MARKETING — (eventuali altri pixel: Google Ads, TikTok, LinkedIn, ecc.)
// const GOOGLE_ADS_ID = "";
// const TIKTOK_PIXEL_ID = "";

export default function ConsentGatedScripts({
  consent,
}: {
  consent: ConsentState | null;
}) {
  if (!consent) return null;

  return (
    <>
      {/* ============================ ANALYTICS ============================ */}
      {consent.analytics && GA4_MEASUREMENT_ID && (
        <>
          <Script
            id="ga4-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {/* ============================ MARKETING ============================ */}
      {consent.marketing && META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/*
        👉 Altri pixel di marketing (Google Ads, TikTok, LinkedIn...) vanno qui,
        sempre dentro un blocco `consent.marketing && <ID> && ( ... )`.
      */}
    </>
  );
}
