import { Schema, model, Model, HydratedDocument } from "mongoose";

const chatSchema = new Schema(
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
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    statics: {
      findChatByIdAndPopulate(id: string) {
        return this.findById(id).populate([
          {
            path: "users",
            model: "User",
            select: "-password",
          },
          {
            path: "group_admin",
            model: "User",
            select: "-password",
          },
          {
            path: "latest_message",
            model: "Message",
            populate: [
              {
                path: "sender",
                model: "User",
                select: "-password",
              },
            ],
          },
        ]);
      },
    },
  }
);

export default model("Chat", chatSchema);
