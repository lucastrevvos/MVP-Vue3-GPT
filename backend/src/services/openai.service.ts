import { OpenAI } from "openai";
import { AppError } from "../errors/AppError";

export async function chatWithGPT(message: string) {
  if (!message) {
    throw new AppError("Mensagem é obrigatória", 400);
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Você é um assistente util" },
      { role: "user", content: message },
    ],
  });

  return completion.choices[0].message.content;
}
