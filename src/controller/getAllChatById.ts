import { Request, Response } from "express";
import chatModel from "../models/chatModel";

async function getAllChatById(req: Request, res: Response) {
  try {
    const chat = await chatModel
      .find({ users: { $elemMatch: { $eq: req.body._user._id } } })
      .populate("users", "-password")
      .populate("group_admin", "-password")
      .populate("latest_message")
      .sort({ updated_at: -1 });

    res.status(200).json(chat);
  } catch (error) {
    console.log({ error });
    return res.status(500).send("something went wrong!");
  }
}

export default getAllChatById;
