import { siteConfig } from "../config/site";
import { WhatsAppIcon } from "./icons";

export const FloatingWhatsAppButton = () => {
  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-24 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500 text-sm font-semibold text-black shadow-luxe transition hover:-translate-y-1 hover:bg-emerald-400 sm:bottom-6 sm:right-6 sm:h-auto sm:w-auto sm:gap-3 sm:px-5 sm:py-3"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
};
