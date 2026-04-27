import { createWarriorAiReplyRequest } from "../api/warriorAiApi";

const normalizeText = (value) => String(value || "").trim();

export const normalizeWarriorAiHistory = (history = []) =>
  (Array.isArray(history) ? history : [])
    .map((item) => ({
      role: item?.role === "assistant" ? "assistant" : "user",
      text: normalizeText(item?.text),
    }))
    .filter((item) => item.text);

export const requestWarriorAiReply = async ({ message, history = [] }) => {
  const payload = {
    message: normalizeText(message),
    history: normalizeWarriorAiHistory(history),
  };

  const response = await createWarriorAiReplyRequest(payload);
  return normalizeText(response.reply);
};
