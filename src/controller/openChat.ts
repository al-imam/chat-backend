import { Request, Response } from "express";
import chatModel from "../models/chatModel";
import wrap from "../utilitys/wrap";

async function openChat(req: Request, res: Response) {
  const openChatByUsersId = await chatModel.findSingleChat(
    req.body._user._id,
    req.body.id
  );

  if (openChatByUsersId) {
    return res.status(200).json(openChatByUsersId);
  }

  const createChat = await chatModel.create({
    chat_name: "sender",
    is_group_chat: false,
    users: [req.body._user._id, req.body.id],
  });

  const newPopulateChat = await chatModel.findChatByIdAndPopulate(
    createChat._id
  );

  return res.status(201).json(newPopulateChat);
}

export default wrap(openChat, {
  code: "open-chat",
  message: "Internal server error",
});
