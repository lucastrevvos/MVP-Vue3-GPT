import { Request, Response } from "express";
import { createChat, getHistory } from "@/services/chat.service";

export async function postChat(req: Request, res: Response) {
  const { message, userId } = req.body;

  const response = await createChat(userId, message);
  return res.json({ response });
}

export async function getChatHistory(req: Request, res: Response) {
  const { userId } = req.params;
  const history = await getHistory(userId);
  return res.json({ history });
}
