import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "../config/site";
import { postContactMessage } from "../lib/api";
import { validateContactForm } from "../utils/validation";
import { SectionHeading } from "./SectionHeading";
import { FeedbackModal } from "./FeedbackModal";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "./icons";

const initialValues = {
  name: "",
  email: "",
  message: "",
};

export const ContactSection = () => {
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
      const payload = await postContactMessage(formData);
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

  return (
    <section id="contact" className="section-block">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Contact"
          title="Give clients multiple ways to reach the studio while keeping the visual language clean."
          copy="Instagram, Facebook, WhatsApp, direct email, and a contact message flow are all positioned here so the studio can respond on the channel that fits best."
        />

        <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(22rem,0.7fr)]">
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="glass-panel rounded-[1.75rem] p-6 transition hover:-translate-y-1"
              >
                <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-accent-soft">
                  <InstagramIcon />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.35em] text-white/45">Instagram</p>
                <p className="mt-3 text-2xl font-semibold text-white">{siteConfig.instagramHandle}</p>
              </a>

              <a
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="glass-panel rounded-[1.75rem] p-6 transition hover:-translate-y-1"
              >
                <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-accent-soft">
                  <FacebookIcon />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.35em] text-white/45">Facebook</p>
                <p className="mt-3 text-2xl font-semibold text-white">{siteConfig.facebookHandle}</p>
              </a>

              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="glass-panel rounded-[1.75rem] p-6 transition hover:-translate-y-1"
              >
                <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-accent-soft">
                  <WhatsAppIcon />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.35em] text-white/45">WhatsApp</p>
                <p className="mt-3 text-xl font-semibold text-white">Start a live chat</p>
              </a>

              <a
                href={`tel:${siteConfig.phoneNumber.replace(/[^\d+]/g, "")}`}
                className="glass-panel rounded-[1.75rem] p-6 transition hover:-translate-y-1"
              >
                <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-accent-soft">
                  <PhoneIcon />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.35em] text-white/45">Phone</p>
                <p className="mt-3 text-xl font-semibold text-white">{siteConfig.phoneNumber}</p>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="glass-panel rounded-[1.75rem] p-6 transition hover:-translate-y-1"
              >
                <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-accent-soft">
                  <MailIcon />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.35em] text-white/45">Email</p>
                <p className="mt-3 text-xl font-semibold text-white">{siteConfig.email}</p>
              </a>
            </div>
          </div>

          <motion.form
            className="glass-panel rounded-[2rem] p-6 sm:p-8"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            onSubmit={handleSubmit}
          >
            <p className="section-eyebrow">Email Contact Form</p>
            <h3 className="font-display text-4xl text-white">Send a direct message</h3>
            <p className="mt-4 text-sm leading-7 text-white/68">
              This route is prepared for lightweight contact automation and future admin review.
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
                  className="field-input"
                  placeholder="Your name"
                />
                {errors.name ? <p className="mt-2 text-sm text-red-300">{errors.name}</p> : null}
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
                  className="field-input"
                  placeholder="you@example.com"
                />
                {errors.email ? <p className="mt-2 text-sm text-red-300">{errors.email}</p> : null}
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
                  className="field-input resize-none"
                  placeholder="Tell Warrior Lens Studio what you need."
                />
                {errors.message ? <p className="mt-2 text-sm text-red-300">{errors.message}</p> : null}
              </div>
            </div>

            {submitError ? <p className="mt-5 text-sm text-red-300">{submitError}</p> : null}

            <button type="submit" className="primary-button mt-8 w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending message..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess ? (
          <FeedbackModal
            title="Message sent."
            message={successMessage}
            onClose={() => setShowSuccess(false)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
};
