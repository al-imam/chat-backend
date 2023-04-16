import { Request, Response, NextFunction } from "express";

function parseUsersArray() {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const userArray = JSON.parse(req.body.userArray);
      if (Array.isArray(userArray) && userArray.length > 2) {
        req.body._userArray = userArray;
        return next();
      }

      return res.status(400).json({
        code: "users-body-not-valid",
        message: "more then two user required to create group",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: "parse-users-array",
        message: "Internal server error!",
      });
    }
  };
}

export default parseUsersArray;
