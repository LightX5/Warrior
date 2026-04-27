import { AnimatePresence, motion } from "framer-motion";
import { MOTION_PRESETS } from "../config/ui";
import { FloatingWhatsAppButton } from "./FloatingWhatsAppButton";
import { Footer } from "./Footer";
import { MobileStickyBookingBar } from "./MobileStickyBookingBar";
import { Navbar } from "./Navbar";

export const AppShell = ({ pathname, assistantSlot = null, children }) => (
  <div className="relative overflow-x-clip">
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
      <div className="absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_top,rgba(213,179,89,0.18),transparent_42%)]" />
      <div className="absolute left-0 top-24 h-[26rem] w-[26rem] rounded-full bg-amber-300/10 blur-3xl" />
      <div className="absolute right-0 top-40 h-[24rem] w-[24rem] rounded-full bg-white/5 blur-3xl" />
    </div>

    <Navbar />
    <AnimatePresence mode="wait">
      <motion.div key={pathname} {...MOTION_PRESETS.page}>
        {children}
      </motion.div>
    </AnimatePresence>
    <Footer />
    <FloatingWhatsAppButton />
    {assistantSlot}
    <MobileStickyBookingBar />
  </div>
);
