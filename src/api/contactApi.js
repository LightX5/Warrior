import { httpRequest } from "./httpClient";

export const createContactMessageRequest = (payload) =>
  httpRequest("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
