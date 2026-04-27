import { clientEnv } from "../config/env";

const defaultHeaders = {
  "Content-Type": "application/json",
};

export const httpRequest = async (path, options = {}) => {
  const response = await fetch(`${clientEnv.apiBaseUrl}${path}`, {
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || "Something went wrong.");
  }

  return payload;
};
