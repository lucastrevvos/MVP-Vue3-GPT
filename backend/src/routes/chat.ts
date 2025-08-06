import { Router } from "express";
import { chatWithGPT } from "../services/openaiService";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message)
      return res.status(400).json({ error: "Mensagem obrigatória" });

    const response = await chatWithGPT(message);
    res.json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao consultar a IA" });
  }
});

export default router;
