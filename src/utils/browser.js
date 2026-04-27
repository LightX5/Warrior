export const openExternalUrl = (url) => {
  if (typeof window === "undefined" || !url) {
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
};
