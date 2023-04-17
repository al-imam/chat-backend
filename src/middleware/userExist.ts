import { Request, Response, NextFunction } from "express";
import userModel from "../models/userModel";

async function userExist(req: Request, res: Response, next: NextFunction) {
  try {
    const exist = await userModel.findOne({ email: req.body.email });

    if (exist) {
      return res.status(500).json({
        code: "user-already-exist",
        message: "mail is already in use",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      code: "user-exist",
      message: "Internal server error!",
    });
  }
}

export default userExist;
