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

  const pc = await chatModel.findById(removedUsers._id).populate([
    { path: "users", model: "User", select: "-password" },
    { path: "group_admin", model: "User", select: "-password" },
    {
      path: "latest_message",
      model: "Message",
      populate: [{ path: "sender", model: "User", select: "-password" }],
    },
  ]);

  return res.status(200).json(pc);
}

export default wrap(removeUserToGroup, {
  code: "user-not-exist",
  message: "can not find user",
});
