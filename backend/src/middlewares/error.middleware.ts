import { Request, Response, NextFunction } from "express";
import { AppError } from "@/errors/AppError";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error("Erro inesperado:", err);
  return res.status(500).json({ error: "Erro interno no servidor." });
}
