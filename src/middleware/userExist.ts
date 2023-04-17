import { Request, Response, NextFunction } from "express";
import userModel from "../models/userModel";
import wrap from "../utilitys/wrap";

async function userExist(req: Request, res: Response, next: NextFunction) {
  const exist = await userModel.findOne({ email: req.body.email });

  if (!exist) return next();

  return res.status(400).json({
    code: "email-exist",
    message: "email is already in user",
  });
}

export default wrap(userExist, {
  code: "check-users",
  message: "Internal server error",
});
