// Főoldali „Rólunk” rész, sötét, filmszerű: a két alapító (átlátszó hátterű kivágás) nagyban, mögöttük kék ellenfény
// és halvány filmszemcse. A fotók alja a háttérbe olvad, a cím erre a sötét sávra kerül, így a fehér ing sem nyeli el.
// Alatta egy mondat, majd üveges sávban a három szám.
// A főoldalon a sötét konzultációs rész után jön, a világos szakasz előtt (lásd src/app/page.tsx).
// Az állítások ugyanazok, mint a Kisokos oldalon (/miert-mi) és a GYIK-ban (50+ vállalkozás, 12 000+ óra, heti egyeztetés).
const fade = "linear-gradient(to bottom, #000 45%, transparent 88%)";

// filmszemcse: SVG zaj adat-URI-ként, nagyon halványan a kép fölött
const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const founders = [
  { name: "Müller Dániel", src: "/images/csapat/ferfi-bal.webp", side: "left" },
  { name: "Jelencsity Miklós", src: "/images/csapat/ferfi-jobb.webp", side: "right" },
] as const;

const facts = [
  { value: "50+", label: "magyar vállalkozás" },
  { value: "12 000+", label: "óra tapasztalat" },
  { value: "Heti", label: "egyeztetés" },
];

export function AboutUs() {
  return (
    <section id="rolunk" className="relative isolate overflow-hidden bg-night px-4 pb-24 pt-20 text-white sm:px-6 sm:pb-32 sm:pt-28">
      {/* ellenfény a fotók mögött + sarkok sötétítése */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[18%] -z-10 h-[70%] w-[min(70rem,140vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(8,102,255,0.55),rgba(8,102,255,0.18)_55%,transparent)] blur-2xl"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_40%,transparent_55%,rgba(0,0,0,0.6))]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20 opacity-[0.07] mix-blend-overlay" style={{ backgroundImage: grain }} />

      <p className="relative text-center text-sm font-semibold tracking-[0.35em] text-accent-soft">RÓLUNK</p>

      <div className="relative mx-auto mt-6 max-w-6xl sm:mt-8">
        {/* a két fotó egyforma fejmérettel: a hasábok a képek pixelszélességéhez igazodnak (867 és 1040 px) */}
        <div className="grid grid-cols-[867fr_983fr] items-end">
          {founders.map((f) => (
            <figure key={f.name} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.src}
                alt={`${f.name}, a NEZOR alapítója`}
                loading="lazy"
                style={{ WebkitMaskImage: fade, maskImage: fade }}
                className="block h-auto w-full select-none drop-shadow-[0_0_40px_rgba(8,102,255,0.35)]"
              />
              {/* név a fotó külső szélén, filmes felirat-stílusban */}
              <figcaption
                className={`absolute top-[38%] hidden text-xs font-semibold tracking-[0.3em] text-white/70 md:block ${
                  f.side === "left" ? "left-0 text-left" : "right-0 text-right"
                }`}
              >
                <span className={`block h-px w-10 bg-accent-soft/70 ${f.side === "right" ? "ml-auto" : ""}`} />
                <span className="mt-3 block">{f.name.toUpperCase()}</span>
                <span className="mt-1 block text-[0.65rem] tracking-[0.35em] text-white/40">ALAPÍTÓ</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* a cím a fotók elsötétülő aljára kerül */}
        <h2 className="font-display relative z-10 -mt-[24%] text-center text-[clamp(2.4rem,9.5vw,8rem)] leading-[0.95] [text-shadow:0_10px_40px_rgba(0,0,0,0.65)]">
          EZ A KÉT ARC VAN
          <br />
          <span className="text-accent-soft">A HIRDETÉSEID</span> MÖGÖTT.
        </h2>

        {/* nevek telefonon, a cím alatt */}
        <p className="relative mt-5 text-center text-xs font-semibold tracking-[0.3em] text-white/60 md:hidden">
          MÜLLER DÁNIEL <span className="text-accent-soft">·</span> JELENCSITY MIKLÓS
        </p>

        <p className="relative mx-auto mt-6 max-w-xl text-center text-lg leading-snug text-white/75 sm:mt-8 sm:text-xl">
          A NEZOR-t ketten alapítottuk. Online rendszert építünk, ami vevőt hoz: Facebook-hirdetést, weboldalt, automatizmust.
        </p>

        <dl className="relative mx-auto mt-10 grid max-w-3xl grid-cols-3 divide-x divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md sm:mt-14">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col items-center px-2 py-5 text-center sm:py-7">
              <dt className="sr-only">{f.label}</dt>
              <dd className="font-display whitespace-nowrap text-[clamp(1.6rem,7vw,3.5rem)] leading-none text-white">{f.value}</dd>
              <dd className="mt-2 text-[0.7rem] font-semibold uppercase leading-tight tracking-widest text-white/50 sm:text-xs">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
