import { ArrowRightIcon } from "./icons";

export const ConsultationBanner = ({
  eyebrow = "Booking Prompt",
  title,
  copy,
  primaryAction,
  secondaryAction,
}) => (
  <section className="section-block pt-0">
    <div className="section-shell">
      <div className="glass-panel rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="section-eyebrow mb-3">{eyebrow}</p>
            <h2 className="font-display text-4xl text-white sm:text-5xl">{title}</h2>
            <p className="mt-5 text-sm leading-8 text-white/68 sm:text-base">{copy}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {secondaryAction ? (
              <button type="button" className="secondary-button" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
                <ArrowRightIcon />
              </button>
            ) : null}
            {primaryAction ? (
              <button type="button" className="primary-button" onClick={primaryAction.onClick}>
                {primaryAction.label}
                <ArrowRightIcon />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  </section>
);
