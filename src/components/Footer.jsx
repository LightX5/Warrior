import { siteConfig } from "../config/site";
import { FLOATING_UI } from "../config/ui";
import { useStudioNavigation } from "../hooks/useStudioNavigation";
import { useStudioRoute } from "../hooks/useStudioRoute";
import { preloadStudioPage } from "../pages/pageRegistry";
import { studioRoutes } from "../pages/routes";

export const Footer = () => {
  const { pathname } = useStudioRoute();
  const { navigate, startBookingFlow } = useStudioNavigation();

  return (
    <footer
      className="border-t border-white/10 py-10 pb-[var(--footer-mobile-padding)] lg:pb-10"
      style={{ "--footer-mobile-padding": FLOATING_UI.mobileFooterBottomPadding }}
    >
      <div className="section-shell grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-start">
        <div className="max-w-md">
          <p className="font-display text-3xl text-white">{siteConfig.brandName}</p>
          <p className="mt-4 text-sm leading-7 text-white/58">
            Warrior Lens Studio © 2026
          </p>
          <p className="mt-3 text-sm leading-7 text-white/48">
            Based in Nigeria. Available for events, portraits, and creative shoots.
          </p>
        </div>

        <nav className="grid gap-3 text-sm">
          {studioRoutes.map((route) => (
            <a
              key={route.path}
              href={route.path}
              onClick={(event) => {
                event.preventDefault();
                navigate(route.path);
              }}
              onMouseEnter={() => preloadStudioPage(route.path)}
              onFocus={() => preloadStudioPage(route.path)}
              className={`transition ${
                pathname === route.path ? "text-white" : "text-white/55 hover:text-white"
              }`}
            >
              {route.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-sm text-white/55 transition hover:text-white"
          >
            {siteConfig.email}
          </a>
          <button
            type="button"
            className="primary-button w-full justify-center sm:w-auto"
            onClick={startBookingFlow}
          >
            Book a Session
          </button>
        </div>
      </div>
    </footer>
  );
};
