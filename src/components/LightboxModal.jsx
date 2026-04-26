import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LazyImage } from "./LazyImage";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  MinusIcon,
  PlusIcon,
} from "./icons";
import { scrollToSection } from "../utils/scroll";

export const LightboxModal = ({ item, onClose, onNext, onPrevious }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const touchStartX = useRef(null);

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

  useEffect(() => {
    setZoomLevel(1);
  }, [item.id]);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null || zoomLevel > 1.05) {
      touchStartX.current = null;
      return;
    }

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const deltaX = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) < 70) {
      return;
    }

    if (deltaX < 0) {
      onNext();
      return;
    }

    onPrevious();
  };

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

        <div
          className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <LazyImage
            src={item.image}
            alt={item.alt}
            className="h-full min-h-[22rem] w-full"
            imgClassName="max-h-[75vh] select-none object-contain"
            imgStyle={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
            sizes="(min-width: 1024px) 68vw, 100vw"
            priority
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/55 to-transparent p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-soft/90">
              {item.category}
            </p>
            <h3 className="mt-2 font-display text-3xl text-white">{item.title}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
              {item.story || item.description}
            </p>
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
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">Story</p>
                <p className="mt-2 leading-7">{item.story || item.description}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                className="secondary-button px-4 py-3"
                onClick={() => setZoomLevel((current) => Math.max(1, current - 0.25))}
                aria-label="Zoom out"
              >
                <MinusIcon />
              </button>
              <button
                type="button"
                className="secondary-button px-4 py-3"
                onClick={() => setZoomLevel(1)}
                aria-label="Reset zoom"
              >
                {zoomLevel.toFixed(2)}x
              </button>
              <button
                type="button"
                className="secondary-button px-4 py-3"
                onClick={() => setZoomLevel((current) => Math.min(2.5, current + 0.25))}
                aria-label="Zoom in"
              >
                <PlusIcon />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
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

            <button
              type="button"
              className="primary-button w-full px-4 py-3"
              onClick={() => {
                onClose();
                scrollToSection("booking", "#booking-service");
              }}
            >
              Book a Similar Session
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
