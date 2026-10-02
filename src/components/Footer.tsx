import Link from "next/link";
import { Hu } from "./HuFix";

const columns = [
  {
    title: "Cégünk",
    links: [
      { label: "Kapcsolat", href: "/kapcsolat" },
      { label: "Esettanulmányok", href: "/esettanulmanyok" },
      { label: "Városok", href: "/varosok" },
    ],
  },
  {
    title: "Szolgáltatások",
    links: [
      { label: "Facebook hirdetés", href: "/" },
      { label: "Weboldal", href: "/" },
      { label: "Webáruház", href: "/" },
      { label: "Automatizmus", href: "/" },
      { label: "Google Cégem profil", href: "/" },
      { label: "AI optimalizálás", href: "/" },
    ],
  },
  {
    title: "Kezdjük",
    links: [
      { label: "Ingyenes konzultáció", href: "/kapcsolat" },
      { label: "Árajánlat kérése", href: "/kapcsolat" },
      { label: "Esettanulmányok", href: "/esettanulmanyok" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-black px-6 py-16 text-[#f8f9fa]">
      <div className="mx-auto max-w-6xl">
        <p className="font-display mb-6 max-w-md text-2xl">
          <Hu>ONLINE RENDSZER, AMI VEVŐT HOZ. 0–24-BEN.</Hu>
        </p>
        <div className="mb-10 text-sm text-[#9a9a9a]">
          <p>NEZOR Webfejlesztés</p>
          <p>info@nezor.hu</p>
          <p>Telefon: +36 70 455 4703</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-3 text-xs font-semibold tracking-widest text-accent">
                {col.title.toUpperCase()}
              </p>
              <ul className="flex flex-col gap-2 text-sm text-[#cfcfcf]">
                {col.links.map((l) => (
                  <li key={l.label} className="w-fit">
                    <Link
                      href={l.href}
                      className="transition-colors hover:text-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 rounded-2xl bg-card p-6">
          <p className="mb-1 text-sm font-semibold">
            Kérsz ingyenes hirdetési tippeket?
          </p>
          <p className="mb-4 text-xs text-[#9a9a9a]">
            Heti szinten küldünk használható tippeket Facebook hirdetésekhez
            és online vevőszerzéshez. Se spam, se boost-gomb-reklám.
          </p>
          <form className="flex overflow-hidden rounded-full bg-[#e9e9ea]">
            <input
              type="email"
              placeholder="Add meg az emailed"
              className="flex-1 bg-transparent px-4 py-3 text-sm text-black placeholder:text-[#6b6b6b] outline-none"
            />
            <button className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95">
              Irány
            </button>
          </form>
        </div>
        <p className="mt-10 text-xs text-[#6b6b6b]">
          © {new Date().getFullYear()} NEZOR. Minden jog fenntartva.
        </p>
      </div>
    </footer>
  );
}
