import request from "supertest";
import app from "../app";

jest.mock("../services/chat.service", () => ({
  createChat: jest.fn().mockResolvedValue("Resposta mockada da IA"),
  getHistory: jest.fn().mockResolvedValue({
    items: [
      {
        userId: "u1",
        question: "Q1",
        response: "R1",
        createdAt: new Date().toISOString(),
      },
      {
        userId: "u2",
        question: "Q2",
        response: "R2",
        createdAt: new Date().toISOString(),
      },
    ],
    page: 1,
    limit: 20,
    total: 2,
    hasNextPage: false,
  }),
}));

describe("Chat API", () => {
  describe("POST /api/chat", () => {
    it("deve retornar 200 com a resposta da IA quando body é válido", async () => {
      const res = await request(app)
        .post("/api/chat")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send({ userId: "u1", message: "Olá, IA" });

      //console.log("STATUS", res.status, "BODY", res.body);
      expect(res.body).toHaveProperty("response", "Resposta mockada da IA");
      expect(res.status).toBe(200);
    });

    it("deve retornar 400 quando faltar campos obrigatórios (validação Zod", async () => {
      const res = await request(app)
        .post("/api/chat")
        .send({ message: "Sem userId" })
        .expect(400);

      expect(res.body).toHaveProperty("error", "Validation error");

      expect(res.body.issues).toBeDefined();
    });
  });

  describe("GET /api/chat/history/:userId", () => {
    it("deve retornar 200 com histórico e metadas de paginação", async () => {
      const res = await request(app)
        .get("/api/chat/history/u1?page=1&limit=20")
        .expect(200);

      expect(res.body).toHaveProperty("items");
      expect(Array.isArray(res.body.items)).toBe(true);
      expect(res.body).toMatchObject({
        page: 1,
        limit: 20,
        total: 2,
        hasNextPage: false,
      });
      expect(res.body.items[0]).toMatchObject({
        userId: "u1",
        question: "Q1",
        response: "R1",
      });
    });
  });
});
