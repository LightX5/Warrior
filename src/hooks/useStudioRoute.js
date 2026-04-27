import { useContext } from "react";
import { StudioRouteContext } from "../providers/StudioAppProvider";

export const useStudioRoute = () => {
  const context = useContext(StudioRouteContext);

  if (!context) {
    throw new Error("useStudioRoute must be used within StudioAppProvider.");
  }

  return context;
};
