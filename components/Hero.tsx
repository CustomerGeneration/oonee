"use client";

import { useState } from "react";

/**
 * Scena Spline pubblicata da Nico (viewer standalone con dati 3D inline).
 * La scena NON è esportata come ".splinecode" pubblico, quindi @splinetool/react-spline
 * non può caricarla. L'embed corretto e affidabile è l'iframe sull'URL del viewer.
 *
 * NOTA: nel piano Spline free il viewer mostra il badge "Built with Spline" in basso a
 * destra. Si rimuove solo con piano a pagamento oppure esportando la scena come codice
 * (a quel punto si potrà passare a react-spline e nascondere il logo).
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
