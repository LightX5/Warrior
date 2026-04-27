import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { INTRO_SPLASH_SESSION_KEY } from "../config/ui";
import { portfolioItems } from "../data/portfolio";
import { useStudioLocation } from "../hooks/useStudioLocation";
import {
  getStudioRoute,
  isKnownStudioPath,
  navigateTo,
  navigateToBooking,
} from "../pages/routes";

export const StudioRouteContext = createContext(null);
export const StudioNavigationContext = createContext(null);
export const StudioLightboxContext = createContext(null);
export const StudioIntroSplashContext = createContext(null);

const focusBookingServiceAnchor = () => {
  const bookingField = document.querySelector("#booking-service");
  if (bookingField instanceof HTMLElement) {
    bookingField.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      bookingField.focus();
    }, 420);
  }
};

export const StudioAppProvider = ({ children }) => {
  const { pathname, hash, revision } = useStudioLocation();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [showIntroSplash, setShowIntroSplash] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return !window.sessionStorage.getItem(INTRO_SPLASH_SESSION_KEY);
  });

  const activeRoute = useMemo(() => getStudioRoute(pathname), [pathname]);
  const portfolioIndexById = useMemo(
    () => new Map(portfolioItems.map((item, index) => [item.id, index])),
    []
  );

  const lightboxItem = useMemo(() => {
    if (lightboxIndex === null) {
      return null;
    }

    return portfolioItems[lightboxIndex] ?? null;
  }, [lightboxIndex]);

  const navigate = useCallback((path, options) => {
    navigateTo(path, options);
  }, []);

  const startBookingFlow = useCallback(() => {
    if (pathname === "/booking") {
      focusBookingServiceAnchor();
      return;
    }

    navigateToBooking();
  }, [pathname]);

  const openLightbox = useCallback(
    (id) => {
      const nextIndex = portfolioIndexById.get(id);
      if (typeof nextIndex === "number") {
        setLightboxIndex(nextIndex);
      }
    },
    [portfolioIndexById]
  );

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const moveLightbox = useCallback((direction) => {
    setLightboxIndex((current) => {
      if (current === null) {
        return current;
      }

      const total = portfolioItems.length;
      return (current + direction + total) % total;
    });
  }, []);

  const completeIntroSplash = useCallback(() => {
    setShowIntroSplash(false);
  }, []);

  useEffect(() => {
    if (!isKnownStudioPath(pathname)) {
      navigateTo("/", { replace: true });
    }
  }, [pathname]);

  useEffect(() => {
    if (!showIntroSplash || typeof window === "undefined") {
      return;
    }

    window.sessionStorage.setItem(INTRO_SPLASH_SESSION_KEY, "true");
  }, [showIntroSplash]);

  useEffect(() => {
    setLightboxIndex(null);
  }, [pathname]);

  useEffect(() => {
    const syncScroll = () => {
      if (!hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        return;
      }

      const targetId = hash.replace(/^#/, "");
      const target = document.getElementById(targetId) || document.querySelector(hash);

      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        if (target.tabIndex >= -1) {
          window.setTimeout(() => {
            target.focus();
          }, 450);
        }
        return;
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    const timer = window.setTimeout(syncScroll, 120);
    return () => window.clearTimeout(timer);
  }, [pathname, hash, revision]);

  const routeValue = useMemo(
    () => ({
      pathname,
      hash,
      revision,
      activeRoute,
    }),
    [activeRoute, hash, pathname, revision]
  );

  const navigationValue = useMemo(
    () => ({
      navigate,
      startBookingFlow,
    }),
    [navigate, startBookingFlow]
  );

  const lightboxValue = useMemo(
    () => ({
      lightboxItem,
      openLightbox,
      closeLightbox,
      moveLightbox,
    }),
    [closeLightbox, lightboxItem, moveLightbox, openLightbox]
  );

  const introSplashValue = useMemo(
    () => ({
      showIntroSplash,
      completeIntroSplash,
    }),
    [completeIntroSplash, showIntroSplash]
  );

  return (
    <StudioRouteContext.Provider value={routeValue}>
      <StudioNavigationContext.Provider value={navigationValue}>
        <StudioLightboxContext.Provider value={lightboxValue}>
          <StudioIntroSplashContext.Provider value={introSplashValue}>
            {children}
          </StudioIntroSplashContext.Provider>
        </StudioLightboxContext.Provider>
      </StudioNavigationContext.Provider>
    </StudioRouteContext.Provider>
  );
};
