import { motion } from "framer-motion";
import { ArrowRightIcon } from "./icons";
import { LazyImage } from "./LazyImage";
import { SectionHeading } from "./SectionHeading";

export const FeaturedWorksSection = ({
  items,
  onOpenLightbox,
  onBrowsePortfolio,
  onBookSession,
  eyebrow = "Featured Works",
  title = "Frames curated to lead with emotion, polish, and intent.",
  copy = "Not every image should carry the same visual weight. These are arranged like lead campaign frames to set tone before the full archive opens up.",
}) => {
  const [leadItem, ...supportingItems] = items;

  if (!leadItem) {
    return null;
  }

  return (
    <section className="section-block">
      <div className="section-shell">
        <SectionHeading eyebrow={eyebrow} title={title} copy={copy} />

        <div className="mt-10 grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <button
            type="button"
            className="group glass-panel relative overflow-hidden rounded-[2rem] text-left"
            onClick={() => onOpenLightbox(leadItem.id)}
          >
            <LazyImage
              src={leadItem.image}
              alt={leadItem.alt}
              className="min-h-[22rem] w-full"
              style={{ aspectRatio: "1 / 1.12" }}
              sizes="(min-width: 1280px) 48vw, 100vw"
              imgClassName="duration-700 group-hover:scale-[1.04] group-hover:brightness-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.32em] text-accent-soft/90">
                Lead Selection
              </p>
              <h3 className="mt-3 font-display text-4xl text-white sm:text-5xl">{leadItem.title}</h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/72">{leadItem.description}</p>
            </div>
          </button>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1">
            {supportingItems.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                className="group glass-panel relative overflow-hidden rounded-[1.8rem] text-left"
                onClick={() => onOpenLightbox(item.id)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <LazyImage
                  src={item.image}
                  alt={item.alt}
                  className="min-h-[15rem] w-full"
                  style={{ aspectRatio: "1 / 0.8" }}
                  sizes="(min-width: 1280px) 32vw, (min-width: 768px) 40vw, 100vw"
                  imgClassName="duration-700 group-hover:scale-[1.05] group-hover:brightness-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-accent-soft/85">
                    {item.category}
                  </p>
                  <h4 className="mt-3 font-display text-3xl text-white">{item.title}</h4>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="glass-panel mt-8 rounded-[1.85rem] p-6 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="section-eyebrow mb-3">Studio Direction</p>
              <h3 className="font-display text-3xl text-white sm:text-4xl">
                Browse the full collection or move straight into a personal booking review.
              </h3>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" className="secondary-button" onClick={onBrowsePortfolio}>
                View Full Portfolio
                <ArrowRightIcon />
              </button>
              <button type="button" className="primary-button" onClick={onBookSession}>
                Book a Session
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
