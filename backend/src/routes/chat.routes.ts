import { Router } from "express";
import { getChatHistory, postChat } from "@/controllers/chat.controller";

const router = Router();

router.post("/", postChat);
router.get("/history/:userId", getChatHistory);

export default router;
