import { useHeroFirstScreen } from "../hooks/useHeroFirstScreen";
import { useStudioNavigation } from "../hooks/useStudioNavigation";
import { useStudioRoute } from "../hooks/useStudioRoute";
import { ArrowRightIcon } from "./icons";

export const MobileStickyBookingBar = () => {
  const { pathname } = useStudioRoute();
  const { startBookingFlow } = useStudioNavigation();
  const isHeroFirstScreen = useHeroFirstScreen(pathname, 0.66);

  return (
    <div
      className={`fixed inset-x-4 bottom-4 z-40 transition duration-300 lg:hidden ${
        isHeroFirstScreen ? "pointer-events-none opacity-0 translate-y-4" : "opacity-100"
      }`}
    >
      <button
        type="button"
        className="primary-button min-h-11 w-full justify-center rounded-[1.4rem] shadow-[0_20px_45px_rgba(0,0,0,0.38)]"
        onClick={startBookingFlow}
      >
        {pathname === "/booking" ? "Jump to Booking Form" : "Book Now"}
        <ArrowRightIcon />
      </button>
    </div>
  );
};
