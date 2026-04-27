import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightIcon } from "./icons";
import { LazyImage } from "./LazyImage";

export const HeroSection = ({ slides, onViewPortfolio, onBookSession }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6800);

    return () => window.clearInterval(intervalId);
  }, [slides.length]);

  return (
    <section id="home" className="relative isolate overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[activeSlide].id}
          className="absolute inset-0 -z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <LazyImage
            src={slides[activeSlide].image}
            alt={slides[activeSlide].alt}
            className="absolute inset-0 h-full w-full"
            imgClassName="object-cover brightness-[0.8]"
            sizes="100vw"
            priority={activeSlide === 0}
            fill
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,5,5,0.16)_0%,rgba(5,5,5,0.32)_26%,rgba(5,5,5,0.62)_58%,rgba(5,5,5,0.88)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_28%,rgba(213,179,89,0.14),transparent_32%)]" />

      <div className="section-shell flex min-h-[calc(100svh-5rem)] items-end py-12 sm:py-16 lg:py-20">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-[0.68rem] uppercase tracking-[0.38em] text-accent-soft/82">
            Visual Storytelling Studio
          </p>
          <h1 className="mt-4 font-display text-[clamp(3.2rem,8vw,5.8rem)] leading-[0.94] tracking-[-0.04em] text-white">
            Warrior Lens
          </h1>
          <p className="mt-3 text-lg text-white/76 sm:text-[1.35rem]">
            Every Frame Tells a Story
          </p>
          <p className="mt-5 text-[0.7rem] uppercase tracking-[0.34em] text-white/42 sm:text-xs">
            Portraits / Documentary / Events
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="primary-button w-full justify-center sm:w-auto"
              onClick={onViewPortfolio}
            >
              View Portfolio
              <ArrowRightIcon />
            </button>
            <button
              type="button"
              className="secondary-button w-full justify-center sm:w-auto"
              onClick={onBookSession}
            >
              Book a Session
            </button>
          </div>

          <div className="mt-8 flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={`h-1.5 rounded-full transition ${
                  activeSlide === index ? "w-12 bg-accent" : "w-6 bg-white/25"
                }`}
                aria-label={`Show frame ${index + 1}`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
            <span className="ml-3 text-[0.68rem] uppercase tracking-[0.32em] text-white/38">
              {slides[activeSlide].category}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
