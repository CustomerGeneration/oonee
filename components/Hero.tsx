"use client";

import { useEffect, useState } from "react";

/**
 * HERO.
 * - Desktop (>=768px): scena Spline 3D full-bleed e interattiva. INVARIATA.
 * - Mobile (<768px): hero pulita in HTML/SVG (nessuna scena Spline → nessun
 *   testo/ghost duplicato). Layout verticale ben distribuito che riempie lo
 *   schermo: wordmark "oonee" grande → payoff leggibile → iceberg grande →
 *   "scopri". Tutto in HTML, quindi sempre intero, leggibile e senza tagli.
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

function Iceberg() {
  return (
    <svg
      viewBox="0 0 240 240"
      className="h-auto w-[72%] max-w-[300px]"
      aria-hidden
    >
      <defs>
        <linearGradient id="iceTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#a5e4ff" />
        </linearGradient>
        <linearGradient id="iceBottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0099cc" />
          <stop offset="1" stopColor="#003366" />
        </linearGradient>
      </defs>

      {/* punta sopra la linea d'acqua */}
      <polygon points="120,28 150,116 90,116" fill="url(#iceTop)" />
      <polygon points="120,28 150,116 124,116" fill="#cdeeff" fillOpacity="0.7" />

      {/* massa sommersa (la parte nascosta dell'iceberg) */}
      <polygon
        points="90,124 150,124 196,214 44,214"
        fill="url(#iceBottom)"
        fillOpacity="0.85"
      />
      <polygon
        points="120,124 150,124 196,214 120,214"
        fill="#002b52"
        fillOpacity="0.5"
      />

      {/* linea d'acqua */}
      <line
        x1="20"
        y1="120"
        x2="220"
        y2="120"
        stroke="#0099cc"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
    </svg>
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

  // MOBILE (e SSR di default) — hero HTML/SVG pulita
  return (
    <section
      id="hero"
      className="relative flex h-[100svh] w-full flex-col items-center justify-between overflow-hidden bg-black px-6 pb-10 pt-24 text-center"
    >
      {/* glow azzurro discreto */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120vw] w-[120vw] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(0,153,204,0.18), transparent 62%)",
        }}
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

      {/* Iceberg protagonista */}
      <div className="relative z-10 flex flex-1 items-center justify-center py-6">
        <Iceberg />
      </div>

      {/* Scopri */}
      <ScrollCue className="relative z-10" />
    </section>
  );
}
