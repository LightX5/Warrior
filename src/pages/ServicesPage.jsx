import { motion } from "framer-motion";
import { PageHero } from "../components/PageHero";
import { ServicesSection } from "../components/ServicesSection";
import { ConsultationBanner } from "../components/ConsultationBanner";
import { siteConfig } from "../config/site";
import { portfolioItems } from "../data/portfolio";
import { useStudioNavigation } from "../hooks/useStudioNavigation";

const processSteps = [
  {
    title: "Inquiry Review",
    copy: "Every request is reviewed personally so the studio can respond with the right scope, tone, and availability.",
  },
  {
    title: "Creative Planning",
    copy: "Sessions are shaped around mood, logistics, location, and the kind of emotional storytelling the client wants.",
  },
  {
    title: "Delivery Experience",
    copy: "The final work is refined with the same care the booking flow promises up front.",
  },
];

const servicesHeroItem = portfolioItems.find((item) => item.id === "event-stem-community");

export const ServicesPage = () => {
  const { navigate, startBookingFlow } = useStudioNavigation();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Premium photography offerings structured to feel bespoke from the first click."
        copy="Warrior Lens presents services as intentional studio offers, not a cluttered list. Each one is designed to lead naturally into a personal consultation and a tailored quote."
        actions={[
          { label: "Book a Session", onClick: startBookingFlow },
          {
            label: "View Portfolio",
            onClick: () => navigate("/portfolio"),
            variant: "secondary",
          },
        ]}
        visual={{
          image: servicesHeroItem?.image || siteConfig.founderImage,
          alt: servicesHeroItem?.alt || "Warrior Lens featured service visual",
          eyebrow: "Studio Offer",
          title: "Portraits, events, documentary, and concept-led storytelling.",
          copy: "The structure stays simple, but the experience around it needs to feel high-touch and considered.",
        }}
      />
      <main>
        <ServicesSection
          eyebrow="Studio Services"
          title="Coverage built for identity, occasion, culture, and atmosphere."
          copy="Each offer is clear enough to build trust fast, but flexible enough to support custom quoting, future payments, and an eventual admin system."
          onBookSession={startBookingFlow}
        />

        <section className="section-block pt-0">
          <div className="section-shell">
            <div className="grid gap-5 lg:grid-cols-3">
              {processSteps.map((step, index) => (
                <motion.article
                  key={step.title}
                  className="glass-panel rounded-[1.75rem] p-6"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-accent-soft/90">
                    0{index + 1}
                  </p>
                  <h3 className="mt-4 font-display text-3xl text-white">{step.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/68">{step.copy}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <ConsultationBanner
          eyebrow="Booking Prompt"
          title="The best next step is a date check, a brief, and a personal review."
          copy="Instead of turning services into a dead-end page, Warrior Lens pushes the visitor toward a guided inquiry that feels premium from the start."
          primaryAction={{ label: "Start Booking", onClick: startBookingFlow }}
          secondaryAction={{ label: "Contact Studio", onClick: () => navigate("/contact") }}
        />
      </main>
    </>
  );
};
