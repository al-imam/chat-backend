import { Request, Response, NextFunction } from "express";

async function validateBody(req: Request, res: Response, next: NextFunction) {
  try {
    const { password, email } = req.body;

    if (password === undefined || email === undefined) {
      return res.status(400).send("Email and password not found");
    }
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).send("something went wrong!");
  }
}

export default validateBody;
