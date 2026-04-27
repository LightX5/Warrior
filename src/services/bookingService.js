import { createBookingRequest } from "../api/bookingApi";

const normalizeString = (value) => String(value || "").trim();

export const normalizeBookingPayload = (payload = {}) => ({
  name: normalizeString(payload.name),
  email: normalizeString(payload.email),
  phone: normalizeString(payload.phone),
  service: normalizeString(payload.service),
  duration: normalizeString(payload.duration),
  date: normalizeString(payload.date),
  location: normalizeString(payload.location),
  message: normalizeString(payload.message),
});

export const submitBookingRequest = (payload) =>
  createBookingRequest(normalizeBookingPayload(payload));
