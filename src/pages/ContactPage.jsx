import { PageHero } from "../components/PageHero";
import { ContactSection } from "../components/ContactSection";
import { ConsultationBanner } from "../components/ConsultationBanner";
import { siteConfig } from "../config/site";
import { portfolioItems } from "../data/portfolio";
import { useStudioNavigation } from "../hooks/useStudioNavigation";

const contactHeroItem = portfolioItems.find((item) => item.id === "portrait-lilac-glow");

export const ContactPage = () => {
  const { navigate, startBookingFlow } = useStudioNavigation();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach the studio."
        copy="Send a message here, or go straight to booking if you already know what you need."
        actions={[
          { label: "Book a Session", onClick: startBookingFlow },
          {
            label: "View Portfolio",
            onClick: () => navigate("/portfolio"),
            variant: "secondary",
          },
        ]}
        visual={{
          image: contactHeroItem?.image || siteConfig.founderImage,
          alt: contactHeroItem?.alt || "Warrior Lens contact visual",
          eyebrow: "Contact",
          title: "WhatsApp, email, phone, and Instagram.",
          copy: "Use whichever one feels easiest.",
        }}
      />
      <main>
        <ContactSection
          title="Get in touch."
          copy="If you already know the date and service, the booking page is still the best place to start."
        />
        <ConsultationBanner
          eyebrow="Booking"
          title="Need a faster start?"
          copy="Go to booking and send the service, date, location, and brief in one step."
          primaryAction={{ label: "Go to Booking", onClick: startBookingFlow }}
          secondaryAction={{ label: "See Services", onClick: () => navigate("/services") }}
        />
      </main>
    </>
  );
};
