import { Request, Response } from "express";
import wrap from "../utilitys/wrap";
import msgModel from "../models/msgModel";

async function getAllMessageByChatId(req: Request, res: Response) {
  const messageArray = await msgModel.find({ chat_id: req.body.chatId });
  res.status(200).json(messageArray);
}

export default wrap(getAllMessageByChatId, {
  code: "send-message",
  message: "Internal server error",
});
