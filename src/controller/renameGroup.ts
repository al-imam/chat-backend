import { Request, Response } from "express";
import chatModel from "../models/chatModel";

async function renameGroup(req: Request, res: Response) {
  try {
    const { groupId, updatedGroupName } = req.body;
    const group = await chatModel.findByIdAndUpdate(
      groupId,
      { group_name: updatedGroupName },
      { new: true }
    );

    if (!group) {
      return res.status(400).json({
        code: "group-not-exist",
        message: "can't find group by specified groupId",
      });
    }

    return res.status(201).json(group);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      code: "rename-group",
      message: "Internal server error!",
    });
  }
}

export default renameGroup;
