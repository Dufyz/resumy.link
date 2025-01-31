import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export function validate(schema: AnyZodObject) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const parsedData = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if (parsedData.body) {
        req.body = parsedData.body;
      }

      if (parsedData.query) {
        req.query = parsedData.query;
      }

      if (parsedData.params) {
        req.params = parsedData.params;
      }

      next();
    } catch (error) {
      res.status(400).json(error);
    }
  };
}
