import { OpenWizardButton } from "./OpenWizardButton";
import { Halo } from "./Halo";
import { PriceCard } from "./PriceCard";

// Két egyenes állítás, az ár és a felhívás. Csili-vili nélkül.
const statements = [
  {
    title: "A NEHEZÉT MI CSINÁLJUK.",
    text: "Célzás, kreatív, szöveg, beállítás, optimalizálás. Te csak az ügyfelekkel foglalkozol.",
  },
  {
    title: "NEKÜNK AKKOR ÉRI MEG, HA NEKED IS.",
    text: "Ha több pénzt akarsz keresni, jó helyen jársz. Ha nem, nem érdemes velünk dolgoznod, és ezt még szívesen el is mondjuk.",
  },
];

export function StraightTalk() {
  return (
    <section className="px-6 pb-6 pt-24 text-black sm:pb-8 sm:pt-32">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-12">
          {statements.map((s) => (
            <div key={s.title} className="border-l-[6px] border-accent pl-6 sm:pl-8">
              <h3 className="font-display text-3xl leading-[1.15] sm:text-5xl">{s.title}</h3>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#4a4a4a] sm:text-xl">
                {s.text}
              </p>
            </div>
          ))}
        </div>

        <PriceCard />

        <div className="mt-20 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/meta3d/szivlajk.webp" alt="" className="animate-float-a mx-auto mb-6 w-44 select-none drop-shadow-[0_22px_26px_rgba(8,102,255,0.28)] sm:w-56" />
          <Halo>
            <OpenWizardButton hover="Most. Most kell." className="rounded-full bg-accent px-10 py-5 text-xl font-semibold text-white sm:px-14 sm:py-6 sm:text-2xl">
              Na, mikor fogod megnyomni?
            </OpenWizardButton>
          </Halo>
        </div>
      </div>
    </section>
  );
}
