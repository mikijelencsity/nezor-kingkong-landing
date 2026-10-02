import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const futuraCondensed = localFont({
  src: "../../public/fonts/FuturaLT-CondensedExtraBold.woff2",
  variable: "--font-futura-condensed",
  weight: "800",
});

export const metadata: Metadata = {
  title: "NEZOR | Facebook hirdetés, ami vevőt hoz",
  description:
    "Online rendszer, ami vevőt hoz 0–24. Weboldal, Facebook hirdetés, automatizmus, egy kézben.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${futuraCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
