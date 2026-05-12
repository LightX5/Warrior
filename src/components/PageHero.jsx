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
  <section className="pb-6 pt-8 sm:pb-10 sm:pt-10 lg:pb-12 lg:pt-12">
    <div className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <p className="section-eyebrow">{eyebrow}</p>
        <h1 className="font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[0.98] tracking-[-0.04em] text-white">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/66">{copy}</p>

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
          className="mt-10 overflow-hidden rounded-[1.4rem] border border-white/10"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06, ease: "easeOut" }}
        >
          <div className="relative aspect-[16/11] overflow-hidden md:aspect-[16/8]">
            <LazyImage
              src={visual.image}
              alt={visual.alt}
              className="h-full w-full"
              imgClassName="object-cover"
              sizes="100vw"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.18)_45%,rgba(0,0,0,0.6)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 max-w-2xl p-5 sm:p-8">
              {visual.eyebrow ? (
                <p className="text-[0.72rem] uppercase tracking-[0.2em] text-white/60">
                  {visual.eyebrow}
                </p>
              ) : null}
              <h2 className="mt-3 font-display text-[1.8rem] leading-tight text-white sm:text-[2.4rem]">
                {visual.title}
              </h2>
              {visual.copy ? <p className="mt-3 text-sm leading-7 text-white/72">{visual.copy}</p> : null}
            </div>
          </div>
        </motion.div>
      ) : null}
    </div>
  </section>
);
