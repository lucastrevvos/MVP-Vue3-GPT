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

router.get("/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) return res.status(400).json({ error: "userId obrigatório" });

    const history = await ChatHistory.find({ userId })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({ history });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar histórico" });
  }
});

export default router;
