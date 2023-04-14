import { Request, Response } from "express";
import userModel from "../models/userModel";
import { compareSync } from "bcrypt";
import plainUser from "../utilitys/getPlainUser";
import jwt from "jsonwebtoken";

async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user && compareSync(password, user.password)) {
      return res.status(200).json({
        user: plainUser(user),
        access_token: jwt.sign({ id: user._id }, process.env.JWT_SECRET!),
      });
    }

    res.status(403).send("Authentication failed!");
  } catch (error) {
    console.log(error);
    return res.status(500).send("something went wrong!");
  }
}

export default login;
