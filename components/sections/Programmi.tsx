"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import styles from "./Programmi.module.css";

export default function Programmi() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cgCountRef = useRef<HTMLSpanElement>(null);
  const rgCountRef = useRef<HTMLSpanElement>(null);
  const cgHeroRef = useRef<HTMLDivElement>(null);
  const rgHeroRef = useRef<HTMLDivElement>(null);
  const countedRef = useRef(false);
  // timestamp (timebase rAF/performance.now) fino al quale la rete neurale è in "surge"
  const surgeRef = useRef(0);
  const [inView, setInView] = useState(false);

  const prefersReduced = useReducedMotion();
  // tengo il valore aggiornato in un ref così le callback degli effetti lo leggono sempre fresco
  const reduceRef = useRef(!!prefersReduced);
  reduceRef.current = !!prefersReduced;

  // ===== reveal a scroll: cascata + count-up + surge della rete neurale =====
  useEffect(() => {
    const sec = wrapRef.current;
    if (!sec) return;

    // count-up di un singolo numero-eroe, con delay rispetto al reveal.
    // Nell'istante in cui parte accende il bloom + glow (classe .lit sull'hero).
    const fireCount = (
      el: HTMLSpanElement | null,
      heroEl: HTMLDivElement | null,
      to: number,
      prefix: string,
      suffix: string,
      delay: number,
    ) => {
      if (!el) return;
      const reduce = reduceRef.current;
      if (reduce) {
        el.textContent = `${prefix}${to}${suffix}`;
        return;
      }
      el.textContent = `${prefix}0${suffix}`;
      window.setTimeout(() => {
        if (heroEl) {
          heroEl.classList.remove(styles.lit);
          void heroEl.offsetWidth; // reflow per (ri)avviare bloom + numIgnite
          heroEl.classList.add(styles.lit);
        }
        const dur = 1100;
        let start: number | null = null;
        const step = (ts: number) => {
          if (start === null) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = `${prefix}${Math.round(to * eased)}${suffix}`;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = `${prefix}${to}${suffix}`;
        };
        requestAnimationFrame(step);
      }, delay);
    };

    const fire = () => {
      if (countedRef.current) return;
      countedRef.current = true;
      setInView(true);
      // surge della rete neurale per ~1.8s, sincronizzato col reveal
      if (!reduceRef.current) surgeRef.current = performance.now() + 1800;
      // −18% (CG ~700ms) e oltre 5M€ (RG ~1050ms) dopo il reveal
      fireCount(cgCountRef.current, cgHeroRef.current, 18, "−", "%", 700);
      fireCount(rgCountRef.current, rgHeroRef.current, 5, "", "M€", 1050);
    };

    if (!("IntersectionObserver" in window)) {
      fire();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            fire();
            io.unobserve(sec);
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(sec);
    return () => io.disconnect();
  }, []);

  // ===== sfondo rete neurale (canvas) =====
  useEffect(() => {
    const sec = wrapRef.current;
    const c = canvasRef.current;
    if (!sec || !c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const reduce = reduceRef.current;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const DMAX = 165;

    type Node = { x: number; y: number; vx: number; vy: number };
    type Pulse = { a: number; b: number; t: number };
    let W = 0;
    let H = 0;
    let raf = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let lastSpawn = 0;

    const build = () => {
      let count = Math.round((W * H) / 42000);
      count = Math.max(16, Math.min(count, 46));
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.17,
          vy: (Math.random() - 0.5) * 0.17,
        });
      }
      pulses = [];
    };

    const nearest = (i: number) => {
      let best = -1;
      let bd = DMAX * DMAX;
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = dx * dx + dy * dy;
        if (d < bd) {
          bd = d;
          best = j;
        }
      }
      return best;
    };

    const drawLinks = (boost: boolean) => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n = nodes[i];
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < DMAX) {
            const a = (1 - d / DMAX) * (boost ? 0.34 : 0.16);
            ctx.strokeStyle = `rgba(62,180,247,${a})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        ctx.beginPath();
        ctx.fillStyle = `rgba(169,224,255,${boost ? 0.9 : 0.55})`;
        ctx.arc(n.x, n.y, boost ? 2 : 1.6, 0, 6.2832);
        ctx.fill();
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H);
      drawLinks(false);
    };

    const frame = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const surging = t < surgeRef.current;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }
      drawLinks(surging);
      const interval = surging ? 170 : 850;
      const cap = surging ? 16 : 7;
      if (t - lastSpawn > interval && pulses.length < cap) {
        lastSpawn = t;
        const a0 = Math.floor(Math.random() * nodes.length);
        const b0 = nearest(a0);
        if (b0 >= 0) pulses.push({ a: a0, b: b0, t: 0 });
      }
      ctx.globalCompositeOperation = "lighter";
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += 0.017;
        if (p.t >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const A = nodes[p.a];
        const B = nodes[p.b];
        if (!A || !B) {
          pulses.splice(i, 1);
          continue;
        }
        const x = A.x + (B.x - A.x) * p.t;
        const y = A.y + (B.y - A.y) * p.t;
        const r = surging ? 9 : 7;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(169,224,255,${surging ? 1 : 0.9})`);
        g.addColorStop(1, "rgba(62,180,247,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    };

    const size = () => {
      W = sec.clientWidth;
      H = sec.clientHeight;
      c.width = Math.round(W * DPR);
      c.height = Math.round(H * DPR);
      c.style.width = `${W}px`;
      c.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      build();
      if (reduce) drawStatic();
    };

    size();
    // ri-misura dopo il layout (i pannelli cambiano altezza una volta montati)
    const t2 = window.setTimeout(size, 350);
    window.addEventListener("resize", size);
    if (!reduce) raf = requestAnimationFrame(frame);

    return () => {
      window.clearTimeout(t2);
      window.removeEventListener("resize", size);
      cancelAnimationFrame(raf);
    };
  }, [prefersReduced]);

  // motif blueprint iceberg (identico nei due pannelli)
  const motif = (
    <svg
      className={styles.motif}
      viewBox="0 0 120 160"
      fill="none"
      stroke="#3EB4F7"
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M30 64 L40 40 L50 50 L58 22 L66 44 L78 30 L92 64 L104 96 L84 134 L60 150 L40 132 L18 92 Z" />
      <path d="M58 22 L60 150" opacity=".5" />
      <path d="M30 64 L60 150" opacity=".4" />
      <path d="M92 64 L60 150" opacity=".4" />
      <path d="M18 92 L60 150" opacity=".3" />
      <path d="M104 96 L60 150" opacity=".3" />
      <path d="M40 40 L58 22 M78 30 L58 22" opacity=".4" />
      <path d="M14 64 L108 64" opacity=".85" />
    </svg>
  );

  return (
    <section id="programmi" className={styles.section}>
      <div className={styles.bp} aria-hidden />

      <div
        ref={wrapRef}
        className={`${styles.wrap} ${inView ? styles.inView : ""}`}
      >
        <canvas ref={canvasRef} className={styles.neural} aria-hidden />

        <div className={styles.content}>
          <div className={styles.eyebrow}>
            Come vuoi far crescere il tuo business?
          </div>
          <h2 className={styles.h2}>
            Più clienti. Più fatturato.
            <br />
            Un solo metodo.
          </h2>
          <p className={styles.intro}>
            Le persone non comprano il trapano: comprano il buco. Allo stesso
            modo tu non vuoi campagne o lead — vuoi <b>clienti che firmano</b> e{" "}
            <b>fatturato che cresce</b>. È l&apos;unica cosa su cui costruiamo.
            Ed è il motivo dei nostri numeri.
          </p>
          <div className={styles.cred}>
            <span className={styles.dot} />
            oltre 1M€ di adv in gestione per i nostri partner
          </div>

          {/* connettore "un solo metodo" — biforcazione che si disegna a scroll */}
          <div className={styles.fork}>
            <span className={styles.lab}>un solo metodo</span>
            <svg
              className={styles.forkSvg}
              viewBox="0 0 320 118"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path className={styles.ln} d="M160 26 L160 58" />
              <path
                className={`${styles.ln} ${styles.branchLine}`}
                d="M160 58 C160 86, 70 80, 60 108"
              />
              <path
                className={`${styles.ln} ${styles.branchLine}`}
                d="M160 58 C160 86, 250 80, 260 108"
              />
              <circle className={styles.node} cx="160" cy="22" r="9" />
              <circle
                className={`${styles.tip} ${styles.branchLine}`}
                cx="60"
                cy="108"
                r="5"
              />
              <circle
                className={`${styles.tip} ${styles.branchLine}`}
                cx="260"
                cy="108"
                r="5"
              />
            </svg>
          </div>

          <div className={styles.verticals}>
            {/* ============ Customer Generation ============ */}
            <div id="customer-generation" className={`${styles.panel} ${styles.p1}`}>
              {motif}
              {/* icona: badge Customer Generation (due anelli + sperone di ghiaccio faccettato) */}
              <svg
                className={styles.icon}
                viewBox="0 0 76 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <defs>
                  <linearGradient id="cgIce" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#2E6F9F" />
                    <stop offset="1" stopColor="#0A1B2E" />
                  </linearGradient>
                </defs>
                <circle cx="20" cy="28" r="13" stroke="#6CC6FF" strokeWidth="3" />
                <circle cx="56" cy="28" r="13" stroke="#2E86C4" strokeWidth="3" />
                <path
                  d="M31 22 L34 12 L37 17 L40 9 L43 14 L44 24 L40 36 L38 46 L34 34 L31 22 Z"
                  fill="url(#cgIce)"
                  stroke="#5CC3FF"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
                <path d="M40 9 L38 46" stroke="#A9E0FF" strokeWidth="1" opacity=".6" />
                <path d="M31 22 L38 46" stroke="#A9E0FF" strokeWidth="1" opacity=".4" />
              </svg>
              <div className={styles.peyebrow}>Vendi servizi, consulenze, B2B?</div>
              <h3 className={styles.ptitle}>
                Customer Generation<sup>™</sup>
              </h3>
              <p className={styles.promise}>
                Non ti riempiamo il CRM di nomi. Ti riempiamo l&apos;agenda di
                clienti.
              </p>

              <div className={styles.formula}>
                <div className={styles.eq}>
                  CAC <span className={styles.op}>=</span> CPL{" "}
                  <span className={styles.op}>÷</span> LCR
                </div>
                <div className={styles.cap}>
                  LCR = Lead-to-Customer Rate · es. 10€/lead, 1 su 20 → CAC 200€
                </div>
              </div>

              <div ref={cgHeroRef} className={styles.hero}>
                <span className={styles.pre}>il numero che conta</span>
                <span className={styles.big}>
                  <span ref={cgCountRef}>0</span>
                </span>
                <span className={styles.hlabel}>
                  sul CAC, il costo per acquisire un cliente vero.
                </span>
              </div>

              <div className={styles.warline}>
                <span>
                  Tutti ti vendono <b>lead a 0,90€</b>. Noi lavoriamo l&apos;unico
                  numero che paga lo stipendio: il <b>CAC</b>.
                </span>
              </div>

              <ul className={styles.feats}>
                <li>Zero liste di nomi da rincorrere.</li>
                <li>Solo persone pronte a firmare.</li>
              </ul>

              <a className={styles.cta} href="#">
                Voglio clienti, non lead <span className={styles.ar}>→</span>
              </a>
            </div>

            {/* ============ Revenue Generation ============ */}
            <div id="revenue-generation" className={`${styles.panel} ${styles.p2}`}>
              {motif}
              {/* icona: iceberg pieno faccettato con linea di galleggiamento */}
              <svg
                className={styles.icon}
                viewBox="0 0 58 62"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <defs>
                  <linearGradient id="rgAbove" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#5AA6DE" />
                    <stop offset="1" stopColor="#2E6F9F" />
                  </linearGradient>
                  <linearGradient id="rgBelow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#16456B" />
                    <stop offset="1" stopColor="#07182B" />
                  </linearGradient>
                </defs>
                <path d="M20 26 L24 12 L28 18 L31 6 L36 16 L40 26 Z" fill="url(#rgAbove)" />
                <path
                  d="M20 26 L40 26 L48 42 L40 55 L28 59 L16 53 L9 38 Z"
                  fill="url(#rgBelow)"
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
                <path
                  d="M9 38 L28 59 M48 42 L28 59"
                  stroke="#A9E0FF"
                  strokeWidth="1"
                  opacity=".28"
                />
                <path d="M8 26 L48 26" stroke="#6CC6FF" strokeWidth="4" opacity=".15" />
                <path d="M8 26 L48 26" stroke="#6CC6FF" strokeWidth="1.6" />
              </svg>
              <div className={styles.peyebrow}>Hai un ecommerce e vuoi scalare?</div>
              <h3 className={styles.ptitle}>
                Revenue Generation<sup>™</sup>
              </h3>
              <p className={styles.promise}>
                Non ti serve più traffico. Ti serve più fatturato dallo stesso
                traffico.
              </p>

              <div className={styles.formula}>
                <div className={styles.eq}>
                  <span className={styles.up}>↑</span>CR{" "}
                  <span className={styles.op}>·</span>{" "}
                  <span className={styles.up}>↑</span>AOV{" "}
                  <span className={styles.op}>·</span>{" "}
                  <span className={styles.up}>↑</span>LTV{" "}
                  <span className={styles.op}>·</span>{" "}
                  <span className={styles.dn}>↓</span>CAC
                </div>
                <div className={styles.cap}>
                  Tre leve su. Una giù. La scala è tutta qui.
                </div>
              </div>

              <div ref={rgHeroRef} className={styles.hero}>
                <span className={styles.pre}>generato con i partner</span>
                <span className={styles.big}>
                  oltre <span ref={rgCountRef}>0</span>
                </span>
                <span className={styles.hlabel}>
                  di fatturato ecommerce generato per i nostri partner.
                </span>
              </div>

              <div className={styles.warline}>
                <span>
                  Non alziamo la spesa sperando. <b>Riscriviamo l&apos;equazione</b>{" "}
                  che fa scalare i numeri.
                </span>
              </div>

              <ul className={styles.feats}>
                <li>ROAS, AOV, LTV e retention sotto controllo.</li>
                <li>Una struttura che regge la crescita, non un colpo di fortuna.</li>
              </ul>

              <a className={styles.cta} href="#">
                Voglio scalare davvero <span className={styles.ar}>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
