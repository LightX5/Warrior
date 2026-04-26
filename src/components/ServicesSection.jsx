import { motion } from "framer-motion";
import { services } from "../data/services";
import { scrollToSection } from "../utils/scroll";
import { SectionHeading } from "./SectionHeading";
import {
  ArrowRightIcon,
  BrushIcon,
  CalendarIcon,
  CameraIcon,
  FilmIcon,
  SparklesIcon,
} from "./icons";

const iconMap = {
  brush: BrushIcon,
  calendar: CalendarIcon,
  camera: CameraIcon,
  film: FilmIcon,
  sparkles: SparklesIcon,
};

export const ServicesSection = () => (
  <section id="services" className="section-block">
    <div className="section-shell">
      <SectionHeading
        eyebrow="Services"
        title="Purposeful offerings built for portraits, occasions, concepts, and post-production."
        copy="Each service is presented with enough structure for clients today and enough flexibility for future payment, package, and admin tooling."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => {
          const Icon = iconMap[service.icon];

          return (
            <motion.article
              key={service.title}
              className="glass-panel rounded-[1.75rem] p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <div className="inline-flex rounded-2xl border border-accent/30 bg-accent/10 p-3 text-accent-soft">
                <Icon />
              </div>
              <h3 className="mt-5 font-display text-3xl text-white">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/68">{service.description}</p>
              <div className="mt-6 flex items-center justify-between gap-3">
                <span className="text-xs uppercase tracking-[0.35em] text-white/35">Pricing</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                  {service.price}
                </span>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="glass-panel mt-8 rounded-[1.9rem] p-6 sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="section-eyebrow mb-3">Ready to Book?</p>
            <h3 className="font-display text-3xl text-white sm:text-4xl">
              Turn interest into a checked date and a real consultation.
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/68">
              Use the booking flow to select the service, date, location, and shoot brief in a
              way that feels tailored rather than generic.
            </p>
          </div>

          <button
            type="button"
            className="primary-button w-full justify-center sm:w-auto"
            onClick={() => scrollToSection("booking", "#booking-service")}
          >
            Check Availability
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  </section>
);
