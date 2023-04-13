import { Request, Response } from "express";
import userModel from "../models/userModel";
import getRandomColor from "../utilitys/getRandomColor";

async function singup(req: Request, res: Response) {
  try {
    const { email, password, picture } = req.body;
    const user = await userModel.create({
      email,
      password,
      profile: picture ?? getRandomColor(email[0]),
    });
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send("something went wrong!");
  }
}

export default singup;
