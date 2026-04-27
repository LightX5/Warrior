import { PageHero } from "../components/PageHero";
import { FeaturedWorksSection } from "../components/FeaturedWorksSection";
import { PortfolioCollectionsSection } from "../components/PortfolioCollectionsSection";
import { PortfolioSection } from "../components/PortfolioSection";
import { ConsultationBanner } from "../components/ConsultationBanner";
import { siteConfig } from "../config/site";
import { useStudioLightbox } from "../hooks/useStudioLightbox";
import { useStudioNavigation } from "../hooks/useStudioNavigation";
import { openExternalUrl } from "../utils/browser";
import {
  curatedPortfolioItems,
  portfolioCollections,
  portfolioItems,
} from "../data/portfolio";

const featuredIds = [
  "portrait-oyin-graduation",
  "documentary-child-peek",
  "event-stem-community",
  "creative-sunset-profile",
];

const featuredItems = featuredIds
  .map((id) => portfolioItems.find((item) => item.id === id))
  .filter(Boolean);

const portfolioHeroItem = portfolioItems.find((item) => item.id === "portrait-sunday-studio");

export const PortfolioPage = () => {
  const { navigate, startBookingFlow } = useStudioNavigation();
  const { openLightbox } = useStudioLightbox();

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="A curated editorial archive built to create trust before the first inquiry."
        copy="This is where Warrior Lens proves range, restraint, and visual authorship. The opening curation is weighted like a lead presentation, then the full filtered archive takes over."
        actions={[
          { label: "Book a Session", onClick: startBookingFlow },
          {
            label: "Open Pixies Archive",
            onClick: () => openExternalUrl(siteConfig.portfolioUrl),
            variant: "secondary",
          },
        ]}
        visual={{
          image: portfolioHeroItem?.image || siteConfig.founderImage,
          alt: portfolioHeroItem?.alt || "Featured Warrior Lens frame",
          eyebrow: "Visual Storytelling",
          title: "Frames with mood, culture, and emotional precision.",
          copy: "The portfolio should feel cinematic, but it also needs to convert. The curation here is designed to do both.",
        }}
      />
      <main>
        <FeaturedWorksSection
          items={featuredItems}
          onOpenLightbox={openLightbox}
          onBrowsePortfolio={() => navigate("/portfolio")}
          onBookSession={startBookingFlow}
          eyebrow="Featured Works"
          title="Not every image should carry equal weight in a premium portfolio."
          copy="These selected works function as a lead sequence. They establish taste, confidence, and versatility before the visitor starts filtering through the broader body of work."
        />
        <PortfolioCollectionsSection
          collections={portfolioCollections}
          onOpenLightbox={openLightbox}
        />
        <PortfolioSection
          items={curatedPortfolioItems}
          onOpenLightbox={openLightbox}
          eyebrow="Selected Archive"
          title="Browse a tighter on-site selection without losing the editorial feel."
          copy="This archive stays intentionally lean so the work feels curated rather than dumped. For broader browsing, the full Pixies collection remains available."
          onCheckAvailability={startBookingFlow}
        />
        <ConsultationBanner
          eyebrow="Conversion"
          title="Once the portfolio earns attention, the next move should be easy."
          copy="Move directly into the booking consultation and share the kind of session, date, and mood you want Warrior Lens to shape for you."
          primaryAction={{ label: "Check Availability", onClick: startBookingFlow }}
          secondaryAction={{ label: "See Services", onClick: () => navigate("/services") }}
        />
      </main>
    </>
  );
};
