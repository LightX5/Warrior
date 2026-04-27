import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStudioNavigation } from "../hooks/useStudioNavigation";
import { useStudioRoute } from "../hooks/useStudioRoute";
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

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b transition duration-300 ${
          isScrolled
            ? "border-white/10 bg-black/55 shadow-[0_16px_40px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
            : "border-white/8 bg-black/30 backdrop-blur-xl"
        }`}
      >
        <div className="section-shell flex h-20 items-center justify-between gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-3"
            onClick={(event) => handleNavigation(event, "/")}
          >
            <LazyImage
              src="/brand/warrior-lens-logo.png"
              alt="Warrior Lens logo"
              className="h-11 w-11 rounded-2xl"
              imgClassName="rounded-2xl object-cover"
              sizes="44px"
              priority
            />
            <div>
              <p className="font-display text-2xl leading-none text-white">Warrior Lens</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.38em] text-white/45">
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((current) => !current)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-x-4 top-24 z-40 rounded-[2rem] border border-white/10 bg-[#0b0b0b]/95 p-6 shadow-luxe backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
          >
            <nav className="grid gap-2">
              {studioRoutes.map((route) => {
                const isActive = pathname === route.path;

                return (
                  <a
                    key={route.path}
                    href={route.path}
                    onClick={(event) => handleNavigation(event, route.path)}
                    className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/65 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {route.label}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};
