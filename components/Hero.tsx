"use client";

import { useState } from "react";

/**
 * HERO — un'unica scena Spline.
 * - Desktop (md+): full-bleed 100svh, interattiva. INVARIATA.
 * - Mobile (<md): la STESSA scena, ma in un contenitore con proporzione tale
 *   che l'intera composizione (wordmark "oonee" + payoff + montagna) entri
 *   senza tagli ai lati. L'altezza dell'hero = quella della scena scalata →
 *   niente fasce nere. Niente testo HTML, niente overlay: è la scena reale.
 *
 * La configurazione della scena Spline NON viene toccata.
 */
const SCENE_VIEWER_URL =
  "https://my.spline.design/nexusmountain-EchmUygwI5WJIYPdhMw2fWDL/";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-black">
      {/* Mobile: proporzione che mostra l'intera composizione (oonee intero).
          Desktop: full-bleed 100svh. */}
      <div className="relative aspect-[8/9] w-full md:aspect-auto md:h-[100svh]">
        {/* Placeholder mentre la scena 3D carica */}
        {!loaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <span className="animate-pulse text-sm font-bold uppercase tracking-[0.4em] text-white/40">
              oonee
            </span>
          </div>
        )}

        <iframe
          src={SCENE_VIEWER_URL}
          title="Oonee — Marketing Agency specializzata in Conversion Architecture"
          onLoad={() => setLoaded(true)}
          allow="autoplay; fullscreen; xr-spatial-tracking"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>

      {/* Indicatore scroll */}
      <a
        href="#manifesto"
        aria-label="Scopri la sezione successiva"
        className="group absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition-colors hover:text-white"
      >
        <span className="text-xs uppercase tracking-[0.3em]">scopri</span>
        <span className="animate-bounce text-lg leading-none">↓</span>
      </a>
    </section>
  );
}
