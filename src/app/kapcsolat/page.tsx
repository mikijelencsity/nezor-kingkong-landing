import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

const bullets = [
  "Kötelezettségmentes 20 perces hívás",
  "24 órán belül visszajelzünk",
  "Személyre szabott elemzés",
];

export default function Kapcsolat() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="KAPCSOLAT"
          title="BESZÉLGESSÜNK 20 PERCET."
          subtitle="Hová tűnnek az érdeklődőid? Miért nem vásárolnak eleget? A hívás után tudni fogod a válaszokat, és azt is, hogyan javíts rajta."
        />
        <Reveal>
          <section className="bg-black px-6 pb-24 text-[#f8f9fa]">
            <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-2">
              <div className="flex flex-col gap-4">
                {bullets.map((b) => (
                  <div key={b} className="flex items-center gap-3 text-sm">
                    <span className="text-accent">✓</span>
                    {b}
                  </div>
                ))}
                <div className="mt-6 rounded-2xl border border-white/10 bg-card p-6 text-sm text-[#cfcfcf]">
                  <p className="mb-2 font-semibold text-[#f8f9fa]">
                    Vagy hívj minket egyenesen:
                  </p>
                  <p>info@nezor.hu</p>
                  <p>+36 70 455 4703</p>
                </div>
              </div>
              <form className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-card p-6">
                <input
                  type="text"
                  placeholder="Neved *"
                  className="rounded-full bg-[#e9e9ea] px-4 py-3 text-sm text-black placeholder:text-[#6b6b6b] outline-none"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  className="rounded-full bg-[#e9e9ea] px-4 py-3 text-sm text-black placeholder:text-[#6b6b6b] outline-none"
                />
                <input
                  type="tel"
                  placeholder="Telefonszám *"
                  className="rounded-full bg-[#e9e9ea] px-4 py-3 text-sm text-black placeholder:text-[#6b6b6b] outline-none"
                />
                <button
                  type="submit"
                  className="mt-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95"
                >
                  Kérek egy rövid konzultációt →
                </button>
                <p className="text-xs text-[#8a8a8a]">
                  Az adatokat bizalmasan kezeljük, harmadik félnek nem adjuk át.
                </p>
              </form>
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
