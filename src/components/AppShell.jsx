import { AnimatePresence, motion } from "framer-motion";
import { MOTION_PRESETS } from "../config/ui";
import { FloatingWhatsAppButton } from "./FloatingWhatsAppButton";
import { Footer } from "./Footer";
import { MobileStickyBookingBar } from "./MobileStickyBookingBar";
import { Navbar } from "./Navbar";

export const AppShell = ({ pathname, assistantSlot = null, children }) => (
  <div className="relative overflow-x-clip">
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-[-12rem] top-[8rem] h-[24rem] w-[24rem] rounded-full bg-[#1b5e37]/18 blur-[110px]" />
      <div className="absolute right-[-10rem] top-[5rem] h-[22rem] w-[22rem] rounded-full bg-[#d5b359]/16 blur-[110px]" />
      <div className="absolute bottom-[-10rem] left-1/2 h-[20rem] w-[20rem] -translate-x-1/2 rounded-full bg-[#9f7f2f]/10 blur-[120px]" />
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
