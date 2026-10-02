const offers = [
  {
    eyebrow: "BÍZD RÁNK",
    title: "HIRDETÉS",
    desc: "Teljeskörű Facebook és Instagram hirdetéskezelés: célzás, kreatív, szöveg, optimalizálás. Te a rendeléseket intézed, mi a forgalmat.",
    reviews: "Kötelezettségmentes ajánlat",
  },
  {
    eyebrow: "ISMERD MEG A RENDSZERT",
    title: "KONZULTÁCIÓ",
    desc: "20 perces ingyenes hívás, amiben megmutatjuk, hol szivárog most a pénz a hirdetéseidnél, és hogyan javíthatunk rajta.",
    reviews: "Semmilyen elköteleződéssel nem jár",
  },
];

export function Offering() {
  return (
    <section className="bg-[#f8f9fa] px-6 py-20 text-center text-black">
      <p className="mb-10 text-xs font-semibold tracking-widest text-[#5c7415]">
        VÁLASZD KI, HOGYAN INDULJUNK
      </p>
      <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
        {offers.map((o) => (
          <div
            key={o.title}
            className="group flex flex-col items-center gap-4 rounded-2xl border border-black/10 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-md"
          >
            <p className="text-xs font-medium text-[#8a8a8a]">{o.eyebrow}</p>
            <h3 className="font-display text-4xl">{o.title}</h3>
            <p className="text-sm text-[#5a5a5a]">{o.desc}</p>
            <button className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95">
              Foglalok időpontot
            </button>
            <p className="text-xs text-[#8a8a8a]">{o.reviews}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
