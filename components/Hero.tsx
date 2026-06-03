"use client";

import { useEffect, useState } from "react";
import NeuralBackground from "./NeuralBackground";

/**
 * HERO.
 * - Desktop (>=768px): scena Spline 3D full-bleed e interattiva. INVARIATA.
 * - Mobile (<768px): hero pulita ed elegante — animazione neurale (canvas 2D,
 *   no 3D pesante) full-bleed dietro al testo, su nero brand, con testo
 *   (wordmark "oonee" + payoff + UN solo "scopri") centrato verticalmente.
 *   NESSUNA scena 3D/Spline (non viene nemmeno caricata, via render condizionale
 *   con matchMedia) → leggera e veloce.
 *
 * La configurazione della scena Spline NON viene toccata.
 */
const SCENE_VIEWER_URL =
  "https://my.spline.design/nexusmountain-EchmUygwI5WJIYPdhMw2fWDL/";

function ScrollCue({ className = "" }: { className?: string }) {
  return (
    <a
      href="#manifesto"
      aria-label="Scopri la sezione successiva"
      className={`group flex flex-col items-center gap-2 text-white/70 transition-colors hover:text-white ${className}`}
    >
      <span className="text-xs uppercase tracking-[0.3em]">scopri</span>
      <span className="animate-bounce text-lg leading-none">↓</span>
    </a>
  );
}

export default function Hero() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // DESKTOP — scena Spline 3D interattiva (invariata)
  if (isDesktop) {
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
          className="absolute inset-0 h-full w-full border-0"
        />
        <ScrollCue className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2" />
      </section>
    );
  }

  // MOBILE (e SSR di default) — animazione neurale + testo centrato
  return (
    <section
      id="hero"
      className="relative flex h-[100svh] min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-black px-6 text-center"
    >
      {/* Animazione neurale full-bleed dietro al testo */}
      <NeuralBackground className="absolute inset-0 z-0 h-full w-full" />

      {/* Velatura per contrasto (più scura al centro, dietro al testo) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Wordmark + payoff (centrati verticalmente) */}
      <div className="relative z-10 flex flex-col items-center">
        <p className="text-[clamp(3.5rem,23vw,6.5rem)] font-bold leading-none tracking-tight">
          oonee
        </p>
        <p className="mt-6 text-[clamp(0.72rem,3.2vw,0.95rem)] font-semibold uppercase tracking-[0.25em] text-accent">
          Marketing Agency
        </p>
        <p className="mt-3 max-w-[20rem] text-[clamp(1rem,4.4vw,1.3rem)] font-medium leading-snug text-white/90">
          Specializzata in Conversion Architecture
        </p>
        <p className="mt-2 text-[clamp(0.9rem,4vw,1.1rem)] text-white/55">
          Vendi di più online
        </p>
      </div>

      {/* Scopri */}
      <ScrollCue className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2" />
    </section>
  );
}
