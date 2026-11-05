// A **dupla csillaggal** jelölt bekezdések félkövérek.
const paragraphs = [
  "Kedves vállalkozó,",
  "Tudjuk, hogy nehéz.",
  "Jó, amit csinálsz. És jól csinálod. (Reméljük.)",
  "**Csak éppen el bírnál képzelni több ügyfelet.**",
  "Lehet, még weboldalad is van.",
  "Csakhogy a legszebb weboldal is csak egy bolt a zsákutca végén.",
  "Szép. Jól felszerelt. Csak épp nem jár arra senki.",
  "**A hirdetés az a tábla, ami odairányítja az embereket.**",
  "Próbálkoztál.",
  "Szóltál az ismerősöknek. Ők szóltak az ismerőseiknek.",
  "A nagynénid kétszer is megosztotta a posztot.",
  "Ami szép gesztus, de a rezsit nem fizeti.",
  "Közben mindenki azt mondja: „Hirdetni kell!”",
  "Aki már hirdetett, tudja, hogy ez nem ilyen egyszerű.",
  "Aki még nem, az fél, hogy elmegy a pénz.",
  "Mindkettő jogos félelem.",
  "**Mi nem ígérünk csodát.**",
  "(A csodákat külön számláznánk.)",
  "Azt ígérjük, hogy átvesszük a nehezét.",
  "A célzást. A szöveget. A beállítást. A mérést.",
  "Ha már hirdettél, megnézzük, hol megy el a pénz.",
  "Ha még nem, az alapoktól felépítjük.",
  "**Te pedig végre azzal foglalkozhatsz, amihez értesz.**",
  "Nálunk ez nem varázslat, hanem munka.",
  "Egy kis rendszerrel. És sokkal kevesebb idegeskedéssel.",
  "Ez indul el itt lent…",
];

export function LetterSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-4 pt-24 text-black sm:pb-8">
      {/* oldalsó fények: felül és alul is kifutnak, hogy se a hero éle alatt, se az Offering felé ne legyen varrat */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-accent/40 via-accent/10 to-transparent [mask-image:linear-gradient(to_bottom,transparent,black_12rem,black_calc(100%-14rem),transparent)] sm:w-48 sm:from-accent/70 sm:via-accent/25 lg:w-72"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-accent/40 via-accent/10 to-transparent [mask-image:linear-gradient(to_bottom,transparent,black_12rem,black_calc(100%-14rem),transparent)] sm:w-48 sm:from-accent/70 sm:via-accent/25 lg:w-72"
      />
      <div className="relative mx-auto flex max-w-3xl flex-col gap-8 text-2xl leading-snug sm:gap-11 sm:text-[2rem]">
        {paragraphs.map((p) =>
          p.startsWith("**") ? (
            <p key={p} className="font-bold">
              {p.slice(2, -2)}
            </p>
          ) : (
            <p key={p}>{p}</p>
          ),
        )}
        <p className="mt-4 text-lg text-[#6b6b6b] sm:text-xl">
          u.i.: A gól a lövőt lepi meg legjobban 😉
        </p>
      </div>
    </section>
  );
}
