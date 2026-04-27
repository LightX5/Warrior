import { useHeroFirstScreen } from "../hooks/useHeroFirstScreen";
import { useStudioRoute } from "../hooks/useStudioRoute";
import { siteConfig } from "../config/site";
import { WhatsAppIcon } from "./icons";

export const FloatingWhatsAppButton = () => {
  const { pathname } = useStudioRoute();
  const isHeroFirstScreen = useHeroFirstScreen(pathname, 0.68);

  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className={`fixed right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500 text-sm font-semibold text-black shadow-luxe transition hover:-translate-y-1 hover:bg-emerald-400 sm:right-6 sm:h-14 sm:w-auto sm:gap-3 sm:px-5 sm:py-3 ${
        isHeroFirstScreen
          ? "pointer-events-none bottom-[9.5rem] translate-y-4 opacity-0 sm:pointer-events-auto sm:bottom-20 sm:translate-y-0 sm:opacity-65"
          : "bottom-[9.5rem] opacity-100 sm:bottom-24"
      }`}
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span className={isHeroFirstScreen ? "hidden" : "hidden sm:inline"}>
        Chat on WhatsApp
      </span>
    </a>
  );
};
