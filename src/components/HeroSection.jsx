import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRightIcon } from "./icons";
import { LazyImage } from "./LazyImage";
import { scrollToSection } from "../utils/scroll";

export const HeroSection = ({ slides }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [slides.length]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative isolate flex min-h-[calc(100vh-5rem)] items-center overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[activeSlide].id}
          className="absolute inset-0 -z-20"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <LazyImage
            src={slides[activeSlide].image}
            alt={slides[activeSlide].alt}
            className="absolute inset-0 h-full w-full"
            imgClassName="opacity-45"
            sizes="100vw"
            priority={activeSlide === 0}
            fill
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,6,6,0.1),rgba(6,6,6,0.75)_58%,rgba(6,6,6,0.95)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(213,179,89,0.28),transparent_30%)]" />

      <div className="section-shell grid gap-10 py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,25rem)] lg:items-end">
        <motion.div style={{ y: foregroundY }} className="max-w-4xl">
          <p className="section-eyebrow">Premium Visual Storytelling</p>
          <h1 className="font-display text-[clamp(3.5rem,11vw,7.5rem)] leading-[0.9] tracking-[-0.04em] text-white">
            Warrior Lens
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-white/72 sm:text-2xl">
            Every Frame Tells a Story
          </p>
          <p className="mt-8 max-w-2xl text-sm leading-8 text-white/68 sm:text-base">
            A premium photography studio by Obe Oluwagbemiga, crafting emotional,
            conceptual, and documentary-driven imagery with discipline, mood, and
            cultural sensitivity.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#portfolio"
              className="primary-button"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("portfolio");
              }}
            >
              View Portfolio
              <ArrowRightIcon />
            </a>
            <a
              href="#booking"
              className="secondary-button"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("booking", "#booking-service");
              }}
            >
              Book a Session
            </a>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              ["Portraits", "Identity-led frames with confident direction."],
              ["Documentary", "Human moments captured with honesty and depth."],
              ["Events", "Elegant coverage for milestones worth remembering."],
            ].map(([title, copy]) => (
              <div key={title} className="glass-panel rounded-[1.5rem] p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-accent-soft/90">{title}</p>
                <p className="mt-3 text-sm leading-7 text-white/70">{copy}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div style={{ y: badgeY }} className="lg:justify-self-end">
          <div className="glass-panel rounded-[2rem] p-5">
            <LazyImage
              src="/brand/warrior-lens-logo.png"
              alt="Warrior Lens brand mark"
              className="mx-auto h-24 w-24"
              imgClassName="object-contain"
              sizes="96px"
              priority
            />
            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-accent-soft/90">
                Current Frame
              </p>
              <h2 className="mt-3 font-display text-3xl text-white">
                {slides[activeSlide].title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/68">
                {slides[activeSlide].description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.25em] text-white/65">
                  {slides[activeSlide].badge}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.25em] text-white/65">
                  {slides[activeSlide].date}
                </span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`h-1.5 flex-1 rounded-full transition ${
                    activeSlide === index ? "bg-accent" : "bg-white/20"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
