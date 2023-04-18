import { Request, Response } from "express";
import chatModel from "../models/chatModel";
import wrap from "../utilitys/wrap";

async function getAllChatById(req: Request, res: Response) {
  const chats = await chatModel
    .find({ users: { $elemMatch: { $eq: req.body._user._id } } })
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
}

export default wrap(getAllChatById, {
  code: "get-all-user-chat",
  message: "Internal server error",
});
