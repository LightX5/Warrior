import { useHeroFirstScreen } from "../hooks/useHeroFirstScreen";
import { useStudioRoute } from "../hooks/useStudioRoute";
import { useWarriorAi } from "../hooks/useWarriorAi";
import { siteConfig } from "../config/site";
import { FLOATING_UI } from "../config/ui";
import { WhatsAppIcon } from "./icons";

export const FloatingWhatsAppButton = () => {
  const { pathname } = useStudioRoute();
  const isHeroFirstScreen = useHeroFirstScreen(pathname, 0.68);
  const { isOpen } = useWarriorAi();

  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className={`fixed bottom-[var(--whatsapp-mobile-bottom)] right-4 z-50 inline-flex h-12 w-12 touch-manipulation items-center justify-center rounded-full border border-[#25D366]/35 bg-[#25D366] text-sm font-semibold text-white shadow-[0_18px_42px_rgba(37,211,102,0.28)] transition active:scale-[0.98] hover:-translate-y-1 hover:bg-[#20BD5C] hover:shadow-[0_22px_48px_rgba(37,211,102,0.34)] sm:bottom-24 sm:right-6 sm:h-14 sm:w-auto sm:gap-3 sm:px-5 sm:py-3 ${
        isHeroFirstScreen
          ? "pointer-events-none translate-y-4 opacity-0 sm:pointer-events-auto sm:bottom-20 sm:translate-y-0 sm:opacity-65"
          : isOpen
            ? "pointer-events-none opacity-0 sm:pointer-events-none"
            : "opacity-100"
      }`}
      style={{ "--whatsapp-mobile-bottom": FLOATING_UI.mobileActionOffset }}
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      <span className={isHeroFirstScreen || isOpen ? "hidden" : "hidden sm:inline"}>
        Chat on WhatsApp
      </span>
    </a>
  );
};
