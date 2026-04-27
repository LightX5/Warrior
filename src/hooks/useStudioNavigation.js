import { useContext } from "react";
import { StudioNavigationContext } from "../providers/StudioAppProvider";

export const useStudioNavigation = () => {
  const context = useContext(StudioNavigationContext);

  if (!context) {
    throw new Error("useStudioNavigation must be used within StudioAppProvider.");
  }

  return context;
};
