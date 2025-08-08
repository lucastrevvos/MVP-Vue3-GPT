import app from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;

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
