import { useContext } from "react";
import { StudioLightboxContext } from "../providers/StudioAppProvider";

export const useStudioLightbox = () => {
  const context = useContext(StudioLightboxContext);

  if (!context) {
    throw new Error("useStudioLightbox must be used within StudioAppProvider.");
  }

  return context;
};
