import { useContext } from "react";
import { StudioIntroSplashContext } from "../providers/StudioAppProvider";

export const useStudioIntroSplash = () => {
  const context = useContext(StudioIntroSplashContext);

  if (!context) {
    throw new Error("useStudioIntroSplash must be used within StudioAppProvider.");
  }

  return context;
};
