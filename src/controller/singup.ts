import { Request, Response } from "express";
import userModel from "../models/userModel";
import getRandomColor from "../utilitys/getRandomColor";
import { hashSync } from "bcrypt";

async function singup(req: Request, res: Response) {
  try {
    const { email, password, picture } = req.body;
    const { password: p, ...rest } = await userModel.create({
      email,
      password: hashSync(password, 10),
      profile: picture ?? getRandomColor(email[0]),
    });
    return res.status(201).json({ user: rest, token: "24" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("something went wrong!");
  }
}

export default singup;
