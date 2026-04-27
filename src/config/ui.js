export const INTRO_SPLASH_SESSION_KEY = "warrior-lens-intro-seen";

export const APP_WARMUP_ROUTES = ["/booking", "/portfolio", "/services", "/contact"];

export const IDLE_WARMUP_TIMEOUT_MS = 1200;

export const FLOATING_UI = {
  mobileActionOffset: "calc(env(safe-area-inset-bottom)+5.5rem)",
  mobileBookingBarOffset: "calc(env(safe-area-inset-bottom)+0.9rem)",
  mobileChatTopOffset: "calc(env(safe-area-inset-top)+4.75rem)",
  mobileMenuBottomPadding: "calc(env(safe-area-inset-bottom)+1.15rem)",
  mobileChatComposerBottomPadding: "calc(env(safe-area-inset-bottom)+0.85rem)",
  mobileModalTopPadding: "calc(env(safe-area-inset-top)+0.75rem)",
  mobileModalBottomPadding: "calc(env(safe-area-inset-bottom)+0.75rem)",
  mobileFooterBottomPadding: "calc(env(safe-area-inset-bottom)+7rem)",
};

export const MOTION_PRESETS = {
  page: {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -14 },
    transition: { duration: 0.55, ease: "easeOut" },
  },
  sheet: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.28, ease: "easeOut" },
  },
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
};
