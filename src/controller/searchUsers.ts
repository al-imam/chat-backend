import { Request, Response } from "express";
import userModel from "../models/userModel";

function returnSearchQuery(search: string | undefined) {
  if (!search) return {};
  return {
    email: { $regex: search, $options: "i" },
  };
}

async function searchUser(req: Request, res: Response) {
  try {
    const users = await userModel
      .find(returnSearchQuery(req.query.search as string))
      .find({ _id: { $ne: req.body._user._id } })
      .select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send("something went wrong!");
  }
}

export default searchUser;
