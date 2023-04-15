import { Request, Response } from "express";
import chatModel from "../models/chatModel";
import userModel from "../models/userModel";

async function openChat(req: Request, res: Response) {
  try {
    const openChat = await chatModel
      .findOne({
        is_group_chat: false,
        $and: [
          { users: { $elemMatch: { $eq: req.body._user._id } } },
          { users: { $elemMatch: { $eq: req.body.id } } },
        ],
      })
      .populate([
        { path: "users", model: "User", select: "-password" },
        {
          path: "latest_message",
          model: "Message",
          populate: [{ path: "sender", model: "User", select: "-password" }],
        },
      ]);

    if (openChat) {
      return res.status(200).json(openChat);
    }

    const createChat = await chatModel.create({
      chat_name: "sender",
      is_group_chat: false,
      users: [req.body._user._id, req.body.id],
    });

    const fullChat = await chatModel.findById(createChat._id).populate([
      { path: "users", model: "User", select: "-password" },
      {
        path: "latest_message",
        model: "Message",
        populate: [{ path: "sender", model: "User", select: "-password" }],
      },
    ]);

    return res.status(201).json(fullChat);
  } catch (error) {
    console.log({ error });
    return res.status(500).send("something went wrong!");
  }
}

export default openChat;
