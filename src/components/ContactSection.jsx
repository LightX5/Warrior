import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "../config/site";
import { submitContactMessage } from "../services/contactService";
import { validateContactForm } from "../utils/validation";
import { SectionHeading } from "./SectionHeading";
import { FeedbackModal } from "./FeedbackModal";

const initialValues = {
  name: "",
  email: "",
  message: "",
};

const getFieldClassName = (hasError, extraClasses = "") =>
  `field-input ${hasError ? "field-input-error" : ""} ${extraClasses}`.trim();

export const ContactSection = ({
  eyebrow = "Contact",
  title = "Reach the studio.",
  copy = "If you already know what you need, send a booking request. If not, start with a message here.",
}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(
    "Your message has been delivered to Warrior Lens Studio."
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");

    const nextErrors = validateContactForm(formData);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = await submitContactMessage(formData);
      setFormData(initialValues);
      setErrors({});
      setSuccessMessage(payload.message || "Your message has been delivered to Warrior Lens Studio.");
      setShowSuccess(true);
    } catch (error) {
      setSubmitError(error.message || "Unable to send your message right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    { label: "WhatsApp", value: "Start a chat", href: siteConfig.whatsappUrl },
    { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    {
      label: "Phone",
      value: siteConfig.phoneNumber,
      href: `tel:${siteConfig.phoneNumber.replace(/[^\d+]/g, "")}`,
    },
    { label: "Instagram", value: siteConfig.instagramHandle, href: siteConfig.instagramUrl },
  ];

  return (
    <section id="contact" className="section-block">
      <div className="section-shell">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          copy={copy}
        />

        <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(22rem,0.7fr)]">
          <div className="space-y-8">
            <div className="max-w-xl">
              <p className="text-sm leading-7 text-white/68">
                Based in Nigeria. Available for events, portraits, and creative shoots.
              </p>
            </div>

            <div className="border-t border-white/10">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex items-center justify-between gap-4 border-b border-white/10 py-4 transition hover:text-white"
                >
                  <span className="text-sm uppercase tracking-[0.24em] text-white/45">
                    {item.label}
                  </span>
                  <span className="text-right text-base text-white/82">{item.value}</span>
                </a>
              ))}
            </div>
          </div>

          <motion.form
            className="rounded-[1.5rem] border border-white/10 p-6 sm:p-8"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            onSubmit={handleSubmit}
          >
            <p className="section-eyebrow">Message</p>
            <h3 className="font-display text-4xl text-white">Send a direct message</h3>
            <p className="mt-4 text-sm leading-7 text-white/68">
              Tell us what you need and we will reply.
            </p>

            <div className="mt-8 grid gap-5">
              <div>
                <label htmlFor="contact-name" className="field-label">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={getFieldClassName(Boolean(errors.name))}
                  placeholder="Your name"
                />
                {errors.name ? <p className="field-error-text mt-2">{errors.name}</p> : null}
              </div>

              <div>
                <label htmlFor="contact-email" className="field-label">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={getFieldClassName(Boolean(errors.email))}
                  placeholder="you@example.com"
                />
                {errors.email ? <p className="field-error-text mt-2">{errors.email}</p> : null}
              </div>

              <div>
                <label htmlFor="contact-message" className="field-label">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  className={getFieldClassName(Boolean(errors.message), "resize-none")}
                  placeholder="Tell us about the shoot or question."
                />
                {errors.message ? <p className="field-error-text mt-2">{errors.message}</p> : null}
              </div>
            </div>

            {submitError ? <p className="field-error-text mt-5">{submitError}</p> : null}

            <button type="submit" className="primary-button mt-8 w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending message..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess ? (
          <FeedbackModal
            title="Message received."
            message={successMessage}
            onClose={() => setShowSuccess(false)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
};
