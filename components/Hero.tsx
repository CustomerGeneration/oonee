"use client";

import { useState } from "react";

/**
 * HERO — scena Spline a tutto schermo, responsive.
 *
 * - Desktop (md+): scena full-bleed e interattiva (segue il mouse), con il suo
 *   testo originale. Invariata.
 * - Mobile (<md): la scena è composta in orizzontale, quindi su schermo stretto
 *   il suo TESTO viene croppato (wordmark tagliato, payoff ai bordi, "oonee"
 *   fantasma). Soluzione: la scena resta solo come SFONDO decorativo (montagna/
 *   stelle/glow) con uno scrim scuro che ne attenua il testo croppato; il testo
 *   reale (wordmark + payoff) è reso in HTML DAVANTI, con clamp(), sempre intero
 *   e centrato, mai tagliato. Tutto pointer-events:none così lo scroll è libero.
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

      {/* Scena 3D: full-bleed. Su mobile fa da sfondo (de-zoomata), su desktop interattiva */}
      <iframe
        src={SCENE_VIEWER_URL}
        title="Oonee — Marketing Agency specializzata in Conversion Architecture"
        onLoad={() => setLoaded(true)}
        allow="autoplay; fullscreen; xr-spatial-tracking"
        className="pointer-events-none absolute inset-y-0 left-1/2 h-full w-[140vw] -translate-x-1/2 border-0 md:left-0 md:w-full md:translate-x-0 md:pointer-events-auto"
      />

      {/* MOBILE — scrim per attenuare il testo croppato della scena */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-black/75 via-black/55 to-black/85 md:hidden"
      />

      {/* MOBILE — testo reale in HTML, sempre intero e centrato */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center md:hidden">
        <p className="text-[clamp(0.7rem,3vw,0.85rem)] font-semibold uppercase tracking-[0.3em] text-accent">
          Marketing Agency
        </p>
        <p className="mt-4 text-[clamp(3rem,19vw,5.5rem)] font-bold leading-none tracking-tight">
          oonee
        </p>
        <p className="mt-6 max-w-[18rem] text-[clamp(0.95rem,4.2vw,1.2rem)] font-medium uppercase leading-snug tracking-wide text-white/90">
          Specializzata in Conversion Architecture
        </p>
        <p className="mt-3 text-[clamp(0.9rem,4vw,1.05rem)] text-white/55">
          Vendi di più online
        </p>
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
