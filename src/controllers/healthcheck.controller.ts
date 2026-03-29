import { Request, Response } from "express";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

/*
const healthCheck = (req: Request, res: Response, next) => {
  try {
    res
      .status(200)
      .json(new ApiResponse(200, { message: "Server is running" }));
  } catch (error) {
    // res.status(500).json(new ApiResponse(500, { message: "Server is down" }));
    next(error);
  }
};
 */

const healthCheck = asyncHandler(async (req:Request, res:Response) => {
  res.status(200).json(new ApiResponse(200, { message: "Server is running!" }));
});

export { healthCheck };
