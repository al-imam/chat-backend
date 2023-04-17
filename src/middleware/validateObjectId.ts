import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

const isValidId = Types.ObjectId.isValid;

function validateObjectId(properties: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const noneValidObjectIds: string[] = [];

      properties.forEach((property) => {
        if (!isValidId(property)) noneValidObjectIds.push(property);
      });

      if (noneValidObjectIds.length > 0) {
        return res.status(400).json({
          message: "some object id not valid",
          noneValidObjectIds,
        });
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: "validate-object-id",
        message: "Internal server error!",
      });
    }
  };
}

export default validateObjectId;
