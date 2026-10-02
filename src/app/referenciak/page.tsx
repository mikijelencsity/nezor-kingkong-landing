import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

const projects = [
  { tag: "ÉPÍTŐIPAR", name: "Komár és Fia Kft.", desc: "Teljes körű építőipari kivitelező weboldala Budapest és Pest vármegye térségére, egyértelmű ajánlatkérő fókusszal.", note: "Az oldal megbízhatóságot közvetít, és gyorsan az árajánlat-kéréshez vezeti a látogatót." },
  { tag: "AJÁNLATKÉRÉS", name: "Hellinger Kft.", desc: "Egyszerű, üzleti ajánlatra épített oldal, ahol a szolgáltatás gyorsan érthető és a döntés gyorsul.", note: "Ajánlatkérésre hangolt struktúra, amely végigvezeti az érdeklődőt." },
  { tag: "WEBOLDAL", name: "Estur Épker Kft.", desc: "Ajánlatkérő fókusz: minden blokk a kapcsolatfelvételre irányít, egyszerűen és világosan.", note: "A látvány és a struktúra egyértelműen a következő lépésre tereli a látogatót." },
  { tag: "MÁRKAÉPÍTÉS", name: "Dover Check", desc: "Prémium megjelenés, ami megbízhatóságot és hitelességet közvetít a márka számára.", note: "Esztétikus, de üzleti célú felépítés, ami a bizalmat növeli." },
  { tag: "VENDÉGLÁTÁS", name: "Neked Sütöm", desc: "Helyi weboldal, ami gyorsan viszi a vendéget az étlaphoz és az ízek hangulatát adja át.", note: "Az oldal gyors hozzáférést ad a menühöz, és a rendelést vonzóvá teszi." },
  { tag: "KISKERESKEDELEM", name: "Cruiser Shop", desc: "Online kirakat, amely a bringákat és a szervizszolgáltatást egyaránt könnyen áttekinthetővé teszi.", note: "Gyorsan mutatja a bringákat, és egyszerűen vezeti a látogatót." },
  { tag: "EGÉSZSÉGES ÉLETMÓD", name: "InShape - Diet", desc: "Prémium életmód webshop, ahol a termékek és a szolgáltatások egységes, profi élményt adnak.", note: "A design egyszerre formál imázst és mutat profi terméket." },
  { tag: "NYÍLÁSZÁRÓ GYÁRTÁS", name: "Szeko Ablak", desc: "Letisztult bemutatkozó oldal a 2010 óta piacon lévő ablakgyártónak, ami szakmai hitelességet és minőséget közvetít.", note: "Az oldal a gyártói háttér és a tapasztalat köré építi a bizalmat." },
];

export default function Referenciak() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="REFERENCIÁK"
          title="A LEGFRISSEBB MUNKÁINKBÓL"
          subtitle="Minden oldal egyedi — a vállalkozásra, annak ügyfelére és céljaira szabva. Nem sablon, hanem rendszer, ami ajánlatkérést vagy rendelést hoz."
        />
        <Reveal>
          <section className="bg-black px-6 pb-24 text-[#f8f9fa]">
            <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <div
                  key={p.name}
                  className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/50"
                >
                  <p className="text-xs font-semibold tracking-widest text-accent">
                    {p.tag}
                  </p>
                  <h3 className="font-display text-2xl">{p.name}</h3>
                  <p className="text-sm text-[#cfcfcf]">{p.desc}</p>
                  <p className="text-xs text-[#8a8a8a]">{p.note}</p>
                  <span className="mt-2 text-xs font-semibold text-accent transition-transform group-hover:translate-x-1">
                    Projekt megnyitása →
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-16 text-center">
              <p className="mb-4 text-sm">TE LEHETSZ A KÖVETKEZŐ.</p>
              <button className="rounded-full bg-accent px-8 py-4 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95">
                Kérek egy ajánlatot
              </button>
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
