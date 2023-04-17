import { Request, Response, NextFunction } from "express";
import verifyJwtToken from "../utilitys/verifyJwtToken";
import userModel from "../models/userModel";
import wrap from "../utilitys/wrap";

async function filterAuthenticateUser(
  { headers: { authorization }, body }: Request,
  res: Response,
  next: NextFunction
) {
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      code: "authorization-headers-not-found",
      message: "authorization headers is not valid or not sent",
    });
  }

  const { id } = verifyJwtToken(authorization.replace("Bearer ", ""));

  if (id !== null) {
    const user = await userModel.findById(id).select("-password");
    if (user) {
      body._user = user;
      return next();
    }
  }

  return res.status(401).json({
    code: "authorization-headers-not-found",
    message: "authorization headers is not valid or not sent",
  });
}

export default wrap(filterAuthenticateUser, {
  code: "authorization-failed",
  message: "Internal server error",
});
