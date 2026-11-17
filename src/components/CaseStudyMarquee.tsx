import Link from "next/link";
import { cases, marqueeCards, type CaseStudy, type UpcomingCase } from "@/data/cases";

// Csak a kép és a név-címke: a számok a hirdetés képén és az esettanulmányok listáján vannak (a kártya oda visz, az ügyfélhez görgetve).
// Az adat nélküli kártya (UpcomingCase) nem kattintható.
function ResultCard({ c }: { c: CaseStudy | UpcomingCase }) {
  const clickable = "results" in c;
  const inner = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={c.image}
        alt={c.name}
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ${clickable ? "group-hover:scale-105" : ""}`}
      />
      <span
        className={`absolute left-4 top-4 inline-flex items-center rounded-full border border-white/25 bg-black/35 px-5 py-2.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors duration-300 sm:left-5 sm:top-5 ${clickable ? "group-hover:border-accent/70" : ""}`}
      >
        <span className="font-display pt-0.5 text-lg leading-none tracking-wide text-white sm:text-xl">{c.name}</span>
      </span>
    </>
  );
  const cls = "group relative block aspect-[4/5] w-72 shrink-0 overflow-hidden rounded-2xl bg-card sm:w-[26rem]";
  return clickable ? (
    <Link href={`/esettanulmanyok#${c.slug}`} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={`${cls} cursor-default select-none`}>{inner}</div>
  );
}

// a képsáv alatt kiemelt ügyfél
function FeaturedCase({ c }: { c: CaseStudy }) {
  const nf = (n: number) => n.toLocaleString("hu-HU");
  return (
    <Link
      href={`/esettanulmanyok#${c.slug}`}
      className="group mx-auto mt-16 grid max-w-5xl items-center gap-6 px-4 text-left sm:mt-20 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:gap-10 sm:px-6 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-14"
    >
      <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-3xl bg-card sm:max-w-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={c.image}
          alt={c.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0">
        <h3 className="font-display text-[clamp(2.25rem,8vw,4.5rem)] uppercase leading-[1.05]">
          {nf(c.results.count)} {c.results.unit}
          <span className="block text-accent">darabja {nf(c.results.costPer)} Ft</span>
        </h3>
        <p className="mt-5 text-lg text-white/70 sm:text-xl">{c.subsegment}</p>
        <div className="mt-6 flex items-center gap-4">
          {c.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`/images/partnerek/${c.logo}.webp`}
              alt=""
              className="h-10 w-auto rounded-lg bg-white px-2 py-1.5 object-contain sm:h-12"
            />
          )}
          <span className="font-display text-xl uppercase tracking-wide sm:text-2xl">{c.name}</span>
        </div>
      </div>
    </Link>
  );
}

const FEATURED_SLUG = "mobilhazgyarto";

export function CaseStudyMarquee() {
  const items = [...marqueeCards, ...marqueeCards];
  const featured = cases.find((c) => c.slug === FEATURED_SLUG);

  return (
    <section className="overflow-hidden bg-night py-20 text-center text-[#f8f9fa]">
      <p className="text-xs font-semibold tracking-widest text-accent sm:text-sm">
        ESETTANULMÁNYAINK
      </p>
      <h2 className="font-display mt-4 text-4xl leading-tight sm:text-6xl">
        Hogy ne csak levegőbe beszéljünk.
      </h2>

      <div className="relative mt-14 w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-night to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-night to-transparent sm:w-32" />

        <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
          {items.map((c, i) => (
            <ResultCard key={`${c.slug}-${i}`} c={c} />
          ))}
        </div>
      </div>

      {/* kiemelt esettanulmány a képsáv alatt: csak a kép, a fő szám címként, alatta a téma, a logó és a cégnév */}
      {featured && <FeaturedCase c={featured} />}

      <Link
        href="/esettanulmanyok"
        className="mt-12 inline-block rounded-full border border-accent bg-accent px-10 py-4 text-base font-semibold text-white shadow-[0_0_32px_-4px] shadow-accent/60 transition-all duration-500 ease-out hover:scale-105 hover:shadow-[0_0_44px_-2px] hover:shadow-accent/80"
      >
        Esettanulmányok →
      </Link>
    </section>
  );
}
