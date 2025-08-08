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

export async function getHistory(
  userId: string,
  opts: { page?: number; limit?: number } = {}
) {
  if (!userId) {
    throw new AppError("UserId é obrigatório", 400);
  }

  const page = Math.max(1, opts.page ?? 1);
  const limit = Math.min(100, Math.max(1, opts.limit ?? 20));
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    ChatHistory.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    ChatHistory.countDocuments({ userId }),
  ]);

  return {
    items,
    page,
    limit,
    total,
    hasNextPage: page * limit < total,
  };
}
