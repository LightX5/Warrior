import { motion } from "framer-motion";
import { siteConfig } from "../config/site";
import { LazyImage } from "./LazyImage";
import { SectionHeading } from "./SectionHeading";

export const AboutSection = () => (
  <section id="about" className="section-block">
    <div className="section-shell grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(18rem,0.75fr)] lg:items-end">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <SectionHeading
          eyebrow="About the Studio"
          title="A visual brand built around emotion, culture, and human presence."
          copy="Warrior Lens is a creative photography studio founded by Obe Oluwagbemiga. The brand is dedicated to capturing authentic emotions, culture, and human moments through powerful visual storytelling. Every frame is intentional, every image tells a story."
        />
      </motion.div>

      <motion.div
        className="glass-panel overflow-hidden rounded-[2rem]"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      >
        <div className="relative aspect-[4/4.4] overflow-hidden border-b border-white/10 bg-white/[0.03]">
          <LazyImage
            src={siteConfig.founderImage}
            alt={`${siteConfig.founder}, Founder and CEO of Warrior Lens`}
            className="h-full w-full"
            imgClassName="object-cover"
            sizes="(min-width: 1024px) 34vw, 100vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="section-eyebrow mb-2">Leadership</p>
            <h3 className="font-display text-4xl text-white">{siteConfig.founder}</h3>
            <p className="mt-2 text-sm uppercase tracking-[0.28em] text-accent-soft/90">
              {siteConfig.founderRole}
            </p>
          </div>
        </div>

        <div className="p-8">
          <p className="text-sm leading-7 text-white/68">
            Nigerian photographer and Mathematics student at Obafemi Awolowo University,
            bringing precision, emotional awareness, and conceptual clarity into every
            visual narrative.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-accent-soft/90">Approach</p>
              <p className="mt-3 text-sm leading-7 text-white/68">
                Editorial polish with documentary honesty.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-accent-soft/90">Focus</p>
              <p className="mt-3 text-sm leading-7 text-white/68">
                Portraits, concepts, live moments, and culture.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
