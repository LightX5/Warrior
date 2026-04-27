import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "../config/site";
import { durationOptions, locationSuggestions } from "../data/bookingFlow";
import { useBookingFlow } from "../hooks/useBookingFlow";
import { services } from "../data/services";
import { FeedbackModal } from "./FeedbackModal";
import { SectionHeading } from "./SectionHeading";
import {
  ArrowRightIcon,
  BrushIcon,
  CalendarIcon,
  CameraIcon,
  ChevronLeftIcon,
  FilmIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SparklesIcon,
  WhatsAppIcon,
} from "./icons";

const iconMap = {
  brush: BrushIcon,
  calendar: CalendarIcon,
  camera: CameraIcon,
  film: FilmIcon,
  mapPin: MapPinIcon,
  phone: PhoneIcon,
  sparkles: SparklesIcon,
};

const getFieldClassName = (hasError, extraClasses = "") =>
  `field-input ${hasError ? "field-input-error" : ""} ${extraClasses}`.trim();

export const BookingSection = ({
  sectionId = "booking",
  eyebrow = "Booking Experience",
  title = "A premium consultation funnel built to convert interest into confirmed inquiry.",
  copy = "This booking flow is now structured like a premium studio consultation: service selection, scheduling, client details, review, and final submission.",
}) => {
  const {
    formData,
    errors,
    activeStep,
    currentStep,
    isSubmitting,
    showSuccess,
    successMessage,
    submitError,
    hasRestoredDraft,
    minBookingDate,
    summaryItems,
    bookingSteps,
    updateField,
    goToStep,
    nextStep,
    previousStep,
    submitBooking,
    closeSuccessModal,
  } = useBookingFlow();

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateField(name, value);
  };

  return (
    <section id={sectionId} className="section-block scroll-mt-28">
      <div className="section-shell">
        <div className="max-w-3xl">
          <SectionHeading eyebrow={eyebrow} title={title} copy={copy} />
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <motion.form
            className="glass-panel overflow-hidden rounded-[2rem]"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onSubmit={submitBooking}
          >
            <div className="border-b border-white/10 px-6 py-6 sm:px-8">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="section-eyebrow mb-3">{currentStep.eyebrow}</p>
                    <h3 className="font-display text-3xl text-white sm:text-4xl">
                      {currentStep.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">
                      {currentStep.copy}
                    </p>
                  </div>

                  <div className="min-w-[10rem]">
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/40">
                      <span>Progress</span>
                      <span>
                        {activeStep + 1}/{bookingSteps.length}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/8">
                      <motion.div
                        className="h-full rounded-full bg-accent"
                        animate={{
                          width: `${((activeStep + 1) / bookingSteps.length) * 100}%`,
                        }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
                  {bookingSteps.map((step, index) => {
                    const isActive = index === activeStep;
                    const isComplete = index < activeStep;

                    return (
                      <button
                        key={step.id}
                        type="button"
                        className={`min-h-11 rounded-2xl border px-3 py-3 text-left text-sm transition ${
                          isActive
                            ? "border-accent/70 bg-accent/10 text-white"
                            : isComplete
                              ? "border-white/15 bg-white/[0.05] text-white/75"
                              : "border-white/10 bg-transparent text-white/40"
                        }`}
                        onClick={() => {
                          goToStep(index);
                        }}
                      >
                        <span className="block text-[0.68rem] uppercase tracking-[0.28em] text-white/35">
                          0{index + 1}
                        </span>
                        <span className="mt-2 block font-medium">{step.shortLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="px-6 py-6 sm:px-8 sm:py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="min-h-[25rem]"
                >
                  {currentStep.id === "service" ? (
                    <div className="space-y-8">
                      <div id="booking-service" tabIndex={-1} className="grid gap-4 md:grid-cols-2">
                        {services.map((service) => {
                          const Icon = iconMap[service.icon] || CameraIcon;
                          const isSelected = formData.service === service.title;

                          return (
                            <button
                              key={service.title}
                              type="button"
                              className={`rounded-[1.6rem] border p-5 text-left transition ${
                                isSelected
                                  ? "border-accent/70 bg-accent/10 shadow-[0_0_0_1px_rgba(213,179,89,0.18)]"
                                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                              }`}
                              onClick={() => updateField("service", service.title)}
                              aria-pressed={isSelected}
                            >
                              <div className="inline-flex rounded-2xl border border-accent/20 bg-accent/10 p-3 text-accent-soft">
                                <Icon />
                              </div>
                              <h4 className="mt-5 font-display text-2xl text-white">
                                {service.title}
                              </h4>
                              <p className="mt-3 text-sm leading-7 text-white/65">
                                {service.description}
                              </p>
                            </button>
                          );
                        })}
                      </div>

                      {errors.service ? <p className="field-error-text">{errors.service}</p> : null}

                      <div>
                        <p className="field-label">How long should the session run?</p>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                          {durationOptions.map((option) => {
                            const isSelected = formData.duration === option.value;

                            return (
                              <button
                                key={option.value}
                                type="button"
                                className={`rounded-[1.5rem] border p-5 text-left transition ${
                                  isSelected
                                    ? "border-accent/70 bg-accent/10"
                                    : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                                }`}
                                onClick={() => updateField("duration", option.value)}
                              >
                                <p className="text-xs uppercase tracking-[0.3em] text-accent-soft/85">
                                  {option.label}
                                </p>
                                <p className="mt-3 font-display text-3xl text-white">
                                  {option.value}
                                </p>
                                <p className="mt-3 text-sm leading-7 text-white/65">
                                  {option.detail}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                        {errors.duration ? (
                          <p className="field-error-text mt-4">{errors.duration}</p>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  {currentStep.id === "schedule" ? (
                    <div className="grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(18rem,0.7fr)]">
                      <div>
                        <label htmlFor="booking-location" className="field-label">
                          Location
                        </label>
                        <input
                          id="booking-location"
                          name="location"
                          type="text"
                          value={formData.location}
                          onChange={handleChange}
                          className={getFieldClassName(Boolean(errors.location))}
                          placeholder="Lagos, campus, studio, or preferred venue"
                          autoComplete="address-level2"
                          required
                        />
                        {errors.location ? (
                          <p className="field-error-text">{errors.location}</p>
                        ) : null}

                        <div className="mt-8">
                          <p className="field-label">Quick picks</p>
                          <div className="flex flex-wrap gap-3">
                            {locationSuggestions.map((suggestion) => (
                              <button
                                key={suggestion}
                                type="button"
                                className={`min-h-11 rounded-full border px-4 py-2 text-sm transition ${
                                  formData.location === suggestion
                                    ? "border-accent/70 bg-accent/15 text-accent-soft"
                                    : "border-white/10 bg-white/5 text-white/75 hover:border-white/25 hover:bg-white/10"
                                }`}
                                onClick={() => updateField("location", suggestion)}
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="booking-date" className="field-label">
                          Preferred Date
                        </label>
                        <input
                          id="booking-date"
                          name="date"
                          type="date"
                          min={minBookingDate}
                          value={formData.date}
                          onChange={handleChange}
                          className={getFieldClassName(Boolean(errors.date))}
                          required
                        />
                        {errors.date ? <p className="field-error-text">{errors.date}</p> : null}

                        <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                            Schedule note
                          </p>
                          <p className="mt-3 text-sm leading-7 text-white/66">
                            Availability is checked against the preferred date, service type, and
                            location together, so this step sets the whole consultation up.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {currentStep.id === "details" ? (
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <label htmlFor="booking-name" className="field-label">
                          Full Name
                        </label>
                        <input
                          id="booking-name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          className={getFieldClassName(Boolean(errors.name))}
                          placeholder="Your full name"
                          autoComplete="name"
                          required
                        />
                        {errors.name ? <p className="field-error-text">{errors.name}</p> : null}
                      </div>

                      <div>
                        <label htmlFor="booking-email" className="field-label">
                          Email Address
                        </label>
                        <input
                          id="booking-email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={getFieldClassName(Boolean(errors.email))}
                          placeholder="you@example.com"
                          autoComplete="email"
                          required
                        />
                        {errors.email ? <p className="field-error-text">{errors.email}</p> : null}
                      </div>

                      <div>
                        <label htmlFor="booking-phone" className="field-label">
                          Phone Number
                        </label>
                        <input
                          id="booking-phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className={getFieldClassName(Boolean(errors.phone))}
                          placeholder="+234..."
                          autoComplete="tel"
                          required
                        />
                        {errors.phone ? <p className="field-error-text">{errors.phone}</p> : null}
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="booking-message" className="field-label">
                          Brief
                        </label>
                        <textarea
                          id="booking-message"
                          name="message"
                          rows="7"
                          value={formData.message}
                          onChange={handleChange}
                          className={getFieldClassName(Boolean(errors.message), "resize-none")}
                          placeholder="Tell Warrior Lens about the mood, purpose, expectations, or any special notes for the session."
                          required
                        />
                        {errors.message ? <p className="field-error-text">{errors.message}</p> : null}
                      </div>
                    </div>
                  ) : null}
                  
                  {currentStep.id === "review" ? (
                    <div className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        {summaryItems.map((item) => {
                          const Icon = iconMap[item.iconKey] || CameraIcon;

                          return (
                            <div
                              key={item.label}
                              className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
                            >
                              <div className="flex items-start gap-3">
                                <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-accent-soft">
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                                    {item.label}
                                  </p>
                                  <p className="mt-3 text-sm leading-7 text-white/78">
                                    {item.value}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="rounded-[1.5rem] border border-accent/20 bg-accent/10 p-5">
                        <p className="text-xs uppercase tracking-[0.3em] text-accent-soft/85">
                          Auto-saved progress
                        </p>
                        <p className="mt-3 text-sm leading-7 text-white/72">
                          Your progress is stored locally on this device, so if you leave and come
                          back, the form can pick up from where you stopped.
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {currentStep.id === "submit" ? (
                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
                      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
                        <p className="section-eyebrow mb-3">Before You Send</p>
                        <h4 className="font-display text-3xl text-white">
                          This is structured to feel like a consultation request.
                        </h4>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                          <div className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4">
                            <p className="text-xs uppercase tracking-[0.28em] text-accent-soft/85">
                              Response Path
                            </p>
                            <p className="mt-3 text-sm leading-7 text-white/70">
                              Submitted requests are saved and reviewed personally before the studio replies.
                            </p>
                          </div>
                          <div className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4">
                            <p className="text-xs uppercase tracking-[0.28em] text-accent-soft/85">
                              Fast Follow-up
                            </p>
                            <p className="mt-3 text-sm leading-7 text-white/70">
                              You can also continue the conversation directly on WhatsApp after you submit.
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 rounded-[1.35rem] border border-white/10 bg-black/20 p-4">
                          <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                            Brief Preview
                          </p>
                          <p className="mt-3 text-sm leading-7 text-white/72">
                            {formData.message || "No brief added yet."}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                          Final Summary
                        </p>
                        <div className="mt-4 space-y-4 text-sm text-white/72">
                          {summaryItems.map((item) => (
                            <div key={item.label}>
                              <p className="text-white/40">{item.label}</p>
                              <p className="mt-1">{item.value}</p>
                            </div>
                          ))}
                        </div>

                        <a
                          href={siteConfig.whatsappUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="secondary-button mt-6 w-full justify-center"
                        >
                          <WhatsAppIcon className="h-4 w-4" />
                          Chat on WhatsApp
                        </a>
                      </div>
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>

              {submitError ? <p className="field-error-text mt-6">{submitError}</p> : null}

              <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={previousStep}
                    disabled={activeStep === 0 || isSubmitting}
                  >
                  <ChevronLeftIcon />
                  Previous
                </button>

                {activeStep < bookingSteps.length - 1 ? (
                  <button type="button" className="primary-button" onClick={nextStep}>
                    {activeStep === bookingSteps.length - 2 ? "Proceed to Submit" : "Continue"}
                    <ArrowRightIcon />
                  </button>
                ) : (
                  <button type="submit" className="primary-button" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting booking..." : "Submit Booking Request"}
                    {!isSubmitting ? <ArrowRightIcon /> : null}
                  </button>
                )}
              </div>
            </div>
          </motion.form>

          <motion.aside
            className="glass-panel rounded-[2rem] p-6 sm:p-7 xl:sticky xl:top-28"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
          >
            <p className="section-eyebrow mb-3">Consultation Summary</p>
            <h3 className="font-display text-3xl text-white">Always in view</h3>
            <p className="mt-4 text-sm leading-7 text-white/66">
              The summary stays visible so the client always knows what is being booked.
            </p>

            <div className="mt-8 space-y-4">
              {summaryItems.map((item) => {
                const Icon = iconMap[item.iconKey] || CameraIcon;
                const isPending = item.value === "Pending";

                return (
                  <div
                    key={item.label}
                    className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 inline-flex rounded-2xl border border-white/10 bg-white/5 p-2 text-accent-soft">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-[0.25em] text-white/35">
                          {item.label}
                        </p>
                        <p
                          className={`mt-2 text-sm leading-6 ${
                            isPending ? "text-white/45" : "text-white/82"
                          }`}
                        >
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 space-y-4 rounded-[1.5rem] border border-accent/20 bg-accent/10 p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent-soft/85">
                  Trust Signals
                </p>
                <p className="mt-3 text-sm leading-7 text-white/68">
                  This flow saves progress, validates each step, and delivers the request directly
                  to the studio inbox for follow-up.
                </p>
              </div>

              {hasRestoredDraft ? (
                <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4 text-sm text-white/70">
                  Draft restored from this device.
                </div>
              ) : null}

              <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
                <div className="flex items-center gap-3">
                  <MailIcon className="h-4 w-4 text-accent-soft" />
                  <p className="text-sm text-white/72">{siteConfig.email}</p>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess ? (
          <FeedbackModal
            title="Request received."
            message={successMessage}
            onClose={closeSuccessModal}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
};
