import { Request, Response } from "express";
import wrap from "../utilitys/wrap";
import msgModel from "../models/msgModel";
import chatModel from "../models/chatModel";

async function sendMessage(req: Request, res: Response) {
  const msg = await msgModel.create({
    sender: req.body._user._id,
    chat_id: req.body.chatId,
    message: req.body.message,
  });

  await chatModel.findByIdAndUpdate(req.body.chatId, {
    latest_message: msg._id,
  });

  const populatedMessage = await msgModel.findById(msg._id).populate([
    { path: "sender", model: "User", select: "email profile" },
    {
      path: "chat_id",
      model: "Chat",
      select: "users",
      populate: [{ path: "users", model: "User", select: "email profile" }],
    },
  ]);

  res.status(200).json(populatedMessage);
}

export default wrap(sendMessage, {
  code: "send-message",
  message: "Internal server error",
});
