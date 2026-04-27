import { lazy } from "react";

const loadHomePage = () =>
  import("./HomePage").then((module) => ({ default: module.HomePage }));
const loadPortfolioPage = () =>
  import("./PortfolioPage").then((module) => ({ default: module.PortfolioPage }));
const loadServicesPage = () =>
  import("./ServicesPage").then((module) => ({ default: module.ServicesPage }));
const loadBookingPage = () =>
  import("./BookingPage").then((module) => ({ default: module.BookingPage }));
const loadContactPage = () =>
  import("./ContactPage").then((module) => ({ default: module.ContactPage }));

const studioPageLoaders = {
  "/": loadHomePage,
  "/portfolio": loadPortfolioPage,
  "/services": loadServicesPage,
  "/booking": loadBookingPage,
  "/contact": loadContactPage,
};

const studioPageRegistry = {
  "/": lazy(loadHomePage),
  "/portfolio": lazy(loadPortfolioPage),
  "/services": lazy(loadServicesPage),
  "/booking": lazy(loadBookingPage),
  "/contact": lazy(loadContactPage),
};

export const resolveStudioPageComponent = (pathname) =>
  studioPageRegistry[pathname] || studioPageRegistry["/"];

export const preloadStudioPage = (pathname) =>
  studioPageLoaders[pathname]?.() ?? Promise.resolve();
