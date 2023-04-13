import { Request, Response, NextFunction } from "express";
import userModel from "../models/userModel";

async function userExist(req: Request, res: Response, next: NextFunction) {
  try {
    const exist = await userModel.findOne({ email: req.body.email });

    if (exist) {
      return res.status(403).send("user already exist!");
    }

    next();
  } catch (error) {
    return res.status(500).send("something went wrong!");
  }
}

export default userExist;
