import { Request, Response, NextFunction } from "express";

function validateProperties(properties: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const missingProperties: string[] = [];

      properties.forEach((property) => {
        if (!req.body.hasOwnProperty(property)) {
          missingProperties.push(property);
        }
      });

      if (missingProperties.length > 0) {
        return res
          .status(400)
          .send(
            `following properties are missing from the request body: ${missingProperties.join(
              ", "
            )}`
          );
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(500).send("something went wrong!");
    }
  };
}

export default validateProperties;
