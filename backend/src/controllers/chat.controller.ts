import { Request, Response } from "express";
import { createChat, getHistory } from "@/services/chat.service";

export async function postChat(req: Request, res: Response) {
  const { message, userId } = req.body;

  const response = await createChat(userId, message);
  return res.json({ response });
}

export async function getChatHistory(req: Request, res: Response) {
  const { userId } = req.params;
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 20);

  const history = await getHistory(userId, { page, limit });
  return res.json(history);
}
