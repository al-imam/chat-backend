import { Request, Response } from "express";
import chatModel from "../models/chatModel";

async function addUserToGroup(req: Request, res: Response) {
  try {
    const updatedUsers = await chatModel.findByIdAndUpdate(
      req.body.groupId,
      { $push: { users: req.body.userId } },
      { new: true }
    );

    if (!updatedUsers) {
      return res.status(400).json({
        code: "group-not-exist",
        message: "can't find group by specified groupId",
      });
    }

    const pc = await chatModel.findById(updatedUsers._id).populate([
      { path: "users", model: "User", select: "-password" },
      { path: "group_admin", model: "User", select: "-password" },
      {
        path: "latest_message",
        model: "Message",
        populate: [{ path: "sender", model: "User", select: "-password" }],
      },
    ]);

    return res.status(200).json(pc);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      code: "add-user-to-group",
      message: "Internal server error!",
    });
  }
}

export default addUserToGroup;
