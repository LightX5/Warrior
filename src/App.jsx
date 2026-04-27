import { Helmet } from "react-helmet-async";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { FloatingWhatsAppButton } from "./components/FloatingWhatsAppButton";
import { MobileStickyBookingBar } from "./components/MobileStickyBookingBar";
import { IntroSplashScreen } from "./components/IntroSplashScreen";
import { heroSlides, siteMetadata } from "./config/site";
import { imageManifest } from "./data/imageManifest";
import { useStudioIntroSplash } from "./hooks/useStudioIntroSplash";
import { useStudioLightbox } from "./hooks/useStudioLightbox";
import { useStudioNavigation } from "./hooks/useStudioNavigation";
import { useStudioRoute } from "./hooks/useStudioRoute";
import {
  preloadStudioPage,
  resolveStudioPageComponent,
} from "./pages/pageRegistry";

const loadLightboxModal = () =>
  import("./components/LightboxModal").then((module) => ({
    default: module.LightboxModal,
  }));

const LightboxModal = lazy(loadLightboxModal);

const loadWarriorAiChat = () =>
  import("./components/WarriorAIChat").then((module) => ({
    default: module.WarriorAIChat,
  }));

const WarriorAIChat = lazy(loadWarriorAiChat);

const scheduleIdleTask = (callback, timeout = 1200) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  if ("requestIdleCallback" in window) {
    const requestId = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback(requestId);
  }

  const timeoutId = window.setTimeout(callback, timeout);
  return () => window.clearTimeout(timeoutId);
};

export default function App() {
  const {
    pathname,
    activeRoute,
  } = useStudioRoute();
  const {
    lightboxItem,
    closeLightbox,
    moveLightbox,
  } = useStudioLightbox();
  const {
    startBookingFlow,
  } = useStudioNavigation();
  const { showIntroSplash, completeIntroSplash } = useStudioIntroSplash();
  const [shouldRenderWarriorAI, setShouldRenderWarriorAI] = useState(false);
  const CurrentPage = resolveStudioPageComponent(pathname);
  const leadHeroAsset = useMemo(
    () => imageManifest[heroSlides[0]?.image],
    []
  );

  useEffect(() => {
    const cancelIdleWork = scheduleIdleTask(() => {
      setShouldRenderWarriorAI(true);
      preloadStudioPage("/booking");
      preloadStudioPage("/portfolio");
      import("./components/BookingSection");
      loadLightboxModal();
      loadWarriorAiChat();
    });

    return cancelIdleWork;
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Helmet>
        <title>{activeRoute?.title || siteMetadata.title}</title>
        <meta
          name="description"
          content={activeRoute?.description || siteMetadata.description}
        />
        <link rel="preload" as="image" href="/brand/warrior-lens-logo.png" />
        {leadHeroAsset?.defaultWebpSrc ? (
          <link
            rel="preload"
            as="image"
            href={leadHeroAsset.defaultWebpSrc}
            imageSrcSet={leadHeroAsset.webpSrcSet}
            imageSizes="100vw"
            fetchPriority="high"
          />
        ) : null}
      </Helmet>

      <div className="relative overflow-x-clip">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
          <div className="absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_top,rgba(213,179,89,0.18),transparent_42%)]" />
          <div className="absolute left-0 top-24 h-[26rem] w-[26rem] rounded-full bg-amber-300/10 blur-3xl" />
          <div className="absolute right-0 top-40 h-[24rem] w-[24rem] rounded-full bg-white/5 blur-3xl" />
        </div>

        <Navbar />
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <Suspense fallback={null}>
              <CurrentPage />
            </Suspense>
          </motion.div>
        </AnimatePresence>
        <Footer />
        <FloatingWhatsAppButton />
        {shouldRenderWarriorAI ? (
          <Suspense fallback={null}>
            <WarriorAIChat />
          </Suspense>
        ) : null}
        <MobileStickyBookingBar />
      </div>

      <AnimatePresence>
        {lightboxItem ? (
          <Suspense fallback={null}>
            <LightboxModal
              item={lightboxItem}
              onClose={closeLightbox}
              onNext={() => moveLightbox(1)}
              onPrevious={() => moveLightbox(-1)}
              onBookSimilar={startBookingFlow}
            />
          </Suspense>
        ) : null}
      </AnimatePresence>

      <IntroSplashScreen isVisible={showIntroSplash} onComplete={completeIntroSplash} />
    </MotionConfig>
  );
}
