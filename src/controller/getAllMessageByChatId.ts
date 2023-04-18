import { Request, Response } from "express";
import wrap from "../utilitys/wrap";
import msgModel from "../models/msgModel";

async function getAllMessageByChatId(req: Request, res: Response) {
  const messageArray = await msgModel
    .find({ chat_id: req.body.chatId })
    .sort({ created_at: "ascending" })
    .populate("sender", "email profile");
  res.status(200).json(messageArray.slice(-20));
}

export default wrap(getAllMessageByChatId, {
  code: "get-message",
  message: "Internal server error",
});
