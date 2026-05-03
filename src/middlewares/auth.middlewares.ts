/*
// ✅ Fix - add .js to all imports
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyJWT = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    try {
      // ✅ Use the decoded variable you already have from jwt.verify
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
        _id: string;
      };

      const user = await User.findById(decoded._id).select(
        // ✅ decoded not decode
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
      );

      if (!user) {
        throw new ApiError(401, "Invaid access token");
      }

      req.user = user;

      next();
    } catch (error) {
      throw new ApiError(401, "Invaid access token");
    }
  },
);
*/

import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return next(new ApiError(401, "Unauthorized request"));
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      _id: string;
    };

    const user = await User.findById(decoded._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );

    if (!user) {
      return next(new ApiError(401, "Invalid access token"));
    }

    (req as any).user = user; // ✅ bypass type augmentation
    next();
  } catch (error) {
    return next(new ApiError(401, "Invalid access token"));
  }
};