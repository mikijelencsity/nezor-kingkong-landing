const logos = [
  "CRUISER SHOP",
  "HAZAI KÁVÉ KFT.",
  "KISÁLLATKERESKEDÉS BAJA",
  "NEKED SÜTÖM",
  "INSHAPE - DIET",
  "ESTUR ÉPKER KFT.",
  "ZT ÉPÜLETGÉPÉSZET",
  "HELLINGER KFT.",
  "DOVER CHECK",
  "KORONA GOMBAIPARI EGYESÜLÉS",
  "FORINT-SOFT KFT.",
  "ADÓTANÁCSADÓK EGYESÜLETE",
  "G-R ÉKSZERSZALON",
  "SAMU KUTYAKOZMETIKA",
];

export function CaseStudies() {
  return (
    <section className="bg-black px-6 py-20 text-center text-[#f8f9fa]">
      <p className="mb-14 text-xs font-semibold tracking-widest text-accent">
        REFERENCIÁK
      </p>
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 text-xs font-semibold text-[#cfcfcf] sm:grid-cols-3 lg:grid-cols-4">
        {logos.map((logo) => (
          <div
            key={logo}
            className="flex items-center justify-center rounded-xl border border-white/10 bg-card px-4 py-8 transition-all hover:-translate-y-1 hover:border-accent/50 hover:text-white"
          >
            {logo}
          </div>
        ))}
      </div>
      <button className="mt-14 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95">
        Kérek egy ajánlatot
      </button>
    </section>
  );
}
