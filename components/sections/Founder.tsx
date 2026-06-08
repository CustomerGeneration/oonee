"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import styles from "./Founder.module.css";

export default function Founder() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const neuralRef = useRef<HTMLCanvasElement>(null);
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

  // rete neurale dietro al testo (~30 nodi, linee per vicinanza, 3 impulsi)
  useEffect(() => {
    const nc = neuralRef.current;
    if (!nc) return;
    const nx = nc.getContext("2d");
    if (!nx) return;

    const reduce = reduceRef.current;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const N = 30;

    type Node = { x: number; y: number; vx: number; vy: number };
    type Pulse = { a: number; b: number; t: number; sp: number };
    let NW = 0;
    let NH = 0;
    let LINK = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;

    const ri = (n: number) => Math.floor(Math.random() * n);
    const npulse = (): Pulse => {
      const a = ri(N);
      let b = ri(N);
      let g = 0;
      while (b === a && g < 5) {
        b = ri(N);
        g++;
      }
      return { a, b, t: Math.random(), sp: 0.004 + Math.random() * 0.006 };
    };
    const nsize = () => {
      NW = nc.clientWidth;
      NH = nc.clientHeight;
      nc.width = Math.round(NW * DPR);
      nc.height = Math.round(NH * DPR);
      LINK = Math.min(NW, NH) * 0.46;
    };
    const nbuild = () => {
      nodes = [];
      for (let i = 0; i < N; i++) {
        nodes.push({
          x: Math.random() * NW,
          y: Math.random() * NH,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
        });
      }
      pulses = [];
      for (let k = 0; k < 3; k++) pulses.push(npulse());
    };
    const drawLinksNodes = () => {
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            nx.strokeStyle = `rgba(62,180,247,${(1 - d / LINK) * 0.15})`;
            nx.lineWidth = 1;
            nx.beginPath();
            nx.moveTo(nodes[i].x, nodes[i].y);
            nx.lineTo(nodes[j].x, nodes[j].y);
            nx.stroke();
          }
        }
      }
      for (let i = 0; i < N; i++) {
        nx.fillStyle = "rgba(125,195,240,0.5)";
        nx.beginPath();
        nx.arc(nodes[i].x, nodes[i].y, 1.4, 0, 6.2832);
        nx.fill();
      }
    };
    const nstep = () => {
      nx.clearRect(0, 0, nc.width, nc.height);
      nx.save();
      nx.scale(DPR, DPR);
      for (let i = 0; i < N; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0) n.x += NW;
        if (n.x > NW) n.x -= NW;
        if (n.y < 0) n.y += NH;
        if (n.y > NH) n.y -= NH;
      }
      drawLinksNodes();
      for (let k = 0; k < pulses.length; k++) {
        const pu = pulses[k];
        pu.t += pu.sp;
        if (pu.t >= 1) {
          pulses[k] = npulse();
          continue;
        }
        const a = nodes[pu.a];
        const b = nodes[pu.b];
        const e = pu.t * pu.t * (3 - 2 * pu.t);
        const px = a.x + (b.x - a.x) * e;
        const py = a.y + (b.y - a.y) * e;
        const gr = nx.createRadialGradient(px, py, 0, px, py, 6);
        gr.addColorStop(0, "rgba(169,224,255,0.9)");
        gr.addColorStop(1, "rgba(169,224,255,0)");
        nx.fillStyle = gr;
        nx.beginPath();
        nx.arc(px, py, 6, 0, 6.2832);
        nx.fill();
        nx.fillStyle = "rgba(220,240,255,0.95)";
        nx.beginPath();
        nx.arc(px, py, 1.8, 0, 6.2832);
        nx.fill();
      }
      nx.restore();
      raf = requestAnimationFrame(nstep);
    };

    if (reduce) {
      // prefers-reduced-motion: un singolo frame statico (nodi + linee)
      nsize();
      nbuild();
      nx.clearRect(0, 0, nc.width, nc.height);
      nx.save();
      nx.scale(DPR, DPR);
      drawLinksNodes();
      nx.restore();
      return;
    }

    nsize();
    nbuild();
    raf = requestAnimationFrame(nstep);
    const onResize = () => {
      nsize();
      nbuild();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
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
            src="/nico-founder.png"
            alt="Angelo Nico Maiolini"
            className={styles.photo}
          />
        </div>

        <div className={styles.lower}>
          <canvas ref={neuralRef} className={styles.neural} aria-hidden />
          <div className={styles.aboutText}>
            <p className={styles.name}>Angelo Nico Maiolini</p>
            <div className={styles.role}>
              <b>Founder di oonee</b> · Marchio Customer Generation® registrato ·
              Citato da Fortune Italia ed Economy Magazine
            </div>

            <div className={styles.manifesto}>
              <p>
                Nessuno guarda più la pubblicità: ci nuota dentro e la ignora.
              </p>
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
      </div>
    </section>
  );
}
