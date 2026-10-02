// The Futura Condensed display font is missing the Hungarian double-acute
// glyphs (ő/Ő/ű/Ű), so the browser silently falls back to a different font
// for just that letter, which looks visually broken next to the rest of a
// bold condensed word. This renders the base letter in the real display
// font and draws the double-acute accent ourselves on top of it.

const DOUBLE_ACUTE: Record<string, { base: string; upper: boolean }> = {
  ő: { base: "o", upper: false },
  Ő: { base: "O", upper: true },
  ű: { base: "u", upper: false },
  Ű: { base: "U", upper: true },
};

function AccentMark({ upper }: { upper: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${
        upper
          ? "-top-[0.5em] h-[0.34em] w-[0.62em]"
          : "-top-[0.36em] h-[0.26em] w-[0.52em]"
      }`}
    >
      <line
        x1="4"
        y1="20"
        x2="11"
        y2="4"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      <line
        x1="13"
        y1="20"
        x2="20"
        y2="4"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Renders text set in the display font, substituting a synthesized
 * double-acute accent for any ő/Ő/ű/Ű the font itself can't render.
 */
export function Hu({ children }: { children: string }) {
  const chars = Array.from(children);
  return (
    <>
      {chars.map((ch, i) => {
        const entry = DOUBLE_ACUTE[ch];
        if (!entry) return ch;
        return (
          <span key={i} className="relative inline-block">
            {entry.base}
            <AccentMark upper={entry.upper} />
          </span>
        );
      })}
    </>
  );
}
