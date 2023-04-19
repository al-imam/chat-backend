import { Request, Response } from "express";
import chatModel from "../models/chatModel";
import wrap from "../utilitys/wrap";

async function openChat(req: Request, res: Response) {
  const openChatByUsersId = await chatModel.findSingleChat(
    req.body._user._id,
    req.body.userId
  );

  if (openChatByUsersId) {
    return res.status(200).json(openChatByUsersId);
  }

  const newChat = await chatModel.createSingleChat(
    req.body._user._id,
    req.body.userId
  );

  return res.status(201).json(newChat);
}

export default wrap(openChat, {
  code: "open-chat",
  message: "Internal server error",
});
