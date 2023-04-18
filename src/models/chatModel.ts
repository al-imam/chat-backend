import { Schema, model, Types } from "mongoose";

const populateChatShape = [
  { path: "users", model: "User", select: "-password" },
  { path: "group_admin", model: "User", select: "-password" },
  {
    path: "latest_message",
    model: "Message",
    populate: [{ path: "sender", model: "User", select: "-password" }],
  },
];

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
    query: {
      populateChat() {
        return this.populate(populateChatShape);
      },
    },
    statics: {
      findChatByIdAndPopulate(id: Types.ObjectId) {
        return this.findById(id).populate(populateChatShape);
      },

      findGroupByIdAndRename(groupId: Types.ObjectId, newName: string) {
        return this.findByIdAndUpdate(
          groupId,
          { chat_name: newName },
          { new: true }
        );
      },

      findGroupByIdAndAddUser(groupId: Types.ObjectId, userId: Types.ObjectId) {
        return this.findByIdAndUpdate(
          groupId,
          { $push: { users: userId } },
          { new: true }
        );
      },
    },
  }
);

export default model("Chat", chatSchema);
