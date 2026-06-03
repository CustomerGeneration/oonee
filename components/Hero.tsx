"use client";

import { useState } from "react";

/**
 * HERO — scena Spline a tutto schermo, responsive.
 *
 * - Altezza: 100svh (non 100vh) → niente salti con le barre del browser mobile
 *   e nessun vuoto nero: la scena riempie sempre lo schermo.
 * - Mobile: iframe a tutto schermo (la scena resta animata) ma pointer-events:none
 *   così lo scroll del dito non resta intrappolato nell'animazione.
 *   `w-[130vw]` allarga leggermente il canvas su mobile per de-zoomare la scena
 *   (composta per desktop) ed evitare che appaia troppo ingrandita.
 * - Desktop (md+): full-bleed e interattiva (segue il mouse), come l'originale.
 *
 * La configurazione della scena Spline NON viene toccata.
 */
const SCENE_VIEWER_URL =
  "https://my.spline.design/nexusmountain-EchmUygwI5WJIYPdhMw2fWDL/";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section
      id="hero"
      className="relative h-[100svh] w-full overflow-hidden bg-black"
    >
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
        className="pointer-events-none absolute inset-y-0 left-1/2 h-full w-[130vw] -translate-x-1/2 border-0 md:left-0 md:w-full md:translate-x-0 md:pointer-events-auto"
      />

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
