import { Request, Response, NextFunction } from "express";
import wrap from "../utilitys/wrap";

async function parseUsersArray(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userArray = parseJson(req.body.userArray, req.body._user._id);

  if (userArray) {
    req.body._userArray = userArray;
    return next();
  }

  return res.status(400).json({
    code: "users—body—not—valid",
    message: "more then two user required to create group",
  });
}

function parseJson(array: string, id: string): string[] | null {
  try {
    const arr = JSON.parse(array);
    if (!Array.isArray(arr) || arr.length < 2) return null;
    arr.push(id.toString());
    return arr;
  } catch {
    return null;
  }
}

export default wrap(parseUsersArray, {
  code: "parse-users-array",
  message: "Internal server error!",
});
