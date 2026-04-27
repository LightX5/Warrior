import { siteMetadata } from "../config/site";

export const STUDIO_NAVIGATE_EVENT = "studio:navigate";

export const studioRoutes = [
  {
    path: "/",
    label: "Home",
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
  {
    path: "/portfolio",
    label: "Portfolio",
    title: "Portfolio | Warrior Lens Studio",
    description:
      "Explore curated Warrior Lens photography across portraits, events, creative shoots, and documentary storytelling.",
  },
  {
    path: "/services",
    label: "Services",
    title: "Services | Warrior Lens Studio",
    description:
      "Discover Warrior Lens photography services for portraits, events, creative concepts, documentary work, and refined post-production.",
  },
  {
    path: "/booking",
    label: "Booking",
    title: "Book a Session | Warrior Lens Studio",
    description:
      "Start a premium Warrior Lens booking consultation with service selection, date planning, and a guided review flow.",
  },
  {
    path: "/contact",
    label: "Contact",
    title: "Contact | Warrior Lens Studio",
    description:
      "Reach Warrior Lens Studio through WhatsApp, Instagram, email, or the direct contact form.",
  },
];

const routeMap = new Map(studioRoutes.map((route) => [route.path, route]));

export const normalizeStudioPath = (pathname = "/") => {
  if (!pathname || pathname === "/") {
    return "/";
  }

  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  return normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`;
};

export const isKnownStudioPath = (pathname) => routeMap.has(normalizeStudioPath(pathname));

export const getStudioRoute = (pathname) =>
  routeMap.get(normalizeStudioPath(pathname)) ?? routeMap.get("/");

export const getStudioLocationState = () => {
  if (typeof window === "undefined") {
    return { pathname: "/", hash: "" };
  }

  return {
    pathname: normalizeStudioPath(window.location.pathname),
    hash: window.location.hash || "",
  };
};

export const navigateTo = (to, options = {}) => {
  if (typeof window === "undefined") {
    return;
  }

  const { replace = false } = options;
  const targetUrl = new URL(to, window.location.origin);
  const pathname = normalizeStudioPath(targetUrl.pathname);
  const nextTarget = `${pathname}${targetUrl.hash}`;
  const currentTarget = `${normalizeStudioPath(window.location.pathname)}${window.location.hash}`;

  if (currentTarget !== nextTarget) {
    window.history[replace ? "replaceState" : "pushState"]({}, "", nextTarget);
  }

  window.dispatchEvent(new Event(STUDIO_NAVIGATE_EVENT));
};

export const navigateToBooking = () => navigateTo("/booking#booking-service");
