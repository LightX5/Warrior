import { useEffect, useState } from "react";

export const useHeroFirstScreen = (pathname, thresholdRatio = 0.72) => {
  const [isHeroFirstScreen, setIsHeroFirstScreen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setIsHeroFirstScreen(false);
      return;
    }

    const syncState = () => {
      const threshold = window.innerHeight * thresholdRatio;
      setIsHeroFirstScreen(window.scrollY < threshold);
    };

    syncState();
    window.addEventListener("scroll", syncState, { passive: true });
    window.addEventListener("resize", syncState);

    return () => {
      window.removeEventListener("scroll", syncState);
      window.removeEventListener("resize", syncState);
    };
  }, [pathname, thresholdRatio]);

  return isHeroFirstScreen;
};
