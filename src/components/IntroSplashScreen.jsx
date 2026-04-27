import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "../config/site";
import { LazyImage } from "./LazyImage";

const EXIT_DELAY_MS = 1450;
const COMPLETE_DELAY_MS = 2050;

export const IntroSplashScreen = ({ isVisible, onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    setIsExiting(false);

    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, EXIT_DELAY_MS);

    const completeTimer = window.setTimeout(() => {
      onComplete?.();
    }, COMPLETE_DELAY_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-black px-6"
          initial={{ opacity: 1 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] blur-3xl sm:h-[22rem] sm:w-[22rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isExiting ? 0 : 0.85 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          />

          <div className="relative flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 0.985 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-[7.75rem] sm:w-[9.5rem] md:w-[10.5rem]"
            >
              <LazyImage
                src="/brand/warrior-lens-logo.png"
                alt={`${siteConfig.brandName} logo`}
                className="w-full"
                imgClassName="object-contain [filter:grayscale(1)_brightness(2.15)_contrast(0.82)]"
                sizes="(min-width: 768px) 168px, 124px"
                priority
              />
            </motion.div>

            <motion.p
              className="mt-5 text-[0.72rem] uppercase tracking-[0.42em] text-white/72 sm:text-xs"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? 4 : 0 }}
              transition={{ duration: 0.42, delay: 0.46, ease: "easeOut" }}
            >
              {siteConfig.projectName}
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
