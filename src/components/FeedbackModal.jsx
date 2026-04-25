import { motion } from "framer-motion";
import { CloseIcon } from "./icons";

export const FeedbackModal = ({ title, message, onClose }) => (
  <motion.div
    className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-md"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className="glass-panel relative w-full max-w-xl rounded-[2rem] p-8"
      initial={{ scale: 0.96, y: 16, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.97, y: 14, opacity: 0 }}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/25 hover:bg-white/10"
        onClick={onClose}
        aria-label="Close message"
      >
        <CloseIcon />
      </button>
      <p className="section-eyebrow">Submission Received</p>
      <h3 className="font-display text-4xl text-white">{title}</h3>
      <p className="mt-5 text-sm leading-7 text-white/70">{message}</p>
      <button type="button" className="primary-button mt-8" onClick={onClose}>
        Back to the site
      </button>
    </motion.div>
  </motion.div>
);
