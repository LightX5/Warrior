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
          eyebrow="About"
          title="Warrior Lens Studio is run by Obe Oluwagbemiga."
          copy="Based in Nigeria, the studio focuses on events, portraits, and personal work. The approach is simple: photographs should feel honest, calm, and well made."
        />
      </motion.div>

      <motion.div
        className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black"
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
            <p className="section-eyebrow mb-2">Photographer</p>
            <h3 className="font-display text-4xl text-white">{siteConfig.founder}</h3>
            <p className="mt-2 text-sm uppercase tracking-[0.28em] text-white/55">
              {siteConfig.founderRole}
            </p>
          </div>
        </div>

        <div className="p-8">
          <p className="text-sm leading-7 text-white/68">
            Obe is a Nigerian photographer and Mathematics student at Obafemi Awolowo
            University. His work moves between portraits, events, documentary frames, and
            quiet personal studies.
          </p>
          <p className="mt-4 text-sm leading-7 text-white/68">
            Every frame should feel honest. That is what guides the work here.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);
