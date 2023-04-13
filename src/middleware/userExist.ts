import { Request, Response, NextFunction } from "express";
import userModel from "../models/userModel";

async function userExist(req: Request, res: Response, next: NextFunction) {
  const exist = await userModel.findOne({ email: req.body.email });

  if (exist) {
    res.status(403).send("user already exist!");
  }

  next();
}

export default userExist;
