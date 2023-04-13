import { Request, Response } from "express";
import userModel from "../models/userModel";
import getRandomColor from "../utilitys/getRandomColor";
import { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import plainUser from "../utilitys/getPlainUser";

async function singup(req: Request, res: Response) {
  try {
    const { email, password, picture } = req.body;
    const user = await userModel.create({
      email,
      password: hashSync(password, 10),
      profile: picture ?? getRandomColor(email[0]),
    });

    return res.status(201).json({
      user: plainUser(user),
      access_token: jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string
      ),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("something went wrong!");
  }
}

export default singup;
