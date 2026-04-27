import { createContactMessageRequest } from "../api/contactApi";

const normalizeString = (value) => String(value || "").trim();

export const normalizeContactPayload = (payload = {}) => ({
  name: normalizeString(payload.name),
  email: normalizeString(payload.email),
  message: normalizeString(payload.message),
});

export const submitContactMessage = (payload) =>
  createContactMessageRequest(normalizeContactPayload(payload));
