const stats = [
  { label: "Megtérülés", value: "6×", desc: "Ennyi jött vissza minden hirdetésre költött forintból az egyik ügyfelünknél." },
  { label: "Elérés 10.000 Ft-ból", value: "90K", desc: "90.000 releváns emberhez jutott el a hirdetés egyetlen tízezresből." },
  { label: "Vállalkozás velünk", value: "20+", desc: "Ennyi magyar cégnek építettünk már rendszert, ami tényleg hoz vevőt." },
  { label: "Év tapasztalat", value: "5+", desc: "16 évesen kezdtük a családi vállalkozás mentése miatt. Azóta se hagytuk abba." },
];

export function Stats() {
  return (
    <section className="bg-black px-6 py-20 text-center text-[#f8f9fa]">
      <p className="mb-4 text-xs font-semibold tracking-widest text-accent">
        NÖVEKEDÉS, NEM TALÁLGATÁS
      </p>
      <p className="mx-auto mb-14 max-w-2xl text-sm text-[#cfcfcf]">
        Hagyd ki a próbálgatást, a boost gombot és a végtelen 'majd holnap
        beállítom rendesen' érzést. Ehelyett építs kiszámítható, mérhető
        vevőszerző rendszert (nem reménykedést és imádkozást).
      </p>
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-2">
            <p className="font-display text-4xl text-accent">{s.value}</p>
            <p className="text-sm font-semibold">{s.label}</p>
            <p className="text-xs text-[#9a9a9a]">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
