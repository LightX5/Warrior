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
        title="Reach the studio through the channel that feels most natural, then move into booking when you're ready."
        copy="WhatsApp, Instagram, email, and the direct message form all stay available here. The layout is intentionally clean so trust and access come first."
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
          eyebrow: "Open Channels",
          title: "Quick access, premium tone, clear next steps.",
          copy: "Contact should never feel like a fallback page. It still needs to guide a visitor toward a real booking conversation.",
        }}
      />
      <main>
        <ContactSection
          title="Reach the studio clearly, then move into booking with confidence."
          copy="Every contact path here is meant to feel direct and calm. If you already know what you need, the booking page remains the strongest conversion path."
        />
        <ConsultationBanner
          eyebrow="Client Journey"
          title="For the strongest conversion path, go from message to consultation to confirmed session."
          copy="If you already know the kind of coverage you need, the booking page gives Warrior Lens the context required to respond well and respond faster."
          primaryAction={{ label: "Go to Booking", onClick: startBookingFlow }}
          secondaryAction={{ label: "See Services", onClick: () => navigate("/services") }}
        />
      </main>
    </>
  );
};
