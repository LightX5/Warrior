import { httpRequest } from "./httpClient";

export const createWarriorAiReplyRequest = (payload) =>
  httpRequest("/api/warrior-ai", {
    method: "POST",
    body: JSON.stringify(payload),
  });
