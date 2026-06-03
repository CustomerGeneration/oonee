"use client";

import { useState } from "react";

/**
 * Scena Spline pubblicata da Nico (viewer standalone con dati 3D inline).
 * Embed via iframe sull'URL del viewer.
 *
 * RESPONSIVE:
 * - Desktop (md+): scena full-bleed, interattiva, come l'hai composta.
 * - Mobile: la scena è composta per un formato largo (desktop); forzarla a
 *   tutto schermo verticale la fa apparire ingrandita/sproporzionata. Quindi su
 *   mobile la mostriamo con le stesse proporzioni del desktop (riquadro 16:10
 *   a larghezza piena, centrato) e la rendiamo NON interattiva (pointer-events
 *   none) così lo scroll del dito non resta "intrappolato" nella scena.
 *   La configurazione della scena Spline NON viene toccata.
 */
const SCENE_VIEWER_URL =
  "https://my.spline.design/nexusmountain-EchmUygwI5WJIYPdhMw2fWDL/";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-black">
      <div className="relative flex h-[100svh] w-full items-center justify-center">
        {/* Scena: mobile = riquadro proporzionato al desktop; desktop = full-bleed */}
        <div className="relative aspect-[16/10] w-full bg-black md:absolute md:inset-0 md:aspect-auto md:h-full">
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
            className="pointer-events-none absolute inset-0 h-full w-full border-0 md:pointer-events-auto"
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
      </div>
    </section>
  );
}
