const normalizeBaseUrl = (value = "") => value.replace(/\/+$/, "");

export const clientEnv = Object.freeze({
  apiBaseUrl: normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL || ""),
});
