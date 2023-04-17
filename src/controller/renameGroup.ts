import { Request, Response } from "express";
import chatModel from "../models/chatModel";
import wrap from "../utilitys/wrap";

async function renameGroup(
  { body: { groupId, updatedGroupName } }: Request,
  res: Response
) {
  const updatedGroup = await chatModel.findByIdAndUpdate(
    groupId,
    { chat_name: updatedGroupName },
    { new: true }
  );

  if (!updatedGroup) {
    return res.status(400).json({
      code: "group-not-exist",
      message: "can't find group by specified groupId",
    });
  }

  const populateGroup = await chatModel.findById(updatedGroup._id).populate([
    {
      path: "users",
      model: "User",
      select: "-password",
    },
    {
      path: "group_admin",
      model: "User",
      select: "-password",
    },
    {
      path: "latest_message",
      model: "Message",
      populate: [{ path: "sender", model: "User", select: "-password" }],
    },
  ]);

  return res.status(200).json(populateGroup);
}

export default wrap(renameGroup, {
  code: "rename-group",
  message: "Internal server error!",
});
