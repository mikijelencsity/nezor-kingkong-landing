import type { Metadata } from "next";
import { cases } from "@/data/cases";

// A régi esettanulmány-aloldalak (/esettanulmanyok/<slug>) címei: a tartalom ma az /esettanulmanyok listán van.
// A kint lévő linkek (hirdetések, korábbi megosztások) ne vigyenek 404-re: a lista megfelelő kártyájához irányítunk.
// Statikus exportnál a redirect() nem tesz meta refresh-t a HTML-be, ezért itt kézzel: meta refresh + látható link.
// A basePath ugyanúgy áll össze, mint a next.config.ts-ben (GitHub Pages alatt a repó neve).
const basePath = process.env.GITHUB_ACTIONS === "true" ? "/nezor-kingkong-landing" : "";

export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export const metadata: Metadata = {
  title: "Esettanulmányok | NEZOR",
  robots: { index: false, follow: true },
};

export default async function OldCaseRedirect({ params }: PageProps<"/esettanulmanyok/[slug]">) {
  const { slug } = await params;
  const target = `${basePath}/esettanulmanyok#${slug}`;
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <main className="flex min-h-[60vh] items-center justify-center px-6 text-center">
        <p className="text-lg">
          Az esettanulmány átköltözött: <a className="text-accent underline" href={target}>ide kattintva éred el</a>.
        </p>
      </main>
    </>
  );
}
