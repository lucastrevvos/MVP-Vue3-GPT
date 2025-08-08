import z from "zod";

export const createChatSchema = z.object({
  body: z.object({
    userId: z.string().min(1, "userId é obrigatório"),
    messsage: z.string().min(1, "message é obrigatória").max(4000),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const getHistorySchema = z.object({
  params: z.object({
    userId: z.string().min(1, "userId é obrigatório"),
  }),
  query: z.object({
    page: z.string().regex(/^\d+$/).transform(Number).optional(),
    limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  }),
  body: z.object({}).optional(),
});
