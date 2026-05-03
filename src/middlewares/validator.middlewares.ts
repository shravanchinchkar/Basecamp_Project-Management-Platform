import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error.js";

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: any = [];
  errors
    .array()
    .map((error: any) => extractedErrors.push({ [error.path]: error.msg }));

  throw new ApiError(422, "Received error is not valid", extractedErrors);

  //   if (!errors.isEmpty()) {
  //     const errorMessages = errors
  //       .array()
  //       .map((error) => error.msg)
  //       .join(", ");
  //     return next(new ApiError(400, errorMessages));
  //   }

  //   next();
};
