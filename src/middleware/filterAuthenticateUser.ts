import { Request, Response, NextFunction } from "express";
import verifyJwtToken from "../utilitys/verifyJwtToken";
import userModel from "../models/userModel";

async function filterAuthenticateUser(
  { headers: { authorization }, body }: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).send("Unauthorized");
    }

    const { id } = verifyJwtToken(authorization.replace("Bearer ", ""));

    if (id !== null) {
      const user = await userModel.findById(id).select("-password");
      if (user) {
        body._user = user;
        return next();
      }
    }

    return res.status(401).send("Unauthorized");
  } catch (error) {
    console.log(error);
    return res.status(500).send("something went wrong!!!");
  }
}

export default filterAuthenticateUser;
