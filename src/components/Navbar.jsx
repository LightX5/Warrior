import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FLOATING_UI, MOTION_PRESETS } from "../config/ui";
import { useStudioNavigation } from "../hooks/useStudioNavigation";
import { useStudioRoute } from "../hooks/useStudioRoute";
import { preloadStudioPage } from "../pages/pageRegistry";
import { studioRoutes } from "../pages/routes";
import { LazyImage } from "./LazyImage";
import { CloseIcon, MenuIcon } from "./icons";

export const Navbar = () => {
  const { pathname } = useStudioRoute();
  const { navigate, startBookingFlow } = useStudioNavigation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;

    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (event, path) => {
    event.preventDefault();
    navigate(path);
    setMobileOpen(false);
  };

  const handlePrefetch = (path) => {
    preloadStudioPage(path);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b transition duration-300 ${
          isScrolled
            ? "border-white/10 bg-black/55 shadow-[0_16px_40px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
            : "border-white/8 bg-black/30 backdrop-blur-xl"
        }`}
      >
        <div className="section-shell flex h-[4.7rem] items-center justify-between gap-3 sm:h-20 sm:gap-4">
          <a
            href="/"
            className="inline-flex min-w-0 items-center gap-3"
            onClick={(event) => handleNavigation(event, "/")}
          >
            <LazyImage
              src="/brand/warrior-lens-logo.png"
              alt="Warrior Lens logo"
              className="h-10 w-10 rounded-2xl sm:h-11 sm:w-11"
              imgClassName="rounded-2xl object-cover"
              sizes="44px"
              priority
            />
            <div className="min-w-0">
              <p className="truncate font-display text-[1.35rem] leading-none text-white sm:text-2xl">
                Warrior Lens
              </p>
              <p className="mt-1 text-[0.62rem] uppercase tracking-[0.34em] text-white/45 sm:text-[0.65rem] sm:tracking-[0.38em]">
                Studio
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-2 lg:flex">
            {studioRoutes.map((route) => {
              const isActive = pathname === route.path;

              return (
                <a
                  key={route.path}
                  href={route.path}
                  onClick={(event) => handleNavigation(event, route.path)}
                  onMouseEnter={() => handlePrefetch(route.path)}
                  onFocus={() => handlePrefetch(route.path)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {route.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <a
              href="/booking"
              className="primary-button px-5 py-2.5"
              onClick={(event) => {
                event.preventDefault();
                startBookingFlow();
              }}
            >
              Book a Session
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-12 w-12 touch-manipulation items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition active:scale-[0.98] lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((current) => !current)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              {...MOTION_PRESETS.overlay}
              onClick={() => setMobileOpen(false)}
              aria-label="Close mobile menu"
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-[2rem] border-t border-white/10 bg-[#0b0b0b]/96 px-5 pt-5 shadow-[0_-26px_70px_rgba(0,0,0,0.46)] backdrop-blur-2xl lg:hidden"
              style={{ paddingBottom: FLOATING_UI.mobileMenuBottomPadding }}
              initial={{ opacity: 0, y: 28 }}
              animate={MOTION_PRESETS.sheet.animate}
              exit={MOTION_PRESETS.sheet.exit}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-white/18" />
              <div className="mb-5">
                <p className="text-[0.65rem] uppercase tracking-[0.34em] text-white/42">
                  Navigate
                </p>
                <p className="mt-2 font-display text-2xl text-white">Move through the studio</p>
              </div>

              <nav className="grid gap-2">
                {studioRoutes.map((route) => {
                  const isActive = pathname === route.path;

                  return (
                    <a
                      key={route.path}
                      href={route.path}
                      onClick={(event) => handleNavigation(event, route.path)}
                      onTouchStart={() => handlePrefetch(route.path)}
                      onMouseEnter={() => handlePrefetch(route.path)}
                      className={`rounded-[1.35rem] px-4 py-4 text-sm font-medium transition ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-white/68 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {route.label}
                    </a>
                  );
                })}
              </nav>

              <button
                type="button"
                className="primary-button mt-5 w-full justify-center"
                onClick={() => {
                  setMobileOpen(false);
                  startBookingFlow();
                }}
              >
                Book a Session
              </button>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
};
