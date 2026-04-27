import { lazy, Suspense } from "react";
import { PageHero } from "../components/PageHero";
import { ConsultationBanner } from "../components/ConsultationBanner";
import { siteConfig } from "../config/site";
import { portfolioItems } from "../data/portfolio";
import { useStudioNavigation } from "../hooks/useStudioNavigation";
import { openExternalUrl } from "../utils/browser";

const BookingSection = lazy(() =>
  import("../components/BookingSection").then((module) => ({
    default: module.BookingSection,
  }))
);

const bookingHeroItem = portfolioItems.find((item) => item.id === "creative-prayer-silhouette");

export const BookingPage = () => {
  const { navigate } = useStudioNavigation();

  return (
    <>
      <PageHero
        eyebrow="Booking"
        title="A premium consultation flow designed to turn interest into a serious inquiry."
        copy="Select the service, preferred timing, and brief you want Warrior Lens to review. Progress is saved locally so the experience stays smooth even if you pause."
        actions={[
          {
            label: "View Portfolio",
            onClick: () => navigate("/portfolio"),
            variant: "secondary",
          },
        ]}
        visual={{
          image: bookingHeroItem?.image || siteConfig.founderImage,
          alt: bookingHeroItem?.alt || "Warrior Lens booking visual",
          eyebrow: "Consultation",
          title: "We will review your request personally.",
          copy: "The booking flow is meant to feel like the start of a premium client relationship, not a cold form submission.",
        }}
      />
      <main>
        <Suspense fallback={null}>
          <BookingSection
            title="A premium consultation funnel built to convert interest into a clear, confident inquiry."
            copy="Move through the service, schedule, and brief in a way that feels calm, clear, and considered. Warrior Lens will review your request personally."
          />
        </Suspense>
        <ConsultationBanner
          eyebrow="Need a Faster Conversation?"
          title="If you prefer a quicker back-and-forth first, WhatsApp is still open."
          copy="Some inquiries need direct conversation before the full booking brief is ready. The studio's live chat path stays available for those moments."
          primaryAction={{
            label: "Open WhatsApp",
            onClick: () => openExternalUrl(siteConfig.whatsappUrl),
          }}
          secondaryAction={{ label: "Go to Contact", onClick: () => navigate("/contact") }}
        />
      </main>
    </>
  );
};
