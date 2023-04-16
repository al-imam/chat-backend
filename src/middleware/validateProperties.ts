import { Request, Response, NextFunction } from "express";

function validateProperties(properties: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const missingDependency: string[] = [];

      properties.forEach((property) => {
        if (!req.body.hasOwnProperty(property)) {
          missingDependency.push(property);
        }
      });

      if (missingDependency.length > 0) {
        return res.status(400).json({
          message: "some properties are missing in request body",
          missingDependency,
        });
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: "validate-body",
        message: "Internal server error!",
      });
    }
  };
}

export default validateProperties;
