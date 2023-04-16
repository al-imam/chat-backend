import { Request, Response, NextFunction } from "express";

function parseUsersArray(req: Request, res: Response, next: NextFunction) {
  try {
    const userArray = parseJson(req.body.userArray);

    if (userArray) {
      req.body._userArray = userArray;
      return next();
    }

    return res.status(400).json({
      code: "users—body—not—valid",
      message: "more then two user required to create group",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: "parse-users-array",
      message: "Internal server error!",
    });
  }
}

function parseJson(array: string): string[] | null {
  try {
    const arr = JSON.parse(array);
    if (!Array.isArray(arr) || arr.length <= 2) return null;
    return arr;
  } catch {
    return null;
  }
}

export default parseUsersArray;
