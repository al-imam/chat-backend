import { Request, Response } from "express";
import chatModel from "../models/chatModel";
import userModel from "../models/userModel";

async function openChat(req: Request, res: Response) {
  try {
    const chat = await chatModel
      .findOne({
        is_group_chat: false,
        $and: [
          { users: { $elemMatch: { $eq: req.body._user._id } } },
          { users: { $elemMatch: { $eq: req.body.id } } },
        ],
      })
      .populate("users", "-password")
      .populate("latest_message");

    if (chat) {
      const populate_chats = await userModel.populate(chat, {
        path: "latest_message.sender",
        select: "email profile",
      });

      return res.status(200).json(populate_chats);
    }

    const newChat = await chatModel.create({
      chat_name: "sender",
      is_group_chat: false,
      users: [req.body._user._id, req.body.id],
    });

    const populated_newChat = await chatModel
      .findById(newChat._id)
      .populate("users", "-password");

    return res.status(201).json(populated_newChat);
  } catch (error) {
    console.log({ error });
    return res.status(500).send("something went wrong!");
  }
}

export default openChat;
