"use client";

import { useEffect, useRef } from "react";

// Grafikai preloader: a képernyőn szétszórt pontok a „közönség”. Egy kék pásztázó gyűrű kiválogatja az érdeklődőket:
// ezek a NEZOR-logó saját színeit felvéve logóvá állnak össze, a többi pont elhalványul.
// A logó közepéből kör alakban nyílik ki az oldal. A teljes idő kb. 2 másodperc.
const LOGO = "/images/meta3d/nezor-logo.webp";
const FADE_IN = 300;
const GATHER_END = 1200;
const REVEAL_AT = 1450;
const END = 2050;
const MAX_DELAY = 0.35;

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
const easeIn = (x: number) => x * x * x;

type Dot = {
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  r: number;
  g: number;
  b: number;
  delay: number;
  bend: number;
};

export function LogoPreloader({ onReveal, onFinish }: { onReveal: () => void; onFinish: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onReveal();
      onFinish();
      return;
    }

    // Töltés közben nem görgethető az oldal.
    const stop = (e: Event) => e.preventDefault();
    window.addEventListener("wheel", stop, { passive: false });
    window.addEventListener("touchmove", stop, { passive: false });
    window.scrollTo(0, 0);

    const W = window.innerWidth;
    const H = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
    const maxR = Math.hypot(W, H) / 2 + 40;

    // Amíg a logó töltődik, a háttér már a helyén van, így nincs villanás.
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);

    let raf = 0;
    let cancelled = false;
    let revealed = false;

    const finish = () => {
      if (!revealed) {
        revealed = true;
        onReveal();
      }
      onFinish();
    };

    const img = new Image();
    img.onerror = finish;
    img.onload = () => {
      if (cancelled) return;
      const logoW = Math.min(W * 0.72, 640);
      const logoH = (logoW * img.naturalHeight) / img.naturalWidth;
      const x0 = (W - logoW) / 2;
      const y0 = (H - logoH) / 2;

      // A logó pixeleiből készülnek a célpontok: így a pontok pontosan a logó alakját és színeit veszik fel.
      const off = document.createElement("canvas");
      off.width = Math.round(logoW);
      off.height = Math.round(logoH);
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) {
        finish();
        return;
      }
      octx.drawImage(img, 0, 0, off.width, off.height);
      const { data } = octx.getImageData(0, 0, off.width, off.height);
      let opaque = 0;
      for (let i = 3; i < data.length; i += 4) if (data[i] > 140) opaque++;
      const wanted = W < 700 ? 1200 : 2400;
      const step = Math.max(2, Math.ceil(Math.sqrt(opaque / wanted)));

      const dots: Dot[] = [];
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          const i = (y * off.width + x) * 4;
          if (data[i + 3] <= 140) continue;
          dots.push({
            sx: Math.random() * W,
            sy: Math.random() * H,
            tx: x0 + x,
            ty: y0 + y,
            r: data[i],
            g: data[i + 1],
            b: data[i + 2],
            delay: Math.random() * MAX_DELAY,
            bend: (Math.random() - 0.5) * 140,
          });
        }
      }
      const decoys = Array.from({ length: Math.round(dots.length * 0.6) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        s: 1 + Math.random() * 1.4,
      }));
      const size = Math.max(1.6, step * 0.9);
      const t0 = performance.now();

      const backdrop = () => {
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, W, H);
        const glow = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, maxR);
        glow.addColorStop(0, "rgba(8,102,255,0.32)");
        glow.addColorStop(0.55, "rgba(10,31,77,0.28)");
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, H);
      };

      const scanRing = (t: number, start: number, end: number) => {
        const u = clamp01((t - start) / (end - start));
        if (u <= 0 || u >= 1) return;
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, easeOut(u) * maxR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(79,176,255,${0.75 * (1 - u)})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      };

      const tick = (now: number) => {
        const t = now - t0;
        backdrop();

        if (t < REVEAL_AT) {
          const fade = clamp01(t / FADE_IN);

          // akik nem érdeklődők: elhalványulnak
          const decoyAlpha = 0.5 * fade * (1 - clamp01((t - FADE_IN) / 600));
          if (decoyAlpha > 0) {
            ctx.fillStyle = `rgba(190,210,255,${decoyAlpha})`;
            for (const d of decoys) ctx.fillRect(d.x, d.y, d.s, d.s);
          }

          scanRing(t, FADE_IN, 1050);
          scanRing(t, FADE_IN + 170, 1200);

          // akik érdeklődők: a logóba állnak
          const span = GATHER_END - FADE_IN - MAX_DELAY * 500;
          for (const d of dots) {
            const g = easeInOut(clamp01((t - FADE_IN - d.delay * 500) / span));
            const arc = Math.sin(g * Math.PI) * d.bend;
            const x = d.sx + (d.tx - d.sx) * g + arc;
            const y = d.sy + (d.ty - d.sy) * g - arc * 0.5;
            const r = Math.round(190 + (d.r - 190) * g);
            const gr = Math.round(210 + (d.g - 210) * g);
            const b = Math.round(255 + (d.b - 255) * g);
            ctx.fillStyle = `rgba(${r},${gr},${b},${0.55 * fade + 0.45 * g})`;
            ctx.fillRect(x, y, size, size);
          }

          // a pontokból összeállt logó finoman átvált az igazi 3D-s logóra
          const solid = clamp01((t - 1080) / 260);
          if (solid > 0) {
            ctx.globalAlpha = solid;
            ctx.drawImage(img, x0, y0, logoW, logoH);
            ctx.globalAlpha = 1;
          }
        } else {
          if (!revealed) {
            revealed = true;
            onReveal();
          }
          // a logó közepéből kör alakban kinyílik az oldal
          const u = clamp01((t - REVEAL_AT) / (END - REVEAL_AT));
          const radius = easeIn(u) * maxR * 1.05;
          ctx.globalCompositeOperation = "destination-out";
          ctx.beginPath();
          ctx.arc(W / 2, H / 2, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalCompositeOperation = "source-over";
          if (radius > 1) {
            ctx.beginPath();
            ctx.arc(W / 2, H / 2, radius, 0, Math.PI * 2);
            ctx.strokeStyle = "#4fb0ff";
            ctx.lineWidth = 3;
            ctx.stroke();
          }
          const logoFade = 1 - clamp01(u / 0.55);
          if (logoFade > 0) {
            const scale = 1 + 0.12 * easeOut(u);
            ctx.globalAlpha = logoFade;
            ctx.drawImage(img, W / 2 - (logoW * scale) / 2, H / 2 - (logoH * scale) / 2, logoW * scale, logoH * scale);
            ctx.globalAlpha = 1;
          }
          if (u >= 1) {
            finish();
            return;
          }
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    img.src = LOGO;

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchmove", stop);
    };
    // Egyszer fut le, a két visszahívás a szülőben stabil szerepű.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[200] h-full w-full" />;
}
