import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRouter from "./routes/chat.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRouter);
app.use(errorMiddleware);

export default app;
