const placeholders = Array.from({ length: 8 }, (_, i) => i + 1);

export function CaseStudyMarquee() {
  const items = [...placeholders, ...placeholders];

  return (
    <section className="overflow-hidden bg-black py-20 text-center text-[#f8f9fa]">
      <p className="text-xs font-semibold tracking-widest text-accent sm:text-sm">
        ESETTANULMÁNYAINK
      </p>
      <h2 className="font-display mt-4 text-4xl leading-tight sm:text-6xl">
        Hogy ne csak levegőbe beszéljünk.
      </h2>

      <div className="relative mt-14 w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent sm:w-32" />

        <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
          {items.map((n, i) => (
            <div
              key={i}
              className="flex h-48 w-72 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-card text-sm font-medium text-[#6b6b6b] sm:h-56 sm:w-80"
            >
              Kép #{n}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
