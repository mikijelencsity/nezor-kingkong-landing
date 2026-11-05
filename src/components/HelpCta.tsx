import Link from "next/link";
import { Halo } from "./Halo";
import { Roll } from "./Roll";

// Akinek nem egyértelmű, mit adhat neki a hirdetés: a „Miért mi?” aloldalra viszi.
export function HelpCta() {
  return (
    <section className="px-6 pt-24 text-center text-black sm:pt-32">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-[clamp(1.75rem,9vw,4.5rem)] leading-[1.15]">
          NEM TUDOD, HOGYAN SEGÍTHETNE A VÁLLALKOZÁSODNAK?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-[#5a5a5a] sm:text-xl">
          Nem baj. Összeszedtük egy helyre: hogyan működik, mit hozott másoknak, és hogyan lehetne megcsinálni nálad.
        </p>
        <Halo className="mt-10">
          <Link
            href="/miert-mi"
            className="btn-roll roll-dark font-display inline-block rounded-full bg-accent px-10 py-6 text-2xl tracking-wide text-white sm:px-16 sm:text-3xl"
          >
            <Roll label={<>MUTASD, HOGY MŰKÖDIK <span aria-hidden>→</span></>} hover="Lássuk! →" />
          </Link>
        </Halo>
      </div>
    </section>
  );
}
