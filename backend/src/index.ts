import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import chatRouter from "./routes/chat";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API funcionando 🔥");
});

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("🟢 MongoDB conectado!");
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("🔴 Erro ao conectar no MongoDB:", err);
  });
