import { siteConfig } from "../config/site";
import { WhatsAppIcon } from "./icons";

export const FloatingWhatsAppButton = () => {
  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-500 px-5 py-3 text-sm font-semibold text-black shadow-luxe transition hover:-translate-y-1 hover:bg-emerald-400"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="h-5 w-5" />
      Chat on WhatsApp
    </a>
  );
};
