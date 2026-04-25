export const getLocalDateInputMin = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60 * 1000;

  return new Date(now.getTime() - offset).toISOString().split("T")[0];
};
