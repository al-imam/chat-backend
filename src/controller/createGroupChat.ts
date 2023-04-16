import { Request, Response } from "express";
import chatModel from "../models/chatModel";

async function createGroupChat(req: Request, res: Response) {
  try {
    const group = await chatModel.create({
      chat_name: req.body.groupName,
      is_group_chat: true,
      group_admin: req.body._user._id,
      users: req.body._userArray,
    });

    const populatedGroup = await chatModel.findById(group._id).populate([
      { path: "users", model: "User", select: "-password" },
      { path: "group_admin", model: "User", select: "-password" },
      {
        path: "latest_message",
        model: "Message",
        populate: [{ path: "sender", model: "User", select: "-password" }],
      },
    ]);

    return res.status(201).json(populatedGroup);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      code: "create-group-chat",
      message: "Internal server error!",
    });
  }
}

export default createGroupChat;
