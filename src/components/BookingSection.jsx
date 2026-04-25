import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "../data/services";
import { postBooking } from "../lib/api";
import { getLocalDateInputMin } from "../utils/date";
import { validateBookingForm } from "../utils/validation";
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
} from "./icons";

const iconMap = {
  brush: BrushIcon,
  calendar: CalendarIcon,
  camera: CameraIcon,
  film: FilmIcon,
  sparkles: SparklesIcon,
};

const initialValues = {
  name: "",
  email: "",
  phone: "",
  service: "",
  duration: "",
  date: "",
  location: "",
  message: "",
};

const locationSuggestions = ["Lagos", "Studio Session", "OAU Campus", "Destination Shoot"];

const durationOptions = [
  {
    value: "1 hour",
    label: "1 Hour",
    detail: "Best for quick portraits, mini sessions, or a focused creative set.",
  },
  {
    value: "2 hours",
    label: "2 Hours",
    detail: "A strong fit for portraits, campus sessions, and short editorial stories.",
  },
  {
    value: "4 hours",
    label: "Half Day",
    detail: "Ideal for event highlights, documentary moments, or multiple looks.",
  },
  {
    value: "8 hours",
    label: "Full Day",
    detail: "Made for weddings, long events, or deeper story-driven coverage.",
  },
  {
    value: "Custom scope",
    label: "Custom",
    detail: "For projects that need a tailored schedule, crew setup, or pacing.",
  },
];

const bookingSteps = [
  {
    id: "location",
    eyebrow: "Step 1",
    title: "Where will the session happen?",
    copy: "Start with the city, venue, or area so Warrior Lens can shape the quote around logistics and atmosphere.",
    fields: ["location"],
  },
  {
    id: "coverage",
    eyebrow: "Step 2",
    title: "What kind of coverage do you need?",
    copy: "Choose the shoot type that best matches the story, mood, or event you want captured.",
    fields: ["service"],
  },
  {
    id: "duration",
    eyebrow: "Step 3",
    title: "How long should the coverage run?",
    copy: "A time estimate helps shape pricing, pacing, and how the shoot day is planned.",
    fields: ["duration"],
  },
  {
    id: "date",
    eyebrow: "Step 4",
    title: "When should the session happen?",
    copy: "Pick the preferred date. If the timing may shift, you can mention that in the final note.",
    fields: ["date"],
  },
  {
    id: "contact",
    eyebrow: "Step 5",
    title: "Who should Warrior Lens reply to?",
    copy: "Add the best contact details so the quote and follow-up can reach the right person quickly.",
    fields: ["name", "email", "phone"],
  },
  {
    id: "notes",
    eyebrow: "Step 6",
    title: "Add the brief and send the request.",
    copy: "Share mood, purpose, expectations, or special requests. Then submit the booking inquiry.",
    fields: ["message"],
  },
];

const stepFieldSet = new Set(bookingSteps.flatMap((step) => step.fields));

const formatDisplayDate = (value) => {
  if (!value) {
    return "Pending";
  }

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
};

const getStepErrors = (step, values) => {
  const fullErrors = validateBookingForm(values);

  return step.fields.reduce((collected, field) => {
    if (fullErrors[field]) {
      collected[field] = fullErrors[field];
    }

    return collected;
  }, {});
};

export const BookingSection = () => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState(
    "Your booking request has been submitted to Warrior Lens Studio."
  );

  const currentStep = bookingSteps[activeStep];
  const minBookingDate = useMemo(() => getLocalDateInputMin(), []);

  const summaryItems = [
    {
      label: "Location",
      value: formData.location || "Pending",
      icon: MapPinIcon,
    },
    {
      label: "Coverage",
      value: formData.service || "Pending",
      icon: CameraIcon,
    },
    {
      label: "How long",
      value: formData.duration || "Pending",
      icon: SparklesIcon,
    },
    {
      label: "Date",
      value: formatDisplayDate(formData.date),
      icon: CalendarIcon,
    },
    {
      label: "Contact",
      value: formData.name || formData.email || "Pending",
      icon: PhoneIcon,
    },
  ];

  const handleFieldValue = (name, value) => {
    setFormData((current) => ({ ...current, [name]: value }));

    if (stepFieldSet.has(name)) {
      setErrors((current) => ({ ...current, [name]: "" }));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    handleFieldValue(name, value);
  };

  const handleLocationSuggestion = (suggestion) => {
    handleFieldValue("location", suggestion);
  };

  const handleNextStep = () => {
    const nextErrors = getStepErrors(currentStep, formData);

    if (Object.keys(nextErrors).length > 0) {
      setErrors((current) => ({ ...current, ...nextErrors }));
      return;
    }

    setActiveStep((current) => Math.min(current + 1, bookingSteps.length - 1));
  };

  const handlePreviousStep = () => {
    setSubmitError("");
    setActiveStep((current) => Math.max(current - 1, 0));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");

    const nextErrors = validateBookingForm(formData);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);

      const firstInvalidStepIndex = bookingSteps.findIndex((step) =>
        step.fields.some((field) => nextErrors[field])
      );

      if (firstInvalidStepIndex >= 0) {
        setActiveStep(firstInvalidStepIndex);
      }

      return;
    }

    try {
      setIsSubmitting(true);
      const payload = await postBooking(formData);
      setFormData(initialValues);
      setErrors({});
      setActiveStep(0);
      setSuccessMessage(
        payload.message || "Your booking request has been submitted to Warrior Lens Studio."
      );
      setShowSuccess(true);
    } catch (error) {
      setSubmitError(error.message || "Unable to submit your booking right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="section-block scroll-mt-28">
      <div className="section-shell">
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="Booking Experience"
            title="A guided booking flow designed to feel like a premium inquiry, not a long form."
            copy="Warrior Lens now uses a step-by-step booking journey inspired by premium studio quote flows, starting with location and coverage before moving into timing, contact details, and the final brief."
          />
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
          <motion.form
            className="glass-panel overflow-hidden rounded-[2rem]"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onSubmit={handleSubmit}
          >
            <div className="border-b border-white/10 px-6 py-6 sm:px-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="section-eyebrow mb-3">{currentStep.eyebrow}</p>
                  <h3 className="font-display text-3xl text-white sm:text-4xl">
                    {currentStep.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">
                    {currentStep.copy}
                  </p>
                </div>

                <div className="min-w-[8rem]">
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
            </div>

            <div className="px-6 py-6 sm:px-8 sm:py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="min-h-[22rem]"
                >
                  {currentStep.id === "location" ? (
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
                        className="field-input"
                        placeholder="Lagos, campus, studio, or preferred venue"
                        autoComplete="address-level2"
                        required
                      />
                      {errors.location ? (
                        <p className="mt-3 text-sm text-red-300">{errors.location}</p>
                      ) : null}

                      <div className="mt-8">
                        <p className="field-label">Quick picks</p>
                        <div className="flex flex-wrap gap-3">
                          {locationSuggestions.map((suggestion) => (
                            <button
                              key={suggestion}
                              type="button"
                              className={`rounded-full border px-4 py-2 text-sm transition ${
                                formData.location === suggestion
                                  ? "border-accent/70 bg-accent/15 text-accent-soft"
                                  : "border-white/10 bg-white/5 text-white/75 hover:border-white/25 hover:bg-white/10"
                              }`}
                              onClick={() => handleLocationSuggestion(suggestion)}
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                          Why it comes first
                        </p>
                        <p className="mt-3 text-sm leading-7 text-white/66">
                          Like premium quote flows, Warrior Lens starts with location so travel,
                          availability, and the overall mood of the session can guide everything
                          that follows.
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {currentStep.id === "coverage" ? (
                    <div>
                      <div className="grid gap-4 md:grid-cols-2">
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
                              onClick={() => handleFieldValue("service", service.title)}
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

                      {errors.service ? (
                        <p className="mt-4 text-sm text-red-300">{errors.service}</p>
                      ) : null}
                    </div>
                  ) : null}

                  {currentStep.id === "duration" ? (
                    <div>
                      <div className="grid gap-4 md:grid-cols-2">
                        {durationOptions.map((option) => {
                          const isSelected = formData.duration === option.value;

                          return (
                            <button
                              key={option.value}
                              type="button"
                              className={`rounded-[1.6rem] border p-5 text-left transition ${
                                isSelected
                                  ? "border-accent/70 bg-accent/10 shadow-[0_0_0_1px_rgba(213,179,89,0.18)]"
                                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                              }`}
                              onClick={() => handleFieldValue("duration", option.value)}
                              aria-pressed={isSelected}
                            >
                              <p className="text-xs uppercase tracking-[0.3em] text-accent-soft/80">
                                {option.label}
                              </p>
                              <p className="mt-3 font-display text-3xl text-white">{option.value}</p>
                              <p className="mt-3 text-sm leading-7 text-white/65">{option.detail}</p>
                            </button>
                          );
                        })}
                      </div>

                      {errors.duration ? (
                        <p className="mt-4 text-sm text-red-300">{errors.duration}</p>
                      ) : null}
                    </div>
                  ) : null}

                  {currentStep.id === "date" ? (
                    <div className="max-w-xl">
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
                        className="field-input"
                        required
                      />
                      {errors.date ? <p className="mt-3 text-sm text-red-300">{errors.date}</p> : null}

                      <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                          Timing note
                        </p>
                        <p className="mt-3 text-sm leading-7 text-white/66">
                          If the date is flexible, mention the possible range in your final note so
                          the quote can allow for movement.
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {currentStep.id === "contact" ? (
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
                          className="field-input"
                          placeholder="Your full name"
                          autoComplete="name"
                          required
                        />
                        {errors.name ? <p className="mt-3 text-sm text-red-300">{errors.name}</p> : null}
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
                          className="field-input"
                          placeholder="you@example.com"
                          autoComplete="email"
                          required
                        />
                        {errors.email ? (
                          <p className="mt-3 text-sm text-red-300">{errors.email}</p>
                        ) : null}
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
                          className="field-input"
                          placeholder="+234..."
                          autoComplete="tel"
                          required
                        />
                        {errors.phone ? (
                          <p className="mt-3 text-sm text-red-300">{errors.phone}</p>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  {currentStep.id === "notes" ? (
                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
                      <div>
                        <label htmlFor="booking-message" className="field-label">
                          Message
                        </label>
                        <textarea
                          id="booking-message"
                          name="message"
                          rows="8"
                          value={formData.message}
                          onChange={handleChange}
                          className="field-input resize-none"
                          placeholder="Tell Warrior Lens about the mood, purpose, coverage details, or anything important for the quote."
                          required
                        />
                        {errors.message ? (
                          <p className="mt-3 text-sm text-red-300">{errors.message}</p>
                        ) : null}
                      </div>

                      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                          Ready to send
                        </p>
                        <div className="mt-4 space-y-4 text-sm text-white/72">
                          <div>
                            <p className="text-white/38">Location</p>
                            <p className="mt-1">{formData.location || "Pending"}</p>
                          </div>
                          <div>
                            <p className="text-white/38">Coverage</p>
                            <p className="mt-1">{formData.service || "Pending"}</p>
                          </div>
                          <div>
                            <p className="text-white/38">How long</p>
                            <p className="mt-1">{formData.duration || "Pending"}</p>
                          </div>
                          <div>
                            <p className="text-white/38">Date</p>
                            <p className="mt-1">{formatDisplayDate(formData.date)}</p>
                          </div>
                          <div>
                            <p className="text-white/38">Reply to</p>
                            <p className="mt-1">{formData.email || "Pending"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>

              {submitError ? <p className="mt-6 text-sm text-red-300">{submitError}</p> : null}

              <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={handlePreviousStep}
                  disabled={activeStep === 0 || isSubmitting}
                >
                  <ChevronLeftIcon />
                  Previous
                </button>

                {activeStep < bookingSteps.length - 1 ? (
                  <button type="button" className="primary-button" onClick={handleNextStep}>
                    Continue
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
            <p className="section-eyebrow mb-3">Booking Outline</p>
            <h3 className="font-display text-3xl text-white">Live summary</h3>
            <p className="mt-4 text-sm leading-7 text-white/66">
              Each answer is saved into the quote flow as you move from step to step.
            </p>

            <div className="mt-8 space-y-4">
              {summaryItems.map((item) => {
                const Icon = item.icon;
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

            <div className="mt-8 rounded-[1.5rem] border border-accent/20 bg-accent/10 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-accent-soft/85">
                Concierge-style flow
              </p>
              <p className="mt-3 text-sm leading-7 text-white/68">
                The sequence now mirrors modern quote journeys more closely: location first, then
                coverage, duration, date, and contact before the final brief.
              </p>
              <div className="mt-5 flex items-center gap-3 text-sm text-white/70">
                <MailIcon className="h-4 w-4 text-accent-soft" />
                <span>Booking emails now include the full brief, including duration.</span>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess ? (
          <FeedbackModal
            title="Booking request sent."
            message={successMessage}
            onClose={() => setShowSuccess(false)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
};
