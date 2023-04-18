import { Request, Response } from "express";
import chatModel from "../models/chatModel";
import wrap from "../utilitys/wrap";

async function createGroupChat(req: Request, res: Response) {
  const group = await chatModel.create({
    chat_name: req.body.groupName,
    is_group_chat: true,
    group_admin: req.body._user._id,
    users: req.body._userArray,
  });

  const populatedGroup = await chatModel.findChatByIdAndPopulate(group._id);

  return res.status(201).json(populatedGroup);
}

export default wrap(createGroupChat, {
  code: "create-group",
  message: "Internal server error!",
});
