import { Router } from "express";
import { chatWithGPT } from "../services/openaiService";
import ChatHistory from "../models/ChatHistory";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message || !userId)
      return res.status(400).json({ error: "Mensagem e UserId obrigatórias" });

    const response = await chatWithGPT(message);

    await ChatHistory.create({
      userId,
      question: message,
      response,
    });

    res.json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao consultar a IA" });
  }
});

export default router;
