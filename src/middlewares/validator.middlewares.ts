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

  const extractedErrors: { [key: string]: string }[] = [];
  errors
    .array()
    .map((error: any) => extractedErrors.push({ [error.path]: error.msg }));

  // ✅ Use next(error) instead of throw in regular middleware
  return next(new ApiError(422, "Received data is not valid", extractedErrors));
};
