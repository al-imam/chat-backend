import { Request, Response, NextFunction } from "express";

function wrap(
  callback: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void | Response<any, Record<string, any>>>,
  error = { code: "unknown", message: "Internal server error!" }
) {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(callback(req, res, next)).catch((e) => {
      console.log(e);
      res.status(500).json(error);
    });
  };
}

export default wrap;
