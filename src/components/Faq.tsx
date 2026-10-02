"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Mennyi a Facebook hirdetési költség?",
    a: "Ez a te büdzsédtől függ, nem a mienktől. Van, aki napi 3.000 Ft-ból indul, van, aki többől. Az első hívásban közösen kitaláljuk, mennyi az értelmes kezdő összeg a te iparágadban — nem sózunk rád felesleges nagyságrendet.",
  },
  {
    q: "Van havi díj? Mit fedez?",
    a: "Igen, ez a hirdetéskezelés díja — a hirdetési költségtől külön. Ebbe tartozik a célzás, a kreatívok, a szövegírás, az optimalizálás és a heti egyeztetés. Nem tűnünk el, miután megkaptuk a pénzt.",
  },
  {
    q: "Mi van, ha már van weboldalam vagy Facebook oldalam?",
    a: "Remek, akkor arra építünk. Nem kell mindent lecserélni ahhoz, hogy végre jó hirdetéseid legyenek — csak azt nézzük meg, mi hiányzik a rendszerből.",
  },
  {
    q: "Milyen iparágakkal dolgoztok?",
    a: "Webshoptól a kutyakozmetikáig, ékszerszalontól az épületgépészetig. Nem number ez, ha kicsi vagy nagy a céged — az számít, hogy van kinek eladni.",
  },
  {
    q: "Mi van, ha nem vagyok elégedett?",
    a: "Akkor beszélünk, és igazítunk rajta — mert csak akkor éri meg nekünk is, ha neked megéri. Az első 20 perces konzultáció egyébként teljesen kötelezettségmentes.",
  },
  {
    q: "Hol vagytok? Online vagy személyes találkozó is lehet?",
    a: "Alapból online dolgozunk, videóhívással — így gyorsabbak és rugalmasabbak vagyunk. Ha közel vagy hozzánk, a személyes egyeztetés sem kizárt.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-black px-6 py-20 text-[#f8f9fa]">
      <h2 className="mb-10 text-center font-display text-4xl">
        BIZTOS VAN KÉRDÉSED. VÁLASZOLUNK.
      </h2>
      <div className="mx-auto flex max-w-3xl flex-col gap-3">
        {faqs.map((f, i) => (
          <div
            key={f.q}
            className="rounded-xl border border-white/10 bg-card transition-colors hover:border-accent/40"
          >
            <button
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {f.q}
              <span
                className="text-accent transition-transform"
                style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                {open === i ? "−" : "+"}
              </span>
            </button>
            <div
              className="grid overflow-hidden transition-all duration-300 ease-out"
              style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
            >
              <div className="min-h-0">
                <p className="px-5 pb-4 text-sm text-[#cfcfcf]">{f.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-14 text-center">
        <p className="mb-4 text-sm">
          SZÓVAL AKKOR FOGLALJUNK EGY IDŐPONTOT?
        </p>
        <button className="rounded-full bg-accent px-8 py-4 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95">
          Kérek egy konzultációt
        </button>
      </div>
    </section>
  );
}
