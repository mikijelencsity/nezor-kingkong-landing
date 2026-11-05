// Az ajánlat és a havi díj (forrás: nezor.hu/landing10).
const included = [
  "Egész hónapban közös munka",
  "Éjjel-nappal működő ügyfélszerzés",
  "Kapsz egy oldalt, ami összegyűjti az érdeklődőket",
  "Megkapod a leendő ügyfeleid elérhetőségeit",
  "Heti beszámolók és teljes elérhetőség",
];

export function PriceCard() {
  return (
    <div className="mx-auto mt-20 max-w-xl rounded-3xl border-2 border-black bg-white p-6 text-center shadow-[0_24px_60px_-30px_rgba(8,102,255,0.45)] sm:p-9">
      <p className="mx-auto w-fit rounded-full bg-accent px-4 py-1.5 text-xs font-semibold tracking-widest text-white">AZ AJÁNLATUNK</p>
      <p className="mt-4 whitespace-nowrap">
        <span className="font-display text-[clamp(3.25rem,15vw,5.5rem)] leading-[1.15]">79&nbsp;000&nbsp;Ft</span>
        <span className="font-display text-[clamp(1.5rem,6vw,2.25rem)] text-black/50">/hó</span>
      </p>
      <p className="mt-1 font-bold text-[#333]">Ennyi a mi díjunk, és ezért mindent mi csinálunk.</p>
      <ul className="mt-6 grid gap-3 text-left text-lg font-bold leading-snug">
        {included.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm text-white">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm leading-relaxed text-[#5a5a5a]">
        + a hirdetési keret, amit közvetlenül a Metának fizetsz, így minden forint átlátható.
      </p>
    </div>
  );
}
