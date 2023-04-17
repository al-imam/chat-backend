import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import wrap from "../utilitys/wrap";

function validateObjectId(properties: string[]) {
  const handler = async (req: Request, res: Response, next: NextFunction) => {
    const noneValidObjectIds: Record<string, string>[] = [];

    properties.forEach((property) => {
      if (!Types.ObjectId.isValid(req.body[property])) {
        noneValidObjectIds.push({ [property]: req.body[property] });
      }
    });

    if (noneValidObjectIds.length === 0) return next();

    return res.status(400).json({
      message: "some object id not valid",
      noneValidObjectIds,
    });
  };

  return wrap(handler, {
    code: "validate-object-id",
    message: "Internal server error",
  });
}

export default validateObjectId;
