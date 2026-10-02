import Velaris from "./ui/velaris";

const HERO_COLORS = ["#8fae1c", "#5c7415", "#1f2e07", "#000000"];

export function Hero() {
  return (
    <Velaris
      height="100dvh"
      bg="#000000"
      colors={HERO_COLORS}
      speed={1.1}
      grain={0.12}
      className="relative"
    >
      <div className="pointer-events-none absolute inset-0 bg-black/35" />
      <div className="relative flex h-full flex-col items-center justify-center gap-6 px-6 pt-24 text-center">
        <h1 className="font-display leading-[0.95] text-[#f8f9fa]">
          <span className="block text-4xl sm:text-6xl md:text-7xl">
            ELÉG A{" "}
            <span className="relative inline-block">
              SZARAKODÁSBÓL
              <svg
                aria-hidden
                viewBox="0 0 400 70"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <path
                  d="M8 62 L392 8"
                  stroke="#cff128"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
            ,
          </span>
          <span className="block text-4xl sm:text-6xl md:text-7xl">
            KEZDJÜNK EL HIRDETNI{" "}
            <span className="text-accent text-6xl sm:text-8xl md:text-9xl">
              NAGYBAN.
            </span>
          </span>
        </h1>
        <p className="max-w-xl text-base text-[#cfcfcf] sm:text-lg">
          Vevőt hozó hirdetések, nem csak like-vadászat. Kiszámítható
          érdeklődő-áradat, amíg te a vállalkozásoddal foglalkozol.
        </p>
        <form className="flex w-full max-w-xl overflow-hidden rounded-full bg-[#e9e9ea]">
          <span className="flex items-center pl-5 pr-2 text-lg">👋</span>
          <input
            type="email"
            placeholder="Írd be az emailed, küldünk egy kis 'varázslatot'..."
            className="flex-1 bg-transparent px-2 py-4 text-sm text-black placeholder:text-[#6b6b6b] outline-none"
          />
          <button
            type="submit"
            className="group flex items-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95"
          >
            Megyek{" "}
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </form>
        <div className="flex flex-col items-center gap-1 text-xs text-[#a0a0a0]">
          <span className="flex items-center gap-1 text-[#f8f9fa]">
            ⭐⭐⭐⭐⭐ 5,0 csillag Google-értékelések alapján
          </span>
        </div>
      </div>
    </Velaris>
  );
}
