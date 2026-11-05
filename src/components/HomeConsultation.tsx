"use client";

import dynamic from "next/dynamic";

export const CONSULTATION_ID = "kezdjuk";

// Csak böngészőben renderelődik, mert a kérdéssor a sessionStorage-ból olvassa ki az előre megadott nevet.
// A helyfoglaló miatt nem ugrik meg az oldal, amikor betöltődik.
const Wizard = dynamic(() => import("./ContactWizard").then((m) => m.ContactWizard), {
  ssr: false,
  loading: () => <div className="mx-auto min-h-[38rem] w-full max-w-2xl rounded-3xl bg-white/5" />,
});

// Az esettanulmányok számai után: egy valódi ügyfélüzenet, majd rögtön a beágyazott kapcsolatfelvétel.
export function HomeConsultation() {
  return (
    <section className="bg-black px-4 pb-20 text-center text-[#f8f9fa] sm:px-6 sm:pb-28">
      <figure className="mx-auto mb-16 max-w-lg sm:mb-24">
        {/* A valódi képernyőkép egyelőre az élő oldalról töltődik; élesítés előtt a public/ mappába kell másolni. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www.nezor.hu/ugyfel-uzenet.webp"
          alt="Ügyfélüzenet: Aztaku**a dekomoly. Nagyon jók vagytok."
          width={1398}
          height={672}
          loading="lazy"
          className="h-auto w-full rounded-3xl border-[6px] border-white sm:rounded-[2rem] sm:border-8"
        />
        <figcaption className="mt-4 text-sm text-white/65 sm:text-base">
          Egy ügyfelünk öröme nemes egyszerűséggel megfogalmazva.
        </figcaption>
      </figure>

      <div id={CONSULTATION_ID} className="scroll-mt-24">
        <h2 className="font-display mx-auto max-w-4xl text-[clamp(2.25rem,8vw,5rem)] leading-[1.15]">
          A TE SZÁMAID KÖVETKEZNEK?
        </h2>
        <p className="mx-auto mb-8 mt-4 max-w-xl text-lg text-white/75 sm:mb-10 sm:text-xl">
          Pár kérdés, és megmondjuk, mit csinálnánk nálad.
        </p>
        <div className="text-left">
          <Wizard advertised={null} />
        </div>
      </div>
    </section>
  );
}
