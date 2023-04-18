import { Request, Response } from "express";
import chatModel from "../models/chatModel";
import wrap from "../utilitys/wrap";

async function removeUserToGroup(req: Request, res: Response) {
  const removedUsers = await chatModel.findByIdAndUpdate(
    req.body.groupId,
    { $pull: { users: req.body.userId } },
    { new: true }
  );

  if (!removedUsers) {
    return res.status(400).json({
      code: "user-not-exist",
      message: "can not find user",
    });
  }

  const newGroupUsers = await chatModel.findChatByIdAndPopulate(
    removedUsers._id
  );

  return res.status(200).json(newGroupUsers);
}

export default wrap(removeUserToGroup, {
  code: "user-not-exist",
  message: "can not find user",
});
