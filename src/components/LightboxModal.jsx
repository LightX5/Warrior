import { useEffect } from "react";
import { motion } from "framer-motion";
import { LazyImage } from "./LazyImage";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./icons";

export const LightboxModal = ({ item, onClose, onNext, onPrevious }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrevious]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 px-4 py-6 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative grid max-h-full w-full max-w-6xl gap-4 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-4 shadow-luxe lg:grid-cols-[1fr_20rem]"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 18, opacity: 0 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white transition hover:border-white/25 hover:bg-black/75"
          onClick={onClose}
          aria-label="Close image viewer"
        >
          <CloseIcon />
        </button>

        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03]">
          <LazyImage
            src={item.image}
            alt={item.alt}
            className="h-full min-h-[22rem] w-full"
            imgClassName="max-h-[75vh] object-cover"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/55 to-transparent p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-soft/90">
              {item.category}
            </p>
            <h3 className="mt-2 font-display text-3xl text-white">{item.title}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">{item.description}</p>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
          <div>
            <p className="section-eyebrow">Frame Details</p>
            <h3 className="font-display text-3xl text-white">{item.title}</h3>
            <div className="mt-6 space-y-4 text-sm text-white/70">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">Category</p>
                <p className="mt-2 text-base text-white">{item.category}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">Captured</p>
                <p className="mt-2 text-base text-white">{item.date}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">Description</p>
                <p className="mt-2 leading-7">{item.description}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="secondary-button px-4 py-3"
              onClick={onPrevious}
              aria-label="Previous image"
            >
              <ChevronLeftIcon />
              Prev
            </button>
            <button
              type="button"
              className="primary-button px-4 py-3"
              onClick={onNext}
              aria-label="Next image"
            >
              Next
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
