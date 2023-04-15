import { Request, Response } from "express";
import chatModel from "../models/chatModel";

async function getAllChatById(req: Request, res: Response) {
  try {
    const chats = await chatModel
      .find({
        users: { $elemMatch: { $eq: req.body._user._id } },
      })
      .populate([
        { path: "users", model: "User", select: "-password" },
        { path: "group_admin", model: "User", select: "-password" },
        {
          path: "latest_message",
          model: "Message",
          populate: [{ path: "sender", model: "User", select: "-password" }],
        },
      ])
      .sort({ updated_at: -1 });

    res.status(200).json(chats);
  } catch (error) {
    console.log({ error });
    return res.status(500).send("something went wrong!");
  }
}

export default getAllChatById;
