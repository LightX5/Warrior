import { heroSlides } from "../config/site";
import { portfolioItems } from "../data/portfolio";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { FeaturedWorksSection } from "../components/FeaturedWorksSection";
import { ServicesSection } from "../components/ServicesSection";
import { ConsultationBanner } from "../components/ConsultationBanner";
import { useStudioLightbox } from "../hooks/useStudioLightbox";
import { useStudioNavigation } from "../hooks/useStudioNavigation";

const homeFeaturedIds = [
  "portrait-oyin-graduation",
  "creative-prayer-silhouette",
  "event-stem-panel",
  "documentary-child-peek",
];

const homeFeaturedItems = homeFeaturedIds
  .map((id) => portfolioItems.find((item) => item.id === id))
  .filter(Boolean);

export const HomePage = () => {
  const { navigate, startBookingFlow } = useStudioNavigation();
  const { openLightbox } = useStudioLightbox();

  return (
    <>
      <HeroSection
        slides={heroSlides}
        onViewPortfolio={() => navigate("/portfolio")}
        onBookSession={startBookingFlow}
      />
      <main>
        <AboutSection />
        <FeaturedWorksSection
          items={homeFeaturedItems}
          onOpenLightbox={openLightbox}
          onBrowsePortfolio={() => navigate("/portfolio")}
          onBookSession={startBookingFlow}
          eyebrow="Featured Works"
          title="A homepage curation designed to sell the studio before the full archive opens."
          copy="The strongest frames lead first. This editorial mix is there to build trust quickly, signal range, and move a visitor naturally toward booking."
        />
        <ServicesSection
          eyebrow="Services Preview"
          title="Photography services positioned like premium offers, not a generic rate card."
          copy="The service mix is intentionally concise on the homepage so visitors can understand the offer quickly, then move deeper or book immediately."
          limit={3}
          showCtaCard={false}
        />
        <ConsultationBanner
          eyebrow="Next Step"
          title="When the work feels right, the booking flow should feel just as considered."
          copy="Warrior Lens uses a guided consultation-style booking experience that saves progress, validates each step, and sets the tone for a premium client relationship from the first inquiry."
          primaryAction={{ label: "Book a Session", onClick: startBookingFlow }}
          secondaryAction={{ label: "Explore Services", onClick: () => navigate("/services") }}
        />
      </main>
    </>
  );
};
