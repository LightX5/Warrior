export const scrollToSection = (sectionId, focusSelector) => {
  const section = document.getElementById(sectionId);

  if (!section) {
    return;
  }

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  if (focusSelector) {
    window.setTimeout(() => {
      const field = document.querySelector(focusSelector);

      if (field instanceof HTMLElement) {
        field.focus();
      }
    }, 550);
  }
};
