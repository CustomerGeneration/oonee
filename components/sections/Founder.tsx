"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import styles from "./Founder.module.css";

export default function Founder() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [inView, setInView] = useState(false);

  const prefersReduced = useReducedMotion();
  const reduceRef = useRef(!!prefersReduced);
  reduceRef.current = !!prefersReduced;

  // reveal scaglionato dei contenuti (fade + rise)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // effetto pixel legato allo scroll: le particelle convergono sul ritratto,
  // poi crossfade verso la foto nitida
  useEffect(() => {
    const portrait = portraitRef.current;
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!portrait || !canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // prefers-reduced-motion: nessun effetto, solo la foto nitida
    if (reduceRef.current) {
      img.style.opacity = "1";
      canvas.style.opacity = "0";
      return;
    }

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const CELL = 6;

    type Part = {
      tx: number;
      ty: number;
      ox: number;
      oy: number;
      col: string;
      a: number;
      d: number;
    };
    let parts: Part[] = [];
    let cw = 0;
    let ch = 0;
    let ready = false;
    let lastP = -1;
    let scheduled = false;

    const tmp = document.createElement("canvas");
    const tctx = tmp.getContext("2d", { willReadFrequently: true });

    const ss = (a: number, b: number, x: number) => {
      const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };

    // campiona la foto in una griglia di particelle (una per cella, scarta alpha ~0)
    const init = () => {
      if (!img.naturalWidth || !tctx) return;
      const cssW = portrait.clientWidth;
      const cssH = portrait.clientHeight;
      canvas.width = Math.round(cssW * DPR);
      canvas.height = Math.round(cssH * DPR);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      const cols = Math.max(20, Math.round(cssW / CELL));
      const rows = Math.round(cols * (img.naturalHeight / img.naturalWidth));
      cw = cssW / cols;
      ch = cssH / rows;
      tmp.width = cols;
      tmp.height = rows;
      tctx.clearRect(0, 0, cols, rows);
      tctx.drawImage(img, 0, 0, cols, rows);
      const data = tctx.getImageData(0, 0, cols, rows).data;
      parts = [];
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const k = (j * cols + i) * 4;
          const a = data[k + 3];
          if (a < 10) continue;
          const ang = Math.random() * 6.2832;
          const rad = 18 + Math.random() * 86;
          parts.push({
            tx: i * cw,
            ty: j * ch,
            ox: Math.cos(ang) * rad,
            oy: Math.sin(ang) * rad - 12,
            col: `rgb(${data[k]},${data[k + 1]},${data[k + 2]})`,
            a,
            d: Math.random() * 0.32,
          });
        }
      }
      ready = true;
    };

    const render = (p: number) => {
      const io = ss(0.8, 0.92, p);
      const co = 1 - ss(0.82, 0.93, p);
      img.style.opacity = String(io);
      canvas.style.opacity = String(co);
      if (co <= 0.001) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      if (!ready) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pp = Math.min(p / 0.8, 1);
      const rw = cw * DPR + 1;
      const rh = ch * DPR + 1;
      for (let n = 0; n < parts.length; n++) {
        const q = parts[n];
        const t = Math.max(0, Math.min(1, (pp - q.d) / (1 - q.d)));
        const et = 1 - Math.pow(1 - t, 3);
        const x = (q.tx + q.ox * (1 - et)) * DPR;
        const y = (q.ty + q.oy * (1 - et)) * DPR;
        const al = q.a * (t * t * t);
        if (al < 3) continue;
        ctx.globalAlpha = al / 255;
        ctx.fillStyle = q.col;
        ctx.fillRect(x, y, rw, rh);
      }
      ctx.globalAlpha = 1;
    };

    // p dal posizionamento del ritratto nel viewport: 0 in basso (~92vh), 1 in alto (~40vh)
    const computeP = () => {
      const rect = portrait.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const START = 0.92;
      const END = 0.4;
      return Math.max(
        0,
        Math.min(1, (START * vh - rect.top) / ((START - END) * vh)),
      );
    };

    // ridisegna solo quando p cambia, al massimo una volta per frame
    const update = () => {
      scheduled = false;
      const p = computeP();
      if (p !== lastP) {
        lastP = p;
        render(p);
      }
    };
    const onScroll = () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(update);
      }
    };
    const onResize = () => {
      init();
      lastP = -1;
      update();
    };

    const start = () => {
      init();
      lastP = -1;
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
    };

    // stato iniziale: particelle sparse (canvas pieno, foto nascosta)
    img.style.opacity = "0";
    canvas.style.opacity = "1";
    if (img.complete && img.naturalWidth) start();
    else img.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      img.removeEventListener("load", start);
    };
  }, []);

  return (
    <section id="founder" className={styles.section}>
      <div className={styles.bp} aria-hidden />

      <div ref={wrapRef} className={`${styles.wrap} ${inView ? styles.in : ""}`}>
        <div className={styles.eyebrow}>da dove nasce la visione di oonee</div>

        <div ref={portraitRef} className={styles.portrait}>
          <div className={styles.glow} aria-hidden />
          <canvas ref={canvasRef} className={styles.pcanvas} aria-hidden />
          {/* foto same-origin (public/): serve per il campionamento via getImageData */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src="/nico-maiolini.png"
            alt="Angelo Nico Maiolini"
            className={styles.photo}
          />
        </div>

        <div className={styles.aboutText}>
          <p className={styles.name}>Angelo Nico Maiolini</p>
          <div className={styles.role}>
            <b>Founder di oonee</b> · Marchio Customer Generation® registrato ·
            Citato da Fortune Italia ed Economy Magazine
          </div>

          <div className={styles.manifesto}>
            <p>Nessuno guarda più la pubblicità: ci nuota dentro e la ignora.</p>
            <p>Chi parla a tutti non vende a nessuno.</p>
            <p>
              Vendere significa parlare al singolo, su scala. Questa è la{" "}
              <span className={styles.cy}>Conversion Architecture</span>.
            </p>
          </div>

          <div className={styles.tagline}>
            Non facciamo marketing.{" "}
            <span className={styles.cy}>Costruiamo conversione.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
