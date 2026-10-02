const paragraphs = [
  "Frissítve: 2026. szeptember",
  "Kedves vállalkozó,",
  "Tudjuk, mi a helyzet.",
  "Felraktad a Facebook oldaladat, feltöltöttél pár posztot, aztán vártad, hogy szóljon a telefon.",
  "Nem szólt.",
  "Erre mit csináltál? Megnyomtad a kék 'boost' gombot.",
  "Elment 5.000 forint, jött 3 like, meg egy hozzászólás a nagynénidtől.",
  "Ohmygod!",
  "Célközönség? Kreatív? Pixel? Konverziós API?",
  "Mind hallottad már valakitől, csak azt nem, hogy ez pontosan mit is jelent a te boltodnak.",
  "Aztán jött egy 'guru' YouTube-ról, aki szerint elég napi 2000 forint és dől a pénz.",
  "Nem dőlt.",
  "Csak a türelmed fogyott, meg a hirdetési kereted.",
  "Nézd, a legtöbb vállalkozó pontosan ugyanide jut.",
  "Csinál egy kicsit ezt, egy kicsit azt, aztán feladja, mert 'a Facebook hirdetés úgyse működik nálunk'.",
  "Pedig működik. Csak nem a boost gombbal.",
  "De ez most nem rólunk szól. Hanem rólad.",
  "Most azért olvasod ezt, mert az érdeklődőid száma nem ott tart, ahol szeretnéd.",
  "Vagy már megy valamennyire, de többet akarsz.",
  "Több megkeresést.",
  "Több visszatérő vásárlót.",
  "Több kiszámíthatóságot, kevesebb 'remélem, holnap is jön valaki' érzést.",
  "Nálunk ez nem varázslat, hanem rendszer.",
  "Weboldal, ami elad. Hirdetés, ami hoz. Automatizmus, ami emlékeztet.",
  "Ez indul el itt lent…",
];

export function LetterSection() {
  return (
    <section className="relative overflow-hidden bg-[#f8f9fa] px-6 py-24 text-black">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-accent/40 via-accent/10 to-transparent sm:w-48 sm:from-accent/70 sm:via-accent/25 lg:w-72"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-accent/40 via-accent/10 to-transparent sm:w-48 sm:from-accent/70 sm:via-accent/25 lg:w-72"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-accent/40 via-accent/10 to-transparent sm:h-32 sm:from-accent/70 sm:via-accent/25 lg:h-48"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-accent/40 via-accent/10 to-transparent sm:h-32 sm:from-accent/70 sm:via-accent/25 lg:h-48"
      />
      <div className="relative mx-auto flex max-w-2xl flex-col gap-5 text-lg leading-relaxed sm:text-xl">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className={i < 1 ? "text-sm text-[#8a8a8a]" : undefined}
          >
            {p}
          </p>
        ))}
        <p className="mt-4 text-base text-[#6b6b6b] sm:text-lg">
          u.i.: A gól a lövőt lepi meg legjobban 😉
        </p>
      </div>
    </section>
  );
}
