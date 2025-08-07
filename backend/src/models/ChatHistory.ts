import mongoose from "mongoose";

const ChatHistorySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    question: { type: String, required: true },
    response: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ChatHistory", ChatHistorySchema);
