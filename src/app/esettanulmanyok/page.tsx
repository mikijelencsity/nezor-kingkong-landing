import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { CaseStudyRail } from "@/components/CaseStudyRail";

const cases = [
  {
    tag: "ÉPÍTŐIPAR",
    name: "Komár és Fia Kft.",
    desc: "Teljes körű építőipari kivitelező weboldala Budapest és Pest vármegye térségére, egyértelmű ajánlatkérő fókusszal.",
    note: "Az oldal megbízhatóságot közvetít, és gyorsan az árajánlat-kéréshez vezeti a látogatót.",
    stat: { value: "+XX%", label: "ajánlatkérés (placeholder)" },
  },
  {
    tag: "AJÁNLATKÉRÉS",
    name: "Hellinger Kft.",
    desc: "Egyszerű, üzleti ajánlatra épített oldal, ahol a szolgáltatás gyorsan érthető és a döntés gyorsul.",
    note: "Ajánlatkérésre hangolt struktúra, amely végigvezeti az érdeklődőt.",
    stat: { value: "XX nap", label: "megtérülési idő (placeholder)" },
  },
  {
    tag: "WEBOLDAL",
    name: "Estur Épker Kft.",
    desc: "Ajánlatkérő fókusz: minden blokk a kapcsolatfelvételre irányít, egyszerűen és világosan.",
    note: "A látvány és a struktúra egyértelműen a következő lépésre tereli a látogatót.",
    stat: { value: "+XX%", label: "konverziós arány (placeholder)" },
  },
  {
    tag: "MÁRKAÉPÍTÉS",
    name: "Dover Check",
    desc: "Prémium megjelenés, ami megbízhatóságot és hitelességet közvetít a márka számára.",
    note: "Esztétikus, de üzleti célú felépítés, ami a bizalmat növeli.",
    stat: { value: "+XX%", label: "márkakeresés (placeholder)" },
  },
  {
    tag: "VENDÉGLÁTÁS",
    name: "Neked Sütöm",
    desc: "Helyi weboldal, ami gyorsan viszi a vendéget az étlaphoz és az ízek hangulatát adja át.",
    note: "Az oldal gyors hozzáférést ad a menühöz, és a rendelést vonzóvá teszi.",
    stat: { value: "+XX%", label: "online rendelés (placeholder)" },
  },
  {
    tag: "KISKERESKEDELEM",
    name: "Cruiser Shop",
    desc: "Online kirakat, amely a bringákat és a szervizszolgáltatást egyaránt könnyen áttekinthetővé teszi.",
    note: "Gyorsan mutatja a bringákat, és egyszerűen vezeti a látogatót.",
    stat: { value: "+XX%", label: "szervizfoglalás (placeholder)" },
  },
  {
    tag: "EGÉSZSÉGES ÉLETMÓD",
    name: "InShape - Diet",
    desc: "Prémium életmód webshop, ahol a termékek és a szolgáltatások egységes, profi élményt adnak.",
    note: "A design egyszerre formál imázst és mutat profi terméket.",
    stat: { value: "+XX%", label: "rendelésszám (placeholder)" },
  },
  {
    tag: "NYÍLÁSZÁRÓ GYÁRTÁS",
    name: "Szeko Ablak",
    desc: "Letisztult bemutatkozó oldal a 2010 óta piacon lévő ablakgyártónak, ami szakmai hitelességet és minőséget közvetít.",
    note: "Az oldal a gyártói háttér és a tapasztalat köré építi a bizalmat.",
    stat: { value: "+XX%", label: "megkeresés (placeholder)" },
  },
];

function PlaceholderFrame({ n }: { n: string }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-black/10 bg-[repeating-linear-gradient(135deg,rgba(207,241,40,0.14)_0px,rgba(207,241,40,0.14)_14px,transparent_14px,transparent_28px)]">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/40">
        <span className="font-display text-5xl text-black/15">{n}</span>
        <span className="text-xs font-semibold tracking-widest text-black/35">
          KÉP HELYE
        </span>
      </div>
    </div>
  );
}

export default function Esettanulmanyok() {
  return (
    <>
      <Header />
      <CaseStudyRail items={cases.map((_, i) => ({ n: String(i + 1).padStart(2, "0") }))} />
      <main className="bg-[#f8f9fa] text-black">
        <section className="flex flex-col items-center gap-5 px-6 pt-32 pb-20 text-center">
          <p className="text-xs font-semibold tracking-widest text-[#5c7415]">
            ESETTANULMÁNYOK
          </p>
          <h1 className="font-display max-w-3xl text-4xl leading-[0.95] sm:text-6xl">
            VALÓDI VÁLLALKOZÁSOK, VALÓDI EREDMÉNYEK.
          </h1>
          <p className="max-w-xl text-sm text-[#5a5a5a] sm:text-base">
            Minden projekt egy döntéssel indul: abba kell fektetni a pénzt, ami
            tényleg vevőt hoz. A konkrét számok most még placeholder alatt
            futnak — amint az ügyfelek jóváhagyják a valós adatokat, itt
            frissülnek.
          </p>
        </section>

        <div className="mx-auto flex max-w-5xl flex-col gap-20 px-6 pb-28 sm:gap-28">
          {cases.map((c, i) => (
            <Reveal key={c.name}>
              <section
                data-case-study={i}
                className="grid items-center gap-8 sm:grid-cols-2"
              >
                <div className={i % 2 === 1 ? "sm:order-2" : undefined}>
                  <PlaceholderFrame n={String(i + 1).padStart(2, "0")} />
                </div>
                <div
                  className={
                    i % 2 === 1 ? "sm:order-1 sm:text-right" : undefined
                  }
                >
                  <p className="mb-3 text-xs font-semibold tracking-widest text-[#5c7415]">
                    {c.tag}
                  </p>
                  <h2 className="font-display mb-4 text-3xl sm:text-4xl">
                    {c.name}
                  </h2>
                  <p className="mb-2 text-sm text-[#4a4a4a] sm:text-base">
                    {c.desc}
                  </p>
                  <p className="mb-6 text-xs text-[#8a8a8a]">{c.note}</p>
                  <div
                    className={`inline-flex items-baseline gap-2 rounded-sm border border-dashed border-black/20 px-4 py-2 ${
                      i % 2 === 1 ? "sm:flex-row-reverse" : ""
                    }`}
                  >
                    <span className="font-display text-2xl text-accent">
                      {c.stat.value}
                    </span>
                    <span className="text-xs text-[#8a8a8a]">
                      {c.stat.label}
                    </span>
                  </div>
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        <section className="px-6 pb-28 text-center">
          <p className="mb-4 text-sm text-[#5a5a5a]">TE LEHETSZ A KÖVETKEZŐ.</p>
          <button className="rounded-full bg-accent px-8 py-4 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95">
            Kérek egy ajánlatot
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
}
