import { Request, Response } from "express";

async function createGroupChat(req: Request, res: Response) {
  try {
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      code: "create-group-chat",
      message: "Internal server error!",
    });
  }
}

export default createGroupChat;
