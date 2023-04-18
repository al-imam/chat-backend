import { Request, Response, NextFunction } from "express";
import chatModel from "../models/chatModel";
import wrap from "../utilitys/wrap";
import userModel from "../models/userModel";

async function userExistAndNotAlreadyAdded(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const exist = await userModel.findById(req.body.userId);

  if (!exist) {
    return res.status(400).json({
      code: "user-not-found",
      message: "The user you trying to add is not exist",
    });
  }

  const alreadyInGroup = await chatModel.findOne({
    _id: req.body.groupId,
    users: { $elemMatch: { $eq: req.body.userId } },
  });

  if (alreadyInGroup) {
    return res.status(400).json({
      code: "user-already-in",
      message: "User already exist in group",
    });
  }

  return next();
}

export default wrap(userExistAndNotAlreadyAdded, {
  code: "validate-user",
  message: "Internal server error",
});
