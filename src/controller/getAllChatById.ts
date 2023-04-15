import { Request, Response } from "express";

async function getAllChatByID(req: Request, res: Response) {
  try {
  } catch (error) {
    console.log({ error });
    return res.status(500).send("something went wrong!");
  }
}

export default getAllChatByID;
