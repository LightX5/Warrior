import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { ServicesSection } from "./components/ServicesSection";
import { BookingSection } from "./components/BookingSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { FloatingWhatsAppButton } from "./components/FloatingWhatsAppButton";
import { LightboxModal } from "./components/LightboxModal";
import { heroSlides, siteMetadata } from "./config/site";
import { portfolioItems } from "./data/portfolio";
import { useActiveSection } from "./hooks/useActiveSection";

const sectionIds = ["home", "about", "portfolio", "services", "booking", "contact"];

export default function App() {
  const activeSection = useActiveSection(sectionIds);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (id) => {
    const nextIndex = portfolioItems.findIndex((item) => item.id === id);

    if (nextIndex >= 0) {
      setLightboxIndex(nextIndex);
    }
  };

  const lightboxItem = useMemo(() => {
    if (lightboxIndex === null) {
      return null;
    }

    return portfolioItems[lightboxIndex] ?? null;
  }, [lightboxIndex]);

  const moveLightbox = (direction) => {
    if (lightboxIndex === null) {
      return;
    }

    const total = portfolioItems.length;
    const nextIndex = (lightboxIndex + direction + total) % total;
    setLightboxIndex(nextIndex);
  };

  return (
    <>
      <Helmet>
        <title>{siteMetadata.title}</title>
        <meta name="description" content={siteMetadata.description} />
      </Helmet>

      <div className="relative overflow-x-clip">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
          <div className="absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_top,rgba(213,179,89,0.18),transparent_42%)]" />
          <div className="absolute left-0 top-24 h-[26rem] w-[26rem] rounded-full bg-amber-300/10 blur-3xl" />
          <div className="absolute right-0 top-40 h-[24rem] w-[24rem] rounded-full bg-white/5 blur-3xl" />
        </div>

        <Navbar activeSection={activeSection} sections={sectionIds} />
        <HeroSection slides={heroSlides} />
        <main>
          <AboutSection />
          <PortfolioSection items={portfolioItems} onOpenLightbox={openLightbox} />
          <ServicesSection />
          <BookingSection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingWhatsAppButton />
      </div>

      <AnimatePresence>
        {lightboxItem ? (
          <LightboxModal
            item={lightboxItem}
            onClose={() => setLightboxIndex(null)}
            onNext={() => moveLightbox(1)}
            onPrevious={() => moveLightbox(-1)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
