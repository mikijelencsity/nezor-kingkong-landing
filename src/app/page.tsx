import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LetterSection } from "@/components/LetterSection";
import { Offering } from "@/components/Offering";
import { CaseStudyMarquee } from "@/components/CaseStudyMarquee";
import { CaseStudies } from "@/components/CaseStudies";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Hero />
        <Reveal>
          <LetterSection />
        </Reveal>
        <Reveal>
          <Offering />
        </Reveal>
        <Reveal>
          <CaseStudyMarquee />
        </Reveal>
        <Reveal>
          <CaseStudies />
        </Reveal>
        <Reveal>
          <Testimonials />
        </Reveal>
        <Reveal>
          <Faq />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
