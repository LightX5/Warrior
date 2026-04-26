import { startTransition, useDeferredValue, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "../config/site";
import { portfolioCategories } from "../data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { LazyImage } from "./LazyImage";
import { scrollToSection } from "../utils/scroll";

export const PortfolioSection = ({ items, onOpenLightbox }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const deferredFilter = useDeferredValue(activeFilter);

  const filteredItems = useMemo(() => {
    if (deferredFilter === "All") {
      return items;
    }

    return items.filter((item) => item.category === deferredFilter);
  }, [deferredFilter, items]);

  return (
    <section id="portfolio" className="section-block">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected frames arranged for quick browsing, deeper viewing, and future expansion."
          copy="A filterable portfolio now populated with real Warrior Lens work across portraits, events, creative studies, and documentary frames. The full live collection can still be opened on Pixies anytime."
        />

        <div className="mt-8 flex flex-wrap items-center gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
          <p className="max-w-3xl text-sm leading-7 text-white/68">
            This gallery now features selected Warrior Lens originals on-site, while your broader
            public archive remains available through Pixies for clients who want to browse more.
          </p>
          <a
            href={siteConfig.portfolioUrl}
            target="_blank"
            rel="noreferrer"
            className="primary-button"
          >
            Open Full Portfolio
          </a>
          <a
            href="#booking"
            className="secondary-button"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("booking", "#booking-service");
            }}
          >
            Check Availability
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {portfolioCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={`rounded-full border px-4 py-2 text-sm transition ${
                activeFilter === category
                  ? "border-accent bg-accent text-black"
                  : "border-white/10 bg-white/5 text-white/65 hover:border-white/20 hover:text-white"
              }`}
              onClick={() => {
                startTransition(() => {
                  setActiveFilter(category);
                });
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-10 masonry-grid">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, delay: index * 0.02 }}
                className="masonry-item"
              >
                <button
                  type="button"
                  className="group glass-panel block w-full overflow-hidden rounded-[1.75rem] text-left"
                  onClick={() => onOpenLightbox(item.id)}
                >
                  <div className="relative overflow-hidden">
                    <LazyImage
                      src={item.image}
                      alt={item.alt}
                      className="w-full"
                      style={{ aspectRatio: item.ratio }}
                      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 100vw"
                      imgClassName="duration-700 group-hover:scale-[1.06] group-hover:brightness-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-5">
                      <span className="translate-y-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[0.68rem] uppercase tracking-[0.28em] text-white/0 transition duration-300 group-hover:translate-y-0 group-hover:text-white/70">
                        Open Frame
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] uppercase tracking-[0.28em] text-accent-soft/90">
                        {item.category}
                      </span>
                      <span className="text-xs uppercase tracking-[0.25em] text-white/40">
                        {item.date}
                      </span>
                    </div>
                    <h3 className="font-display text-3xl text-white">{item.title}</h3>
                    <p className="text-sm leading-7 text-white/65">{item.description}</p>
                  </div>
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
