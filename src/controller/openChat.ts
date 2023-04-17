import { Request, Response } from "express";
import chatModel from "../models/chatModel";

async function openChat(req: Request, res: Response) {
  const openChatByUsersId = await chatModel
    .findOne({
      is_group_chat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.body._user._id } } },
        { users: { $elemMatch: { $eq: req.body.id } } },
      ],
    })
    .populate([
      {
        path: "users",
        model: "User",
        select: "-password",
      },
      {
        path: "latest_message",
        model: "Message",
        populate: [
          {
            path: "sender",
            model: "User",
            select: "-password",
          },
        ],
      },
    ]);

  if (openChatByUsersId) {
    return res.status(200).json(openChatByUsersId);
  }

  const createChat = await chatModel.create({
    chat_name: "sender",
    is_group_chat: false,
    users: [req.body._user._id, req.body.id],
  });

  const populateNewChat = await chatModel.findById(createChat._id).populate([
    {
      path: "users",
      model: "User",
      select: "-password",
    },
    {
      path: "latest_message",
      model: "Message",
      populate: [
        {
          path: "sender",
          model: "User",
          select: "-password",
        },
      ],
    },
  ]);

  return res.status(201).json(populateNewChat);
}

export default openChat;
