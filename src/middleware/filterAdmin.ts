import { Request, Response, NextFunction } from "express";
import chatModel from "../models/chatModel";

async function filterAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const exist = await chatModel.findOne({
      group_admin: req.body._user._id,
      _id: req.body.groupId,
    });

    if (exist) return next();

    return res.status(401).json({
      code: "not-admin",
      message: "only admin can modify users",
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      code: "check-admin",
      message: "Internal server error!",
    });
  }
}

export default filterAdmin;
