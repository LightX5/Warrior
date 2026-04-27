import dotenv from "dotenv";
import {
  createWarriorAiReply,
  normalizeWarriorAiPayload,
} from "../server/services/warriorAiService.js";

dotenv.config();

const setCorsHeaders = (res) => {
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");
};

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({
      message: "Method not allowed.",
    });
  }

  try {
    const payload = normalizeWarriorAiPayload(req.body);
    const reply = await createWarriorAiReply(payload);

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Warrior AI is unavailable right now.",
    });
  }
}
