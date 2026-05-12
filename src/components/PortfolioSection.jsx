import { startTransition, useDeferredValue, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "../config/site";
import { portfolioCategories } from "../data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { LazyImage } from "./LazyImage";

export const PortfolioSection = ({
  items,
  onOpenLightbox,
  eyebrow = "Portfolio",
  title = "Selected work.",
  copy = "Portraits, events, creative shoots, and documentary work.",
  showArchiveBanner = true,
  onCheckAvailability,
}) => {
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
        <SectionHeading eyebrow={eyebrow} title={title} copy={copy} />

        {showArchiveBanner ? (
          <div className="mt-8 flex flex-wrap items-center gap-4 rounded-[1.25rem] border border-white/10 p-5">
            <p className="max-w-3xl text-sm leading-7 text-white/68">
              A larger archive is still available on Pixies if you want to browse more.
            </p>
            <a
              href={siteConfig.portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="primary-button w-full justify-center sm:w-auto"
            >
              Open Full Portfolio
            </a>
            {onCheckAvailability ? (
              <button
                type="button"
                className="secondary-button w-full justify-center sm:w-auto"
                onClick={onCheckAvailability}
              >
                Check Availability
              </button>
            ) : null}
          </div>
        ) : null}

        <div className="-mx-1 mt-10 overflow-x-auto pb-2">
          <div className="flex min-w-max gap-3 px-1 sm:min-w-0 sm:flex-wrap">
            {portfolioCategories.map((category) => (
              <button
                key={category}
                type="button"
                className={`min-h-11 shrink-0 touch-manipulation rounded-full border px-4 py-2 text-sm transition active:scale-[0.985] ${
                  activeFilter === category
                    ? "border-white bg-white text-black"
                    : "border-white/10 bg-transparent text-white/65 hover:border-white/25 hover:text-white"
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
                  className="group block w-full touch-manipulation overflow-hidden rounded-[1.25rem] border border-white/10 bg-black text-left transition active:scale-[0.992]"
                  onClick={() => onOpenLightbox(item.id)}
                >
                  <div className="overflow-hidden">
                    <LazyImage
                      src={item.image}
                      alt={item.alt}
                      className="w-full"
                      style={{ aspectRatio: item.ratio }}
                      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 100vw"
                      imgClassName="duration-700 group-hover:scale-[1.06] group-hover:brightness-105"
                    />
                  </div>
                  <div className="space-y-3 p-4 sm:p-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[0.68rem] uppercase tracking-[0.28em] text-white/45">
                        {item.category}
                      </span>
                      {item.collection ? (
                        <span className="text-[0.68rem] uppercase tracking-[0.24em] text-white/32">
                          {item.collection}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="font-display text-[1.55rem] text-white sm:text-[1.9rem]">{item.title}</h3>
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
