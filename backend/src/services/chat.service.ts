import { AppError } from "@/errors/AppError";
import { chatWithGPT } from "./openai.service";
import ChatHistory from "@/models/ChatHistory";

export async function createChat(userId: string, message: string) {
  if (!userId || !message) {
    throw new AppError("userId e mensagem são obrigatórios", 400);
  }

  const response = await chatWithGPT(message);

  const savedChat = await ChatHistory.create({
    userId,
    question: message,
    response,
  });

  return savedChat.response;
}

export async function getHistory(userId: string) {
  if (!userId) {
    throw new AppError("UserId é obrigatório", 400);
  }

  return ChatHistory.find({ userId }).sort({ createdAt: -1 }).limit(20);
}
