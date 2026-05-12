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
  title = "A small selection from recent work.",
  copy = "A few frames to begin with before the full portfolio opens up.",
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
            className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-black text-left transition active:scale-[0.992]"
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
            <div className="space-y-3 p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.32em] text-white/45">
                {leadItem.category}
              </p>
              <h3 className="font-display text-4xl text-white sm:text-5xl">{leadItem.title}</h3>
            </div>
          </button>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1">
            {supportingItems.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-black text-left transition active:scale-[0.992]"
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
                <div className="space-y-3 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/45">{item.category}</p>
                  <h4 className="font-display text-3xl text-white">{item.title}</h4>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="section-eyebrow mb-3">Next</p>
              <h3 className="font-display text-3xl text-white sm:text-4xl">See more work or send an inquiry.</h3>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="secondary-button w-full justify-center sm:w-auto"
                onClick={onBrowsePortfolio}
              >
                View Full Portfolio
                <ArrowRightIcon />
              </button>
              <button
                type="button"
                className="primary-button w-full justify-center sm:w-auto"
                onClick={onBookSession}
              >
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
