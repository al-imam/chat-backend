import { Schema, model, Model } from "mongoose";

interface ChatSchemaInterface {
  is_group_chat: boolean;
  users: string[];
  chat_name?: string;
  latest_message?: string;
  group_admin?: string;
}

interface ChatModel extends Model<ChatSchemaInterface> {
  staticMethod(): number;
}

const chatSchema = new Schema<ChatSchemaInterface, ChatModel>(
  {
    chat_name: { type: String, trim: true },
    is_group_chat: { type: Boolean, default: false },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    latest_message: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    group_admin: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default model<ChatSchemaInterface, ChatModel>("Chat", chatSchema);
