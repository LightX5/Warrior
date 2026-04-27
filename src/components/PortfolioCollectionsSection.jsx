import { motion } from "framer-motion";
import { portfolioItems } from "../data/portfolio";
import { LazyImage } from "./LazyImage";
import { SectionHeading } from "./SectionHeading";

export const PortfolioCollectionsSection = ({ collections, onOpenLightbox }) => (
  <section className="section-block pt-0">
    <div className="section-shell">
      <SectionHeading
        eyebrow="Collections"
        title="Small story-led groupings make the portfolio feel more like an exhibition."
        copy="These collections are meant to slow the visitor down a little, giving the work context before the larger archive opens up."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {collections.map((collection, index) => {
          const coverItem = portfolioItems.find((item) => item.id === collection.coverId);
          const collectionItems = collection.itemIds
            .map((id) => portfolioItems.find((item) => item.id === id))
            .filter(Boolean);
          const visibleItems = collectionItems.slice(0, 2);
          const remainingCount = collectionItems.length - visibleItems.length;

          if (!coverItem) {
            return null;
          }

          return (
            <motion.button
              key={collection.id}
              type="button"
              className="group glass-panel overflow-hidden rounded-[1.85rem] text-left"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              onClick={() => onOpenLightbox(coverItem.id)}
            >
              <div className="relative">
                <LazyImage
                  src={coverItem.image}
                  alt={coverItem.alt}
                  className="w-full"
                  style={{ aspectRatio: "1 / 0.92" }}
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  imgClassName="duration-700 group-hover:scale-[1.04] group-hover:brightness-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
              </div>

              <div className="space-y-4 p-6">
                <p className="text-xs uppercase tracking-[0.32em] text-accent-soft/88">
                  Collection
                </p>
                <h3 className="font-display text-3xl text-white">{collection.title}</h3>
                <p className="text-sm leading-7 text-white/66">{collection.context}</p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {visibleItems.map((item) => (
                    <span
                      key={item.id}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-white/58"
                    >
                      {item.title}
                    </span>
                  ))}
                  {remainingCount > 0 ? (
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-white/42">
                      +{remainingCount} more
                    </span>
                  ) : null}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  </section>
);
