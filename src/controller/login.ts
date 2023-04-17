import { Request, Response } from "express";
import userModel from "../models/userModel";
import { compareSync } from "bcrypt";
import plainUser from "../utilitys/getPlainUser";
import { sign } from "jsonwebtoken";
import wrap from "../utilitys/wrap";

async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user && compareSync(password, user.password)) {
    return res.status(200).json({
      user: plainUser(user),
      access_token: sign({ id: user._id }, process.env.JWT_SECRET!),
    });
  }

  res.status(403).json({
    code: "authentication-error",
    message: "email and password not match",
  });
}

export default wrap(login, {
  code: "login-error",
  message: "Internal server error",
});
