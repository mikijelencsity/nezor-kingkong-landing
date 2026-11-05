"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cases, formatHuf, industries, type CaseShot, type Industry } from "@/data/cases";
import { formatNumber } from "./CountUp";
import { BottomCta } from "./BottomCta";

type Case = (typeof cases)[number];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold tracking-widest text-black/50">{children}</p>;
}

// A kép a bekarikázott résszel; a karika kézzel húzott hatású, és a képpel együtt méreteződik.
function ShotImage({ shot, alt }: { shot: CaseShot; alt: string }) {
  const { circle, underline } = shot;
  return (
    <span className="relative block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={shot.src} alt={alt} width={shot.width} height={shot.height} loading="lazy" className="block h-auto w-full rounded-2xl border border-black/10 bg-white" />
      {circle && (
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute overflow-visible"
          style={{ left: `${circle.x}%`, top: `${circle.y}%`, width: `${circle.w}%`, height: `${circle.h}%` }}
        >
          <path
            d="M 52 3 C 22 1 2 22 3 50 C 4 80 28 98 54 97 C 82 96 98 76 97 48 C 96 20 74 3 44 7"
            fill="none"
            stroke="#ff2d78"
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
      {underline && (
        <svg
          aria-hidden
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
          className="pointer-events-none absolute h-[3%] overflow-visible"
          style={{ left: `${underline.x}%`, top: `${underline.y}%`, width: `${underline.w}%` }}
        >
          <path
            d="M 1 6 C 25 3 55 8 99 4"
            fill="none"
            stroke="#ff2d78"
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </span>
  );
}

// Kattintásra nagyított nézet: a Bezárás gomb, az Esc és a kép melletti kattintás is kilép belőle.
function ShotViewer({ shot, alt }: { shot: CaseShot; alt: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        aria-label={`${alt} nagyítása`}
        onClick={() => {
          const dialog = dialogRef.current;
          if (!dialog) return;
          dialog.showModal();
          // keskeny kijelzőn oldalra görgethető a kép: a jelölések a jobb szélén vannak, ott nyíljon meg
          dialog.scrollLeft = dialog.scrollWidth;
        }}
        className="block w-full cursor-zoom-in rounded-2xl text-left transition-shadow hover:shadow-[0_18px_50px_-24px_rgba(8,102,255,0.7)]"
      >
        <ShotImage shot={shot} alt={alt} />
      </button>
      <dialog
        ref={dialogRef}
        aria-label={alt}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
        className="m-auto max-h-[92dvh] w-[min(94vw,88rem)] max-w-none overflow-auto rounded-2xl bg-transparent p-0 backdrop:bg-black/85"
      >
        <div className="min-w-[52rem] p-1">
          <ShotImage shot={shot} alt={alt} />
        </div>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="fixed right-4 top-4 rounded-full bg-white px-5 py-3 text-sm font-bold text-black shadow-lg transition-colors hover:bg-accent hover:text-white"
        >
          Bezárás ✕
        </button>
      </dialog>
    </>
  );
}

function CaseCard({ c, index }: { c: Case; index: number }) {
  const r = c.results;

  // a háttér első mondata mondja meg, ki az ügyfél; a többi a háttér-szakaszba kerül
  const who = c.background.match(/^.*?\.(?=\s|$)/)?.[0] ?? c.background;
  const context = c.background.slice(who.length).trim();

  const stats = [
    { label: r.unit, value: `${formatNumber(r.count)} db`, wide: true },
    { label: "1 db ára", value: formatHuf(r.costPer) },
    { label: r.spendLabel, value: r.spendDisplay ?? formatHuf(r.spend) },
    ...(r.dailySpend ? [{ label: "Napi büdzsé", value: formatHuf(r.dailySpend) }] : []),
    ...(r.monthlySpend ? [{ label: "Havi büdzsé", value: formatHuf(r.monthlySpend) }] : []),
  ];

  return (
    <article
      id={c.slug}
      className="cs-card scroll-mt-24 rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_30px_70px_-45px_rgba(8,102,255,0.55)] sm:p-10"
      style={{ animationDelay: `${Math.min(index, 3) * 90}ms` }}
    >
      <div className="grid min-w-0 gap-10 lg:grid-cols-2 xl:grid-cols-[17rem_minmax(0,1fr)_23rem]">
        {/* történet */}
        <div className="min-w-0 lg:col-start-1 lg:row-span-2 lg:row-start-1 xl:col-start-2 xl:row-span-1">
          <p className="text-xs font-semibold leading-relaxed tracking-widest text-accent">
            {c.industry.toUpperCase()} · {c.subsegment.toUpperCase()}
            {c.location && ` · ${c.location.toUpperCase()}`}
          </p>
          <h2 className="font-display mt-3 text-[clamp(1.5rem,9vw,2.25rem)] uppercase leading-[1.15] [overflow-wrap:anywhere] sm:text-6xl lg:text-5xl">
            {c.name}
          </h2>
          {c.website && (
            <a
              href={c.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-black/60 transition-colors hover:text-accent"
            >
              {new URL(c.website).hostname.replace(/^www\./, "")} <span aria-hidden>↗</span>
            </a>
          )}

          <p className="mt-5 text-lg font-medium leading-relaxed">{who}</p>

          <div className="mt-7 grid gap-6">
            {context && (
              <div>
                <Label>HÁTTÉR</Label>
                <p className="mt-2 leading-relaxed text-[#4a4a4a]">{context}</p>
              </div>
            )}
            <div>
              <Label>MEGOLDÁS</Label>
              <p className="mt-2 leading-relaxed text-[#4a4a4a]">{c.plan}</p>
            </div>
          </div>
        </div>

        {/* eredmények */}
        <div className="min-w-0 lg:col-start-2 lg:row-start-1 xl:col-start-3">
          <Label>EREDMÉNYEK</Label>
          <dl className="mt-3 grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className={`min-w-0 rounded-2xl border border-black/10 p-3 sm:p-4 ${s.wide ? "col-span-2 bg-accent text-white" : "bg-[#f8f9fa]"}`}
              >
                <dt className={`text-xs font-semibold first-letter:uppercase ${s.wide ? "text-white/80" : "text-black/60"}`}>
                  {s.label}
                </dt>
                <dd
                  className={`font-display mt-2 whitespace-nowrap leading-none ${
                    s.wide
                      ? "text-[clamp(2.25rem,12vw,3rem)] sm:text-6xl"
                      : "text-[clamp(0.95rem,5vw,1.25rem)] text-accent sm:text-3xl xl:text-2xl"
                  }`}
                >
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
          {c.note && <p className="mt-3 text-sm text-[#4a4a4a]">{c.note}</p>}
        </div>

        {/* kép: a képek mind 4:5 arányúak, ezért vágás nélkül, teljes egészében látszanak */}
        <div
          className={`relative aspect-[4/5] w-full max-w-sm self-start overflow-hidden rounded-3xl border border-black/10 bg-card lg:col-start-2 lg:row-start-2 xl:col-start-1 xl:row-start-1 ${
            c.image ? "block" : "hidden xl:block"
          }`}
        >
          {c.image ? (
            <Image
              src={c.image}
              alt=""
              fill
              sizes="(min-width: 1280px) 17rem, (min-width: 640px) 24rem, 100vw"
              className="object-cover"
            />
          ) : (
            // még nincs saját kép: névpanel, csak a háromoszlopos elrendezésben kell, hogy ne maradjon lyuk
            <span className="absolute inset-0 flex items-end bg-gradient-to-br from-accent to-[#0a1f4d] p-6">
              <span className="font-display min-w-0 text-[1.75rem] uppercase leading-[1.15] text-white">{c.name}</span>
            </span>
          )}
        </div>
      </div>

      {/* valódi hirdetéskezelő-képernyőképek (csak ha az ügyfélhez fel van véve) */}
      {c.shots && c.shots.length > 0 && (
        <div className="mt-10">
          <Label>KÉPERNYŐKÉPEK · KATTINTÁSRA NAGYOBB</Label>
          <div className="mt-3 grid gap-6">
            {c.shots.map((shot) => (
              <ShotViewer key={shot.src} shot={shot} alt={`${c.name} hirdetéskezelő-képernyőkép`} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export function CasesExplorer() {
  const [active, setActive] = useState<Industry | null>(null);
  const shown = active ? cases.filter((c) => c.industry === active) : cases;
  const filters: { label: string; value: Industry | null }[] = [
    { label: "Mind", value: null },
    ...industries.map((i) => ({ label: i, value: i })),
  ];

  return (
    <>
      {/* hős-rész */}
      <section className="relative overflow-hidden bg-[#f8f9fa] px-6 pb-16 pt-36 text-center text-black sm:pt-44">
        <div aria-hidden className="pp-grid pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-24 h-[24rem] w-[50rem] max-w-[140vw] -translate-x-1/2 rounded-full bg-accent/40 blur-[120px]"
        />
        <div className="relative">
          <h1 className="font-display mx-auto max-w-6xl text-[clamp(1.4rem,7.6vw,6rem)] leading-[1.12]">
            <span className="whitespace-nowrap">PAPÍRON MINDENKI JÓ.</span>
            <br />
            MI SZÁMOKKAL.
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-base text-[#5a5a5a] sm:text-lg">
            Valódi cégek, valódi hirdetési fiókok. Szűrj iparágra, és nézd meg, mennyibe került egy megkeresés.
          </p>
        </div>
      </section>

      {/* iparági szűrő: görgetéskor fent marad, a visszatérő fejléc alá csúszik */}
      <div className="sticky top-0 z-30 border-y border-black/10 bg-[#f8f9fa]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:justify-center sm:px-8">
          {filters.map((f) => {
            const on = active === f.value;
            return (
              <button
                key={f.label}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(f.value)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                  on
                    ? "border-accent bg-accent text-white"
                    : "border-black/10 bg-white text-black hover:border-accent hover:text-accent"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* kártyák */}
      <section className="bg-[#f8f9fa] px-4 pb-28 pt-10 text-black sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-semibold tracking-widest text-black/50">
            {(active ?? "Ügyfeleink").toUpperCase()} · {shown.length} ESETTANULMÁNY
          </p>
          <div className="grid gap-8">
            {shown.map((c, i) => (
              <CaseCard key={c.slug} c={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      <BottomCta />
    </>
  );
}
