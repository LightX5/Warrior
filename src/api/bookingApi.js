import { httpRequest } from "./httpClient";

export const createBookingRequest = (payload) =>
  httpRequest("/api/bookings", {
    method: "POST",
    body: JSON.stringify(payload),
  });
