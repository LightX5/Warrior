import { ArrowRightIcon } from "./icons";
import { scrollToSection } from "../utils/scroll";

export const MobileStickyBookingBar = () => (
  <div className="fixed inset-x-4 bottom-4 z-40 lg:hidden">
    <button
      type="button"
      className="primary-button min-h-11 w-full justify-center rounded-[1.4rem] shadow-[0_20px_45px_rgba(0,0,0,0.38)]"
      onClick={() => scrollToSection("booking", "#booking-service")}
    >
      Check Availability
      <ArrowRightIcon />
    </button>
  </div>
);
