import { motion } from "framer-motion";
import { PageHero } from "../components/PageHero";
import { ServicesSection } from "../components/ServicesSection";
import { ConsultationBanner } from "../components/ConsultationBanner";
import { siteConfig } from "../config/site";
import { portfolioItems } from "../data/portfolio";
import { useStudioNavigation } from "../hooks/useStudioNavigation";

const processSteps = [
  {
    title: "Tell us what you need",
    copy: "Share the kind of coverage you want, the date, and any important details.",
  },
  {
    title: "We review the plan",
    copy: "We look at the brief, location, timing, and what the session needs.",
  },
  {
    title: "You get a clear reply",
    copy: "If the date works, we reply with the next step and what to expect.",
  },
];

const servicesHeroItem = portfolioItems.find((item) => item.id === "event-stem-community");

export const ServicesPage = () => {
  const { navigate, startBookingFlow } = useStudioNavigation();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Photography for events, portraits, and stories that matter."
        copy="Choose the kind of work you need, then send a booking request with the details."
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
          eyebrow: "Services",
          title: "Portraits, events, documentary, and creative shoots.",
          copy: "Simple options, clear next steps, and room to talk through the details properly.",
        }}
      />
      <main>
        <ServicesSection
          eyebrow="Studio Services"
          title="Choose a service and we will take it from there."
          copy="If you already know what you need, the booking page is the fastest next step."
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
          eyebrow="Booking"
          title="Ready to book? Send the details and we will reply."
          copy="The booking page lets you share the service, date, location, and brief in one place."
          primaryAction={{ label: "Start Booking", onClick: startBookingFlow }}
          secondaryAction={{ label: "Contact Studio", onClick: () => navigate("/contact") }}
        />
      </main>
    </>
  );
};
