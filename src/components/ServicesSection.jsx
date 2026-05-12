import { motion } from "framer-motion";
import { services } from "../data/services";
import { SectionHeading } from "./SectionHeading";
import { ArrowRightIcon } from "./icons";

export const ServicesSection = ({
  eyebrow = "Services",
  title = "Photography for events, portraits, and stories that matter.",
  copy = "Simple, clear services with room to talk through the details properly.",
  limit = services.length,
  showCtaCard = true,
  onBookSession,
}) => (
  <section id="services" className="section-block">
    <div className="section-shell">
      <SectionHeading eyebrow={eyebrow} title={title} copy={copy} />

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.slice(0, limit).map((service, index) => (
          <motion.article
            key={service.title}
            className="rounded-[1.25rem] border border-white/10 p-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
          >
            <p className="text-xs uppercase tracking-[0.32em] text-white/40">Service</p>
            <h3 className="mt-4 font-display text-3xl text-white">{service.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/68">{service.description}</p>
            <p className="mt-6 text-sm text-white/52">{service.price}</p>
          </motion.article>
        ))}
      </div>

      {showCtaCard && onBookSession ? (
        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="section-eyebrow mb-3">Booking</p>
              <h3 className="font-display text-3xl text-white sm:text-4xl">If you have a date in mind, send the details.</h3>
              <p className="mt-4 text-sm leading-7 text-white/68">
                The booking page is the best place to share the service, date, location, and brief.
              </p>
            </div>

            <button
              type="button"
              className="primary-button w-full justify-center sm:w-auto"
              onClick={onBookSession}
            >
              Check Availability
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  </section>
);
