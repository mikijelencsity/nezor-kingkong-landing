"use client";
import { useEffect, useState } from "react";

export function CaseStudyRail({ items }: { items: { n: string }[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-case-study]")
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-case-study"));
            setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 lg:flex"
    >
      {items.map((item, i) => (
        <div key={item.n} className="flex items-center gap-3">
          <span
            className={`font-display text-xs transition-all duration-300 ${
              active === i ? "scale-125 text-accent" : "text-black/25"
            }`}
          >
            {item.n}
          </span>
          <span
            className={`h-px transition-all duration-300 ${
              active === i ? "w-8 bg-accent" : "w-4 bg-black/20"
            }`}
          />
        </div>
      ))}
    </div>
  );
}
