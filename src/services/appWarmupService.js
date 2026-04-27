import { APP_WARMUP_ROUTES, IDLE_WARMUP_TIMEOUT_MS } from "../config/ui";
import { preloadStudioPage } from "../pages/pageRegistry";

export const loadLightboxModal = () =>
  import("../components/LightboxModal").then((module) => ({
    default: module.LightboxModal,
  }));

export const loadWarriorAiChat = () =>
  import("../components/WarriorAIChat").then((module) => ({
    default: module.WarriorAIChat,
  }));

export const loadBookingSection = () =>
  import("../components/BookingSection").then((module) => ({
    default: module.BookingSection,
  }));

export const scheduleIdleWarmup = (callback, timeout = IDLE_WARMUP_TIMEOUT_MS) => {
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

export const warmStudioExperience = () => {
  APP_WARMUP_ROUTES.forEach((pathname) => {
    preloadStudioPage(pathname);
  });

  loadBookingSection();
  loadLightboxModal();
  loadWarriorAiChat();
};
