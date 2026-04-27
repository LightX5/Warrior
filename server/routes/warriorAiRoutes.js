import express from "express";
import { createWarriorAiMessage } from "../controllers/warriorAiController.js";

const router = express.Router();

router.post("/", createWarriorAiMessage);

export default router;
