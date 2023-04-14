import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
    chat: { type: Schema.Types.ObjectId, ref: "Chat" },
    read_by: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default model("Message", messageSchema);
