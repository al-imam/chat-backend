import { Request, Response, NextFunction } from "express";

function checkId(req: Request, res: Response, next: NextFunction) {
  if (req.body.id) {
    return next();
  }
  return res.status(400).send("request body not provided");
}

export default checkId;
