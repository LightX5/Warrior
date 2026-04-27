import { Helmet } from "react-helmet-async";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { AppShell } from "./components/AppShell";
import { IntroSplashScreen } from "./components/IntroSplashScreen";
import { heroSlides, siteMetadata } from "./config/site";
import { imageManifest } from "./data/imageManifest";
import { useStudioIntroSplash } from "./hooks/useStudioIntroSplash";
import { useStudioLightbox } from "./hooks/useStudioLightbox";
import { useStudioNavigation } from "./hooks/useStudioNavigation";
import { useStudioRoute } from "./hooks/useStudioRoute";
import {
  resolveStudioPageComponent,
} from "./pages/pageRegistry";
import {
  loadLightboxModal,
  loadWarriorAiChat,
  scheduleIdleWarmup,
  warmStudioExperience,
} from "./services/appWarmupService";

const LightboxModal = lazy(loadLightboxModal);

const WarriorAIChat = lazy(loadWarriorAiChat);

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
    const cancelIdleWork = scheduleIdleWarmup(() => {
      setShouldRenderWarriorAI(true);
      warmStudioExperience();
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

      <AppShell
        pathname={pathname}
        assistantSlot={
          shouldRenderWarriorAI ? (
            <Suspense fallback={null}>
              <WarriorAIChat />
            </Suspense>
          ) : null
        }
      >
        <Suspense fallback={null}>
          <CurrentPage />
        </Suspense>
      </AppShell>

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
