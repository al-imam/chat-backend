import { Request, Response } from "express";
import chatModel from "../models/chatModel";
import wrap from "../utilitys/wrap";

async function renameGroup(
  { body: { groupId, updatedGroupName } }: Request,
  res: Response
) {
  const renamedGroup = await chatModel.findGroupByIdAndRename(
    groupId,
    updatedGroupName
  );

  if (!renamedGroup) {
    return res.status(400).json({
      code: "group-not-exist",
      message: "can't find group by specified groupId",
    });
  }

  const newPopulatedGroup = await chatModel.findChatByIdAndPopulate(
    renamedGroup._id
  );

  return res.status(200).json(newPopulatedGroup);
}

export default wrap(renameGroup, {
  code: "rename-group",
  message: "Internal server error!",
});
