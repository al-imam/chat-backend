import { Request, Response, NextFunction } from "express";
import chatModel from "../models/chatModel";

async function filterAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const exist = await chatModel.findById(req.body.groupId);

    if (exist && exist.group_admin?.equals(req.body._user._id)) return next();

    return res.status(401).json({
      code: "not-admin",
      message: "only admin can modify users",
    });
  } catch (error) {
    console.log({ error });
    return res.status(400).json({
      code: "group-not-found",
      message: "no group exist in specified groupId",
    });
  }
}

export default filterAdmin;
