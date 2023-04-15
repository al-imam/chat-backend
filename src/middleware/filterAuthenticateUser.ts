import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import userModel from "../models/userModel";

async function filterAuthenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      const token = req.headers.authorization.replace("Bearer ", "");

      const { id } = verify(token, process.env.JWT_SECRET!) as { id: string };

      if (!id) {
        return res.status(401).send("Unauthorized");
      }

      req.body._user = await userModel.findById(id).select("-password");
      return next();
    }
    return res.status(401).send("Unauthorized");
  } catch (error) {
    console.log(error);
    return res.status(500).send("something went wrong!");
  }
}

export default filterAuthenticateUser;