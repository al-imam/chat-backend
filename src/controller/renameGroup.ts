import { Request, Response } from "express";
import chatModel from "../models/chatModel";

async function renameGroup(req: Request, res: Response) {
  try {
    const { groupId, updatedGroupName } = req.body;
    const group = await chatModel.findByIdAndUpdate(
      groupId,
      { chat_name: updatedGroupName },
      { new: true }
    );

    if (!group) {
      return res.status(400).json({
        code: "group-not-exist",
        message: "can't find group by specified groupId",
      });
    }

    const renamedGroup = await chatModel.findById(group._id).populate([
      { path: "users", model: "User", select: "-password" },
      { path: "group_admin", model: "User", select: "-password" },
      {
        path: "latest_message",
        model: "Message",
        populate: [{ path: "sender", model: "User", select: "-password" }],
      },
    ]);

    return res.status(201).json(renamedGroup);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      code: "rename-group",
      message: "Internal server error!",
    });
  }
}

export default renameGroup;
