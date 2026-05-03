// following is the general fucntion and can be used in any project
/*
import { Request, Response, NextFunction, RequestHandler } from "express";

const asyncHandler = (requestHandler: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise
    .resolve(requestHandler(req, res, next))
    .catch((err) => next(err));
  };
};

export { asyncHandler };
*/

import { Request, Response, NextFunction } from "express";

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

const asyncHandler = (requestHandler: AsyncRequestHandler) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
