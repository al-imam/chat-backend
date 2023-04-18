import { Request, Response } from "express";
import chatModel from "../models/chatModel";
import wrap from "../utilitys/wrap";

async function addUserToGroup(req: Request, res: Response) {
  const updatedUsers = await chatModel.findGroupByIdAndAddUser(
    req.body.groupId,
    req.body.userId
  );

  if (!updatedUsers) {
    return res.status(400).json({
      code: "group-not-exist",
      message: "can't find group by specified groupId",
    });
  }

  const userCollection = await chatModel.findChatByIdAndPopulate(
    updatedUsers._id
  );

  return res.status(200).json(userCollection);
}

export default wrap(addUserToGroup, {
  code: "add-user",
  message: "Internal server error!",
});
