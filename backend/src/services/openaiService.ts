import { OpenAI } from "openai";

export async function chatWithGPT(message: string) {
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
