"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import styles from "./Studioos.module.css";

const WAVE_BARS = 60;
const SEATS = 8;

type Bar = { h: number; delay: number; dur: number };

function SeatCheck() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function Studioos() {
  const consoleRef = useRef<HTMLDivElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const firedRef = useRef(false);
  const [inView, setInView] = useState(false);
  const [bars, setBars] = useState<Bar[]>([]);

  const prefersReduced = useReducedMotion();
  const reduceRef = useRef(!!prefersReduced);
  reduceRef.current = !!prefersReduced;

  // forma d'onda generata lato client (evita mismatch di hydration con Math.random)
  useEffect(() => {
    setBars(
      Array.from({ length: WAVE_BARS }, () => ({
        h: 28 + Math.random() * 68,
        delay: -(Math.random() * 2),
        dur: 0.75 + Math.random() * 0.9,
      })),
    );
  }, []);

  // reveal (una volta sola) + timecode che gira a 24fps da 00:00:12:00
  useEffect(() => {
    const con = consoleRef.current;
    if (!con) return;

    let frames = 12 * 24; // 00:00:12:00
    let tcInt: number | null = null;
    const pad = (n: number) => (n < 10 ? "0" : "") + n;
    const fmt = (f: number) => {
      const ff = f % 24;
      const s = Math.floor(f / 24);
      const ss = s % 60;
      const mm = Math.floor(s / 60) % 60;
      const hh = Math.floor(s / 3600);
      return `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
    };
    const startTC = () => {
      if (reduceRef.current || tcInt !== null) return;
      tcInt = window.setInterval(() => {
        frames++;
        if (tcRef.current) tcRef.current.textContent = fmt(frames);
      }, 42);
    };

    const fire = () => {
      if (firedRef.current) return;
      firedRef.current = true;
      setInView(true);
      startTC();
    };

    let io: IntersectionObserver | null = null;
    if (!("IntersectionObserver" in window)) {
      fire();
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              fire();
              io?.unobserve(con);
            }
          });
        },
        { threshold: 0.25 },
      );
      io.observe(con);
    }

    return () => {
      io?.disconnect();
      if (tcInt !== null) clearInterval(tcInt);
    };
  }, []);

  return (
    <section id="studioos" className={styles.section}>
      <div className={styles.bp} aria-hidden />

      <div className={styles.wrap}>
        <div
          ref={consoleRef}
          className={`${styles.console} ${inView ? styles.in : ""}`}
        >
          <div className={styles.scan} aria-hidden />

          {/* watermark iceberg blueprint */}
          <svg
            className={styles.berg}
            viewBox="0 0 120 160"
            fill="none"
            stroke="#3EB4F7"
            strokeWidth="1.5"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path d="M30 64 L40 40 L50 50 L58 22 L66 44 L78 30 L92 64 L104 96 L84 134 L60 150 L40 132 L18 92 Z" />
            <path d="M58 22 L60 150" opacity=".5" />
            <path d="M30 64 L60 150" opacity=".4" />
            <path d="M92 64 L60 150" opacity=".4" />
            <path d="M14 64 L108 64" opacity=".85" />
          </svg>

          {/* ===== editor top bar ===== */}
          <div className={styles.topbar}>
            <div className={styles.tbLeft}>
              <span className={styles.rec}>
                <span className={styles.d} />
                REC
              </span>
              <span className={styles.nm}>studioos.edit</span>
              <span className={styles.tc} ref={tcRef}>
                00:00:12:00
              </span>
            </div>
            <span className={styles.soldout}>
              <span className={styles.d} />
              SOLD OUT · 8/8
            </span>
          </div>

          {/* ===== body ===== */}
          <div className={styles.body}>
            <div className={styles.eyebrow}>il reparto creativo di oonee</div>

            <div className={styles.emblem}>
              <svg viewBox="0 0 58 62" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <defs>
                  <linearGradient id="sAbove" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#5AA6DE" />
                    <stop offset="1" stopColor="#2E6F9F" />
                  </linearGradient>
                  <linearGradient id="sBelow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#16456B" />
                    <stop offset="1" stopColor="#07182B" />
                  </linearGradient>
                </defs>
                <path d="M20 26 L24 12 L28 18 L31 6 L36 16 L40 26 Z" fill="url(#sAbove)" />
                <path
                  d="M20 26 L40 26 L48 42 L40 55 L28 59 L16 53 L9 38 Z"
                  fill="url(#sBelow)"
                />
                <path
                  d="M20 26 L24 12 L28 18 L31 6 L36 16 L40 26 L48 42 L40 55 L28 59 L16 53 L9 38 Z"
                  stroke="#5CC3FF"
                  strokeWidth="1.1"
                />
                <path d="M31 6 L28 59" stroke="#CFEBFF" strokeWidth="1" opacity=".5" />
                <path
                  d="M20 26 L28 59 M40 26 L28 59"
                  stroke="#A9E0FF"
                  strokeWidth="1"
                  opacity=".35"
                />
                <path d="M8 26 L48 26" stroke="#6CC6FF" strokeWidth="1.6" />
              </svg>
              <span className={styles.wm}>studioos</span>
            </div>

            <h2 className={styles.title}>
              Contenuti che vendono.{" "}
              <span className={styles.g}>Non contenuti che piacciono.</span>
            </h2>
            <p className={styles.sub}>
              Video, copy e creatività ingegnerizzati per un solo scopo:{" "}
              <b>convertire</b>. Ogni frame, ogni parola, ogni taglio è lì per
              farti vendere — non per fare like.
            </p>

            <div className={styles.punch}>
              I like non pagano lo stipendio. Le vendite sì.
            </div>

            <div className={styles.scarcity}>
              <div className={styles.seats}>
                {Array.from({ length: SEATS }, (_, i) => (
                  <span
                    key={i}
                    className={`${styles.seat} ${i === SEATS - 1 ? styles.pulse : ""}`}
                  >
                    <SeatCheck />
                  </span>
                ))}
              </div>
              <p>
                Lavoriamo a <b>numero chiuso: 8 brand alla volta</b>, non uno di
                più. È il limite che ci permette di far vendere ognuno di loro.
                Oggi i posti sono esauriti.
              </p>
            </div>

            <a className={styles.cta} href="#">
              Avvisami quando si libera un posto{" "}
              <span className={styles.ar}>→</span>
            </a>
          </div>

          {/* ===== editing timeline ===== */}
          <div className={styles.timeline}>
            <div className={styles.tlRuler}>
              <span style={{ left: "1%" }}>00:00</span>
              <span style={{ left: "34%" }}>00:05</span>
              <span style={{ left: "67%" }}>00:10</span>
              <span style={{ left: "96%" }}>00:15</span>
            </div>

            <div className={styles.tlRow}>
              <span className={styles.tlTag}>VIDEO</span>
              <div className={styles.tlTrack}>
                <div className={`${styles.clip} ${styles.c1}`}>Hook</div>
                <div className={`${styles.clip} ${styles.c2}`}>Proof</div>
                <div className={`${styles.clip} ${styles.c3}`}>Offer</div>
                <div className={`${styles.clip} ${styles.c4}`}>CTA</div>
              </div>
            </div>

            <div className={`${styles.tlRow} ${styles.audio}`}>
              <span className={styles.tlTag}>AUDIO</span>
              <div className={styles.tlTrack}>
                <div className={styles.waveform}>
                  {bars.map((b, i) => (
                    <span
                      key={i}
                      className={styles.wb}
                      style={
                        {
                          "--h": `${b.h}%`,
                          animationDelay: `${b.delay}s`,
                          animationDuration: `${b.dur}s`,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.tlPlayhead} aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
