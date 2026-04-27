import { useEffect, useState } from "react";
import { STUDIO_NAVIGATE_EVENT, getStudioLocationState } from "../pages/routes";

export const useStudioLocation = () => {
  const [locationState, setLocationState] = useState(() => ({
    ...getStudioLocationState(),
    revision: 0,
  }));

  useEffect(() => {
    const syncLocation = () => {
      setLocationState((current) => ({
        ...getStudioLocationState(),
        revision: current.revision + 1,
      }));
    };

    window.addEventListener("popstate", syncLocation);
    window.addEventListener(STUDIO_NAVIGATE_EVENT, syncLocation);

    return () => {
      window.removeEventListener("popstate", syncLocation);
      window.removeEventListener(STUDIO_NAVIGATE_EVENT, syncLocation);
    };
  }, []);

  return locationState;
};
