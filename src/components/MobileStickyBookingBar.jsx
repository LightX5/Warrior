import { useHeroFirstScreen } from "../hooks/useHeroFirstScreen";
import { useStudioNavigation } from "../hooks/useStudioNavigation";
import { useStudioRoute } from "../hooks/useStudioRoute";
import { useWarriorAi } from "../hooks/useWarriorAi";
import { FLOATING_UI } from "../config/ui";
import { ArrowRightIcon } from "./icons";

export const MobileStickyBookingBar = () => {
  const { pathname } = useStudioRoute();
  const { startBookingFlow } = useStudioNavigation();
  const { isOpen } = useWarriorAi();
  const isHeroFirstScreen = useHeroFirstScreen(pathname, 0.66);

  return (
    <div
      className={`fixed inset-x-4 bottom-[var(--mobile-booking-bar-bottom)] z-40 transition duration-300 lg:hidden ${
        isHeroFirstScreen || isOpen
          ? "pointer-events-none translate-y-4 opacity-0"
          : "opacity-100"
      }`}
      style={{ "--mobile-booking-bar-bottom": FLOATING_UI.mobileBookingBarOffset }}
    >
      <button
        type="button"
        className="primary-button min-h-12 w-full justify-center rounded-[1.4rem] shadow-[0_20px_45px_rgba(0,0,0,0.38)]"
        onClick={startBookingFlow}
      >
        {pathname === "/booking" ? "Jump to Booking Form" : "Book Now"}
        <ArrowRightIcon />
      </button>
    </div>
  );
};
