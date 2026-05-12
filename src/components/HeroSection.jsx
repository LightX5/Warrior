import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "../config/site";
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

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,8,8,0.22)_0%,rgba(8,8,8,0.3)_24%,rgba(8,8,8,0.58)_58%,rgba(8,8,8,0.9)_100%)]" />

      <div className="section-shell flex min-h-[calc(100svh-4.7rem)] items-end py-10 sm:min-h-[calc(100svh-5rem)] sm:py-14 lg:py-16">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <p className="text-[0.72rem] uppercase tracking-[0.2em] text-white/52">
            Based in Nigeria
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.8rem,8vw,5.4rem)] leading-[0.94] tracking-[-0.04em] text-white">
            {siteConfig.projectName}
          </h1>
          <p className="mt-4 text-base text-white/84 sm:text-[1.2rem]">
            {siteConfig.tagline}
          </p>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/68">
            We document real moments with care.
          </p>
          <p className="mt-2 max-w-xl text-base leading-7 text-white/68">
            Photography for events, portraits, and stories that matter.
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

          <div className="mt-10 flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={`h-1.5 rounded-full transition ${
                  activeSlide === index ? "w-10 bg-white" : "w-5 bg-white/30"
                }`}
                aria-label={`Show frame ${index + 1}`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
