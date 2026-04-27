import {
  DEFAULT_WARRIOR_AI_MODEL,
  OPENAI_RESPONSES_API_URL,
  WARRIOR_AI_MAX_HISTORY,
  WARRIOR_AI_MAX_MESSAGE_LENGTH,
  WARRIOR_AI_MAX_OUTPUT_TOKENS,
  WARRIOR_AI_REQUEST_TIMEOUT_MS,
  WARRIOR_AI_SYSTEM_PROMPT,
} from "../config/warriorAi.js";

const allowedRoles = new Set(["user", "assistant"]);

const createHttpError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const normalizeText = (value) => String(value || "").trim();

const truncateText = (value, maxLength = WARRIOR_AI_MAX_MESSAGE_LENGTH) =>
  value.length > maxLength ? value.slice(0, maxLength) : value;

export const normalizeWarriorAiPayload = (payload = {}) => {
  const message = truncateText(normalizeText(payload.message));
  const rawHistory = Array.isArray(payload.history) ? payload.history : [];

  if (!message) {
    throw createHttpError("Message is required.", 400);
  }

  const history = rawHistory
    .map((item) => ({
      role: allowedRoles.has(item?.role) ? item.role : null,
      text: truncateText(normalizeText(item?.text)),
    }))
    .filter((item) => item.role && item.text)
    .slice(-WARRIOR_AI_MAX_HISTORY);

  return {
    message,
    history,
  };
};

const buildResponsesInput = ({ message, history }) => [
  {
    role: "system",
    content: [{ type: "input_text", text: WARRIOR_AI_SYSTEM_PROMPT }],
  },
  ...history.map((item) => ({
    role: item.role,
    content: [{ type: "input_text", text: item.text }],
  })),
  {
    role: "user",
    content: [{ type: "input_text", text: message }],
  },
];

const extractResponseText = (payload = {}) => {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  const output = Array.isArray(payload.output) ? payload.output : [];

  for (const item of output) {
    const content = Array.isArray(item?.content) ? item.content : [];

    for (const part of content) {
      if (part?.type === "output_text" && typeof part.text === "string" && part.text.trim()) {
        return part.text.trim();
      }
    }
  }

  return "";
};

const getOpenAiApiKey = () => process.env.OPENAI_API_KEY || "";

export const createWarriorAiReply = async ({ message, history }) => {
  const apiKey = getOpenAiApiKey();

  if (!apiKey) {
    throw createHttpError(
      "Warrior AI is not configured yet. Add OPENAI_API_KEY to enable the live assistant.",
      503
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), WARRIOR_AI_REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(OPENAI_RESPONSES_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: DEFAULT_WARRIOR_AI_MODEL,
        input: buildResponsesInput({ message, history }),
        max_output_tokens: WARRIOR_AI_MAX_OUTPUT_TOKENS,
        store: false,
      }),
      signal: controller.signal,
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw createHttpError(
        payload?.error?.message || payload?.message || "Unable to generate a Warrior AI reply.",
        response.status || 502
      );
    }

    const reply = extractResponseText(payload);

    if (!reply) {
      throw createHttpError("Warrior AI did not return a usable reply.", 502);
    }

    return reply;
  } catch (error) {
    if (error.name === "AbortError") {
      throw createHttpError("Warrior AI took too long to respond. Please try again.", 504);
    }

    if (error.statusCode) {
      throw error;
    }

    throw createHttpError(error.message || "Warrior AI is unavailable right now.", 500);
  } finally {
    clearTimeout(timeoutId);
  }
};
