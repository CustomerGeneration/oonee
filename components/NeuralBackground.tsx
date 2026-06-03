"use client";

import { useEffect, useRef } from "react";

/**
 * Animazione "neural network / constellation" generata in canvas 2D.
 * Nodi luminosi che si muovono lentamente e pulsano; linee sottili tra nodi
 * vicini che appaiono/scompaiono col movimento. Palette brand (azzurro/bianco).
 * Pensata per il verticale mobile: leggera, requestAnimationFrame, rispetta
 * prefers-reduced-motion. pointer-events:none (non blocca lo scroll).
 */
export default function NeuralBackground({
  className = "",
}: {
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;

    type Node = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      phase: number;
    };
    let nodes: Node[] = [];

    function resize() {
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      // densità proporzionale all'area, ma limitata per performance
      const count = Math.max(22, Math.min(40, Math.round((w * h) / 16000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 1 + Math.random() * 1.6,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    const MAX_DIST = 130;

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      // linee tra nodi vicini
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.35;
            ctx!.strokeStyle = `rgba(120, 200, 235, ${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      // nodi luminosi con pulsazione + glow
      ctx!.shadowColor = "rgba(0, 153, 204, 0.9)";
      for (const n of nodes) {
        const pulse = 0.6 + 0.4 * Math.sin(t * 0.0016 + n.phase);
        ctx!.shadowBlur = 8 * pulse;
        ctx!.fillStyle = `rgba(220, 240, 255, ${0.5 + 0.5 * pulse})`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r * (0.8 + 0.4 * pulse), 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.shadowBlur = 0;
    }

    function step(now: number) {
      t = now;
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }
      draw();
      raf = requestAnimationFrame(step);
    }

    resize();
    if (reduce) {
      draw(); // frame statico, niente animazione
    } else {
      raf = requestAnimationFrame(step);
    }

    const onResize = () => {
      cancelAnimationFrame(raf);
      resize();
      if (reduce) draw();
      else raf = requestAnimationFrame(step);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none ${className}`}
    />
  );
}
