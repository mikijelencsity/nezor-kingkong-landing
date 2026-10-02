import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

const posts = [
  { date: "2026. JÚLIUS 23.", title: "Mennyibe kerül egy weboldal Baján és Bács-Kiskun megyében?", desc: "Weboldal ár Baja, Kiskunhalas, Kalocsa vagy Kecskemét? Így épül fel reálisan egy kisvállalkozói honlap költsége, és mire figyelj, ha árajánlatot kérsz." },
  { date: "2026. JÚLIUS 23.", title: "Google-hirdetés Baján és Bács-Kiskun megyében: így talál rád a helyi vevő", desc: "Amikor valaki Baján vagy Kiskunhalason rákeres egy szolgáltatásra, a Google-hirdetés azonnal odateszi a céged elé. Így állítsd be helyesen helyi vállalkozásként." },
  { date: "2026. JÚLIUS 23.", title: "Facebook-hirdetés Baján és Bács-Kiskun megyében: mire figyelj helyi vállalkozásként", desc: "Baján, Bácsalmáson, Kiskunhalason vagy Kalocsán teljesen más egy Facebook-hirdetés célzása, mint egy fővárosi kampányé. Így hozd ki a legtöbbet a helyi büdzséből." },
  { date: "2026. JÚLIUS 15.", title: "Webshop indítása: amit a legtöbben nem tudnak előre", desc: "Egy webshop nem csak egy 'weboldal, amin lehet fizetni'. Összeszedtük, mire számíts valójában, mielőtt belevágsz." },
  { date: "2026. JÚLIUS 10.", title: "Facebook-hirdetés kisvállalkozásoknak: az első lépések", desc: "Nem kell nagy büdzsé ahhoz, hogy egy Facebook-hirdetés minőségi érdeklődőket hozzon. Így indíts el egy egyszerű, mérhető kampányt." },
  { date: "2026. JÚLIUS 5.", title: "5 perces Google Cégprofil-beállítás, ami több hívást hozhat", desc: "A Google Cégprofil ingyenes, mégis a legtöbb vállalkozás félig van kitöltve. Ezek az apró beállítások gyorsan javíthatnak a helyi találhatóságon." },
  { date: "2026. JÚLIUS 1.", title: "Weboldal vagy Facebook-oldal elég egy kisvállalkozásnak?", desc: "Sok magyar kisvállalkozás megáll a Facebook-oldalnál. Megnézzük, mikor elég ez, és mikor éri meg mégis weboldalt építeni." },
];

export default function Blog() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="NEZOR BLOG"
          title="WEBOLDAL, WEBSHOP ÉS HIRDETÉS — A GYAKORLATBAN"
          subtitle="Cikkek magyar kis- és középvállalkozásoknak arról, hogyan lehet online ügyfeleket szerezni: weboldal, Google és Facebook hirdetés, helyi SEO."
        />
        <Reveal>
          <section className="bg-black px-6 pb-24 text-[#f8f9fa]">
            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
              {posts.map((p) => (
                <article
                  key={p.title}
                  className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/50"
                >
                  <p className="text-xs font-semibold tracking-widest text-accent">
                    {p.date}
                  </p>
                  <h2 className="text-lg font-semibold leading-snug">
                    {p.title}
                  </h2>
                  <p className="text-sm text-[#cfcfcf]">{p.desc}</p>
                  <span className="mt-2 text-xs font-semibold text-accent transition-transform group-hover:translate-x-1">
                    Elolvasom →
                  </span>
                </article>
              ))}
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
