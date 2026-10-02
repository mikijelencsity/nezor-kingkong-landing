"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const navItems = [
  { n: "01", label: "Esettanulmányok", href: "/esettanulmanyok" },
  { n: "02", label: "Kapcsolat", href: "/kapcsolat" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [hidden, setHidden] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;

      if (open || y < 80) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }

      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX: x, clientY: y } = e;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(650px circle at ${x}px ${y}px, rgba(207,241,40,0.16), transparent 45%)`;
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] text-[#f8f9fa] transition-transform duration-500 ease-out ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="relative flex items-center justify-end px-6 pt-7 pb-4 backdrop-blur-md bg-black/40">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="absolute left-1/2 -translate-x-1/2 font-display text-3xl tracking-wide text-accent transition-opacity hover:opacity-80"
          >
            NEZOR
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
            className="group flex items-center"
          >
            <span
              className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-accent transition-all duration-500 ease-out ${
                open ? "bg-accent" : "bg-transparent group-hover:scale-105"
              }`}
            >
              <span
                className={`absolute block h-0.5 w-5 rounded-full transition-all duration-300 ease-out ${
                  open ? "translate-y-0 rotate-45 bg-black" : "-translate-y-[6px] rotate-0 bg-accent"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-5 rounded-full transition-all duration-200 ease-out ${
                  open ? "scale-x-0 opacity-0 bg-black" : "scale-x-100 opacity-100 bg-accent"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-5 rounded-full transition-all duration-300 ease-out ${
                  open ? "translate-y-0 -rotate-45 bg-black" : "translate-y-[6px] rotate-0 bg-accent"
                }`}
              />
              <span
                className={`absolute -inset-1 rounded-full border border-accent/0 transition-all duration-500 ${
                  open ? "border-accent/40 scale-110" : "scale-100"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* trailing lime halo — expands a beat ahead of the black panel */}
      <div
        aria-hidden
        className={`fixed inset-0 z-[88] bg-accent/25 blur-2xl transition-[clip-path,opacity] duration-[950ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? "[clip-path:circle(145%_at_100%_0%)] opacity-100"
            : "[clip-path:circle(0%_at_100%_0%)] opacity-0"
        }`}
      />

      <div
        onMouseMove={handleMouseMove}
        className={`fixed inset-0 z-[90] overflow-hidden bg-black transition-[clip-path] duration-[800ms] delay-[70ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? "[clip-path:circle(150%_at_100%_0%)]"
            : "[clip-path:circle(0%_at_100%_0%)] pointer-events-none"
        }`}
      >
        <div
          ref={glowRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{ opacity: open ? 1 : 0 }}
        />

        <span
          aria-hidden
          className={`animate-spin-slow pointer-events-none absolute -right-32 -top-32 select-none font-display text-[26rem] leading-none text-accent/[0.06] transition-opacity duration-700 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          *
        </span>

        <nav
          onMouseLeave={() => setHovered(null)}
          className="relative flex h-full flex-col justify-center gap-1 px-8 sm:px-16"
        >
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              onMouseEnter={() => setHovered(i)}
              className={`group flex items-baseline gap-5 border-b border-white/10 py-3 transition-all duration-500 ease-out sm:py-4 ${
                open
                  ? "translate-y-0 rotate-0 opacity-100"
                  : "translate-y-10 -rotate-2 opacity-0"
              } ${
                hovered !== null && hovered !== i
                  ? "opacity-30 blur-[1px]"
                  : ""
              }`}
              style={{ transitionDelay: open ? `${250 + i * 90}ms` : "0ms" }}
            >
              <span
                className={`font-display text-sm transition-all duration-300 ${
                  hovered === i
                    ? "scale-125 text-accent drop-shadow-[0_0_12px_rgba(207,241,40,0.8)]"
                    : "text-accent"
                }`}
              >
                {item.n}
              </span>
              <span
                className={`font-display uppercase tracking-tight text-white transition-all duration-300 ease-out ${
                  hovered === i
                    ? "-translate-x-1 -skew-x-3 text-accent"
                    : "skew-x-0"
                } text-3xl sm:text-4xl md:text-5xl`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div
          className={`absolute bottom-10 left-8 flex flex-col gap-1 text-sm text-white/50 transition-all duration-500 ease-out sm:left-16 ${
            open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
          style={{ transitionDelay: open ? "700ms" : "0ms" }}
        >
          <a
            href="tel:+36704554703"
            className="transition-colors hover:text-accent"
          >
            +36 70 455 4703
          </a>
          <a
            href="mailto:info@nezor.hu"
            className="transition-colors hover:text-accent"
          >
            info@nezor.hu
          </a>
        </div>
      </div>
    </>
  );
}
