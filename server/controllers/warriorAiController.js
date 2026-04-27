import {
  createWarriorAiReply,
  normalizeWarriorAiPayload,
} from "../services/warriorAiService.js";

export const createWarriorAiMessage = async (req, res, next) => {
  try {
    const payload = normalizeWarriorAiPayload(req.body);
    const reply = await createWarriorAiReply(payload);

    return res.status(200).json({ reply });
  } catch (error) {
    return next(error);
  }
};
