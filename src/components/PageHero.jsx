import { motion } from "framer-motion";
import { ArrowRightIcon } from "./icons";
import { LazyImage } from "./LazyImage";

export const PageHero = ({
  eyebrow,
  title,
  copy,
  actions = [],
  visual,
}) => (
  <section className="relative overflow-hidden pb-8 pt-10 sm:pb-12 sm:pt-12 lg:pb-14 lg:pt-16">
    <div className="section-shell relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[26rem] bg-[radial-gradient(circle_at_top,rgba(213,179,89,0.18),transparent_45%)]" />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.52fr)] lg:items-center lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <p className="section-eyebrow">{eyebrow}</p>
          <h1 className="font-display text-[clamp(2.7rem,6vw,5.2rem)] leading-[0.97] tracking-[-0.04em] text-white">
            {title}
          </h1>
          <p className="mt-5 max-w-[38rem] text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
            {copy}
          </p>

          {actions.length > 0 ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {actions.map((action) => {
                const classes =
                  action.variant === "secondary" ? "secondary-button" : "primary-button";

                return (
                  <button
                    key={action.label}
                    type="button"
                    className={`${classes} w-full justify-center sm:w-auto`}
                    onClick={action.onClick}
                  >
                    {action.label}
                    {action.showArrow === false ? null : <ArrowRightIcon />}
                  </button>
                );
              })}
            </div>
          ) : null}
        </motion.div>

        {visual ? (
          <motion.div
            className="glass-panel overflow-hidden rounded-[2rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
          >
            <div className="relative aspect-[4/4.7] overflow-hidden">
              <LazyImage
                src={visual.image}
                alt={visual.alt}
                className="h-full w-full"
                imgClassName="object-cover"
                sizes="(min-width: 1024px) 32vw, 100vw"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/12 to-transparent" />
            </div>
            <div className="space-y-3 p-5 sm:p-6">
              {visual.eyebrow ? (
                <p className="text-xs uppercase tracking-[0.32em] text-accent-soft/90">
                  {visual.eyebrow}
                </p>
              ) : null}
              <h2 className="font-display text-[1.9rem] leading-tight text-white sm:text-3xl">
                {visual.title}
              </h2>
              {visual.copy ? <p className="text-sm leading-7 text-white/68">{visual.copy}</p> : null}
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  </section>
);
