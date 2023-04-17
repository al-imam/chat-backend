import { Request, Response } from "express";
import userModel from "../models/userModel";
import getRandomColor from "../utilitys/getRandomColor";
import { hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import plainUser from "../utilitys/getPlainUser";
import wrap from "../utilitys/wrap";

async function singup(req: Request, res: Response) {
  const { email, password, picture } = req.body;

  const user = await userModel.create({
    email,
    password: hashSync(password, 10),
    profile: picture ?? getRandomColor(email[0]),
  });

  return res.status(201).json({
    user: plainUser(user),
    access_token: sign({ id: user._id }, process.env.JWT_SECRET!),
  });
}

export default wrap(singup, {
  code: "singup-error",
  message: "Internal server error",
});
