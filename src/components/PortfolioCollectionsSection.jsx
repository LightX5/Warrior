import { motion } from "framer-motion";
import { portfolioItems } from "../data/portfolio";
import { LazyImage } from "./LazyImage";
import { SectionHeading } from "./SectionHeading";

export const PortfolioCollectionsSection = ({ collections, onOpenLightbox }) => (
  <section className="section-block pt-0">
    <div className="section-shell">
      <SectionHeading
        eyebrow="Collections"
        title="A few small groupings from the archive."
        copy="These sets are here to give the work a little context."
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
              className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-black text-left"
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
                <p className="text-xs uppercase tracking-[0.32em] text-white/45">Collection</p>
                <h3 className="font-display text-3xl text-white">{collection.title}</h3>
                <p className="text-sm leading-7 text-white/66">{collection.context}</p>
                <p className="text-xs uppercase tracking-[0.24em] text-white/32">
                  {collectionItems.length} images
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  </section>
);
