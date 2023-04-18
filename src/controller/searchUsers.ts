import { Request, Response } from "express";
import userModel from "../models/userModel";
import wrap from "../utilitys/wrap";

function returnSearchQuery(search: string | undefined) {
  if (!search) return {};
  return {
    email: { $regex: search, $options: "i" },
  };
}

async function searchUser(req: Request, res: Response) {
  const users = await userModel
    .find(returnSearchQuery(req.query.search as string))
    .find({ _id: { $ne: req.body._user._id } })
    .select("-password");

  res.status(200).json(users);
}

export default wrap(searchUser, {
  code: "search-user",
  message: "Internal server error",
});
