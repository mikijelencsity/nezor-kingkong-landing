"use client";
import { useEffect, useRef, useState } from "react";

export function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const fillRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      if (fillRef.current) fillRef.current.style.clipPath = "inset(0% 0 0 0)";
      setFadingOut(true);
      const t = setTimeout(() => setHidden(true), 350);
      return () => clearTimeout(t);
    }

    const duration = 1100;
    const start = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    let raf = 0;

    function frame(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const p = easeOutCubic(t);
      if (fillRef.current) {
        fillRef.current.style.clipPath = `inset(${(1 - p) * 100}% 0 0 0)`;
      }
      if (t < 1) {
        raf = requestAnimationFrame(frame);
      } else {
        setTimeout(() => setFadingOut(true), 150);
        setTimeout(() => setHidden(true), 500);
      }
    }
    raf = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(raf);
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-background transition-opacity duration-[350ms] ease-out ${
        fadingOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative grid place-items-center">
        <p className="font-display text-5xl uppercase tracking-wide text-accent/0 [-webkit-text-stroke:1.5px_var(--accent)] [grid-area:1/1]">
          Nezor
        </p>
        <p
          ref={fillRef}
          className="font-display text-5xl uppercase tracking-wide text-accent [clip-path:inset(100%_0_0_0)] [grid-area:1/1]"
        >
          Nezor
        </p>
      </div>
    </div>
  );
}
