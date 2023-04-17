import { Request, Response, NextFunction } from "express";
import wrap from "../utilitys/wrap";

function validateProperties(properties: string[]) {
  const handler = async (req: Request, res: Response, next: NextFunction) => {
    const missingDependency: string[] = [];

    properties.forEach((property) => {
      if (!req.body.hasOwnProperty(property)) {
        missingDependency.push(property);
      }
    });

    if (missingDependency.length === 0) return next();

    return res.status(400).json({
      message: "some properties are missing in request body",
      missingDependency,
    });
  };

  return wrap(handler, {
    code: "validate-body",
    message: "Internal server error",
  });
}

export default validateProperties;
