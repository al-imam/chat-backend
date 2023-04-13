import { Request, Response } from "express";
import userModel from "../models/userModel";

async function singup(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = userModel.create({
      email,
      password,
      profile: req.body?.picture,
    });
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send("something went wrong!");
  }
}

export default singup;
