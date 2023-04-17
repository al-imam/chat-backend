import { Request, Response, NextFunction } from "express";
import chatModel from "../models/chatModel";
import wrap from "../utilitys/wrap";

async function filterAdmin(req: Request, res: Response, next: NextFunction) {
  const exist = await chatModel.findById("eer");

  if (!exist) {
    return res.status(400).json({
      code: "group-not-found",
      message: "No ground by specified groupId",
    });
  }

  if (!exist.group_admin?.equals(req.body._user._id)) {
    return res.status(401).json({
      code: "not-admin",
      message: "None admin can not modify group users",
    });
  }

  return next();
}

export default wrap(filterAdmin, {
  code: "filter-admin",
  message: "Internal server error",
});
