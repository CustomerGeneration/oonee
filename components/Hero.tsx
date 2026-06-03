"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * HERO.
 * - Desktop (>=768px): scena Spline 3D full-bleed e interattiva. INVARIATA.
 * - Mobile (<768px): testo in HTML (sempre intero/leggibile) + la MONTAGNA
 *   REALE della scena (frame catturato dalla scena Spline desktop, senza il
 *   testo baked-in) come immagine ancorata in basso. Niente scena Spline
 *   live su mobile → niente testo croppato, niente ghost, niente scroll-trap.
 *
 * La configurazione della scena Spline NON viene toccata. L'immagine
 * public/hero-mountain.jpg è un frame reale della scena (non una grafica
 * inventata).
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

  // MOBILE (e SSR di default) — testo HTML + montagna reale
  return (
    <section
      id="hero"
      className="relative flex h-[100svh] w-full flex-col items-center overflow-hidden bg-black px-6 pt-24 text-center"
    >
      {/* glow azzurro discreto */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[110vw] w-[110vw] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(0,153,204,0.16), transparent 62%)",
        }}
      />

      {/* Montagna reale: riempie la metà bassa, grande e d'impatto */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[58svh]"
      >
        <Image
          src="/hero-mountain.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="select-none object-cover object-top"
        />
        {/* sfuma il bordo alto della montagna nel nero (chiude il vuoto col testo) */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black to-transparent" />
      </div>

      {/* velatura in basso per leggibilità di "scopri" */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/70 to-transparent"
      />

      {/* Wordmark + payoff */}
      <div className="relative z-10 flex flex-col items-center">
        <p className="text-[clamp(3.5rem,23vw,6.5rem)] font-bold leading-none tracking-tight">
          oonee
        </p>
        <p className="mt-5 text-[clamp(0.72rem,3.2vw,0.95rem)] font-semibold uppercase tracking-[0.25em] text-accent">
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
      <ScrollCue className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2" />
    </section>
  );
}
