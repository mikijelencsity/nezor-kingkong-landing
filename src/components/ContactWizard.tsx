"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { WIZARD_NAME_KEY } from "./ContactWizardProvider";

export type Advertised = "igen" | "nem";

// A kérdéssor a nezor.hu/landing10 űrlapja alapján készült.
const PRIVACY_URL = "https://www.nezor.hu/adatkezeles";

const NOT_TRIED = "Még nem próbáltam";
const FB_OPTIONS = ["Igen, most is hirdetek", "Próbáltam, de abbahagytam", NOT_TRIED];
const CHANNELS = [
  { label: "Facebook", icon: "f", color: "#1877f2" },
  { label: "Google", icon: "G", color: "#ea4335" },
  { label: "Weboldal", icon: "🌐", color: "#0f9d58" },
  { label: "Ajánlás", icon: "🗣️", color: "#8e44ad" },
  { label: "Szórólap / újság", icon: "📰", color: "#1565c0" },
  { label: "Hirdetési portál", icon: "📋", color: "#f39c12" },
  { label: "Egyéb", icon: "🔔", color: "#f1c40f" },
  { label: "Semmi", icon: "⛔", color: "#777777" },
];
const BUDGETS = ["50 000 Ft alatt", "50–100 ezer Ft", "100–200 ezer Ft", "200–500 ezer Ft", "500 ezer Ft felett", "Még nem tudom"];

type StepId = "kapcsolat" | "fb" | "csatornak" | "leiras" | "keret" | "telefon";

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

function storedName() {
  try {
    return window.sessionStorage.getItem(WIZARD_NAME_KEY) ?? "";
  } catch {
    return "";
  }
}

// A **kiemelt** részeket kékkel jeleníti meg.
function Title({ text }: { text: string }) {
  return (
    <h2 className="text-center text-3xl font-extrabold leading-tight tracking-tight text-black sm:text-[2.6rem]">
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-accent">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </h2>
  );
}

// A /konzultacio oldal belépője: az előválasztást az URL-ből olvassa (?hirdetett=igen|nem).
export function ConsultationWizard() {
  const params = useSearchParams();
  const v = params.get("hirdetett");
  const advertised: Advertised | null = v === "igen" || v === "nem" ? v : null;
  return <ContactWizard advertised={advertised} />;
}

export function ContactWizard({ advertised }: { advertised: Advertised | null }) {
  const [current, setCurrent] = useState<StepId>("kapcsolat");
  const [history, setHistory] = useState<StepId[]>([]);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  // A kérdéssor a Suspense miatt csak böngészőben renderelődik, így itt olvasható a sessionStorage.
  const [name, setName] = useState(storedName);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [fb, setFb] = useState("");
  const [channels, setChannels] = useState<string[]>([]);
  const [about, setAbout] = useState("");
  const [budget, setBudget] = useState("");
  const [phone, setPhone] = useState("");

  // Aki már jelezte, hogy nem hirdetett, annak nem kérdezzük újra; aki igen, annak nem kínáljuk fel a „még nem” választ.
  const steps: StepId[] = ["kapcsolat", ...(advertised === "nem" ? [] : (["fb"] as const)), "csatornak", "leiras", "keret", "telefon"];
  const fbOptions = advertised === "igen" ? FB_OPTIONS.filter((o) => o !== NOT_TRIED) : FB_OPTIONS;
  const index = done ? steps.length : steps.indexOf(current);
  const first = name.trim();
  const isBeginner = advertised === "nem" || fb === NOT_TRIED;

  function next() {
    const following = steps[steps.indexOf(current) + 1];
    if (!following) return;
    setDir("fwd");
    setHistory((h) => [...h, current]);
    setCurrent(following);
  }

  function back() {
    const prev = history[history.length - 1];
    if (!prev) return;
    setDir("back");
    setHistory((h) => h.slice(0, -1));
    setCurrent(prev);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setSendError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: first,
          email: email.trim(),
          phone: phone.trim(),
          answers: {
            ...(fb ? { fb } : advertised === "nem" ? { fb: NOT_TRIED } : {}),
            csatornak: channels.join(", "),
            leiras: about.trim(),
            keret: budget,
            hozzajarulas: consent ? "igen" : "nem",
          },
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setDir("fwd");
      setDone(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  }

  const anim = dir === "fwd" ? "animate-step-in-right" : "animate-step-in-left";
  const input =
    "w-full rounded-xl border border-black/25 bg-white px-5 py-4 text-lg text-black placeholder:text-black/50 focus:border-black focus:outline-none";
  const primary =
    "flex w-full items-center justify-center gap-3 rounded-2xl bg-accent px-6 py-5 text-xl font-extrabold text-white shadow-[0_18px_40px_-16px_rgba(8,102,255,0.8)] transition-colors hover:bg-accent-deep disabled:cursor-not-allowed disabled:bg-[#c8c8c8] disabled:text-black/50 disabled:shadow-none";
  const option =
    "w-full rounded-xl border border-black/20 bg-white px-5 py-4 text-left text-lg font-semibold text-black transition-colors hover:border-accent hover:bg-accent hover:text-white";
  const lead = "mb-3 text-center text-xl font-bold leading-snug text-[#333] sm:text-2xl";
  const hint = "mt-2 text-center text-[#5a5a5a]";

  const canContinue = first.length > 0 && isValidEmail(email) && consent;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="relative rounded-3xl border-2 border-black bg-white p-6 text-black shadow-[0_30px_80px_-30px_rgba(8,102,255,0.35)] sm:p-9">
        {/* előrehaladás */}
        <ol
          className="mb-7 flex items-center justify-center"
          aria-label={done ? "Kész" : `${index + 1}. lépés a ${steps.length}-ból`}
        >
          {[...steps, "kesz"].map((s, i) => (
            <li key={s} className="flex items-center">
              {i > 0 && <span className={`h-0.5 w-6 sm:w-14 ${i <= index ? "bg-accent" : "bg-black/15"}`} />}
              <span className={`h-3.5 w-3.5 rounded-full sm:h-4 sm:w-4 ${i <= index ? "bg-accent" : "bg-black/20"}`} />
            </li>
          ))}
        </ol>

        <div key={done ? "done" : current} className={anim}>
          {done ? (
            <div>
              <Title text={`Köszönjük, **${first}!**`} />
              <h3 className="mt-7 text-xl font-extrabold">Mi történik most?</h3>
              <ol className="mt-4 grid gap-3 text-lg leading-snug">
                {[
                  <b key="1">Átnézzük a válaszaidat.</b>,
                  <b key="2">24 órán belül hívunk.</b>,
                  <span key="3">
                    <b>Rövid, lényegre törő beszélgetés</b>, és a válaszaid alapján <b>ügyfélszerzési tervet</b> kapsz.
                  </span>,
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <p>{item}</p>
                  </li>
                ))}
              </ol>
              <Link href="/" className={`${primary} mt-7`}>
                Vissza a főoldalra
              </Link>
            </div>
          ) : current === "kapcsolat" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (canContinue) next();
              }}
            >
              <p className={lead}>Rendben, nem húzzuk az időd. De mielőtt belevágunk, nem akarunk udvariatlanok lenni…</p>
              <Title text="**Hogy hívnak**, és hova írhatunk?" />
              <div className="mx-auto mt-6 grid max-w-xl gap-3">
                <input
                  required
                  autoComplete="given-name"
                  aria-label="Keresztneved"
                  className={input}
                  placeholder="Keresztneved"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  required
                  type="email"
                  autoComplete="email"
                  aria-label="E-mail-címed"
                  className={input}
                  placeholder="E-mail-címed"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="mt-1 flex items-start gap-3 text-sm leading-relaxed text-[#5a5a5a]">
                  <input
                    required
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-6 w-6 shrink-0 accent-accent"
                  />
                  <span>
                    Elolvastam és elfogadom az{" "}
                    <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-black underline">
                      Adatkezelési tájékoztatót
                    </a>
                    , és hozzájárulok, hogy a megadott adataimat a kapcsolatfelvétel céljából kezeljétek, félbehagyott kitöltés esetén legfeljebb 4
                    e-mailben emlékeztessetek és ajánlatot küldjetek, valamint hirdetéseitek mérése céljából titkosítva a Meta részére továbbítsátok. *
                  </span>
                </label>
                <button type="submit" disabled={!canContinue} className={`${primary} mt-2`}>
                  Tovább <span aria-hidden>→</span>
                </button>
              </div>
            </form>
          ) : current === "fb" ? (
            <div>
              <p className={lead}>Szia {first}! Hogy kiderüljön, tényleg tudunk-e segíteni a vállalkozásodnak… van pár kérdésünk.</p>
              <Title text="Először: próbáltál már **fizetett Facebook-hirdetést**?" />
              <div className="mx-auto mt-6 grid max-w-xl gap-3">
                {fbOptions.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => {
                      setFb(o);
                      next();
                    }}
                    className={option}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ) : current === "csatornak" ? (
            <div>
              {isBeginner && <p className={lead}>Semmi gond, {first}, a legtöbb ügyfelünk is így kezdte. Mi mindent beállítunk.</p>}
              <Title text="Oké, szuper! Most **honnan jönnek az ügyfeleid**?" />
              <p className={hint}>(Többet is választhatsz)</p>
              <div className="mx-auto mt-6 grid max-w-xl grid-cols-2 gap-3">
                {CHANNELS.map((c) => {
                  const on = channels.includes(c.label);
                  return (
                    <button
                      key={c.label}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setChannels((list) => (on ? list.filter((x) => x !== c.label) : [...list, c.label]))}
                      className={`flex min-w-0 items-center gap-3 rounded-xl border-2 bg-white px-3 py-3 text-left font-semibold leading-tight text-black transition-colors sm:px-4 ${
                        on ? "border-accent bg-accent/10" : "border-black/15 hover:border-accent"
                      }`}
                    >
                      <span
                        aria-hidden
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base font-extrabold text-white"
                        style={{ backgroundColor: c.color }}
                      >
                        {c.icon}
                      </span>
                      <span className="min-w-0">{c.label}</span>
                    </button>
                  );
                })}
              </div>
              <button type="button" disabled={channels.length === 0} onClick={next} className={`${primary} mx-auto mt-5 max-w-xl`}>
                Tovább <span aria-hidden>→</span>
              </button>
            </div>
          ) : current === "leiras" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (about.trim()) next();
              }}
            >
              <Title text="Röviden: **mivel foglalkozol**, kiknek, és milyen árszinten?" />
              <div className="mx-auto mt-6 grid max-w-xl gap-3">
                <textarea
                  required
                  rows={4}
                  aria-label="Mivel foglalkozol, kiknek, és milyen árszinten?"
                  className={input}
                  placeholder="Pl. szépségszalon Budapesten, átlagosan 25 000 Ft-os kezelésekkel"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
                <button type="submit" disabled={!about.trim()} className={primary}>
                  Tovább <span aria-hidden>→</span>
                </button>
              </div>
            </form>
          ) : current === "keret" ? (
            <div>
              <Title text="Mekkora **havi összeget** szánnál hirdetésre?" />
              <p className={hint}>Azért kérdezzük, hogy lássuk, tudunk-e segíteni, és hogy a kereteden belül a legjobb megoldást javasoljuk.</p>
              <div className="mx-auto mt-6 grid max-w-xl gap-3">
                {BUDGETS.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => {
                      setBudget(o);
                      next();
                    }}
                    className={option}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={submit}>
              <Title text={`Köszi, ${first}! **Hova hívhatunk**, hogy elindítsuk a közös munkát?`} />
              <p className={hint}>Csak ezért kérjük: telefonon mondjuk el, mit javaslunk. Spam nincs.</p>
              <div className="mx-auto mt-6 grid max-w-xl gap-3">
                <input
                  required
                  type="tel"
                  autoComplete="tel"
                  aria-label="Telefonszámod"
                  className={input}
                  placeholder="Telefonszámod"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {sendError && (
                  <p role="alert" className="text-sm text-red-600">
                    Nem sikerült elküldeni. Próbáld újra, vagy írj az info@nezor.hu címre.
                  </p>
                )}
                <button type="submit" disabled={sending || !phone.trim()} className={primary}>
                  {sending ? "Küldés…" : "Elküldöm"} {!sending && <span aria-hidden>→</span>}
                </button>
              </div>
            </form>
          )}

          {!done && history.length > 0 && (
            <button type="button" onClick={back} className="mx-auto mt-5 block text-sm text-black/55 hover:text-black">
              ← Vissza
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
