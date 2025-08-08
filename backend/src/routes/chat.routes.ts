import { Router } from "express";
import { getChatHistory, postChat } from "@/controllers/chat.controller";
import { validate } from "@/middlewares/validate.middleware";
import { createChatSchema, getHistorySchema } from "@/schemas/chat.schemas";

const router = Router();

router.post("/", validate(createChatSchema), postChat);
router.get("/history/:userId", validate(getHistorySchema), getChatHistory);

export default router;
