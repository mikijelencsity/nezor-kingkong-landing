const testimonials = [
  {
    quote: "Az új oldalunk egyszerűen profin és modernül néz ki. Többen mondták, mennyivel komolyabb lett a benyomás, és érződik az érdeklődőkön is, hogy jobban megbíznak bennünk.",
    name: "Ördögh Bence",
    role: "Google-értékelés, 5 csillag",
  },
  {
    quote: "Végre van egy oldalunk, amire büszkén küldöm rá az ügyfeleket. Letisztult, gyors, mobilon is tökéletes, pontosan olyan, amilyennek mindig szerettem volna.",
    name: "Lengyel Olivér",
    role: "Google-értékelés, 5 csillag",
  },
  {
    quote: "Nem gondoltam, hogy ekkora különbség lesz. Az oldal igényes és bizalmat kelt, és azóta többen keresnek minket. Nyilván azért, mert már ránézésre komolyan vesznek bennünket.",
    name: "Hellinger Adrián",
    role: "Google-értékelés, 5 csillag",
  },
];

export function Testimonials() {
  return (
    <section className="bg-black px-6 py-20 text-[#f8f9fa]">
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/50"
          >
            <p className="text-sm text-[#e0e0e0]">&ldquo;{t.quote}&rdquo;</p>
            <div>
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-[#9a9a9a]">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-[#6b6b6b]">
        A vélemények valós megbízóinktól érkeztek, hozzájárulásukkal. Az
        elért eredmények vállalkozásonként eltérhetnek.
      </p>
    </section>
  );
}
