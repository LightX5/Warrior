import { heroSlides } from "../config/site";
import { portfolioItems } from "../data/portfolio";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { FeaturedWorksSection } from "../components/FeaturedWorksSection";
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
          title="A small selection from recent work."
          copy="Portraits, events, and quiet in-between moments."
        />
        <ConsultationBanner
          eyebrow="Booking"
          title="Tell us what you need and we will reply with the next step."
          copy="Based in Nigeria. Available for events, portraits, and creative shoots."
          primaryAction={{ label: "Book a Session", onClick: startBookingFlow }}
          secondaryAction={{ label: "View Portfolio", onClick: () => navigate("/portfolio") }}
        />
      </main>
    </>
  );
};
